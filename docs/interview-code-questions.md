# 코드 구현 설명이 필요한 항목 — 면접 대비

> 근거: `src/data/portfolioData.ts`
> 짝 문서: [interview-prep.md](docs/interview-prep.md) (설계 판단·숫자 방어·태도 질문)
> ⚠️ `public/` 밖 내부 자료. 배포되지 않는다.
>
> **2026-08-13 전면 정정** — 회사 프로젝트 레포(`react_platform-integration`)의 실제 코드를 열어
> 전 항목을 대조했다. 아래 코드는 이제 **설명 골격이 아니라 실제 구현**이다.
> 경로는 모두 회사 레포 기준(`src/...`). 실제와 달랐던 항목은 **🔧 정정** 배지를 달았다.

---

## 이 문서의 범위

[interview-prep.md](docs/interview-prep.md)가 **"왜 그렇게 판단했나"**를 다룬다면, 이 문서는 **"그래서 코드로는 어떻게 했나"**만 추렸다.

두 질문은 난이도가 다르다. 설계 의도는 포트폴리오 문장을 그대로 읽어도 답이 되지만, 구현은 **손으로 써 보이거나 화이트보드에 그릴 수 있어야** 통과한다. 아래 항목은 전부 "그거 코드로 어떻게 짰어요?"가 붙는 지점이다.

### 판정 기준 — 준비됐다는 건 이런 상태다

- 핵심 부분을 **10줄 안팎으로 손으로 쓸 수 있다**
- 그 코드에서 **왜 이 훅/이 자료구조인지** 한 문장으로 말할 수 있다
- **안 그랬을 때 뭐가 깨지는지** 말할 수 있다

### ⚠️ 이 문서를 쓰는 법

정정을 마쳤으므로 이제 **"확인할 것"이 아니라 "외울 것"이다.** 다만 두 종류를 구분해서 외운다.

- **✅ 구현했다** — 코드를 그대로 재현하면 된다
- **❌ 안 했다** — 있는 척하면 그 자리에서 무너진다. **먼저 없다고 말하고, 왜 없었는지·대신 무엇을 했는지**로 넘긴다. 이게 더 좋은 인상을 준다

우선순위: **🔴 반드시** / **🟠 높음** / **🟡 여유되면**

---

# 1. 렌더링 최적화 — 가장 깊게 파고든다

포트폴리오 1순위 성과라 **구현 질문도 여기 집중된다.** 이 장의 4개 항목은 전부 🔴다.
전부 한 파일에 있다: `src/features/ahplus_slope/AllStatus/Dashboard/components/map/SlopeStatusMap.tsx`

## 1-1. 🔴 콜백 참조 고정 — 왜 `useCallback`이 아니라 `useRef`인가 🔧 정정

**질문** — "콜백을 `useRef`로 고정했다고 하셨는데, 코드로 어떻게 하신 건가요? `useCallback`과 뭐가 다른가요?"

**실제 코드** (`SlopeStatusMap.tsx:747-752`)

```ts
// 마커 클릭 콜백 - 부모가 매 렌더 새 함수를 넘겨도 memo가 깨지지 않도록 ref로 안정 참조 고정
const onSelectRef = useRef(setSelectedSlopeMarker);
onSelectRef.current = setSelectedSlopeMarker;      // ← 렌더 중 직접 대입

const handleMarkerSelect = useCallback((item: SlopeListItem) => {
  onSelectRef.current?.(item);
}, []);                                            // ← 의존성 빈 배열 = 참조 영구 고정
```

**🔧 정정** — 종전 골격은 `useEffect(() => { ref.current = fn })`였으나 **실제로는 렌더 중 대입**이다.

- 방어: "커밋 단계(effect)까지 기다리지 않고 **호출 시점에 항상 최신 함수**를 보게 하려고 렌더 중 대입했다. 이 ref는 렌더 결과에 관여하지 않고 이벤트 핸들러에서만 읽히므로 tearing 위험이 없다."
- 더 물으면 인정할 것: "엄밀히는 렌더가 순수하지 않다. `useEffect` 대입이 React 공식 권고에 더 가깝고, 이 경우엔 동작 차이가 없으므로 바꿔도 된다."

**⚠️ 막히는 지점**
- **"`useCallback`도 의존성만 비우면 되잖아요?"** → 의존성을 비우면 콜백이 **첫 렌더의 낡은 상태를 계속 본다(stale closure).** 최신 값을 쓰려고 의존성에 넣으면 참조가 다시 깨진다. **이 딜레마를 깨는 게 ref 패턴**이라는 게 답의 핵심. 여기까지 말해야 통과한다
- 안 그러면 뭐가 깨지나 → `Slope3DMarker`의 `memo`가 `onSelect` 참조 하나 때문에 **전량 통과**되어 2,889개가 재부착된다 (§1-4)

---

## 1-2. 🔴 델타 갱신 — "2건만" 어떻게 계산했나

**질문** — "전체 순회 대신 2건만 갱신했다는데, 그 2건을 어떻게 특정하셨나요?"

이게 **2,889 → 2의 실체**다. 여기를 코드로 못 그리면 성과 전체가 흐려진다.

**실제 코드** (`SlopeStatusMap.tsx` `Slope3DPolygons`, :704-715)

```ts
// 폴리곤 인스턴스는 Record<id, Polygon3DElement>로 보관 → id 조회 O(1)
const polysRef = useRef<Record<string, google.maps.maps3d.Polygon3DElement>>({});

const prevSelectedIdRef = useRef<string | null | undefined>(null);
useEffect(() => {
  const polys = polysRef.current;
  const prevId = prevSelectedIdRef.current;
  if (prevId && prevId !== selectedId && polys[prevId]) {
    polys[prevId].strokeWidth = 2;      // 1) 이전 선택 해제
  }
  if (selectedId && polys[selectedId]) {
    polys[selectedId].strokeWidth = 3;  // 2) 새 선택 강조
  }
  prevSelectedIdRef.current = selectedId;
}, [selectedId]);
```

