/**
 * 포트폴리오 전역 타입 정의
 * ---------------------------------------------------------------------------
 * 여기가 데이터(data/portfolioData.ts)와 화면(components/*) 사이의 "계약서"다.
 * 이 파일만 보면 포트폴리오가 어떤 정보를 요구하는지 전부 알 수 있어야 한다.
 *
 * 설계 원칙
 *  1. 화면에 없는 필드는 만들지 않는다 (YAGNI).
 *  2. 값이 정해진 것은 string 대신 유니온 타입으로 좁힌다.
 *     예) type: string  →  type: 'demo' | 'github'
 *     이러면 오타(`githbu`)를 런타임이 아니라 편집 중에 잡는다.
 *  3. 없어도 되는 값에만 `?`를 붙인다. 남발하면 컴포넌트마다 방어 코드가 늘어난다.
 *  4. 서술형 필드는 이름으로 "무엇을 써야 하는지" 강제한다.
 *     description 하나로 뭉뚱그리지 않고 problem/approach/result 로 쪼개면
 *     글을 쓸 때 저절로 STAR 구조가 된다. 타입이 곧 글쓰기 가이드가 되는 셈이다.
 */

/* ===========================================================================
 * 공통
 * ========================================================================= */

/** 다크모드 토글이 다루는 두 가지 상태 */
export type ThemeMode = 'light' | 'dark'

/** 헤더 내비게이션 항목. id는 각 <section id="..."> 와 1:1로 대응한다. */
export interface NavItem {
  /** 스크롤 대상 섹션의 DOM id (앞에 # 없이) */
  id: string
  label: string
}

/* ===========================================================================
 * 01. Hero / 02. About Me
 * ========================================================================= */

/** 지원되는 외부 링크 종류. 아이콘 매핑의 key로도 쓰인다. */
export type SocialPlatform = 'github' | 'linkedin' | 'blog' | 'email'

export interface SocialLink {
  platform: SocialPlatform
  /** 스크린리더와 title 속성에 쓰이는 사람이 읽을 이름 */
  label: string
  url: string
}

/**
 * About 섹션의 숫자 지표.
 *
 * 여기 들어갈 수 있는 숫자의 기준은 하나다 — **면접에서 출처를 댈 수 있는가.**
 * "경력 3년", "프로젝트 12개" 같은 숫자는 검증도 반박도 안 되므로 신뢰를 못 만든다.
 * 반대로 "2,889 → 2건"은 되묻는 순간 이야기가 시작된다.
 */
export interface Stat {
  label: string
  value: string
  /** '건', '개' 같은 접미사. 숫자와 단위를 분리해 폰트 크기를 다르게 주려고 나눠둠 */
  suffix?: string
}

/**
 * Hero의 핵심 키워드.
 *
 * `label`만 있으면 그건 자기주장이다. "성능 최적화"라고 쓴 이력서는 수백 장이고,
 * 읽는 사람은 그중 무엇이 진짜인지 구분할 방법이 없다.
 * `proof`를 필수로 묶어두면 근거를 댈 수 없는 단어는 애초에 여기 들어올 수 없다.
 */
export interface Keyword {
  label: string
  /** 이 단어를 뒷받침하는 가장 짧은 증거. 예: '2,889 → 2건' */
  proof: string
}

/**
 * Hero의 행동 유도(Call To Action).
 *
 * 버튼은 반드시 주(primary) 1개 + 보조(secondary) 1개다.
 * 같은 무게의 버튼이 셋 이상이면 사용자는 아무것도 누르지 않는다 —
 * 선택지가 늘수록 결정 비용이 커지는 건 UI에서도 똑같다.
 */
export interface HeroCta {
  /** 버튼 위에 붙는 한 문장. "왜 눌러야 하는지"를 말한다. */
  note: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string; download?: boolean }
}

/**
 * 원칙이 쓰인 사례로 가는 링크.
 *
 * 원칙 문단을 근거와 분리해두는 이유: 근거의 전체 서술은 이미 딥다이브나
 * limits 블록에 있다. 여기서 다시 풀어 쓰면 같은 사례를 두 번 설명하는
 * 셈이라, 원칙은 "판단 기준"만 말하고 링크로 원본을 가리킨다.
 */
