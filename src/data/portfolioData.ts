/**
 * ⭐️ 포트폴리오의 유일한 콘텐츠 소스 (Single Source of Truth)
 * ---------------------------------------------------------------------------
 * ⚠️  아래 값들은 전부 **자리표시자(placeholder)** 입니다.
 *     준비해둔 실제 내용으로 교체하세요. TODO 주석을 따라가면 됩니다.
 *
 * 이렇게 데이터를 화면에서 분리해두는 이유:
 *  - 내용을 고칠 때 JSX를 건드리지 않으므로 레이아웃이 깨질 위험이 없다.
 *  - 나중에 CMS나 API로 옮기고 싶으면 이 파일의 export만 교체하면 된다.
 *  - `satisfies` 로 타입을 검증하므로 필드 누락/오타를 편집 중에 잡는다.
 */

import type { PortfolioData } from '@/types'
import profilePlaceholder from '@/assets/profile-placeholder.svg'

/* ---------------------------------------------------------------------------
 * 프로필 / Hero / About
 * ------------------------------------------------------------------------- */
const profile: PortfolioData['profile'] = {
  // TODO: 실명으로 교체
  name: '방은경',
  nameEn: 'Eunkyung Bang',
  role: 'Frontend Engineer',

  // TODO: 나를 한 문장으로. "무엇을 잘하는 사람인지"가 드러나야 한다.
  tagline: '복잡한 데이터를 읽기 쉬운 화면으로 바꿉니다.',

  // TODO: 3~4문장. 배열 요소 하나가 <p> 하나.
  bio: [
    '센서·계측 데이터를 다루는 웹 대시보드를 주로 만들어 왔습니다. 숫자가 많은 화면일수록 "무엇을 먼저 보여줄지" 정하는 일이 곧 UI 설계라고 생각합니다.',
    'React와 TypeScript로 화면을 만들고, 데이터 모델을 먼저 정의한 뒤 컴포넌트를 쌓아 올리는 방식을 선호합니다. 타입이 문서 역할을 하면 인수인계 비용이 크게 줄어듭니다.',
    '측정 없는 최적화를 경계합니다. 성능 개선은 항상 프로파일링 결과와 함께 이야기합니다.',
  ],

  location: 'Seoul, Korea',
  email: 'wjdtjr92@naver.com', // TODO: 공개용 이메일로 교체할지 확인

  // TODO: src/assets/profile.jpg 를 추가하고 아래를 교체
  //   import profileImage from '@/assets/profile.jpg'
  avatar: profilePlaceholder,

  // 이력서는 public/ 에 둔다 (이유는 src/assets/README.md 참고)
  resumeUrl: '/resume.pdf',

  socials: [
    // TODO: 실제 주소로 교체. 없는 항목은 배열에서 지우면 화면에서도 사라진다.
    { platform: 'github', label: 'GitHub', url: 'https://github.com/Bang04' },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dev-ek',
    },
    { platform: 'blog', label: 'Blog', url: 'https://dev-ek.tistory.com' },
    { platform: 'email', label: 'Email', url: 'wjdtjr92@naver.com' },
  ],

  // TODO: 부풀리지 말 것. 검증 가능한 숫자만.
  stats: [
    { label: '개발 경력', value: '3', suffix: '년' },
    { label: '완료 프로젝트', value: '12', suffix: '개' },
    { label: '주 사용 스택', value: 'React', suffix: '' },
  ],
}

/* ---------------------------------------------------------------------------
 * 내비게이션
 * ---------------------------------------------------------------------------
 * id 는 각 섹션의 <section id="..."> 와 반드시 같아야 한다.
 * 하나라도 틀리면 메뉴 클릭 시 아무 일도 일어나지 않는다(조용한 버그).
 * ------------------------------------------------------------------------- */
const nav: PortfolioData['nav'] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/* ---------------------------------------------------------------------------
 * 기술 스택
 * ---------------------------------------------------------------------------
 * level 기준을 스스로 정해두면 면접에서 흔들리지 않는다.
 *   core     : 실무에서 주도적으로 사용. 트러블슈팅까지 가능.
 *   working  : 실무 경험 있음. 문서 보며 문제없이 작업 가능.
 *   learning : 학습 중 / 토이 프로젝트 수준.
 * ------------------------------------------------------------------------- */