**답변 포인트 — 문서가 물었던 3가지에 전부 답이 있다**
- **`applyStyle`이 만지는 것** = React state가 아니라 **`Polygon3DElement`(Google Maps 3D SDK 명령형 객체)의 프로퍼티 직접 대입.** "React 밖 객체라 리렌더를 태울 필요 없이 2번의 대입으로 끝난다"가 핵심 문장
- **자료구조** = `Map`은 아니지만 **`Record<id, Polygon>`이라 O(1)**. 배열 `find`였으면 델타 이점이 반감된다는 지적은 이미 피해 갔다
- **정리(cleanup)** = 폴리곤 생성 effect의 return에서 `Object.values(created).forEach(p => p.remove())`. 2D 마커는 `clusterer.setMap(null)`

**같이 말하면 강한 한 줄** — 생성 effect 의존성에서 `selectedId`를 **의도적으로 제외**했다(`eslint-disable` 주석 명시). 안 그러면 클릭할 때마다 폴리곤 2,889개가 통째로 재생성된다.

---

## 1-3. 🔴 `React.memo` — 무엇을 어디서 잘랐나

**질문** — "마커를 `React.memo`로 분리했다고 하셨는데, 컴포넌트 경계를 어디에 두셨나요?"

**실제 코드** — 경계는 **마커 1개 단위**, 2D/3D 각각 하나씩 (`:348`, `:493`)

```tsx
// 3D — Marker3D 하나를 memo로 감쌌다
const Slope3DMarker = memo(function Slope3DMarker({
  item,                       // 참조 안정 (목록 배열 원소)
  isSelected,                 // ← boolean (원시값)
  onSelect,                   // ← §1-1의 안정 참조
}: { item: SlopeListItem; isSelected: boolean; onSelect: (i: SlopeListItem) => void }) {
  return (
    <Marker3D position={...} zIndex={isSelected ? 30 : 15} onClick={...}>
      <Slope3DMarkerGraphic item={item} isSelected={isSelected} />
    </Marker3D>
  );
});

// 2D — DOM 마커 내용물
const SlopeMarkerContent = memo(function SlopeMarkerContent({
  item,
  selected,   // 주석에 명시: "객체가 아닌 원시값으로 받아 effect 의존성 안정화"
  showFull,
}: { item: SlopeListItem; selected: boolean; showFull: boolean });
```

**⚠️ 막히는 지점 — 답 확정**
- **"props에 객체를 넘기지 않았나요?"** → **선택 상태를 `SlopeListItem` 객체가 아니라 `boolean`으로 내려보낸 것**이 핵심. 상위에서 `selectedSlopeMarker?.id === item.id`로 미리 계산해 넘긴다
- **커스텀 비교 함수는 안 썼다.** props가 전부 원시값+안정 참조라 기본 얕은 비교로 충분
- **2,889번 얕은 비교 비용** → props 3개짜리 얕은 비교 2,889회는 마이크로초 단위지만, 3D 씬 재부착은 프레임을 통째로 잡아먹는다. 비교 비용 ≪ 재부착 비용

---

## 1-4. 🟠 3D 마커 DOM 재부착이 정확히 무엇이었나 🔧 정정 (원인 확정)

**질문** — "3D 마커 2,889개가 매 렌더마다 DOM에 재부착됐다고 하셨는데, 왜 그런 일이 일어났나요?"

**확정된 원인 — 후보 4개 중 "새 참조가 memo/의존성을 깨뜨린 것". 단, 2D와 3D가 서로 다른 경로다.**

| | 원인 | 해법 |
|---|---|---|
| **3D** | `Marker3D`에 memo가 없었고, `onSelect`도 인라인 함수였다. 선택 객체가 바뀔 때마다 2,889개 `Marker3D`가 3D 씬에 **재부착** | `Slope3DMarker`를 `memo`로 분리(§1-3) + `onSelect` 안정화(§1-1) |
| **2D** | `SlopeMarkerContent`의 effect 의존성이 `[item, selected, showFull]`인데 **`selected`를 객체로 받아** 전 마커의 `el.innerHTML = ""` → `appendChild` 재실행 | `selected`를 `boolean`으로 전환 |
| **2D 부수** | 라벨 축약/전체 토글이 **줌이 바뀔 때마다** 재계산돼 같은 effect를 태웠다 | `showFull`을 **임계값(zoom 15) 교차 시에만** 토글 (`:533-541`) |

**핵심 문장** — "`key`나 SDK `new` 문제가 아니었다. **참조 동일성이 깨진 게 원인**이라, 고친 것도 렌더 트리가 아니라 props의 타입(객체→원시값)과 콜백의 참조였다."

---

# 2. 데이터 계층

## 2-1. 🔴 queryKeys 팩토리 구조 — ❌ **팩토리는 없다** 🔧 정정

**질문** — "쿼리 키 팩토리를 강제했다고 하셨는데, 어떤 형태인가요? 무효화는 어떻게 호출하나요?"

**⛔ 있다고 답하면 안 된다.** 실제 코드는 이렇다.

```ts
// 대부분은 호출부에서 배열 리터럴 직접 사용
queryKey: ["slope", "detail", id ?? ""] as const          // slopeListApi.ts:238
queryKey: ["slope", "list", params]

// 일부만 모듈 상수로 추출
const SLOPE_DRAFT_KEY = ["slope", "draft"] as const;        // slopeApi.ts:55
export const APPROVALS_KEY = ["slope", "approvals"] as const;

// 무효화는 mutation onSuccess에서 나열 (surveyReviewApi.ts:58-67)
queryClient.invalidateQueries({ queryKey: APPROVALS_KEY });
queryClient.invalidateQueries({ queryKey: ["slope", "list"] });
queryClient.invalidateQueries({ queryKey: ["slope", "dashboard-list"] });
queryClient.invalidateQueries({ queryKey: ["slope", "detail", id] });
```

**정직한 답변 대본**
> "팩토리 객체까지는 안 갔습니다. **키 컨벤션(`[도메인, 액션, 파라미터]`)을 문서로 강제**하고 자주 쓰는 키만 모듈 상수로 뽑은 수준입니다. 그래서 무효화를 `onSuccess`마다 나열하게 되고, **새 화면을 추가할 때 무효화를 빠뜨릴 위험이 남아 있습니다.** 팩토리로 묶는 게 다음 개선 대상입니다."