export interface WorkingPrinciple {
  id: string
  /** 원칙 문장. 명령형 한 줄이 가장 잘 남는다. */
  title: string
  /** 왜 이 원칙을 갖게 됐나 */
  body: string
  evidenceRef: {
    /** 배지에 보이는 짧은 라벨. 예: '2,889 → 2건' */
    label: string
    /** 이동할 앵커. 해당 딥다이브/limits 항목의 id를 가리킨다 */
    href: string
  }
}

export interface Profile {
  name: string
  nameEn: string
  /** 직함. 예: 'Frontend Engineer' */
  role: string

  /**
   * Hero 헤드라인. 배열 요소 하나가 한 줄이다.
   *
   * 왜 문자열 하나에 `\n`을 넣지 않고 배열인가?
   * 헤드라인의 줄바꿈 위치는 디자인이다. 어디서 끊기느냐에 따라 문장의 힘이 달라진다.
   * 브라우저 자동 줄바꿈에 맡기면 화면 폭마다 다른 곳에서 끊기므로,
   * 끊는 지점을 데이터로 명시해 통제한다.
   */
  headline: string[]

  /** 한 줄 자기소개. 헤드라인 바로 아래에서 "그래서 무엇을 하는 사람인지"를 말한다. */
  oneLiner: string

  /**
   * Hero 소개 3줄.
   * 각 줄이 서로 다른 역량 축을 담당한다 — 문제 해결 / 설계 / 유지보수성.
   * 같은 축을 두 번 말하면 한 줄을 낭비하는 것이다.
   */
  heroIntro: string[]

  /** 핵심 키워드 5개. 스캔하는 사람이 3초 안에 읽는 부분. */
  keywords: Keyword[]

  cta: HeroCta

  /** About 본문. 배열 요소 하나가 <p> 하나가 된다. */
  bio: string[]

  /**
   * 작업 원칙 3개.
   * 예전엔 별도 섹션(Engineering Principles)이었던 것을 About 안으로 접었다.
   * 원칙만 따로 늘어놓으면 자기소개서 문장이 되므로, 근거 링크를 필수로 둔다.
   */
  workingStyle: WorkingPrinciple[]

  location: string
  email: string
  /** src/assets 에서 import 한 이미지 URL (문자열) */
  avatar: string
  /** public/ 기준 절대경로. 예: '/resume.pdf' */
  resumeUrl: string
  socials: SocialLink[]
  stats: Stat[]
}

/* ===========================================================================
 * 03. Featured Project — 기술 스택
 * ---------------------------------------------------------------------------
 * 기술 스택을 전역 Skills 섹션이 아니라 프로젝트 안에 둔 이유:
 * "React를 씁니다"는 정보가 아니고 "이 프로젝트에서 React로 무엇을 했나"가 정보다.
 * 스택을 쓴 맥락에서 떼어내면 남는 건 로고 나열뿐이다.
 * ========================================================================= */

/**
 * 숙련도. '몇 %' 같은 막대 그래프는 근거가 없어 오히려 신뢰를 깎는다.
 * 3단계 라벨로만 표현하는 편이 정직하고 방어하기도 쉽다.
 */
export type SkillLevel = 'core' | 'working' | 'learning'

export interface Skill {
  name: string
  level: SkillLevel
  /** 이 프로젝트에서 실제로 무엇에 썼는지. 이 한 줄이 스택 나열과 경험을 가른다. */
  note?: string
}

/** 스킬 카테고리 아이콘 이름. 컴포넌트에서 실제 아이콘으로 매핑한다. */
export type SkillIconName =
  | 'code'
  | 'layers'
  | 'database'
  | 'server'
  | 'map'
  | 'wrench'

export interface SkillCategory {
  id: string
  title: string
  icon: SkillIconName
  skills: Skill[]
}

/* ===========================================================================
 * 03. Featured Project — 아키텍처
 * ========================================================================= */

