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

/**
 * Project 클러스터 전용 서브 내비게이션 항목.
 * ---------------------------------------------------------------------------
 * Timeline·Challenges·Performance·Principles는 전부 "Project 하나를 깊게
 * 파고드는 딥다이브"이지 최상위 메뉴와 동급인 별개 주제가 아니다.
 * 헤더의 `nav`(최상위 5개)와 분리해 여기서만 노출되는 서브 탭으로 둔다.
 *
 * `NavItem`을 그대로 쓰지 않고 별도 이름을 준 이유:
 * 타입 이름이 "이 배열은 Project 안에서만 쓰인다"는 의도를 드러낸다.
 * 나중에 서브 내비 전용 필드가 필요해져도 NavItem 쪽은 건드리지 않아도 된다.
 */
export type ProjectNavItem = NavItem

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
 * `goal` 만 받지 않고 `problem` 을 먼저 요구하는 이유가 이 타입의 전부다.
 * "지도 기반 관제 화면 구축"은 목표가 아니라 할 일 목록이다.
 * 목표는 언제나 "지금 무엇이 불편한가"에서 나오고, 그 출처를 적지 않으면
 * 읽는 사람은 이 프로젝트가 왜 존재하는지 알 수 없다.
 *
 * `measure` 는 목표와 결과 섹션을 잇는 다리다.
 * 달성 여부를 판정할 방법이 없는 목표는 목표가 아니라 소망이다.
 */
export interface ProjectGoal {
  id: string
  title: string
  /** 무엇이 불편했나 (목표의 출처) */
  problem: string
  /** 그래서 무엇을 목표로 삼았나 */
  goal: string
  /** 달성 여부를 무엇으로 판정하나 */
  measure: string
}

/**
 * 핵심 기능 하나.
 *
 * `description`(무엇을 하는 기능인가) 대신 problem/solution 을 받는다.
 * 기능 설명이 지루해지는 이유는 길어서가 아니라, 읽는 사람이
 * "그래서 그게 왜 필요한데?"를 스스로 채워 넣어야 하기 때문이다.
 * 없을 때의 불편을 먼저 말하면 기능은 저절로 설명된다.
 */
export interface FeatureItem {
  id: string
  title: string
  /** 이 기능이 없을 때 무엇이 문제였나 */
  problem: string
  /** 그래서 어떻게 만들었나 */
  solution: string
  /** 구현상 특기할 점 (선택) */
  detail?: string
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
   * 회고 — 무엇을 배웠고 무엇이 남았나.
   * 성과만 있고 회고가 없으면 "운이 좋았던 프로젝트"와 구분되지 않는다.
   */
  retrospective: string[]
}

/**
 * 담당 역할을 도메인 단위로 묶는다.
 *
 * 기능 단위로 나열하면("마커 클러스터링 구현, 탭 구현, 필터 구현…")
 * 읽는 사람은 이 사람이 **무엇을 책임졌는지**가 아니라
 * **무엇을 타이핑했는지**만 알게 된다.
 * 도메인으로 묶으면 "이 영역은 이 사람 것"이라는 소유 범위가 보인다.
 */
export interface RoleDomain {
  id: string
  /** 예: '신규 등록' */
  title: string
  items: string[]
}

export interface ProjectRole {
  /** 담당 범위 한 줄 요약 */
  scope: string
  /** 도메인별로 묶은 담당 업무 */
  domains: RoleDomain[]
  /**
   * 솔직한 경계선.
   * 어디까지가 내가 한 일이고 어디부터가 아닌지를 먼저 밝히면
   * 나머지 주장 전체의 신뢰도가 올라간다. 감추면 하나 들킬 때 전부 의심받는다.
   */
  boundaries: string[]
}

export interface FeaturedProject {
  id: string
  title: string
  subtitle: string
  period: string
  /** 예: '재난안전 · 급경사지 관제' */
  domain: string
  /** 팀 구성. 인원이 적히면 "혼자 다 했다"는 오해도 과장도 생기지 않는다. */
  team: string
  /** 발주/사용 주체. 예: '인제군 (행정기관)' */
  client: string
  /**
   * 서술 순서 = 읽는 사람이 납득해 가는 순서.
   *   overview  이게 뭔가
   *   goals     왜 필요했나        ← 여기가 없으면 아래 전부가 "할 일 목록"이 된다
   *   role      그중 내가 한 건 뭔가
   *   techStack 무엇으로 했나
   *   features  어떤 문제를 어떻게 풀었나
   *   result    그래서 뭐가 달라졌나
   */
  overview: string[]
  goals: ProjectGoal[]
  role: ProjectRole
  techStack: SkillCategory[]
  features: FeatureItem[]
  result: ProjectResult
  /** 심화 — 위 6단계를 다 읽은 사람에게만 필요한 설계 상세 */
  architecture: ArchitectureSpec
  links: ProjectLink[]
}

