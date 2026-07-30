/**
 * 포트폴리오 전역 타입 정의
 * ---------------------------------------------------------------------------
 * 여기가 데이터(data/portfolioData.ts)와 화면(components/*) 사이의 "계약서"다.
 * 이 파일만 보면 어떤 정보가 필요한지 알 수 있어야 한다.
 *
 * 설계 원칙
 *  1. 화면에 없는 필드는 만들지 않는다 (YAGNI).
 *  2. 값이 정해진 것은 string 대신 유니온 타입으로 좁힌다.
 *     예) type: string  →  type: 'demo' | 'github'
 *     이러면 오타(`githbu`)를 런타임이 아니라 편집 중에 잡는다.
 *  3. 없어도 되는 값에만 `?`를 붙인다. 남발하면 컴포넌트마다 방어 코드가 늘어난다.
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
 * Hero / About
 * ========================================================================= */

/** 지원되는 외부 링크 종류. 아이콘 매핑의 key로도 쓰인다. */
export type SocialPlatform = 'github' | 'linkedin' | 'blog' | 'email'

export interface SocialLink {
  platform: SocialPlatform
  /** 스크린리더와 title 속성에 쓰이는 사람이 읽을 이름 */
  label: string
  url: string
}

/** About 섹션의 숫자 지표 (예: 경력 3년, 프로젝트 12개) */
export interface Stat {
  label: string
  value: string
  /** '년', '+', '개' 같은 접미사. 숫자와 단위를 분리해 폰트 크기를 다르게 주려고 나눠둠 */
  suffix?: string
}

export interface Profile {
  name: string
  nameEn: string
  /** 직함. 예: 'Frontend Engineer' */
  role: string
  /** Hero의 한 줄 소개. 짧고 강하게. */
  tagline: string
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
 * Skills
 * ========================================================================= */

/**
 * 숙련도. '몇 %' 같은 막대 그래프는 근거가 없어 오히려 신뢰를 깎는다.
 * 3단계 라벨로만 표현하는 편이 정직하고 방어하기도 쉽다.
 */
export type SkillLevel = 'core' | 'working' | 'learning'

export interface Skill {
  name: string
  level: SkillLevel
  /** 툴팁/부가 설명 (선택) */
  note?: string
}

/** 스킬 카테고리 아이콘 이름. Skills 컴포넌트에서 실제 아이콘으로 매핑한다. */
export type SkillIconName =
  | 'code'
  | 'layers'
  | 'database'
  | 'server'
  | 'cloud'
  | 'wrench'

export interface SkillCategory {
  id: string
  title: string
  icon: SkillIconName
  skills: Skill[]
}

/* ===========================================================================
 * Projects
 * ========================================================================= */

export type ProjectLinkType = 'demo' | 'github' | 'article'

export interface ProjectLink {
  type: ProjectLinkType
  url: string
  /** 기본 라벨을 덮어쓸 때만 사용 */
  label?: string
}

export interface Project {
  id: string
  title: string
  /** 카드 제목 아래 한 줄 요약 */
  subtitle: string
  period: string
  /** 카드 본문 설명 (2~3줄) */
  description: string
  /** 본인이 맡은 역할. 팀 프로젝트에서 특히 중요하다. */
  role: string
  /**
   * 성과. 가능하면 숫자를 넣는다.
   * "성능 개선" ❌  →  "초기 로딩 3.2s → 1.1s (66% 단축)" ✅
   */
  highlights: string[]
  /** 사용 기술 태그 */
  tech: string[]
  /** src/assets 에서 import 한 캡처 이미지. 없으면 자리표시자가 렌더된다. */
  thumbnail?: string
  links: ProjectLink[]
  /** true면 목록 상단에 크게 노출 */
  featured: boolean
}

/* ===========================================================================
 * Experience (경력 / 학력 / 자격 / 수상)
 * ========================================================================= */

export type ExperienceKind = 'work' | 'education' | 'certificate' | 'award'

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
 * Contact
 * ========================================================================= */

export interface ContactConfig {
  /** 섹션 상단 안내 문구 */
  heading: string
  message: string
  email: string
  /**
   * Formspree 엔드포인트 URL. 비어 있으면 폼 대신 "이메일 복사" UI만 보여준다.
   * 4단계에서 실제 전송 로직을 붙인다.
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
  skillCategories: SkillCategory[]
  projects: Project[]
  experiences: Experience[]
  contact: ContactConfig
}