**그래도 답해야 하는 개념 질문**
- **`as const`** — 튜플 리터럴 타입 유지 → 키 오타를 타입 단계에서 잡는다 (실제로 붙여 뒀다)
- **`invalidateQueries`** — 캐시 삭제가 아니라 **stale 표시 + 활성 쿼리 재요청**. 이 구분은 정확히 말할 것
- **필터 객체를 키에 넣으면?** — TanStack Query는 **구조적 해싱**이라 속성 순서는 무관하지만, `undefined` 유무나 참조 타입이 섞이면 키가 갈린다

---

## 2-2. 🟠 DTO 매퍼 계층 — ✅ 있다

**질문** — "서버 DTO를 화면 모델로 바꾸는 매퍼를 따로 두셨다는데, 시그니처가 어떻게 되나요?"

**실제 코드** (`src/common/services/slope/api/slopeListApi.ts:114`)

```ts
export function mapApiToSlopeListItem(item: SlopeApiItem): SlopeListItem | null {
  const paths = parsePolygon(item.polygon);       // 문자열 JSON도 허용 → LatLng[]
  const span  = getLongestSpan(paths);            // 최장 span = 시점·종점
  const start = span?.[0] ?? toFinitePoint(item.startLat, item.startLng);
  if (!start) return null;                        // ← 좌표 없으면 버린다(상위에서 필터)
  const end    = span?.[1] ?? toFinitePoint(item.endLat, item.endLng) ?? start;
  const center = { lat: (start.lat + end.lat) / 2, lng: (start.lng + end.lng) / 2 };
  const riskGrade = resolveSlopeGrade(item.riskGrade, getRiskScore(item)); // 등급 단일 소스
  return { id: `slope-${item.id}`, latitude: String(center.lat), ..., riskGrade, paths };
}
```

**말할 거리 3개**
- **단순 대입이 아니라 파생 계산이 들어간다** — 서버의 `startLat == endLat`(단일점) 문제를 폴리곤 최장 span으로 보정한 게 이 매퍼의 존재 이유
- **등급은 매퍼가 판단하지 않는다** — `resolveSlopeGrade` 한 곳에 위임(§7-1). 화면마다 등급이 달라 보이던 문제의 해결책
- **실패를 `null`로 표현** — 예외를 던지지 않고 상위에서 `.filter(Boolean)`

**⚠️ 막히는 지점 — 약점도 준비**
- **역방향은 쌍으로 붙어 있지 않다.** `Model → DTO`는 폼 쪽의 `buildBody.ts`에 있어 **레이어가 갈라져 있다** → "왕복 계약을 한눈에 못 본다"는 게 실제 약점
- **필드를 빠뜨리면 아무도 안 알려준다** — 이게 54필드 누락의 구조적 원인 ([interview-prep.md](docs/interview-prep.md) S4)
- **`SlopeApiItem` 타입은 수기 작성** (codegen 아님). 구 필드명 호환도 손으로 처리: `item.riskScore ?? item.disasterRiskScore`

---

## 2-3. 🔴 payload builder 재작성 — ✅ 재작성했다 / ❌ 타입 강제는 없다

**질문** — "누락을 고치려고 payload builder를 재작성하셨다는데, 이전과 이후가 어떻게 달라졌나요?"

**실제 코드** (`src/features/ahplus_slope/Slopes/SlopeForm/utils/buildBody.ts`)

| | 이전 | 이후 |
|---|---|---|
| 필드명 | 폼 필드명 ≠ 전송 필드명 → 손으로 매핑 | **폼 필드명 = 전송 필드명으로 통일** → 대부분 그대로 대입 |
| 체크박스 | **한글 라벨 문자열 비교** (`=== "붕괴위험 있음"`) | 폼 값이 이미 서버 필드명 → `expandFlags`로 기계적 전개 |
| 재해위험도 | 위저드 로컬 상태로만 존재 → **저장 안 됨** | `riskAssessments[]` **다건 전송**(유형별 1건, 최대 3건) |

```ts
// expandFlags — 미선택도 명시적 false로 보낸다
// (부분 전송하면 upsert 특성상 이전 true가 서버에 남아 "해제했는데 그대로"가 된다)
export function expandFlags(options: FieldOption[], selected: string[]) { ... }
```

**가장 강한 한 문장**
> "한글 라벨 비교를 없앤 게 핵심입니다. 종전에는 **UI 라벨만 고쳐도 전송이 조용히 끊겼습니다.** 지금은 폼 값 자체가 서버 필드명이라 비교가 곧 매핑입니다."

**⚠️ "이제 필드를 추가해도 안 빠지나요?" → 정직하게**
> "**아니요.** `Record`로 누락을 컴파일 에러로 잡는 데까지는 못 갔고, zod 같은 런타임 검증도 없습니다. 필드명 통일로 **오탈자 구간은 없앴지만 추가 누락은 여전히 사람이 챙깁니다.** 다음에 손댈 부분입니다."

---

# 3. 폼 · 위저드

## 3-1. 🔴 스텝 정의 배열 — 🔧 **정정: `{ no, label }`뿐이다**

**질문** — "각 단계를 `{ id, title, fields, validate }` 배열로 정의하셨다는데, 타입이 어떻게 되나요?"

**실제 코드** (`SlopeWizard.tsx:97-103`)

```ts
const STEPS: readonly WizardStepInfo[] = [
  { no: 1, label: "일반정보" },
  { no: 2, label: "붕괴위험요인·관리방안" },
  { no: 3, label: "재해위험도 평가" },
  { no: 4, label: "조사자 의견·사진대지" },
  { no: 5, label: "검토 및 제출" },
];   // ← fields·validate·component 없음. 단계바(WizardStepBar) 렌더용 메타다.

const [form, setForm] = useState<NewSlopeForm>(() => emptyForm()); // 부모가 전체 소유
const [step, setStep] = useState<StepNo>(1);
const [visited, setVisited] = useState<ReadonlySet<number>>(() => new Set([1]));
```