/* ===========================================================================
 * Development Timeline
 * ---------------------------------------------------------------------------
 * 타임라인이 실패하는 방식은 하나다 — 작업 로그가 되는 것.
 * "1주차: A 구현, 2주차: B 구현"은 읽는 사람에게 아무 정보도 주지 않는다.
 * 이력서에서 타임라인이 가치를 갖는 건 **판단이 바뀐 지점**이 보일 때뿐이다.
 *
 * 그래서 `learned` 를 필수로 뒀다. 그 주에 무엇을 했는지(work)와
 * 그 일을 하며 생각이 어떻게 바뀌었는지(learned)는 다른 정보다.
 * 후자를 못 쓰겠는 주차는 그냥 시간이 흘렀을 뿐 성장한 주가 아니다.
 * ========================================================================= */

export interface TimelineWeek {
  id: string
  /** 'Week 1' */
  label: string
  /** 그 주를 한 단어로. 예: '만들기', '부딪히기' */
  phase: string
  title: string
  /** 그 주에 실제로 한 일 */
  work: string[]
  /** 그 주에 배운 것 · 판단이 바뀐 지점 */
  learned: string
  /** 근거가 확인되지 않은 부분에 대한 솔직한 표기 (선택) */
  note?: string
}

/* ===========================================================================
 * 04. Technical Challenges
 * ========================================================================= */

export type ChallengeTag =
  | 'architecture'
  | 'map'
  | 'state'
  | 'form'
  | 'data'
  | 'component'
  | 'parsing'
  | 'infra'

/**
 * 기술적 도전 하나 = 면접 질문 하나.
 * problem → approach → result 순서를 타입으로 고정해
 * "이런 걸 만들었습니다" 같은 밋밋한 서술이 끼어들 자리를 없앤다.
 */
export interface Challenge {
  id: string
  title: string
  tag: ChallengeTag
  /** 무엇이 문제였나 (상황과 제약) */
  problem: string
  /** 어떻게 접근했나 (판단과 근거) */
  approach: string
  /** 무엇이 달라졌나 (가능하면 숫자) */
  result: string
  keywords: string[]
}

/* ===========================================================================
 * 05. Performance Optimization
 * ========================================================================= */

/** 개선 전/후 수치. 셋 다 필수 — 하나라도 비면 그건 측정이 아니다. */
export interface PerfMetric {
  label: string
  before: string
  after: string
  /** 예: '−99.9%', '−54KB' */
  delta: string
}

export interface PerfCase {
  id: string
  title: string
  /** 어떤 증상이 있었나 */
  situation: string
  /** 원인 분석 결과 (복수일 수 있다) */
  causes: string[]
  /** 어떻게 고쳤나 */
  solutions: string[]
  metric: PerfMetric
  /** 무엇으로 검증했나. 이 필드가 없으면 위 숫자는 주장일 뿐이다. */
  verification: string
}

export interface PerformanceSpec {
  cases: PerfCase[]
  /** 아직 적용하지 못한 것들. 숨기지 않고 '다음 과제'로 적는다. */
  notYet: { title: string; reason: string }[]
}

/* ===========================================================================
 * 06. Engineering Principles
 * ========================================================================= */

export type PrincipleIconName =
  | 'ruler'
  | 'shield'
  | 'puzzle'
  | 'merge'
  | 'book'
  | 'flag'

export interface Principle {
  id: string
  icon: PrincipleIconName
  /** 원칙 문장. 명령형 한 줄이 가장 잘 남는다. */
  title: string
  /** 왜 이 원칙을 갖게 됐나 */
  body: string
  /** 이 프로젝트에서 실제로 어떻게 지켰나 — 없으면 그냥 좋은 말일 뿐이다. */
  evidence: string
}

/* ===========================================================================
 * 07. Other Projects
 * ========================================================================= */

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
  /** Project 클러스터(Project·Timeline·Challenges·Performance·Principles) 서브 내비게이션 */
  projectNav: ProjectNavItem[]
  featuredProject: FeaturedProject
  timeline: TimelineWeek[]
  challenges: Challenge[]
  performance: PerformanceSpec
  principles: Principle[]
  projects: Project[]
  experiences: Experience[]
  contact: ContactConfig
}