/**
 * 아키텍처 결정 하나.
 *
 * decision / reason / tradeoff 를 나눠 받는 이유가 이 타입의 전부다.
 * 설계 설명이 약해지는 지점은 늘 똑같다 — "무엇을 했다"만 있고
 * "왜 그것이었나", "대신 무엇을 포기했나"가 없다.
 * 필드를 강제해두면 셋 중 하나를 빠뜨린 채로는 데이터를 채울 수가 없다.
 */
export interface ArchitectureLayer {
  id: string
  /** 예: '상태 관리' */
  title: string
  /** 한 줄 요약. 카드를 접었을 때 보이는 문장. */
  summary: string
  /** 무엇을 선택했나 (사실) */
  decision: string
  /** 왜 그렇게 했나 (핵심 — 가장 길어도 되는 필드) */
  reason: string
  /** 그 선택으로 무엇을 포기했나 / 어떤 조건에서 깨지나 */
  tradeoff: string
  /** 관련 파일·개념 태그 */
  keywords: string[]
}

/** 다이어그램 박스 하나 */
export interface DiagramNode {
  label: string
  /** 박스 아래 작게 붙는 부연 (선택) */
  note?: string
  /** accent = 이 프로젝트에서 내가 설계한 부분, neutral = 기존/외부 */
  tone: 'accent' | 'neutral' | 'external'
}

/** 다이어그램의 가로 한 줄(계층) */
export interface DiagramLayer {
  id: string
  /** 계층 이름. 예: 'State' */
  title: string
  /** 계층의 역할 한 줄 */
  caption: string
  nodes: DiagramNode[]
}

export interface ArchitectureSpec {
  /** 아키텍처 전체를 한 문단으로 */
  summary: string
  layers: ArchitectureLayer[]
  diagram: {
    caption: string
    layers: DiagramLayer[]
    /** 다이어그램 옆/아래에 붙는 읽는 법 안내 */
    legend: string[]
  }
}

/* ===========================================================================
 * 03. Featured Project — 본체
 * ========================================================================= */

export type ProjectLinkType = 'demo' | 'github' | 'article'

export interface ProjectLink {
  type: ProjectLinkType
  url: string
  /** 기본 라벨을 덮어쓸 때만 사용 */
  label?: string
}

/**
 * 프로젝트 목표 하나.
 *
 * 헤더의 "역할 · 목표 요약" 블록에서 제목만 훑을 수 있게 하는 용도라
 * 제목 한 줄만 받는다. 목표의 배경(문제/판정 기준)은 같은 이야기를
 * 더 깊이 다루는 딥다이브·아키텍처가 전담하므로 여기서 다시 풀지 않는다.
 */
export interface ProjectGoal {
  id: string
  title: string
}

/** 결과 지표 하나 */
export interface ProjectOutcome {
  id: string
  /** 예: '렌더링 성능' */
  label: string
  /** 예: '2,889 → 2건'. 변화가 드러나는 형태로 쓴다. */
  value: string
  description: string
}

export interface ProjectResult {
  summary: string
  outcomes: ProjectOutcome[]
  /**
   * 회고는 여기 없다. "무엇을 배웠나"는 About의 workingStyle이 전담한다.
   * 예전엔 이 자리에도 retrospective 배열이 있었는데, workingStyle의 evidenceRef와
   * 문장 단위로 겹쳤다 — 같은 교훈을 "회고"와 "원칙"이라는 두 이름으로
   * 두 번 쓴 것이다. 결과는 숫자(outcomes)까지만 말하고, 그 숫자에서
   * 무엇을 배웠는지는 workingStyle로 넘긴다.
   */
}

/**
 * 담당 역할.
 *
 * 도메인별 세부 업무는 예전엔 별도 배열(RoleDomain[])로 나열했지만,
 * 그 내용은 딥다이브·아키텍처·경력(Experience)에 이미 더 깊이 서술돼 있어
 * 여기서 다시 나열하면 같은 사실을 세 번째로 말하는 셈이었다.
 * 지금은 담당 범위를 한 문장으로만 요약한다.
 */
export interface ProjectRole {
  /** 담당 범위 요약 */
  scope: string
}