**정정 후 대본**
> "단계 메타는 번호·라벨만 갖고, **본문은 `step` state로 분기 렌더**합니다. 폼 상태는 부모가 `useState<NewSlopeForm>` 하나로 단독 소유하고 단계별로 `step1`~`step6` 섹션 객체를 나눠 씁니다(RHF 미사용)."

**"왜 검증을 단계마다 안 했나" — 실제 이유가 좋은 답이다**
> "**검증은 최종 제출 시 `validateSlopeForm` 한 곳**에서 합니다. 현장 조사 특성상 순서대로 채울 수 없는 경우가 많아서 **단계 이동은 자유롭게** 두고, 대신 `visited` Set으로 안 가 본 단계로의 점프만 막았습니다."

**⚠️ 물으면 인정할 약점** — 단계 수가 늘면 `step` 분기가 커진다. 스텝 배열에 `component`를 넣어 데이터 주도로 바꾸는 게 정석이고, 5단계 고정이라 그 비용을 안 치렀다.

---

## 3-2. 🟠 Zustand — 🔧 **정정: 위저드는 Zustand가 아니다**

**질문** — "위저드 스토어를 코드로 보여주세요. 셀렉터 구독은 어떻게 하셨나요?"

**⛔ 위저드 스토어는 없다.** 위저드 상태는 §3-1의 `useState`. Zustand는 **목록 화면 UI 상태**에만 썼다.

```ts
// src/features/ahplus_slope/Slopes/List/store/useSlopeListStore.ts
// 검색어/등급필터/페이지만 보관. 선택 급경사지·활성 탭은 URL이 SoT.
export const useSlopeListStore = create<SlopeListState>((set) => ({
  keyword: "", gradeFilter: "ALL", page: 1,
  setKeyword: (keyword) => set({ keyword, page: 1 }),   // 검색 변경 시 1페이지로
  setGradeFilter: (gradeFilter) => set({ gradeFilter, page: 1 }),
  setPage: (page) => set({ page }),
}));

// 셀렉터 구독 — 조각만 꺼낸다 (SlopeWizard.tsx:133)
const openModal = useModalStore((s) => s.openModal);
```

**"앱보다 짧은 수명을 어떻게 보장했나" — 이 질문의 실제 답**
> "**보장하지 않았습니다. 대신 오래 살면 안 되는 상태를 스토어에 넣지 않았습니다.** 선택된 급경사지와 활성 탭은 **URL이 단일 소스**라 뒤로가기·새로고침·링크 공유가 그대로 동작하고, 스토어에는 되살아나도 무해한 검색어·페이지만 남겼습니다."

**같이 말할 것** — 이 스토어는 `src/stores`(전역)가 아니라 **feature 폴더 안**에 뒀다. "도메인 전역 스토어를 만들지 않는다"는 팀 규칙을 지키면서 화면 스코프만 확보한 것.

**⚠️ `useShallow`는 안 썼다** — 셀렉터가 전부 원시값·함수 하나라 필요가 없었다. "객체 반환 셀렉터를 쓸 때 필요하다"는 개념은 답할 수 있어야 한다.

---

## 3-3. 🟠 localStorage 임시저장·복원 — 🔧 **정정: `persist` 아님, 2단 구조**

**질문** — "임시저장은 언제 어떻게 쓰고, 복원할 때 스키마 검사는 어떻게 하시나요?"

**실제 코드** (`SlopeForm/utils/wizardDraft.ts`) — **Zustand `persist` 미들웨어가 아니라 직접 구현**

```ts
const DRAFT_KEY = "slope.wizard.draft.v1";   // ← 버전은 별도 필드가 아니라 키 이름에

export function saveWizardDraft(form, evaluations, draftId): string | null {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({
      form: stripDerived(form), evaluations, savedAt: new Date().toISOString(), draftId,
    }));
    return null;
  } catch {
    return "임시 저장 용량을 초과했습니다. (사진이 많은 경우 저장되지 않을 수 있습니다)";
  }
}

export function loadWizardDraft(): WizardDraft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<WizardDraft>;
    if (!parsed.form || !Array.isArray(parsed.evaluations)) return null;  // 형태 검사
    const base = JSON.parse(JSON.stringify(INITIAL_FORM)) as NewSlopeForm;
    return { form: {                       // 초기값 위에 섹션 단위로 얹어 신규 필드 보전
      step1: { ...base.step1, ...parsed.form.step1 }, /* … step6까지 */
    }, evaluations: parsed.evaluations, draftId: parsed.draftId ?? null };
  } catch { return null; }
}
```

**핵심은 "왜 로컬만이 아닌가" — 2단 구조**

| 저장처 | 담는 것 | 복원 범위 |
|---|---|---|
| 서버 DRAFT (`PUT /slopes/draft`) | 기본정보·제원 (slopes 행 1건) | **다른 기기·재로그인에서도** |
| localStorage 봉투 | 사진·재해위험도 평가 (다른 테이블이라 서버 draft가 못 받음) | 같은 브라우저에서만 |

**가장 인상적인 디테일 — 이걸 말하면 깊이가 산다**
> "자동 생성한 **위치도 이미지는 일부러 저장에서 뺐습니다**(`stripDerived`). 좌표만 있으면 언제든 다시 만들 수 있는 파생 이미지인데, 수백 KB짜리 dataURL이 **LocalStorage 5MB를 잠식해 정작 현장사진이 저장되지 못했기** 때문입니다. 사용자가 직접 올린 위치도는 재생성이 불가능하므로 파일명으로 구분해 남깁니다."

**⚠️ 나머지 답**
- **저장 시점** — 입력마다가 아니라 **[저장] 버튼 수동**. 디바운스 자동저장 없음 (사진 dataURL이 커서 자동저장이 오히려 위험)
- **버전 필드** — `__v` 같은 필드는 없고 **키 이름의 `.v1`**. 스키마가 늘면 키를 v2로 올려 구본을 자연 폐기하는 방식
- **깨진 JSON** — `catch`로 `null` 반환. 단 `removeItem`까지는 안 한다(다음 저장이 덮어씀)
- **민감정보** — 현장 조사 데이터라 개인정보는 없지만 **평문인 건 사실**이라고 인정할 것