const skillCategories: PortfolioData['skillCategories'] = [
  {
    id: 'language',
    title: 'Languages',
    icon: 'code',
    skills: [
      { name: 'TypeScript', level: 'core' },
      { name: 'JavaScript (ES2023)', level: 'core' },
      { name: 'HTML / CSS', level: 'core' },
      { name: 'Python', level: 'working', note: '데이터 전처리 스크립트' },
      { name: 'SQL', level: 'working' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'layers',
    skills: [
      { name: 'React 19', level: 'core' },
      { name: 'Vite', level: 'core' },
      { name: 'Tailwind CSS', level: 'core' },
      { name: 'TanStack Query', level: 'working' },
      { name: 'Zustand', level: 'working' },
      { name: 'Framer Motion', level: 'working' },
      { name: 'Next.js', level: 'learning' },
    ],
  },
  {
    id: 'dataviz',
    title: 'Data & Visualization',
    icon: 'database',
    skills: [
      { name: 'Recharts', level: 'core' },
      { name: 'D3.js', level: 'working' },
      { name: 'Leaflet / MapLibre', level: 'working' },
      { name: 'PostgreSQL', level: 'working' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Infra',
    icon: 'server',
    skills: [
      { name: 'Node.js / Express', level: 'working' },
      { name: 'FastAPI', level: 'working' },
      { name: 'Docker', level: 'learning' },
      { name: 'Vercel', level: 'working' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    icon: 'wrench',
    skills: [
      { name: 'Git / GitHub', level: 'core' },
      { name: 'VS Code', level: 'core' },
      { name: 'Figma', level: 'working' },
      { name: 'GitHub Actions', level: 'learning' },
    ],
  },
]

/* ---------------------------------------------------------------------------
 * 프로젝트
 * ---------------------------------------------------------------------------
 * 카드 하나가 곧 면접 질문 하나다. highlights 는 "무엇을 했다"가 아니라
 * "무엇이 어떻게 좋아졌다"로 쓴다. 숫자가 있으면 반드시 넣는다.
 *
 * featured: true 인 항목은 상단에 2칸 폭으로 크게 렌더된다.
 * 2~3개만 true 로 두는 게 좋다. 다 강조하면 아무것도 강조되지 않는다.
 * ------------------------------------------------------------------------- */
const projects: PortfolioData['projects'] = [
  {
    id: 'inje-dashboard',
    title: '인제 계측 모니터링 대시보드',
    subtitle: '실시간 센서 데이터 시각화 웹 애플리케이션',
    period: '2026.05 – 2026.07',
    description:
      '현장에 설치된 계측 센서의 데이터를 실시간으로 수집해 지도와 차트로 보여주는 사내 대시보드입니다. 관리자가 이상 징후를 눈으로 즉시 판별할 수 있도록 임계값 초과 구간을 색으로 강조했습니다.',
    role: '프론트엔드 단독 개발 (기획 협의 · UI 설계 · 구현)',
    highlights: [
      '센서 400여 개의 시계열 데이터를 가상 스크롤로 렌더링해 초기 로딩 3.2s → 1.1s (66% 단축)',
      '차트 컴포넌트를 데이터 스키마 기반으로 추상화해 신규 센서 유형 추가 시 코드 수정 없이 대응',
      '임계값 알림 규칙을 데이터로 분리, 비개발자도 설정 파일만 수정해 운영 가능',
    ],
    tech: ['React', 'TypeScript', 'Recharts', 'Leaflet', 'TanStack Query'],
    // TODO: src/assets/projects/inje-dashboard.png 추가 후
    //   import injeThumb from '@/assets/projects/inje-dashboard.png'
    //   thumbnail: injeThumb,
    links: [
      { type: 'demo', url: 'https://example.com/inje-dashboard' },
      { type: 'github', url: 'https://github.com/dev-ek/inje-dashboard' },
    ],
    featured: true,
  },
  {
    id: 'slope-web',
    title: 'Slope Web',
    subtitle: '사면 안정성 분석 결과 리포트 뷰어',
    period: '2026.03 – 2026.05',
    description:
      '엑셀로 주고받던 사면 안정성 분석 결과를 웹에서 바로 열어보고 공유할 수 있게 만든 서비스입니다. 계산 결과를 그래프와 표로 동시에 보여주고, 그대로 PDF로 내려받을 수 있습니다.',
    role: '프론트엔드 개발 · 데이터 모델 설계',
    highlights: [
      '분석 결과 타입을 TypeScript로 먼저 정의해 백엔드와의 필드 불일치 이슈를 배포 전에 전부 차단',
      '표/그래프 공통 데이터 레이어를 도입해 중복 계산 로직 300여 줄 제거',
      '인쇄용 CSS를 분리해 별도 PDF 라이브러리 없이 리포트 출력 구현',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'D3.js', 'Zustand'],
    links: [{ type: 'github', url: 'https://github.com/dev-ek/slope-web' }],
    featured: true,
  },
  {
    id: 'agent-studio',
    title: 'Agent Studio',
    subtitle: 'LLM 에이전트 워크플로 시각 편집기',
    period: '2026.06 – 진행 중',
    description:
      '여러 LLM 에이전트의 실행 순서를 노드로 연결해 구성하는 실험용 도구입니다. 각 노드의 입출력을 실시간으로 확인하며 프롬프트를 다듬을 수 있습니다.',
    role: '개인 프로젝트 (전체 설계 및 구현)',
    highlights: [
      '노드 그래프 상태를 불변(immutable) 구조로 관리해 undo/redo를 30줄 이내로 구현',
      '스트리밍 응답을 청크 단위로 렌더링, 첫 토큰 표시까지 200ms 이내 달성',
    ],
    tech: ['React', 'TypeScript', 'Claude API', 'Tailwind CSS'],
    links: [{ type: 'github', url: 'https://github.com/dev-ek/agent-studio' }],
    featured: false,
  },
  {
    id: 'earth-api-sandbox',
    title: 'Earth API Sandbox',
    subtitle: '공공 지리정보 API 실험 저장소',
    period: '2026.06',
    description:
      '국토지리정보원·기상청 등 공공 API의 응답 형식을 비교하고, 좌표계 변환 로직을 검증한 학습용 프로젝트입니다.',
    role: '개인 학습 프로젝트',
    highlights: [
      'EPSG:5186 ↔ WGS84 좌표 변환 유틸을 테스트 코드와 함께 정리',
      'API별 응답 편차를 흡수하는 어댑터 패턴 적용 사례 문서화',
    ],
    tech: ['TypeScript', 'Node.js', 'proj4', 'Vitest'],
    links: [
      { type: 'github', url: 'https://github.com/dev-ek/earth-api-sandbox' },
      {
        type: 'article',
        url: 'https://dev-ek.tistory.com/entry/coordinate-systems',
        label: '정리 글',
      },
    ],
    featured: false,
  },
]

/* ---------------------------------------------------------------------------
 * 경력 · 학력 · 자격 · 수상
 * ---------------------------------------------------------------------------
 * end 를 생략하면 "현재"로 표시된다. 최신 항목이 위로 오도록 직접 정렬해 둔다.
 * (자동 정렬은 4단계 이후 필요해지면 추가)
 * ------------------------------------------------------------------------- */
const experiences: PortfolioData['experiences'] = [
  {
    id: 'exp-ahjoo',
    kind: 'work',
    organization: '아주엔지니어링',
    title: 'ICT팀 / 웹 개발',
    start: '2024.03',
    // end 생략 → "현재"
    location: 'Seoul',
    description:
      '계측·모니터링 사업부의 사내 웹 시스템을 설계·개발하고 운영합니다.',
    achievements: [
      '계측 데이터 대시보드 신규 구축 및 사내 3개 부서 도입',
      '레거시 jQuery 화면 6개를 React로 점진적 마이그레이션 (무중단)',
      '공통 UI 컴포넌트 라이브러리를 만들어 신규 화면 개발 기간 평균 40% 단축',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'exp-prev',
    kind: 'work',
    organization: '(이전 회사명)',
    title: '웹 퍼블리셔 / 프론트엔드',
    start: '2023.01',
    end: '2024.02',
    location: 'Seoul',
    description: 'TODO: 담당 업무를 한 줄로 요약',
    achievements: [
      'TODO: 성과를 숫자와 함께 작성',
      'TODO: 사용한 기술과 맡은 범위를 명확히',
    ],
    tech: ['JavaScript', 'SCSS', 'jQuery'],
  },
  {
    id: 'edu-univ',
    kind: 'education',
    organization: '(대학교명)',
    title: '(전공명) 학사',
    start: '2019.03',
    end: '2023.02',
    achievements: ['TODO: 졸업 프로젝트, 학점, 관련 활동 등 (선택)'],
  },
  {
    id: 'cert-sqld',
    kind: 'certificate',
    organization: '한국데이터산업진흥원',
    title: 'SQLD (SQL 개발자)',
    start: '2024.09',
    achievements: [],
  },
  {
    id: 'award-hack',
    kind: 'award',
    organization: '(주최기관)',
    title: 'TODO: 수상 내역 (없으면 이 항목 삭제)',
    start: '2023.11',
    achievements: ['TODO: 무엇으로 어떤 상을 받았는지'],
  },
]

/* ---------------------------------------------------------------------------
 * 연락처
 * ------------------------------------------------------------------------- */
const contact: PortfolioData['contact'] = {
  heading: '함께 일해요',
  message:
    '새로운 제품을 만드는 팀, 데이터가 많은 화면을 다루는 팀이라면 특히 반갑습니다. 편하게 연락 주세요.',
  email: profile.email,
  // TODO(3단계 이후): https://formspree.io 에서 폼을 만들고 엔드포인트를 넣으면
  // 문의 폼이 활성화된다. 비워두면 "이메일 복사" UI만 표시된다.
  formspreeEndpoint: '',
}

/* ---------------------------------------------------------------------------
 * export
 * ---------------------------------------------------------------------------
 * `satisfies` vs `:` 타입 표기
 *  - `const x: PortfolioData = {...}` → x의 타입이 PortfolioData로 "넓어진다".
 *  - `const x = {...} satisfies PortfolioData` → 검증은 하되 리터럴 타입을 "유지".
 * 후자를 쓰면 예컨대 nav 배열의 실제 길이나 구체적 문자열 값을 그대로 활용할 수 있다.
 * ------------------------------------------------------------------------- */
export const portfolioData = {
  profile,
  nav,
  skillCategories,
  projects,
  experiences,
  contact,
} satisfies PortfolioData

export { profile, nav, skillCategories, projects, experiences, contact }