/**
 * 하지 못한 것 · 담당하지 않은 것 하나.
 * ---------------------------------------------------------------------------
 * 예전엔 role.boundaries(담당 밖 범위)와 performance.notYet(적용 못한 개선)
 * 두 곳에 나뉘어 있었다. 읽는 사람 입장에서는 "이 사람이 어디까지 했나"라는
 * 하나의 질문이므로 한 블록으로 합친다. `kind`로 종류만 구분한다.
 *   scope      담당 범위 밖 (다른 사람의 몫)
 *   unfinished 만들다 만 것 (내 몫이었지만 못 끝낸 것)
 *   learning   아직 경험·측정이 없는 것
 */
export interface ProjectLimit {
  kind: 'scope' | 'unfinished' | 'learning'
  title: string
  note: string
}

/** 딥다이브 태그. 사건의 종류를 드러내는 한 단어. */
export type DeepDiveTag = '성능' | '데이터' | '구조'

/**
 * 딥다이브 하나 = 면접 질문 하나.
 * ---------------------------------------------------------------------------
 * 예전엔 Technical Challenges(problem/approach/result)와 Performance
 * (situation/causes/solutions/metric)가 형식만 다른 별개 섹션이었는데,
 * 실제로는 같은 종류의 사건 — "무엇이 문제였고 어떻게 판단해서 풀었나" —
 * 을 다른 틀로 두 번 설명하고 있었다. 하나로 합치고, 수치가 있는 사건만
 * `metric`을 채운다(선택 필드).
 */
export interface DeepDive {
  id: string
  title: string
  tag: DeepDiveTag
  /** 무엇이 문제였나 (상황과 제약) */
  problem: string
  /** 어떻게 접근했나 (판단과 근거) */
  approach: string
  /** 무엇이 달라졌나 */
  result: string
  /** 수치로 검증되는 사건에만 채운다 */
  metric?: PerfMetric
  /** 이 사건에서 무엇을 배웠나 */
  learned: string
  keywords: string[]
}

export interface FeaturedProject {
  id: string
  title: string
  subtitle: string
  /** 헤더 카드에 넣는 2줄 이내 요약. overview 전체를 대신해 카드에서 보여준다. */
  summary: string
  period: string
  /** 예: '재난안전 · 급경사지 관제' */
  domain: string
  /** 팀 구성. 인원이 적히면 "혼자 다 했다"는 오해도 과장도 생기지 않는다. */
  team: string
  /** 발주/사용 주체. 예: '인제군 (행정기관)' */
  client: string
  /**
   * 서술 순서 = 읽는 사람이 납득해 가는 순서.
   *   summary   이게 뭔가 (헤더 카드 2줄 요약)
   *   goals     왜 필요했나 (제목만 — 배경은 딥다이브가 전담)
   *   role      그중 내가 한 건 뭔가 (한 줄 요약)
   *   techStack 무엇으로 했나
   *   result    그래서 뭐가 달라졌나
   */
  goals: ProjectGoal[]
  role: ProjectRole
  techStack: SkillCategory[]
  result: ProjectResult
  /**
   * 심화 — 위를 다 읽은 사람에게만 필요한 설계 상세.
   * deepDives: 무엇에 막혔고 어떻게 판단해서 풀었나 (구 Challenges + Performance)
   * turningPoints: 시간 순으로 판단이 바뀐 지점만 압축한 진행 타임라인 (구 별도 Timeline 섹션)
   * limits: 어디까지가 내 몫이고, 무엇을 아직 못 했나 (구 role.boundaries + performance.notYet)
   */
  deepDives: DeepDive[]
  turningPoints: TurningPoint[]
  limits: ProjectLimit[]
  architecture: ArchitectureSpec
  links: ProjectLink[]
}

/* ===========================================================================
 * Featured Project — 진행 타임라인 (구 TimelineWeek)
 * ---------------------------------------------------------------------------
 * 예전엔 독립 섹션이었고 각 주차마다 work[]/learned 전체를 서술했는데,
 * 같은 사건(특히 렌더링 성능 문제)이 대표 프로젝트 헤더·딥다이브·타임라인
 * 세 곳에서 반복 서술되는 문제가 있었다. 지금은 "그 시점에 무엇이
 * 바뀌었는가"를 한 줄로만 남기고, 전체 서사는 딥다이브가 전담한다.
 * 여기는 딥다이브로 가는 신호등 역할만 한다.
 * ========================================================================= */