---

## 3-4. 🟡 검증 함수와 에러 표시 — 🔧 **정정: `Record`가 아니라 문자열 하나**

**질문** — "검증에 걸리면 어느 필드가 문제인지 어떻게 표시하나요?"

**실제 코드** (`buildBody.ts:207`)

```ts
export function validateSlopeForm(form, opts = {}): string | null {
  if (opts.requireInspector && !s.inspector) return "조사자를 선택해 주세요.";
  if (s.managementNo && !/^\d{10}$/.test(s.managementNo))
    return "관리번호를 10자리 숫자로 입력해 주세요.";
  if (!s.slopeName.trim()) return "급경사지명을 입력해 주세요.";
  if (!s.surveyDate)       return "조사일자를 선택해 주세요.";
  if (s.startLat === null || s.endLat === null) return "지도에서 시점·종점 좌표를 지정해 주세요.";
  return null;   // ← 필드별 Record가 아니라 첫 오류 문구 하나
}
```

**정직한 답변**
> "**필드 단위가 아니라 첫 오류 메시지 하나를 반환**하고 전역 모달로 띄웁니다. 필수값이 5개뿐이라 이걸로 충분하다고 판단했는데, **해당 입력으로 포커스를 옮기는 처리는 없습니다.** 필드가 늘면 `Record<필드명, 메시지>`로 바꿔야 합니다 — 접근성 관점에서도 그쪽이 맞습니다."

---

# 4. 컴포넌트 설계

## 4-1. 🟠 additive `readOnly` prop — ✅ 있다

**질문** — "`readOnly` prop을 더해 기존 호출부를 안 고쳤다는데, 코드로 어떻게 되나요?"

**실제 코드** (`Step5RiskEval/CategoryScorePanel.tsx:247, 264`)

```tsx
interface IProps {
  /* … */
  readOnly?: boolean;          // optional
}
export default function CategoryScorePanel({ /* … */ readOnly = false }: IProps) {
  // 내부 3곳에서 분기: 입력 컨트롤 ↔ 텍스트 렌더 (:312, :331, :383)
}
```

**핵심** — **optional + 기본값 `false`**라 기존 호출부는 한 글자도 안 고치고 컴파일된다. "상세보기에서 같은 패널을 읽기 전용으로 재사용해야 했는데, 컴포넌트를 복제하는 대신 prop 하나를 더했다."

**⚠️ 가점 포인트 — 먼저 약점을 말하면 좋다**
> "다만 `readOnly: true`인데 `onChange`를 넘기는 **불가능한 조합이 타입상 허용**됩니다. 판별 유니온으로 막을 수 있습니다."

```ts
type Props = { scores: Score[] } & (
  | { readOnly: true }
  | { readOnly?: false; onChange: (s: Score[]) => void }
);
```

---

## 4-2. 🟠 `SlopeForm` mode=create|edit — ✅ 분기 3곳

**질문** — "등록과 수정을 한 컴포넌트로 합쳤다는데, 내부에 `mode` 분기가 몇 군데나 되나요?"

**실제 코드** (`SlopeForm.tsx`) — **정확히 3곳**

```tsx
export default function SlopeForm({ mode, initial, onDone, onCancel }: IProps) {
  const [form, setForm] = useState(
    mode === "create" ? emptyForm() : mapItemToForm(initial),   // ① 초기값 (:57)
  );
  const isEdit = mode === "edit";                                // ② 읽기 전용 게이트 (:73)
  const { save, isSaving } = useSlopeFormSave(mode, { /* … */ });// API 차이는 훅이 흡수
  // …
  return <Button>{isSaving ? "저장 중…" : mode === "create" ? "등록" : "저장"}</Button>; // ③ 라벨 (:214)
}
```

**답변 대본**
> "**분기가 3곳입니다 — 초기값, 편집 게이트, 버튼 라벨.** 제출 API 차이는 컴포넌트가 아니라 `useSlopeFormSave(mode)` 훅이 흡수하고, **렌더 로직은 100% 공유**됩니다. 급경사지 폼은 필드가 수십 개라 페이지를 둘로 두면 그 수십 개가 통째로 복제됩니다. 분기 3곳이면 합치는 쪽이 명백히 싸다고 봤습니다."

**반론 대비** — "분기가 10곳이 되는 순간 나눠야 한다. 지금은 3곳이고, 그 3곳이 전부 **양 끝단(초기값·저장·라벨)**이라 중간 로직이 오염되지 않았다는 게 유지 근거다."

---

## 4-3. 🟡 Presentational 컴포넌트의 props 설계 — 🔧 정정 (patch 방식)

**질문** — "필드 섹션 컴포넌트가 받는 props는 어떤 모양인가요?"

**실제 코드** (`sections/GeneralInfoFields.tsx:98-99`)

```tsx
interface IProps {
  spec: GeneralSpec;                                   // 값 객체 하나
  onSpecChange: (patch: Partial<GeneralSpec>) => void; // ← (name, value)가 아니라 patch 객체
}
```

**왜 `onChange(name, value)`가 아닌가**
> "**부분 객체(patch)를 올려보냅니다.** 한 번의 상호작용이 필드 2개를 동시에 바꾸는 경우(예: 지도 클릭 → 위도·경도·주소 동시 갱신)가 흔한데, `(name, value)` 시그니처면 `setState`를 세 번 부르게 됩니다. patch면 한 번에 끝나고 부모의 병합 로직도 `{...prev, ...patch}` 하나로 통일됩니다."

읽기/쓰기 모드 차이는 §4-1의 `readOnly` prop과 동일한 방식.

---

# 5. 지도

## 5-1. 🟠 커스텀 마커 — ✅ 하이브리드(명령형 DOM + JSX SVG)

**질문** — "기본 핀 대신 등급 문자를 넣은 커스텀 마커를 어떻게 만드셨나요?"

**2D — `document.createElement`** (`src/common/components/map/markers/slopeMarker.ts`)

```ts
export function createSlopeMarkerElement(item, options?): HTMLElement {
  const root = document.createElement("div");
  root.className = "slope-marker-root";
  if (options?.selected) { /* 레이더 파동 span 2개(딜레이 차등) 추가 */ }
  const pin = document.createElement("div");
  pin.className = `slope-marker-pin slope-marker-pin--grade${item.riskGrade}`;
  pin.innerText = item.riskGrade;                    // 등급이 A~E가 아니면 회색 + "-"
  root.appendChild(pin);
  if (item.maintenanceStatus === "진행중") { /* "공사중" 배지 */ }
  return root;
}

// 이걸 React 쪽에서 마운트 (SlopeMarkerContent의 effect)
el.innerHTML = "";
el.appendChild(createSlopeMarkerElement(item, { selected }));
```

**3D — JSX SVG** — `Marker3D`는 자식으로 `<img>/<svg>/<Pin>`만 허용해서, 등급 원 + 급경사지명을 **단일 `<svg>`**(`Slope3DMarkerGraphic`)로 그렸다.

**답변의 결정적 부분 — "왜 svg 하나로 합쳤나"**
> "처음엔 SDK의 native label + `<Pin>` 조합이었는데, **엔진이 관리하는 label을 우리가 지울 수 없어** 클릭으로 카메라가 움직일 때마다 라벨이 2겹으로 겹쳤습니다. svg 하나로 합치니 **DOM 통제권이 우리에게 오면서** 그 버그가 구조적으로 사라졌습니다."

**⚠️ 나머지 답**
- **`createPortal`/`createRoot`는 안 썼다** — 2,889개에 React 루트를 심는 비용을 피하려고, JSX로는 빈 마운트 div만 두고 내용은 명령형으로 채웠다
- **선택 상태 갱신** — §1-2와 답이 일관돼야 한다. **2D는 effect가 innerHTML 재생성**(원시값 props로 최소화), **3D 폴리곤은 프로퍼티 직접 대입 2건**
- **클릭 이벤트** — 래퍼 컴포넌트에 붙였다. `AdvancedMarker`는 `onClick={(e) => { e.stop(); … }}`, `Marker3D`는 `e.stopPropagation()` (지도 배경 클릭으로 전파돼 선택이 풀리는 걸 막는다)
- **svg 필터 id 충돌** — 같은 문서에 2,889개가 복제되므로 `mk-shadow-${item.id}`로 유니크하게 만들었다

---

## 5-2. 🟡 MarkerClusterer 연동 — ✅ (§1-2와 모순 없음)

**질문** — "클러스터러에 마커를 어떻게 넘기고, 목록이 갱신되면 어떻게 처리하나요?"

```ts
useEffect(() => {                       // 데이터 변경 경로
  const clusterer = clustererRef.current;
  if (!clusterer) return;
  clusterer.clearMarkers();
  clusterer.addMarkers(Object.values(markerRefs));
}, [markerRefs]);                       // ← 마커 인스턴스 목록이 바뀔 때만
```

**모순 지적에 대한 답 — 두 경로를 분리해서 말한다**
> "**데이터가 바뀌면 전량 재등록이 맞습니다.** 클러스터 경계 자체가 다시 계산돼야 하니까요. 하지만 **선택 변경은 이 effect를 타지 않습니다.** 의존성이 `markerRefs`뿐이라, 선택이 바뀔 때 클러스터러는 아예 손대지 않고 §1-2의 2건 갱신만 일어납니다. 자주 일어나는 건 선택 변경이고, 데이터 변경은 초기 로드·필터 변경 때뿐입니다."

**같이 말할 디테일 — ref 콜백 고정**
```ts
// 인라인 함수를 ref로 넘기면 렌더마다 ref가 재부착 → setMarkerRefs 무한 호출
const markerRefCallbacks = useMemo(() => { /* id별 콜백 생성 */ }, [items, setMarkerRef]);
```
"§1의 참조 동일성 문제가 **ref 콜백에서도 똑같이 터졌다**"는 연결이 좋은 서사가 된다.

**⚠️ 3D는 클러스터링이 없다** — `MarkerClusterer`가 `AdvancedMarkerElement`(2D) 전용이라 3D는 개별 렌더. 그래서 **3D 쪽 성능 최적화(§1-3)가 더 절실했다**는 인과로 이어진다.

---

## 5-3. 🟡 Polygon 해치 패턴 — ❌ **구현하지 않았다** 🔧 정정

**질문** — "폴리곤에 사선 패턴을 어떻게 입혔나요?"

**⛔ 해치 패턴은 없다.** 실제는 등급색 **단색 반투명**이다.

```tsx
// 2D
<Polygon fillColor={getGradeColor(item.riskGrade)} fillOpacity={0.18}
         strokeColor={getGradeColor(item.riskGrade)}
         strokeWeight={selected?.id === item.id ? 3 : 2} />
```

**대신 말할 것 — 3D의 우회가 더 좋은 소재다**
```ts
// Polygon3DElement에는 opacity prop이 없다 → 알파를 색 자체에 녹였다
function hexToRgba(hex: string, alpha: number) { /* "#RRGGBB" → "rgba(r,g,b,0.18)" */ }
const poly = new maps3dLib.Polygon3DElement({ fillColor: hexToRgba(color, 0.18), ... });
```

> "2D `Polygon`은 `fillOpacity`가 있는데 **3D `Polygon3DElement`에는 없습니다.** 같은 투명도를 내려고 알파를 색 문자열에 넣어 우회했습니다. 2D/3D API 표면이 다른 걸 흡수한 사례입니다."

포트폴리오에 해치 패턴 표현이 있다면 **문구를 수정할 것.**

---

## 5-4. 🟠 목록 ↔ 지도 동기화 — ✅ 단방향

**질문** — "양쪽에서 선택이 가능한데 무한 루프는 어떻게 막았나요?"

```
[대시보드 부모]  selectedSlopeMarker (단일 state)
      │ prop 하향                     ↑ onSelect 콜백 상향
      ▼                               │
   [지도] ─ effect: panTo / flyCameraTo (결과일 뿐, 상태를 되돌려 쓰지 않는다)
   [목록] ─ 행 하이라이트
```