export interface TurningPoint {
  id: string
  /** '7월 초' 같은 짧은 시점 라벨 */
  month: string
  /** 그 시점을 한 구절로 */
  title: string
  /** 무엇이 어떻게 바뀌었는지 한 줄 */
  description: string
  /** 관련 딥다이브 카드로 가는 앵커. 없으면 링크 없이 텍스트만 노출 */
  link?: { label: string; href: string }
}

/* ===========================================================================
 * Featured Project — 딥다이브 수치
 * ---------------------------------------------------------------------------
 * 예전엔 04 Technical Challenges(Challenge)와 05 Performance(PerfCase)로
 * 나뉘어 있었다. DeepDive로 합치면서 수치 부분만 이 타입으로 남는다.
 * ========================================================================= */

/** 개선 전/후 수치. 셋 다 필수 — 하나라도 비면 그건 측정이 아니다. */
export interface PerfMetric {
  label: string
  before: string
  after: string
  /** 예: '−99.9%', '−54KB' */
  delta: string
}

/* ===========================================================================
 * 07. Other Projects
 * ========================================================================= */

/** 스크린샷 하나. device가 곧 프레임·라벨을 결정한다. */
export interface ProjectShot {
  src: string
  device: 'web' | 'tablet' | 'mobile'
}

export interface Project {
  id: string
  title: string
  /** 카드 제목 아래 한 줄 요약 */
  subtitle: string
  period: string
  /** 카드 본문 설명 (2~3줄) */
  description: string
  /** 본인이 맡은 역할 */
  role: string
  /**
   * 성과. 가능하면 숫자를 넣는다.
   * "성능 개선" ❌  →  "초기 로딩 3.2s → 1.1s (66% 단축)" ✅
   */
  highlights: string[]
  tech: string[]
  links: ProjectLink[]
  /**
   * 반응형 스크린샷. 프로젝트마다 촬영된 디바이스 조합이 달라
   * (웹만 있는 것도, 웹·태블릿·모바일 세 장 다 있는 것도 있다) 개수를
   * 고정하지 않는다. 없으면(경력 초기 프로젝트 등) 갤러리 자체를 렌더링하지 않는다.
   */
  images?: ProjectShot[]
}

/* ===========================================================================
 * 08. Experience (경력 / 학력 / 자격 / 수상)
 * ========================================================================= */

export type ExperienceKind = 'work' | 'education' | 'certificate' | 'award' | 'training'

export interface Experience {
  id: string
  kind: ExperienceKind
  /** 회사 / 학교 / 발급기관 이름 */
  organization: string
  /** 직무 / 전공 / 자격증 이름 */
  title: string
  /** 'YYYY.MM' 형식 문자열. Date 객체를 쓰지 않는 이유는 아래 주석 참고. */
  start: string
  /**
   * 종료 시점. `undefined`면 "현재 재직/재학 중"으로 렌더된다.
   *
   * 왜 Date가 아니라 string인가?
   *  - 화면에 필요한 정밀도가 '월' 단위뿐이고,
   *  - Date는 타임존 때문에 '2024-01-01'이 2023-12-31로 보이는 사고가 잦다.
   *  - 정렬/기간 계산이 필요해지면 그때 파서를 도입하면 된다.
   */
  end?: string
  location?: string
  description?: string
  /** 주요 업무·성과 목록 */
  achievements: string[]
  tech?: string[]
}

/* ===========================================================================
 * 09. Contact
 * ========================================================================= */

export interface ContactConfig {
  /** 섹션 상단 안내 문구 */
  heading: string
  message: string
  email: string
  /**
   * Formspree 엔드포인트 URL. 비어 있으면 폼 대신 "이메일 복사" UI만 보여준다.
   */
  formspreeEndpoint?: string
}

/* ===========================================================================
 * 전체 묶음
 * ========================================================================= */

/** portfolioData.ts 가 만족해야 하는 최상위 형태 */
export interface PortfolioData {
  profile: Profile
  nav: NavItem[]
  featuredProject: FeaturedProject
  projects: Project[]
  experiences: Experience[]
  contact: ContactConfig
}