**핵심 문장** — "지도는 **상태를 읽어 카메라를 움직일 뿐 스스로 상태를 만들지 않습니다.** 사용자 클릭만 위로 올라갑니다. **`bounds_changed`·`center_changed`를 구독하지 않은 것**이 루프를 원천 차단한 지점입니다."

**깊이를 더하는 두 가지**
- **검색 결과 이동** — 같은 결과를 다시 검색해도 반응해야 해서 `{ items, nonce }`로 감쌌다. effect 의존성이 `boundsRequest?.nonce`라 **값이 같아도 nonce가 바뀌면 다시 실행**된다
- **3D 카메라 고도** — 산간 지역이라 지면고도 ≠ 해수면이다. `ElevationService`로 지면고도를 조회해 `center.altitude`에 넣지 않으면 tilt와 결합돼 **화면 중앙이 마커에서 수백 m 어긋난다**

---

## 5-5. 🟡 역지오코딩 좌표 자동 입력 — ✅ 있다

**질문** — "지도 클릭 → 주소 자동 입력은 어떤 흐름인가요?"

```ts
// src/features/ahplus_slope/common/hooks/useReverseGeocode.ts
export function useReverseGeocode() {
  const geocoding = useMapsLibrary("geocoding");
  return useCallback(async (lat, lng): Promise<GeocodeResult | null> => {
    if (!geocoding) return null;
    try {
      const { results } = await new geocoding.Geocoder().geocode({
        location: { lat, lng }, language: "ko",
      });
      const first = results?.[0];
      if (!first) return null;
      return { address: first.formatted_address ?? "", region: pickRegion(first.address_components) };
    } catch { return null; }          // 실패해도 좌표 입력은 유지
  }, [geocoding]);
}
```

**⚠️ 막히는 지점 답**
- **쿼터** — **클릭 확정 시 1회만** 호출한다(드래그 중 추적·폴링 없음). 그래서 디바운스가 필요 없었다
- **실패 처리** — 전부 `null`. 좌표는 이미 들어가 있으므로 **주소만 비고 폼은 계속 진행**된다
- **`region` 추출** — `읍|면|동`으로 끝나는 컴포넌트 우선, 없으면 `sublocality_level_1`/`locality` 폴백. 한국 행정구역이 Google 타입과 정확히 안 맞아서 정규식을 얹었다
- **로딩 UI는 없다** — 응답이 빨라 넘어갔다고 인정. 느린 망에서는 필요하다

---

# 6. 빌드 · 구조

## 6-1. 🟠 `React.lazy` + `Suspense` — ✅ element 단위 경계

**질문** — "라우트 스플리팅을 코드로 어떻게 적용하셨나요? `Suspense` 경계는 어디에 두셨나요?"

**실제 코드** (`src/routes/WebRoutes.tsx:92-94`)

```tsx
const SettingRegion = lazy(() => import("../pages/Setting/Region"));

// 경계를 라우트 element마다 하나씩 — Layout(메뉴·헤더)은 유지된 채 본문만 fallback
const withSuspense = (node: ReactNode): ReactNode => (
  <Suspense fallback={<Loading />}>{node}</Suspense>
);

<Route path="/guide" element={withSuspense(<GuidePage />)} />
```

**답변 포인트**
- **경계를 `<Routes>` 바깥이 아니라 element마다** 뒀다. 바깥에 하나면 **화면 전체가 스피너로 바뀌어 메뉴까지 깜빡인다**. element 단위면 레이아웃은 그대로 있고 본문만 바뀐다
- **`Login`·`NotFound`·`Layout`은 lazy 제외** — 셸 골격이라 어차피 즉시 필요하고, 로그인 화면이 깜빡이면 첫인상이 나쁘다
- **자동 분할이다. `manualChunks` 설정은 없다** — 라우트 경계가 곧 화면 경계라 별도 조정이 불필요했다

**⚠️ 정직하게 인정할 것**
> "**청크 로딩 실패 처리는 없습니다.** 배포 직후 구버전 청크가 404 나는 상황은 실제로 가능하고, 에러 바운더리로 잡아 새로고침을 유도하는 게 정석입니다. 안 넣었습니다."

---

## 6-2. 🟡 도메인 격리 폴더 구조와 라우트 등록 — ✅

```
src/features/ahplus_slope/     # 화면 (AllStatus/ Slopes/ Settings/ common/)
src/common/services/slope/     # API·타입 (api/ types/ utils/ apiAddress.ts)
src/features/slope/mocks/      # 더미 데이터
src/routes/web/SlopeRoutes.tsx # 라우트 정의
```

**셸에 추가한 것** — `WebRoutes.tsx`의 `import SlopeRoutes from "./web/SlopeRoutes";` **한 줄**과 spread 한 줄.

**"그 파일은 공통 파일 아닌가" — 이렇게 답한다**
> "맞습니다. 그래서 **'공통 파일 무수정'이 아니라 '공통 파일의 확장 지점만 사용'**이 정확한 표현입니다. 셸은 `SYS_FEAT` 공통코드로 플랫폼을 판별해 `*Routes.tsx`를 골라 spread하도록 이미 설계돼 있었고, 저는 **그 규약대로 항목을 하나 추가했을 뿐 셸의 판별 로직은 건드리지 않았습니다.** 다른 플랫폼 4개가 같은 파일을 공유하기 때문에 이 경계가 중요했습니다."

---

## 6-3. 🟡 pre-push hook — 🔧 정정 확정: **husky 아님**

**실제 파일** — `.git/hooks/pre-push` (버전 관리 대상 아님)

```sh
#!/bin/sh
# 개인용 pre-push 훅: push 전 빌드/타입 검사. 실패하면 push 차단.
echo "[pre-push] 빌드 검사 실행 중..."
npm run build
if [ $? -ne 0 ]; then
  echo "[pre-push] X 빌드 실패 — push를 중단합니다."
  echo "[pre-push]   (검사를 한 번만 건너뛰려면: git push --no-verify)"
  exit 1
fi
exit 0
```

**답변 — 한계를 먼저 말하는 게 낫다**
> "**husky가 아니라 `.git/hooks`에 직접 넣은 개인용 훅**이라 팀에는 공유되지 않습니다. 파일 주석에도 그렇게 적어 뒀습니다. 공통 셸을 여러 플랫폼이 함께 쓰는 레포라 **훅을 팀 전체에 강제하는 건 제 권한 밖**이었고, 우선 제 푸시부터 막았습니다. 팀 적용이 필요하면 husky로 올리면 됩니다."

**부가** — 검사 대상이 `npm run build`(= `tsc -b` + `vite build`)인 것도 의도다. `tsc --noEmit`만으로는 통과하는데 빌드는 깨지는 경우가 실제로 있었다.

---

# 7. 계산 로직

## 7-1. 🟠 등급 계산 순수 함수 + 배점표 — ✅ (경계는 `>=`)

**등급 결정 단일 진입점** (`src/common/services/slope/utils/slopeGrade.ts`)

```ts
export function scoreToGrade(score: number): SlopeRiskGrade {
  if (score >= 81) return "E";
  if (score >= 61) return "D";
  if (score >= 41) return "C";   // ⚠️ A/B/C 경계는 가정값
  if (score >= 21) return "B";
  return "A";
}

// ① DB 등급 A~E → ② 점수→등급 → ③ "미산정"
export function resolveSlopeGrade(riskGrade, score): SlopeGradeView {
  return gradeFromRiskGrade(riskGrade)
      ?? (score != null ? scoreToGrade(score) : UNRATED_GRADE);
}
```

**점수 합산은 단계별 순수 함수** (`SlopeForm/utils/score.ts`)
`sumItem`(문항 1개) → `sumCategory`(카테고리, 택1 그룹·재료 변형 포함) → `sumRiskTotal`(총점).
배점표는 코드가 아니라 **데이터**(`RISK_EVAL_SCHEMA`) — 기준 개정 시 데이터만 교체.

**⚠️ 먼저 말해야 안전한 것 3가지**
1. **경계 연산자는 `>=`.** 단 **규정 근거가 있는 건 D(61~80)·E(81+)뿐이고 A/B/C 경계는 가정값**이다. 코드 주석에 그렇게 명시해 뒀다 — "서버 산정 확정 후 교체 예정"
2. **프론트 점수는 미리보기다.** 최종 총점·등급은 **서버가 `riskAssessmentAnswers`로 재계산해 덮어쓴다.** 행정 판단 근거가 되는 값을 클라이언트가 확정하지 않는 게 설계 원칙
3. **테스트는 없다** — 레포에 테스트 러너 자체가 없다. "순수 함수로 뽑아 둬서 **붙이기는 쉬운 상태**"까지가 정직한 선

**빈 입력** — 선택 안 한 문항은 `?? 0`으로 0점 처리(계산 불가가 아님). 미선택 상태로 저장하면 경고를 띄우는 별도 판정(`hasRiskAssessmentOnlyInput`)이 있다.

---

## 7-2. 🟡 HWP 추출 스크립트 — ❌ **이 레포에 없다** 🔧 정정

회사 레포에 `hwp`/`cfb` 관련 스크립트가 없다(git 추적 파일 기준).

**선택지 두 가지 — 반드시 하나로 정할 것**
- 실제로 만든 적이 있다면 → **레포 밖 일회성 스크립트**였다고 밝히고, 코드를 못 보여주므로 **흐름만** 말한다: `파일 읽기 → CFB 엔트리 목록 → BodyText/Section0 선택 → zlib inflate → 텍스트·표 파싱 → JSON`
- 기억이 흐리다면 → **포트폴리오에서 이 항목을 빼라.** 코드를 못 보여주는 항목은 물어보면 손해다

---

# 면접 전 실행 체크리스트

**대조는 끝났다(2026-08-13). 이제 외우는 단계다.**

## A. 포트폴리오 문구부터 고칠 것 (거짓이 되는 항목)

1. ⬜ **queryKeys 팩토리** — "팩토리 강제" 표현이 있으면 **"키 컨벤션 통일"로 수정** (§2-1)
2. ⬜ **Zustand `persist`** — 위저드 임시저장에 `persist`를 썼다는 표현이 있으면 **"서버 DRAFT + 로컬 봉투 2단"으로 수정** (§3-3)
3. ⬜ **해치 패턴** — 폴리곤 사선 패턴 언급이 있으면 **삭제** (§5-3)
4. ⬜ **HWP 스크립트** — 코드를 못 보여주면 **항목 삭제 검토** (§7-2)

## B. 손으로 써 볼 것 (🔴 6개)

5. ⬜ §1-1 ref 고정 5줄 — **렌더 중 대입**인 것 포함
6. ⬜ §1-2 델타 갱신 10줄 — `Record` 조회가 O(1)인 것 포함
7. ⬜ §1-3 memo 경계 — **선택을 boolean으로 내린 것**이 핵심
8. ⬜ §2-3 `expandFlags` — "한글 라벨 비교를 없앴다" 한 문장
9. ⬜ §3-1 `STEPS`는 `{no,label}`뿐 + 검증은 끝단 1회
10. ⬜ §3-3 `stripDerived` — 위치도를 일부러 뺀 이유

## C. "없습니다"를 연습할 것 (당황하면 지어내게 된다)

11. ⬜ queryKeys 팩토리 / 타입 강제 payload / zod / 스텝 `validate` / `useShallow` / 해치 패턴 / 청크 에러 바운더리 / 테스트 / 포커스 이동 — **전부 "안 했고, 대신 이렇게 했고, 다음에 이렇게 하겠다"** 3단으로

## D. 서사로 묶을 것

12. ⬜ **"참조 동일성"이 §1-1·§1-3·§1-4·§5-2를 관통하는 단일 주제**다. 네 개를 따로 외우지 말고 하나의 이야기로 — *"React가 다시 그리는 기준은 값이 아니라 참조라는 걸, 2,889개 마커가 알려줬다."*
