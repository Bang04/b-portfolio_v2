/**
 * ⭐️ 포트폴리오의 유일한 콘텐츠 소스 (Single Source of Truth)
 * ---------------------------------------------------------------------------
 * 근거: 레포 커밋 로그 · docs/rules.md · CLAUDE.md · 경력기술서(2026-08)
 *   ⚠️ 이 파일은 `public/` 밖에 둔다. `public/` 안의 파일은 빌드 산출물로
 *      그대로 복사되어 배포 사이트에서 URL로 열린다 — 내부 메모가 공개된다.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * 2026-08-29 팩트체크 후 전면 개정. 무엇을 왜 지웠는지 남겨둔다.
 *
 *  [삭제] HWP cfb+zlib 배점표 파싱 — 레포에 파서가 없음. 실제로 있는 건
 *         백엔드가 만든 HWP를 blob으로 내려받는 코드뿐.
 *  [삭제] 위저드 Zustand 스토어 — stores/에는 전역 UI 싱글톤 5개뿐이고
 *         위저드 상태는 SlopeWizard.tsx의 지역 useState. 오히려 "전역으로
 *         올리지 않은 판단"으로 다시 씀.
 *  [삭제] 번들 3,479.82→3,425.63KB / 21청크 — 본인 커밋에 수치가 없고,
 *         수치가 있는 커밋은 다른 개발자의 다른 플랫폼 작업. 재측정 전까지
 *         정성 서술만 남긴다.
 *  [삭제] pre-push hook — .husky 없음, package.json에 훅 도구 없음.
 *  [삭제] "54필드 중 절반 누락 → 0건" — 54의 출처 불명. 대신 문서로 확인되는
 *         110필드 blind-overwrite 사례로 교체(더 강한 소재).
 *  [삭제] stats "지도 관제 대상 160건" — 근거 없음. 2,889만 남긴다.
 *  [정정] styled-components → Tailwind + tailwind-styled-components($props)
 *  [정정] Page/Container/Presentational → 실제 컨벤션인
 *         PageContainer → ComponentContainer → ComponentHeader/Body/Box
 *  [익명화] SYS_FEAT · 플랫폼 코드명 · 발주처 · 실제 폴더 경로
 *
 * 지켜야 할 규칙: 되물었을 때 근거를 댈 수 있는 문장만 쓴다.
 *  - 숫자는 커밋/문서로 확인된 것만 (2,889→2건 / 110필드)
 *  - 확인되지 않으면 지어내지 않고 `TODO(확인 필요)` 로 남긴다
 *  - 골격까지만 만든 기능은 "골격"이라고 그대로 쓴다
 *
 * ───────────────────────────────────────────────────────────────────────────
 * 2026-08-29 섹션을 10개 → 7개로 정리 완료.
 *  - App.tsx에서 <TechnicalChallenges/> <PerformanceOptimization/>
 *    <EngineeringPrinciples/> 제거, 컴포넌트 파일 3개 + ProjectSubNav 삭제
 *  - src/types: `challenges` `performance` `principles` `projectNav` 제거,
 *    featuredProject에 `deepDives` `limits`, profile에 `workingStyle` 추가
 *  - FeaturedProject.tsx에 deepDives·limits 렌더 블록 추가,
 *    About.tsx에 workingStyle(구 Engineering Principles) 렌더 블록 추가
 * ------------------------------------------------------------------------- */

import type { PortfolioData } from '@/types'
import profileImage from '@/assets/images/sticker.png'

/* ---------------------------------------------------------------------------
 * 05. Other Projects — 스크린샷
 * ------------------------------------------------------------------------- */
import solariverWMain from '@/assets/images/solariver/w_main.png'
import solariverWPwDayD from '@/assets/images/solariver/w_pw_day_d.png'
import solariverWPwDayG from '@/assets/images/solariver/w_pw_day_g.png'
import solariverWReInv from '@/assets/images/solariver/w_re_inv.png'
import solariverMLogin from '@/assets/images/solariver/m_login.png'
import solariverMCreate from '@/assets/images/solariver/m_create.png'
import solariverMModule from '@/assets/images/solariver/m_module.png'

import nremsMain from '@/assets/images/nrems/nrems_main.png'
import nremsLogin from '@/assets/images/nrems/nrems_login.png'
import nremsG1 from '@/assets/images/nrems/nrems_g1.png'
import nremsG2 from '@/assets/images/nrems/nrems_g2.png'

import media153Palgongsan from '@/assets/images/project/153/palgongsan.jpeg'
import media153Donga from '@/assets/images/project/153/donga.jpeg'
import media153Apartment1 from '@/assets/images/project/153/apartment1.jpeg'
import media153Apartment2 from '@/assets/images/project/153/apartment2.jpeg'

import potWeb from '@/assets/images/project/personal/pot-web.png'
import recurringTablet from '@/assets/images/project/personal/recurring-tablet.png'
import recurringApp from '@/assets/images/project/personal/recurring-app.png'

import cartWeb from '@/assets/images/project/LlistWithCart-web.png'
import cartTablet from '@/assets/images/project/LlistWithCart-tablet.png'
import cartApp from '@/assets/images/project/LlistWithCart-app.png'

import enterWeb from '@/assets/images/project/Enterainment-web.png'
import enterApp from '@/assets/images/project/Enterainment-app.png'

import crowdWeb from '@/assets/images/project/Crowdfunding-web.png'
import crowdApp from '@/assets/images/project/Crowdfunding-app.png'

import sunnysideWeb from '@/assets/images/project/Sunnyside-web.png'

/* ---------------------------------------------------------------------------
 * 01 / 02. 프로필 · Hero · About Me
 * ------------------------------------------------------------------------- */
const profile: PortfolioData['profile'] = {
  name: '방은경',
  nameEn: 'Eunkyung Bang',
  role: 'Frontend Engineer',

  /* --- Hero -------------------------------------------------------------
   * 채용 담당자가 이 화면에 머무는 시간은 길게 잡아도 10초다.
   * 그 안에 "무엇을 만들었나"가 아니라 "어떻게 판단하는 사람인가"가 남아야 한다.
   * 기능 목록은 아래 섹션에 얼마든지 있으니, 여기서는 반복하지 않는다.
   * --------------------------------------------------------------------- */

  // 줄바꿈 지점이 곧 강세다. "구조를 먼저" 앞에서 끊어 뒷줄에 무게를 싣는다.
  headline: ['기능을 더하기 전에,', '구조를 먼저 봅니다.'],

  oneLiner:
    '문제의 원인을 구조에서 찾고, 고친 결과를 숫자로 증명하는 프론트엔드 개발자입니다.',

  /**
   * 3줄 = 3개의 축. 순서에도 의도가 있다.
   *  1줄 문제 해결   — 원인을 어떻게 찾는가 (가장 큰 숫자를 먼저)
   *  2줄 설계        — 제약 안에서 어떻게 나누는가
   *  3줄 판단        — 만드는 것만큼 걷어내는 것도 결정이다
   * 세 줄 모두 근거가 붙어 있다. 형용사로 끝나는 줄은 한 줄도 두지 않았다.
   */
  heroIntro: [
    '마커 하나를 선택할 때마다 2,889건이 지도에 다시 붙던 화면을, "실제로 달라지는 건 2개뿐"이라는 관찰에서 출발해 2건으로 줄였습니다.',
    '다섯 플랫폼이 공유하는 셸 위에 신규 도메인을 올리면서, 공통 코드를 한 줄도 건드리지 않고 변경 범위를 폴더 하나 안에 가뒀습니다.',
    '직접 만든 임시저장 기능을 두 달 뒤 스스로 걷어냈습니다. 기능을 늘리는 것보다 저장 경로를 하나로 줄이는 쪽이 옳다고 판단했기 때문입니다.',
  ],

  /**
   * 키워드 5개. 각각에 proof를 붙이는 것이 이 블록의 전부다.
   * "성능 최적화"라고 쓴 이력서는 수백 장이고, 읽는 사람은 그중 무엇이 진짜인지
   * 구분할 방법이 없다. 근거 하나가 붙는 순간 그 단어는 검증 가능한 주장이 된다.
   */
  keywords: [
    { label: '렌더링 최적화', proof: '2,889 → 2건' },
    { label: '도메인 격리 설계', proof: '공통 코드 무수정' },
    { label: '파괴적 API 방어', proof: '110필드 동시 전송' },
    { label: '컴포넌트 단일 소스화', proof: '등록·수정·검토 폼 통합' },
    { label: '기능 폐지 판단', proof: '임시저장 도입 후 폐지' },
  ],

  cta: {
    note: '가장 오래 붙들었던 프로젝트 하나를, 결과가 아니라 판단의 근거까지 정리해 두었습니다.',
    primary: { label: '설계 판단 과정 보기', href: '#project' },
    secondary: { label: '이력서 (PDF)', href: '/resume.pdf', download: true },
  },

  bio: [
    '재난안전 분야의 관제 웹을 만듭니다. 지자체 급경사지 안전관리 시스템에서 지도 관제 대시보드와 5단계 실태조사 위저드, 재해위험도 평가 화면을 초기 기획 단계부터 설계·구현했습니다. 그 전 6년은 PHP·MySQL로 서비스를 만들었기에 화면을 그릴 때 데이터 흐름을 함께 놓고 봅니다. 데이터가 많은 화면일수록 "무엇을 먼저 보여줄지" 정하는 일이 곧 UI 설계라고 생각합니다.',

    // 구체적인 수치와 원인·해결 과정은 딥다이브에서 다룬다.
    // 여기서는 그 사례가 남긴 태도만 남긴다 — 같은 문장을 두 번 쓰지 않는다.
    '측정 없는 최적화를 경계합니다. 감이 아니라 관찰에서 출발해 원인을 좁히고, 개선은 적용 전/후를 확인한 뒤에야 성과라고 부릅니다. 같은 이유로 아직 못 한 것도 기록해 둡니다. 번들 크기 실측, 리스트 가상화, Web Vitals 기반 프로파일링은 이 프로젝트에 적용하지 못했고, 지금 우선순위에 두고 학습 중입니다.',
  ],

  /**
   * 작업 원칙 — 별도 섹션(Engineering Principles)이었던 것을 About 안으로 접었다.
   * 원칙만 따로 늘어놓으면 자기소개서 문장이 되고, 근거는 딥다이브에 있는데
   * 원칙은 다른 섹션에 있으면 읽는 사람이 둘을 이어 붙여야 한다.
   * 네 줄로 줄이고 각 줄이 딥다이브 하나를 가리키게 했다.
   */
  workingStyle: [
    {
      id: 'ws-measure',
      title: '측정하지 않은 개선은 개선이 아니다',
      body: '"빨라진 것 같다"는 보고할 수 없는 정보입니다. 숫자가 없으면 개선인지 착각인지 구분할 수 없고, 나중에 되돌릴 근거도 남지 않습니다.',
      evidenceRef: { label: '2,889 → 2건', href: '#dd-render' },
    },
    {
      id: 'ws-blast-radius',
      title: '내 문제를 남의 코드에서 해결하지 않는다',
      body: '공유 코드를 고치면 지금 내 화면은 편해지지만, 비용은 다른 팀의 배포 시점에 나타납니다. 그 시점에는 원인 추적이 몇 배로 비싸집니다.',
      evidenceRef: { label: '공통 코드 무수정', href: '#dd-isolation' },
    },
    {
      id: 'ws-subtract',
      title: '기능을 걷어내는 것도 결정이다',
      body: '만든 기능을 지우는 일에는 만들 때보다 큰 확신이 필요합니다. 남겨두면 아무도 뭐라 하지 않지만, 쓰이지 않는 저장 경로 하나가 다음 사람에게는 "왜 두 개지?"라는 질문이 됩니다.',
      evidenceRef: { label: '임시저장 폐지', href: '#dd-draft' },
    },
    {
      id: 'ws-honesty',
      title: '완성되지 않은 것은 완성되지 않았다고 쓴다',
      body: '한 문장을 부풀리면 나머지 아홉 문장까지 검증 대상이 됩니다. 경계선을 먼저 밝히는 쪽이 결국 신뢰를 더 많이 얻습니다.',
      evidenceRef: { label: '하지 못한 것들', href: '#project-limits' },
    },
  ],

  location: 'Seoul, Korea',
  email: 'wjdtjr92@naver.com', // TODO(확인 필요): 공개용 이메일로 교체할지 결정

  avatar: profileImage,

  // 이력서는 public/ 에 둔다 (이유는 src/assets/README.md 참고)
  resumeUrl: '/resume.pdf',

  socials: [
    { platform: 'github', label: 'GitHub', url: 'https://github.com/Bang04' },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dev-ek',
    },
    { platform: 'blog', label: 'Blog', url: 'https://dev-ek.tistory.com' },
    { platform: 'email', label: 'Email', url: 'mailto:wjdtjr92@naver.com' },
  ],

  /**
   * 부풀리지 않는다. 세 숫자 전부 커밋/문서로 근거를 댈 수 있고,
   * 되물으면 곧바로 이야기가 시작되는 숫자다.
   * ("경력 N년"처럼 검증도 반박도 안 되는 숫자는 신뢰를 만들지 못한다)
   */
  stats: [
    { label: '선택당 마커 재부착', value: '2,889 → 2', suffix: '건' },
    { label: '저장 1회당 전송 필드', value: '110', suffix: '개' },
    { label: '공통 코드 수정', value: '0', suffix: '건' },
  ],
}

/* ---------------------------------------------------------------------------
 * 내비게이션
 * ---------------------------------------------------------------------------
 * id 는 각 섹션의 <section id="..."> 와 반드시 같아야 한다.
 * 하나라도 틀리면 메뉴 클릭 시 아무 일도 일어나지 않는다(조용한 버그).
 * Hero(#top)는 로고가 담당하므로 메뉴에 넣지 않는다.
 *
 * 왜 줄였나
 *   Challenges·Performance·Principles는 전부 Project 하나를 다른 각도로
 *   들여다보는 딥다이브였다. 같은 사건(2,889건 리렌더, 폼 단일화)을 형식만
 *   바꿔 세 번 설명하고 있었고, 읽는 사람은 세 번째쯤에서 "아까 본 것 같은데"
 *   라고 느낀다. 세 섹션을 접어 Project 안의 딥다이브 6개와 About의 작업 원칙
 *   4개로 합쳤다. 메뉴가 짧아진 게 목적이 아니라, 같은 이야기를 한 번만
 *   하는 게 목적이다.
 * ------------------------------------------------------------------------- */
const nav: PortfolioData['nav'] = [
  { id: 'about', label: 'About' },
  { id: 'project', label: 'Project' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'other-projects', label: 'Others' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/* ===========================================================================
 * 03. Featured Project — 급경사지 안전점검 / 관제 시스템
 * ========================================================================= */

/* --- 기술 스택 -------------------------------------------------------------
 * level 기준을 스스로 정해두면 면접에서 흔들리지 않는다.
 *   core     : 이 프로젝트에서 주도적으로 사용. 트러블슈팅까지 직접 함.
 *   working  : 실제로 붙여서 동작시킴. 문서 보며 문제없이 작업 가능.
 * note 에는 "무엇에 썼는지"를 반드시 적는다. 이름만 나열하면 로고 모음일 뿐이다.
 *
 * ⚠️ Zustand는 뺐다. 레포의 Zustand 스토어는 모달·로딩 등 전역 UI 싱글톤이고
 *    내 위저드는 지역 state로 관리한다. 안 쓴 걸 썼다고 적으면 첫 질문에서 끝난다.
 * ------------------------------------------------------------------------- */
const techStack: PortfolioData['featuredProject']['techStack'] = [
  {
    id: 'core',
    title: 'Core',
    icon: 'code',
    skills: [
      {
        name: 'React',
        level: 'core',
        note: '도메인 화면 전체. memo/ref 기반 렌더 최적화까지',
      },
      {
        name: 'TypeScript',
        level: 'core',
        note: '평가 항목·등급 등 도메인 모델을 유니온 타입으로 먼저 정의',
      },
      {
        name: 'React Router',
        level: 'working',
        note: '도메인 라우트 등록 · React.lazy 코드 스플리팅 경계',
      },
    ],
  },
  {
    id: 'state',
    title: 'State & Data',
    icon: 'database',
    skills: [
      {
        name: 'TanStack Query',
        level: 'core',
        note: '서버 상태 전담 · 저장 후 invalidate 로 화면 간 동기화',
      },
      {
        name: 'React useState / useRef',
        level: 'core',
        note: '5단계 위저드 상태를 전역으로 올리지 않고 지역에서 관리',
      },
    ],
  },
  {
    id: 'map',
    title: 'Map & Visualization',
    icon: 'map',
    skills: [
      {
        name: 'Google Maps JS API',
        level: 'core',
        note: '2D/3D 관제 뷰, 카메라 포커스 이동 제어',
      },
      {
        name: 'AdvancedMarker',
        level: 'core',
        note: '등급 A~E 커스텀 DOM 마커 · React.memo 로 개별 분리',
      },
      {
        name: 'MarkerClusterer',
        level: 'working',
        note: '밀집 구간 클러스터링 · 축척별 판독',
      },
      {
        name: 'Polygon Overlay',
        level: 'working',
        note: '위험등급 면(面) + 해치 패턴 오버레이',
      },
      {
        name: 'Reverse Geocoding',
        level: 'working',
        note: '지도 클릭 → 좌표·주소 자동 입력',
      },
    ],
  },
  {
    id: 'ui',
    title: 'UI',
    icon: 'layers',
    skills: [
      {
        name: 'TailwindCSS',
        level: 'core',
        note: '도메인 화면 전체 스타일링 · 레이아웃 2종 대응',
      },
      {
        name: 'tailwind-styled-components',
        level: 'working',
        note: '`tw` 태그 + `$props` 규약으로 스타일을 별도 파일로 분리',
      },
      {
        name: '사내 공통 레이아웃 카탈로그',
        level: 'working',
        note: '소비만 (설계·운영 주체는 아님)',
      },
    ],
  },
  {
    id: 'tooling',
    title: 'Tooling',
    icon: 'wrench',
    skills: [
      {
        name: 'Vite',
        level: 'working',
        note: '빌드 · React.lazy 라우트 코드 스플리팅',
      },
      {
        name: 'Git / 컨벤션 문서',
        level: 'working',
        note: '경로 스코프 규칙·가드레일을 저장소 문서로 명문화',
      },
    ],
  },
]

/* --- 프로젝트 아키텍처 -----------------------------------------------------
 * ⭐️ 이 블록의 목적은 "무엇을 썼는지"가 아니라 "왜 그렇게 나눴는지"다.
 * 그래서 각 항목은 decision(선택) / reason(이유) / tradeoff(대가) 세 축으로 쓴다.
 * 이유 없이 좋은 구조는 없고, 대가 없는 선택도 없다.
 *
 * 9개였던 레이어를 4개로 줄였다. Zustand·Form·등급계산·공통컴포넌트 레이어는
 * 각각 딥다이브에서 사건으로 다루므로, 여기서는 뼈대만 남긴다.
 * ------------------------------------------------------------------------- */
const architecture: PortfolioData['featuredProject']['architecture'] = {
  summary:
    '다섯 플랫폼이 하나의 SPA 셸을 공유하고 공통코드로 분기하는 구조 위에, 급경사지 도메인을 새로 얹는 작업이었습니다. 따라서 아키텍처의 첫 번째 제약은 성능도 확장성도 아닌 **격리**였습니다. 내 도메인의 요구사항 때문에 다른 네 플랫폼이 깨져서는 안 됩니다. 아래 결정들은 전부 이 제약에서 출발합니다.',

  layers: [
    {
      id: 'overall',
      title: '전체 구조',
      summary: '공통 셸은 읽기만 하고, 변경은 전부 도메인 폴더 안에서 끝낸다.',
      decision:
        '공통코드로 분기되는 기존 SPA 셸(라우터·레이아웃·인증)은 수정 대상에서 제외하고, 도메인 전용 feature 폴더 아래에 라우트·상태·API·컴포넌트를 자기완결적으로 배치했습니다. 셸과의 접점은 라우트 등록 한 곳뿐입니다.',
      reason:
        '공유 코드는 수정 비용이 눈에 보이지 않습니다. 내 화면에서 잘 도는 한 줄이 다른 네 플랫폼에서 어떻게 터질지는 배포 뒤에야 알게 되고, 그때는 원인 추적이 다섯 배로 늘어납니다. 접점을 하나로 줄여두면 "내 변경이 남에게 갈 수 있는 경로"가 물리적으로 존재하지 않게 됩니다. 리뷰어도 폴더 하나만 보면 됩니다.',
      tradeoff:
        '다른 플랫폼과 정말로 같은 로직이 생겨도 당장은 도메인 안에 복제됩니다. 세 번째 중복이 나타날 때 공통으로 올린다는 기준을 두고, 그전까지는 중복을 감수했습니다. 성급한 공통화가 잘못된 추상을 만드는 비용이 더 크다고 판단했습니다.',
      keywords: ['feature-first', '도메인 격리', '단일 접점', '경로 스코프 규칙'],
    },
    {
      id: 'state',
      title: '상태 관리',
      summary:
        '서버 상태만 라이브러리에 맡기고, 화면 상태는 전역으로 올리지 않는다.',
      decision:
        '서버에서 온 데이터는 TanStack Query가 전담합니다. 5단계 위저드 입력값은 전역 스토어를 만들지 않고 위저드 컴포넌트의 지역 state로 관리하며, 단계 컴포넌트에는 값과 변경 함수를 props로 내려줍니다. 사내 공통 Zustand 스토어는 모달·로딩 같은 전역 UI 싱글톤 용도로만 소비했습니다.',
      reason:
        '상태 관리 라이브러리를 하나 더 얹을지 판단하는 기준은 **"이 값의 수명이 어디까지인가"** 였습니다. 위저드 입력값은 위저드 페이지를 벗어나면 살아 있을 이유가 없습니다. 수명이 컴포넌트와 정확히 일치하는 값을 전역에 올리면, 얻는 건 없고 초기화 책임만 새로 생깁니다 — 등록을 마치고 나갔다가 다시 들어왔을 때 이전 입력이 남아 있는 버그는 대부분 이렇게 만들어집니다. 반대로 서버 데이터를 지역 state에 복사해 두면 원본과 사본이 생겨 갱신·무효화·로딩·에러를 손으로 관리해야 합니다. 그래서 서버 데이터만 Query에 맡기고, 나머지는 가장 가까운 곳에 뒀습니다.',
      tradeoff:
        '위저드 깊은 곳까지 props를 내려보내야 합니다(prop drilling). 단계가 더 늘거나 전달 깊이가 3단계를 넘어가면 그때 Context나 전용 스토어를 도입한다는 선을 정해두고, 그 안에서는 명시적 전달을 유지했습니다.',
      keywords: ['상태 수명', '지역 state', 'TanStack Query', 'prop drilling 감수'],
    },
    {
      id: 'api',
      title: 'API Layer',
      summary: 'mock과 실제 API의 교체점을 fetcher 한 겹으로 몰아넣는다.',
      decision:
        '도메인 api 폴더 아래에 ① 엔드포인트별 fetcher ② 쿼리 키 팩토리 ③ 서버 DTO → 화면 모델 매퍼를 분리했습니다. 컴포넌트는 fetch도 axios도 직접 호출하지 않고 훅을 통해서만 데이터를 받으며, 저장 성공 시에는 관련 키를 무효화합니다.',
      reason:
        '백엔드 스펙이 확정되기 전에 화면을 먼저 만들어야 하는 상황이었습니다. 컴포넌트가 데이터 출처를 직접 알면 mock을 실제 API로 바꾸는 순간 화면 파일 전부를 열어야 합니다. 출처를 fetcher 한 겹 뒤로 숨기면 교체 지점이 파일 몇 개로 고정됩니다. 매퍼를 따로 둔 이유도 같습니다 — 서버 필드명이 바뀌어도 그 충격이 매퍼에서 멈추고 화면까지 오지 않습니다. 실제로 실서버 전환 때 화면 컴포넌트는 건드리지 않고 이 계층에서만 작업했습니다.',
      tradeoff:
        '엔드포인트 하나를 붙일 때 파일을 세 개 만져야 해서, 화면 하나짜리 단순 조회에는 확실히 과합니다. 이 구조는 "스펙이 흔들린다"는 조건이 있을 때만 이깁니다.',
      keywords: ['fetcher', 'queryKey 팩토리', 'DTO 매퍼', 'invalidateQueries'],
    },
    {
      id: 'component',
      title: 'Component 구조',
      summary: '데이터를 아는 컴포넌트와 모양만 아는 컴포넌트를 분리한다.',
      decision:
        '사내 컨벤션인 `PageContainer → ComponentContainer → ComponentHeader / ComponentBody / ComponentBox` 중첩 구조를 따르되, 그 안에서 반복되는 필드 묶음은 데이터 접근 없이 props만 받는 컴포넌트로 뽑았습니다. 스타일은 `tw` 태그를 쓰는 `*.styles` 파일로 분리해 `$props` 규약을 따랐습니다.',
      reason:
        '같은 필드 묶음이 등록 폼·상세 뷰·검토 화면 세 곳에 필요했습니다. 처음엔 각자 마크업을 갖고 있었는데, 이러면 항목이 하나 추가될 때마다 세 곳을 고쳐야 하고 언젠가 한 곳을 잊습니다. 필드 묶음에서 데이터 접근을 걷어내 props만 받게 만들자 같은 컴포넌트를 "쓰기 모드"와 "읽기 모드"로 재사용할 수 있게 됐습니다. 스타일을 별도 파일로 뺀 것도 같은 맥락입니다 — 로직 파일에서 스타일이 사라지면 렌더 구조가 한눈에 들어옵니다.',
      tradeoff:
        'props 개수가 늘고, 읽기/쓰기 분기가 컴포넌트 안에 쌓입니다. 분기가 읽기 어려워지는 시점이 오면 그때는 컴포넌트를 쪼개는 결정을 따로 해야 합니다.',
      keywords: [
        'PageContainer 컨벤션',
        'tailwind-styled-components',
        '$props',
        '읽기/쓰기 겸용',
      ],
    },
  ],

  /* --- Architecture Diagram ----------------------------------------------
   * 이미지가 아니라 데이터로 정의한 이유:
   *  - 다크모드에서 배경이 깨지지 않고, 모바일에서 줄바꿈이 자연스럽다.
   *  - 구조가 바뀌면 이 배열만 고치면 된다 (이미지는 원본 파일을 찾아야 한다).
   *  - 텍스트라서 검색·스크린리더 모두에 잡힌다.
   * --------------------------------------------------------------------- */
  diagram: {
    caption:
      '위에서 아래로 의존합니다. 아래 계층은 위 계층을 알지 못합니다 — 이 방향이 한 번이라도 역전되면 화면 하나를 고칠 때 관계없는 화면이 함께 깨집니다.',
    layers: [
      {
        id: 'shell',
        title: 'Shell',
        caption: '5개 플랫폼이 공유 · 수정하지 않음',
        nodes: [
          { label: 'SPA Shell', note: 'Router · Layout · Auth', tone: 'neutral' },
          { label: '공통코드 분기', note: '플랫폼 5종', tone: 'neutral' },
          { label: '공통 레이아웃 카탈로그', note: '소비만', tone: 'neutral' },
        ],
      },
      {
        id: 'page',
        title: 'Page',
        caption: '라우트 진입점 · React.lazy 로 분리',
        nodes: [
          { label: '관제 대시보드', tone: 'accent' },
          { label: '실태조사 위저드', tone: 'accent' },
          { label: '재해위험도 평가', tone: 'accent' },
          { label: '데이터 로그', tone: 'accent' },
        ],
      },
      {
        id: 'container',
        title: 'Container',
        caption: '훅으로 데이터·상태를 확보해 아래로 내려준다',
        nodes: [
          { label: 'useSlopeList', note: 'Query 구독', tone: 'accent' },
          { label: '위저드 지역 state', note: '전역화하지 않음', tone: 'accent' },
          { label: 'useReverseGeocode', note: '좌표·주소 주입', tone: 'accent' },
        ],
      },
      {
        id: 'presentational',
        title: 'Presentational',
        caption: 'props만 받는다 · 등록/수정/검토가 공유',
        nodes: [
          { label: '제원 필드 묶음', tone: 'accent' },
          { label: '기본정보 필드 묶음', tone: 'accent' },
          { label: '평가 점수 패널', note: 'readOnly prop', tone: 'accent' },
          { label: '등급 마커', note: 'React.memo', tone: 'accent' },
        ],
      },
      {
        id: 'api',
        title: 'API Layer',
        caption: 'mock ↔ real 교체점을 여기 한 겹에 가둔다',
        nodes: [
          { label: 'queryKeys', note: '키 팩토리', tone: 'accent' },
          { label: 'fetcher', note: '엔드포인트별', tone: 'accent' },
          { label: 'payload builder', note: '전 필드 동시 전송', tone: 'accent' },
          { label: 'DTO → Model 매퍼', note: '필드명 변화 흡수', tone: 'accent' },
        ],
      },
      {
        id: 'external',
        title: 'External',
        caption: '내가 통제할 수 없는 것들 — 그래서 위에 어댑터를 둔다',
        nodes: [
          { label: 'REST API', note: '부분 수정 미지원', tone: 'external' },
          {
            label: 'Google Maps JS API',
            note: 'Marker · Polygon · Geocoder',
            tone: 'external',
          },
        ],
      },
    ],
    legend: [
      '진한 색 = 이번 프로젝트에서 직접 설계·구현한 영역',
      '회색 = 기존 공통 자산 (읽기만, 수정 대상 아님)',
      '점선 = 외부 시스템 (직접 호출하지 않고 API Layer를 거친다)',
    ],
  },
}

/* --- 딥다이브 --------------------------------------------------------------
 * ⭐️ 원래 Challenges(15개) + Performance(3개) 두 섹션이었던 것을 6개로 줄였다.
 *
 * 줄인 기준은 "개수"가 아니라 **사건의 중복**이다.
 *   - 폼 단일화 이야기는 ch-shared-fields / ch-review-refactor / architecture
 *     세 곳에 나뉘어 있었다 → dd-single-source 하나로
 *   - 지도 이야기는 클러스터/마커/폴리곤/포커스/역지오코딩 5개로 쪼개져 있었는데
 *     전부 "지도를 판독 도구로 만든다"는 한 가지 목표의 부분이었다 → dd-map 하나로
 *   - perf-rerender 와 ch-cluster 는 같은 화면의 같은 사건이었다 → dd-render 하나로
 *
 * 남긴 6개는 서로 다른 종류의 판단을 하나씩 보여준다:
 *   성능 / 파괴적 외부 제약 / 중복 제거 / 격리 / 기능 폐지 / 도메인 이해
 * ------------------------------------------------------------------------- */
const deepDives: PortfolioData['featuredProject']['deepDives'] = [
  {
    id: 'dd-render',
    title: '마커 하나를 고를 때마다 2,889건이 지도에 다시 붙던 문제',
    tag: '성능',
    problem:
      '관제 대시보드에서 마커를 하나 선택할 때마다 지도 전체가 눈에 띄게 버벅였습니다. 실데이터를 연동한 뒤 증상이 드러났고, 기존에도 있던 "마커 클릭이 늦게 먹는" 문제와 같은 뿌리로 보였습니다. 원인은 세 갈래였습니다 — 3D 마커 2,889개가 매 렌더마다 씬에 다시 부착되고, 폴리곤 강조 로직이 선택 여부와 무관하게 전체를 순회하고, 2D 마커에 넘기는 콜백의 참조가 매 렌더마다 바뀌어 마커가 통째로 재생성됐습니다.',
    approach:
      '처음에는 2,889개를 어떻게 더 빠르게 그릴지를 찾았습니다. 방향을 바꾼 건 "선택이 바뀌어도 실제로 달라지는 건 이전 선택 해제와 새 선택, 단 2개뿐"이라는 걸 확인한 순간이었습니다. 마커를 `React.memo` 컴포넌트로 분리해 자기 상태가 바뀐 마커만 다시 그리게 하고, 콜백은 `useRef`로 고정해 참조가 흔들리지 않게 했습니다. 직전 선택 id를 ref로 추적해 전체 순회 대신 델타 2건만 갱신하도록 재설계했고, 이 작업 전부를 도메인 컴포넌트 안에서 끝냈습니다.',
    result:
      '선택 변경당 갱신 대상이 2,889건에서 2건이 됐고, 부수 효과로 기존의 마커 클릭 지연까지 함께 사라졌습니다. 수치는 작업 당시 코드 주석과 커밋 메시지에 그대로 기록해 뒀습니다.',
    metric: {
      label: '선택 변경당 마커 재부착',
      before: '2,889건',
      after: '2건',
      delta: '−99.9%',
    },
    learned:
      '성능 문제의 답이 대개 "더 빠르게"가 아니라 "덜 하게"에 있다는 걸 배웠습니다. 빠르게 그리는 방법을 찾는 데 시간을 썼는데, 정작 답은 안 그려도 되는 것을 찾아내는 쪽에 있었습니다.',
    keywords: ['React.memo', 'useRef 참조 고정', '델타 갱신', 'Marker3D'],
  },
  {
    id: 'dd-destructive-api',
    title: '빠뜨린 필드가 에러가 아니라 삭제로 나타나는 저장 API',
    tag: '데이터',
    problem:
      '실태조사 저장 API가 부분 수정을 지원하지 않았습니다. 요청 JSON에서 빠진 필드는 전부 null로 저장되므로, 한 항목만 고치더라도 서식 전체 약 110개 필드를 매번 채워 보내야 합니다. 문제는 이 실패가 조용하다는 점입니다 — 요청은 200으로 성공하고 화면에도 오류가 없는데, 보내지 않은 필드의 기존 값이 사라집니다. 실제로 조사자 종합의견 필드가 이 방식으로 지워지는 사고가 있었습니다.',
    approach:
      '증상을 하나씩 쫓는 대신 API 스펙과 폼 필드를 1:1로 대조한 표를 먼저 만들어 누락을 이름 불일치 / 타입 불일치 / 아예 누락으로 분류하고, payload builder를 그 분류에 맞춰 재작성했습니다. 다만 한 번 맞춰놓는 것으로는 재발을 막지 못합니다. 필드가 추가될 때마다 **전송 body · 복원 함수 · 타입 정의 세 곳을 반드시 짝으로 고쳐야 한다**는 규칙을 저장소 문서에 명문화하고, 이 API가 "부분 수정 불가 · 누락은 조용한 삭제"라는 성질을 같은 문서에 경고로 남겼습니다.',
    result:
      '저장 누락이 해소되고 실서버 연동이 정상 동작합니다. 이후 필드가 늘어난 서식 전환도 같은 대조표 방식으로 처리했습니다.',
    metric: {
      label: '저장 1회당 전송 필드',
      before: '변경된 필드만',
      after: '서식 전 필드 110개',
      delta: '누락 = 삭제이므로 전량 전송',
    },
    learned:
      '외부 API의 성질을 내가 바꿀 수 없을 때, 할 수 있는 일은 그 성질을 팀이 잊지 않게 만드는 것이었습니다. 사고가 난 뒤 코드를 고치는 데서 멈췄다면 다음 사람이 같은 자리에서 같은 실수를 했을 겁니다.',
    keywords: ['blind overwrite', '스펙 대조표', 'payload builder', '규칙 문서화'],
  },
  {
    id: 'dd-single-source',
    title: '등록·수정·검토 화면이 같은 항목을 각자 그리고 있던 문제',
    tag: '구조',
    problem:
      '신규 등록과 상세 수정은 필드 구성이 거의 같은데 따로 개발되고 있었고, 실태조사 마지막 검토 단계는 아예 별개의 요약 View로 만들어져 있었습니다. 같은 항목을 그리는 코드가 세 벌이라 필드가 하나 바뀌면 세 곳을 고쳐야 했고, 실제로 한쪽만 수정해 입력값과 검토 내용이 어긋나는 일이 생겼습니다.',
    approach:
      '요약 View를 유지보수하는 대신 없앴습니다. 등록·수정을 `mode=create|edit` 를 받는 하나의 폼으로 합치고, 검토 단계에서도 별도 화면이 아니라 실제 입력 폼을 읽기 모드로 재사용하도록 바꿨습니다. 필드 묶음에서 데이터 접근을 걷어내 props만 받는 컴포넌트로 분리했고, 읽기 전용이 필요한 평가 점수 패널에는 **기본값이 있는 `readOnly` prop을 더하는 방식**으로 확장해 기존 호출부를 한 줄도 고치지 않았습니다.',
    result:
      '필드 정의가 단일 소스가 되어 항목 추가가 한 곳 수정으로 끝나고, 검토 화면이 입력값과 자동으로 동기화됩니다. 공통 컴포넌트 확장의 영향 범위는 0이었습니다.',
    learned:
      '공통 컴포넌트를 고칠 때 가장 위험한 건 시그니처 변경입니다. 필수 prop을 하나 추가하는 순간 그 컴포넌트를 쓰던 모든 화면이 동시에 깨지고, 급하게 고치는 과정에서 원래 목적과 무관한 수정이 딸려 들어갑니다. 기본값이 있는 선택적 prop으로 확장하면 변경의 영향 범위를 스스로 0으로 만들 수 있습니다.',
    keywords: ['mode=create|edit', 'additive prop', 'readOnly', '단일 소스'],
  },
  {
    id: 'dd-isolation',
    title: '다섯 플랫폼이 공유하는 셸 위에 새 도메인 얹기',
    tag: '구조',
    problem:
      '다섯 개 플랫폼이 하나의 SPA 셸을 공유하고 공통코드로 분기하는 구조였습니다. 급경사지 도메인에 필요한 기능을 공통 셸에 넣으면 나머지 네 플랫폼이 함께 영향을 받고, 그 비용은 다른 팀의 배포 시점에 나타납니다.',
    approach:
      '셸은 읽기 전용으로 취급하고 라우트·상태·API·컴포넌트를 도메인 폴더 안에서 자기완결적으로 구성했습니다. 셸과의 접점은 라우트 등록 한 곳으로 제한했고, 어디까지 손댈 수 있는지를 경로 스코프 규칙으로 문서화했습니다. 렌더 최적화처럼 공통 컴포넌트를 건드리고 싶어지는 작업도 도메인 안에서 해결했습니다.',
    result:
      '도메인 개발 전 기간 동안 공통 인프라 코드 수정 없이 진행했고, 변경 영향 범위가 폴더 하나로 고정돼 리뷰·롤백 단위가 명확해졌습니다.',
    metric: {
      label: '공통 코드 수정',
      before: '—',
      after: '0건',
      delta: '커밋 로그로 확인 가능',
    },
    learned:
      '"이건 건드리면 안 된다"가 제 기억에만 있으면 제가 자리를 비운 순간 규칙은 없는 것과 같습니다. 문서로 옮겨두는 것까지가 개발이더군요.',
    keywords: ['feature-first', '경로 스코프 규칙', '단일 접점', '변경 영향 범위'],
  },
  {
    id: 'dd-draft',
    title: '직접 만든 임시저장 기능을 두 달 뒤 걷어낸 이유',
    tag: '판단',
    problem:
      '5단계 실태조사는 작성 시간이 깁니다. 새로고침으로 입력이 날아가는 상황을 막으려고 로컬스토리지 임시저장과 재진입 복원을 넣었고, 이후 여러 기기에서 이어서 작성할 수 있도록 서버 draft 저장으로 전환했습니다. 그런데 저장 경로가 둘(임시저장 / 제출)로 늘어나자 새 문제가 생겼습니다 — 조사자 입장에서 "지금 내 작업이 어디에 저장돼 있는지"가 화면만 봐서는 분명하지 않았고, 두 경로가 서로 다른 시점의 데이터를 갖는 상황이 가능해졌습니다.',
    approach:
      '기능을 개선하는 대신 없애는 쪽을 택했습니다. 임시저장과 제출을 폐지하고 저장 경로를 하나로 통합했습니다. 남아 있던 옛 임시저장 데이터가 새 구조와 충돌하지 않도록, 위저드 진입 시 이전 로컬 데이터를 정리하는 코드만 남겼습니다.',
    result:
      '저장 상태가 하나뿐이라 "어디까지 저장됐나"라는 질문 자체가 사라졌고, 동기화가 어긋날 경로도 함께 없어졌습니다.',
    learned:
      '만든 기능을 지우는 일에는 만들 때보다 큰 확신이 필요했습니다. 남겨두면 아무도 뭐라 하지 않으니까요. 다만 이 결정에는 남은 빚이 있습니다 — 작성 중 이탈 시 복구 수단이 지금은 없습니다. 자동 저장을 되살린다면 저장 경로를 늘리지 않는 방식(단일 저장의 주기적 갱신)이어야 한다고 보고, 그 형태를 다음 과제로 두고 있습니다.',
    keywords: ['기능 폐지', '저장 경로 단일화', '상태 모호성 제거', '남은 빚'],
  },
  {
    id: 'dd-map',
    title: '지도를 "보기 좋은 화면"이 아니라 판독 도구로 만들기',
    tag: '도메인',
    problem:
      '안전 정보가 목록과 문서로만 존재해, 관리자가 위험 대상을 찾으려면 표를 읽고 위치를 따로 확인해야 했습니다. 지도에 그대로 찍으면 도심 구간에서 마커가 겹쳐 개수도 위치도 읽히지 않고, 축소하면 아무것도 판별할 수 없습니다. 게다가 마커는 위치를 알려주지만 넓이를 알려주지 못하는데, 급경사지는 "어디"만큼 "어디부터 어디까지"가 중요합니다.',
    approach:
      '판독을 축척에 따라 2단계로 나눴습니다. 넓은 축척에서는 `MarkerClusterer`로 묶어 지역별 밀도를, 확대하면 개별 지점을 보게 했습니다. 등급은 `AdvancedMarker`의 DOM 마커로 전환해 색과 등급 문자를 함께 넣었습니다 — 색만으로 구분하면 색각 이상 사용자에게 정보가 전달되지 않고 인쇄·캡처 시에도 사라지기 때문입니다. 범위는 Polygon에 등급별 해치(사선) 패턴으로 표현하되, 면을 불투명하게 채우면 아래 지형이 가려지므로 패턴과 투명도로 지도 정보를 유지했습니다. 목록·지도·상세는 "현재 선택된 급경사지" 단일 상태를 함께 구독하게 해서, 어느 쪽에서 선택하든 나머지가 따라오게 했습니다.',
    result:
      '목록을 거치지 않고 지도만으로 대상을 특정할 수 있고, 등급이 색·문자·면 세 채널에서 일관되게 읽힙니다. 동기화 경로가 하나라 "한쪽만 갱신 안 되는" 버그가 구조적으로 생기지 않습니다.',
    learned:
      '접근성은 별도 항목이 아니라 판독 설계의 일부였습니다. 색에 의존하지 않게 만든 결정이 결과적으로 흑백 출력물에서도 등급이 읽히게 만들었고, 이건 행정 문서를 다루는 도메인에서 실제로 필요한 요건이었습니다.',
    keywords: [
      'MarkerClusterer',
      '이중 인코딩(색+문자)',
      'Polygon 해치',
      '단일 선택 상태',
    ],
  },
]

const featuredProject: PortfolioData['featuredProject'] = {
  id: 'slope-safety',
  title: '지자체 급경사지 안전관리 시스템',
  subtitle: '지도 기반 시설물 관제와 실태조사 워크플로',
  period: '2026.06 – 진행 중',
  domain: '재난안전 · 급경사지',
  team: '프론트엔드 2 · 백엔드 2 (총 4명)',
  client: '지자체 행정 실무자용', // 발주처명은 공개 확인 전까지 익명 유지

  overview: [
    '행정 실무자가 관내 급경사지를 조사·관리하는 웹 시스템입니다. 지도 기반 시설물 관제, 신규 등록, 재해위험도 평가, 안전점검, 관리자 설정 기능으로 구성됩니다.',
    '초반 기획과 화면 설계, 레이아웃 설계, 데이터 명세서 작성을 담당한 뒤 급경사지 실태조사 도메인의 프론트엔드 개발을 맡았습니다. 개발이 구체화되면서 백엔드 개발자와 데이터 구조를 함께 다듬어 가는 중입니다. 화면을 그리는 사람과 데이터를 정의하는 사람이 같았던 덕분에, "이 필드가 왜 필요한가"를 설명하는 회의가 거의 필요하지 않았습니다.',
    '기술적으로는 다섯 플랫폼이 공유하는 SPA 셸 위에 급경사지 도메인을 새로 얹는 작업이었습니다. 이 구조가 만든 제약과 거기서 나온 설계 판단은 아래 "프로젝트 아키텍처"와 딥다이브에서 다룹니다.',
  ],

  /* 목표 — "무엇을 만들었나"가 아니라 "무엇을 해결하려 했나"를 먼저 둔다.
   * measure 를 함께 적는 이유: 목표를 검증 가능한 형태로 쓰지 않으면
   * 나중에 달성 여부를 스스로도 판단할 수 없다. */
  goals: [
    {
      id: 'goal-map-first',
      title: '지도를 1차 판단 도구로 만들기',
      problem:
        '안전 정보가 목록과 문서 형태로만 존재해, 관리자가 위험 대상을 찾으려면 표를 읽고 위치를 따로 확인해야 했습니다. 두 정보가 분리되어 있는 한 "이 지역에 위험 등급이 몰려 있다" 같은 판단은 나올 수 없습니다.',
      goal: '등급이 지도 위에서 바로 읽히고, 상세 확인은 그다음에 하는 흐름으로 뒤집습니다. 목록은 지도를 보조하는 위치로 내립니다.',
      measure: '목록을 거치지 않고 지도만으로 대상을 특정할 수 있는가.',
    },
    {
      id: 'goal-input-error',
      title: '현장 등록에서 나오는 입력 오류를 구조적으로 없애기',
      problem:
        '실태조사는 입력 항목이 많고 위경도까지 필요합니다. 한 화면에 몰아넣으면 작성이 어렵고, 소수점 여섯 자리 좌표는 사람이 정확히 적을 수 있는 값이 아닙니다. 좌표 오타는 마커가 엉뚱한 곳에 찍힌 뒤에야 발견됩니다.',
      goal: '입력을 단계로 나눠 그 자리에서 검증하고, 사람이 정확히 적을 수 없는 값은 애초에 손으로 적지 않게 만듭니다. 검증을 강화하는 대신 틀릴 방법 자체를 없애는 쪽을 택합니다.',
      measure:
        '오류가 발생한 단계에서 즉시 잡히는가. 좌표를 수기로 입력할 일이 남아 있는가.',
    },
    {
      id: 'goal-isolation',
      title: '다른 네 플랫폼에 영향을 주지 않기',
      problem:
        '다섯 플랫폼이 하나의 셸을 공유하는 구조입니다. 공통 코드를 고치면 내 화면에서는 잘 돌지만, 그 비용은 다른 팀의 배포 시점에 나타나고 그때는 원인 추적이 몇 배로 비싸집니다.',
      goal: '변경 범위를 도메인 폴더 하나 안에 가둡니다. 공통 코드는 읽기만 하고, 셸과의 접점은 라우트 등록 한 곳으로 제한합니다.',
      measure: '개발 기간 동안 공통 인프라 코드 수정 커밋이 있었는가.',
    },
    {
      id: 'goal-swappable',
      title: '스펙 확정 전에 화면을 먼저 만들되, 나중에 갈아끼울 수 있게',
      problem:
        '백엔드 API 스펙이 확정되기 전에 화면 개발을 시작해야 했습니다. mock 데이터를 화면 곳곳에서 직접 import 하면, 실 API로 바꾸는 순간 화면 파일을 전부 열어야 합니다.',
      goal: '데이터 출처를 fetcher 한 겹 뒤로 숨겨 교체 지점을 파일 몇 개로 고정합니다. 서버 필드명이 바뀌어도 그 충격이 매퍼에서 멈추게 합니다.',
      measure: '실서버 전환을 화면 컴포넌트 수정 없이 끝낼 수 있는가.',
    },
  ],

  role: {
    scope:
      '초기 기획·화면설계·데이터 명세서 작성 담당 후, 급경사지 실태조사 도메인의 프론트엔드 개발',
    domains: [
      {
        id: 'planning',
        title: '기획 · 설계',
        items: [
          '초기 기획 참여 — 행정 실무 흐름을 화면 단위로 분해하고 기능 범위를 정의',
          '전체 레이아웃 설계 및 화면설계서 작성',
          '데이터 명세서 작성 — 이후 백엔드 개발자와 데이터 구조를 함께 조정 (진행 중)',
        ],
      },
      {
        id: 'survey',
        title: '급경사지 실태조사 워크플로',
        items: [
          '5단계 실태조사 위저드 개발 — 일반정보 → 붕괴위험요인 관리방안 → 재해위험도 평가 → 조사자 의견·사진대지 → 검토 및 제출',
          '실서버 API 연동 — 스펙 대조를 통한 저장 누락 해소, 부분 수정을 지원하지 않는 API에 맞춘 전 필드(약 110개) 전송 구조 설계',
          '재해위험도 평가 및 등급 산정 — 배점 기준에 따른 총점·등급을 프론트에서 계산해 입력 중 즉시 반영',
          '단계별 유효성 검증과 저장 플로우 설계 — 임시저장 도입 후 저장 경로 단일화로 폐지',
        ],
      },
      {
        id: 'detail',
        title: '상세 조회 · 공통 폼',
        items: [
          '등록/수정을 하나로 합친 공통 폼 개발 (`mode=create|edit`)',
          '읽기·수정 겸용 프레젠테이션 컴포넌트 개발 — additive `readOnly` prop으로 기존 호출부 무수정 확장',
          '검토 화면 리팩토링 — 별도 요약 View 대신 실제 입력 폼을 재사용하고 부모에서 상태를 단일 관리',
          '탭 구조 개선 및 레이아웃 전환 기능 (레이아웃 2종 대응)',
        ],
      },
      {
        id: 'map',
        title: '지도',
        items: [
          'Google Maps 2D/3D 관제 뷰 — `AdvancedMarker` + `MarkerClusterer` 기반 시각화',
          'Marker 렌더링 최적화 — 선택 변경당 재부착 2,889건 → 2건',
          'Polygon + 해치 오버레이로 위험 구역 범위 렌더링',
          '지도 선택 UX — 목록 ↔ 지도 양방향 카메라 포커스, 지도 클릭 역지오코딩 좌표·주소 자동 입력',
        ],
      },
      {
        id: 'foundation',
        title: '구조 · 공통',
        items: [
          'API Layer 설계 — fetcher / queryKeys / DTO 매퍼 분리',
          'TanStack Query 기반 서버 상태 관리 — 저장 후 캐시 무효화로 화면 간 동기화',
          '`React.lazy` 라우트 코드 스플리팅 적용',
          '프로젝트 컨벤션 문서화 — 경로 스코프 규칙, 파괴적 저장 API 취급 규칙',
          '관리자 설정 · 데이터 로그 화면 (기간·항목 필터, 통계 카드)',
        ],
      },
    ],
  },

  techStack,

  result: {
    summary:
      '목록과 문서에 흩어져 있던 급경사지 정보를 지도 한 화면에서 판단할 수 있게 만들었고, 실태조사 등록에서 좌표를 손으로 적거나 등급을 제출 후에 확인할 일을 없앴습니다. 다섯 플랫폼이 공유하는 셸을 한 줄도 건드리지 않은 채 도메인 하나를 통째로 얹었으며, 렌더링 병목과 저장 누락은 모두 관찰·대조로 원인을 좁혀 해소했습니다.',
    outcomes: [
      {
        id: 'out-render',
        label: '선택당 마커 재부착',
        value: '2,889 → 2건',
        description:
          '3D 마커 재부착·폴리곤 전체 순회·2D 마커 재생성 세 병목을 동시에 해소. 기존에 있던 마커 클릭 지연까지 함께 사라졌습니다.',
      },
      {
        id: 'out-api',
        label: '저장 누락',
        value: '해소 · 재발 방지 규칙 문서화',
        description:
          '부분 수정을 지원하지 않는 API라 누락이 조용한 삭제로 나타납니다. 스펙 대조표로 payload builder를 재작성하고, 필드 추가 시 세 곳을 짝으로 고치는 규칙을 저장소 문서에 남겼습니다.',
      },
      {
        id: 'out-single-source',
        label: '같은 필드를 그리는 코드',
        value: '3벌 → 1벌',
        description:
          '등록·수정·검토가 하나의 폼을 공유합니다. 항목 추가가 한 곳 수정으로 끝나고, 검토 화면이 입력값과 자동으로 동기화됩니다.',
      },
      {
        id: 'out-isolation',
        label: '공통 코드 변경',
        value: '0건',
        description:
          '렌더 최적화를 포함한 모든 변경을 도메인 폴더 안에서 끝냈습니다. 다른 네 플랫폼에 영향 없음이 구조적으로 보장됩니다.',
      },
    ],
  },

  /**
   * 하지 못한 것 · 담당하지 않은 것
   * ---------------------------------------------------------------------
   * 원래 role.boundaries 와 performance.notYet 두 곳에 나뉘어 있었다.
   * 읽는 사람 입장에서는 "이 사람이 어디까지 했나"라는 하나의 질문이므로
   * 한 블록으로 합친다. 이 블록은 방어가 아니라 나머지 문장의 담보다.
   */
  limits: [
    {
      kind: 'scope',
      title: '안전점검 워크플로',
      note: '같은 팀의 다른 프론트엔드 개발자가 담당했습니다. 제가 맡은 것은 급경사지 실태조사 워크플로입니다.',
    },
    {
      kind: 'scope',
      title: '공통 셸 · 레이아웃 카탈로그',
      note: '라우터·레이아웃·인증과 사내 레이아웃 카탈로그는 소비했을 뿐, 설계·운영 주체는 아닙니다.',
    },
    {
      kind: 'scope',
      title: '데이터 정규화',
      note: '백엔드에서 처리합니다. 제가 한 것은 데이터 명세 작성과 화면 모델 정의까지입니다.',
    },
    {
      kind: 'unfinished',
      title: '사진 업로드',
      note: '현재 보류 단계로, 구현되지 않았습니다.',
    },
    {
      kind: 'unfinished',
      title: '보고서 다운로드',
      note: '선택 → 카운트 → 비활성 UI까지의 골격 단계이며, 실제 파일 생성 로직은 포함되지 않았습니다.',
    },
    {
      kind: 'unfinished',
      title: '작성 중 자동 복구',
      note: '임시저장을 폐지하면서 함께 사라졌습니다. 저장 경로를 늘리지 않는 형태로 되살리는 것을 과제로 두고 있습니다.',
    },
    {
      kind: 'learning',
      title: '번들 크기 실측',
      note: 'React.lazy 라우트 코드 스플리팅은 적용했지만, 적용 전/후 번들 크기를 직접 측정해 비교한 기록은 아직 없습니다. 측정 없이 성과로 말하지 않으려고 수치를 적지 않았습니다.',
    },
    {
      kind: 'learning',
      title: '리스트 가상화',
      note: '이번에는 렌더 횟수를 줄이는 쪽으로 병목이 해소돼 가상화 라이브러리를 도입할 시점이 오지 않았습니다.',
    },
    {
      kind: 'learning',
      title: 'Web Vitals · Performance 프로파일링',
      note: 'LCP/INP 같은 사용자 체감 지표나 DevTools Performance 탭으로 병목을 추적한 경험은 아직 없습니다. 현재 우선순위로 학습 중입니다.',
    },
    {
      kind: 'learning',
      title: '실시간 통신 (WebSocket / SSE)',
      note: '이 시스템의 동기화는 캐시 무효화 기반입니다. 관제 도메인 특성상 실시간 스트림이 필요한 지점이 있어 다음 과제로 두고 있습니다.',
    },
  ],

  architecture,
  deepDives,

  links: [
    // 사내 시스템이라 공개 링크 없음. 비어 있으면 링크 영역이 렌더되지 않는다.
  ],
}

/* ===========================================================================
 * 04. Development Timeline
 * ---------------------------------------------------------------------------
 * ⚠️ 이전 버전은 "6주"였으나 실제는 2026-06-10 첫 커밋 ~ 현재(11주+)다.
 *    구간을 주 단위가 아니라 월 단위로 바꾸고, 각 구간은 커밋으로 확인되는
 *    사건만 담는다. learned 는 그 구간에서 실제로 판단이 바뀐 지점만 적는다.
 * ========================================================================= */
const timeline: PortfolioData['timeline'] = [
  {
    id: 't-06-early',
    label: '6월 초',
    phase: '만들기',
    title: '기획과 명세를 먼저 쓰고, 지도를 띄우다',
    work: [
      '행정 실무 흐름을 화면 단위로 분해해 초기 기획·레이아웃 설계·화면설계서를 작성',
      '데이터 명세서를 작성해 백엔드와의 논의 기준을 만듦',
      '다섯 플랫폼이 공유하는 SPA 셸 구조를 파악하고, 도메인 전용 폴더를 만들어 셸과의 접점을 라우트 등록 한 곳으로 제한',
      'Google Maps를 붙여 급경사지를 지도에 표시하는 첫 화면 구현 (API 스펙 확정 전이라 mock 데이터로 선행)',
    ],
    learned:
      '일단 화면이 뜨게 만드는 데 집중했고, 구조는 나중에 정리하자며 미뤘습니다. 당시엔 합리적인 판단이라고 생각했는데, 이 결정이 한 달 뒤에 그대로 비용으로 돌아옵니다.',
  },
  {
    id: 't-06-late',
    label: '6월 중·하',
    phase: '쌓기',
    title: '5단계 위저드를 세우고, 임시저장을 넣다',
    work: [
      '실태조사 입력을 5단계로 재편하고 단계별 검증을 붙임 — 최종 제출 시점에 몰아서 검사하면 1단계 오타 때문에 4단계를 거슬러 올라가야 하므로',
      '위저드 상태를 전역 스토어로 올리지 않고 지역 state로 유지 — 수명이 페이지와 정확히 일치하는 값이라 전역화의 이득이 없다고 판단',
      '작성 중 이탈에 대비해 로컬스토리지 임시저장과 재진입 복원을 도입',
      '지도 클릭 시 좌표·역지오코딩 주소를 폼에 자동 주입 — 소수점 여섯 자리를 사람이 적게 두지 않기 위해',
    ],
    learned:
      '입력 오류를 "검증으로 잡는 것"과 "틀릴 방법을 없애는 것" 중 후자가 언제나 낫다는 걸 좌표 필드에서 배웠습니다. 검증은 사람이 틀린 뒤에 작동하지만, 자동 입력은 틀릴 자리를 만들지 않습니다.',
  },
  {
    id: 't-07-early',
    label: '7월 초',
    phase: '부딪히기',
    title: '실데이터를 붙이자 지도가 멈췄다',
    work: [
      '실제 데이터를 연동하자 마커 선택 때마다 지도가 눈에 띄게 버벅이는 증상 발생',
      '기존에도 있던 "마커 클릭이 늦게 먹는" 문제가 함께 드러남',
      '렌더 경로를 추적해 3D 마커 재부착 · 폴리곤 전체 순회 · 콜백 참조 변화 세 병목을 특정',
      '"실제로 달라지는 건 2개뿐"이라는 관찰에서 접근을 뒤집어 재설계 (상세는 딥다이브 참고)',
    ],
    learned:
      '처음엔 두 증상을 서로 다른 버그로 보고 각각 고치려 했습니다. 원인이 하나일 수 있다는 생각을 못 한 게 이 구간의 가장 큰 실수였고, 덕분에 이틀을 증상 대응에 썼습니다. 그리고 성능 문제의 답은 대개 "더 빠르게"가 아니라 "덜 하게"에 있었습니다.',
  },
  {
    id: 't-07-late',
    label: '7월 중·하',
    phase: '정리하기',
    title: '흩어져 있던 것들을 한 곳으로',
    work: [
      '등록 폼·상세 뷰에 중복돼 있던 필드를 props만 받는 프레젠테이션 컴포넌트로 추출해 단일 소스화',
      '등록·수정 화면을 `mode=create|edit` 를 받는 하나의 폼으로 통합',
      '평가 점수 패널에 기본값이 있는 `readOnly` prop을 더해, 기존 호출부를 한 줄도 고치지 않고 읽기 전용 모드 지원',
      '검토 단계의 별도 요약 View를 없애고 실제 입력 폼을 읽기 모드로 재사용, 상태는 부모에서 단일 관리',
      'API Layer를 fetcher / queryKeys / DTO 매퍼로 분리해 mock ↔ 실 API 교체점을 한 겹에 고정',
      'React.lazy 라우트 코드 스플리팅 적용',
    ],
    learned:
      '리팩토링이 코드를 예쁘게 만드는 일인 줄 알았는데, 원인을 한 곳으로 모으는 일이더군요. 6월에 미뤄둔 "나중에 정리하자"의 청구서를 이때 받았습니다.',
  },
  {
    id: 't-08-early',
    label: '8월 초',
    phase: '연결하기',
    title: '요청은 성공하는데 값이 사라졌다',
    work: [
      '실서버 전환 후 저장 누락 발생 — 요청은 200으로 성공하고 화면에도 오류가 없는데 일부 필드의 기존 값이 지워짐',
      '원인 확인: 저장 API가 부분 수정을 지원하지 않아, 요청에서 빠진 필드가 전부 null로 덮임',
      'API 스펙과 폼 필드를 1:1 대조한 표를 만들어 원인별로 분류하고 payload builder를 재작성 (약 110개 필드 전량 전송)',
      '필드 추가 시 전송 body·복원 함수·타입 세 곳을 짝으로 고쳐야 한다는 규칙과 API의 파괴적 성질을 저장소 문서에 명문화',
    ],
    learned:
      '증상을 하나씩 쫓지 않고 대조표부터 만든 게 전환점이었습니다. 7월에 배운 "원인을 한 곳으로 모은다"를 이번엔 코드가 아니라 명세에 적용한 셈입니다. 그리고 사고 뒤 코드만 고치고 끝냈다면 다음 사람이 같은 자리에서 같은 실수를 했을 겁니다 — 문서로 옮겨두는 것까지가 개발이더군요.',
  },
  {
    id: 't-08-late',
    label: '8월 중·하',
    phase: '덜어내기',
    title: '만들어둔 임시저장을 스스로 걷어내다',
    work: [
      '로컬스토리지 임시저장을 서버 draft 저장으로 전환했다가, 저장 경로가 둘로 늘어나며 "지금 내 작업이 어디 저장돼 있나"가 불분명해지는 문제를 확인',
      '임시저장·제출을 폐지하고 저장 경로를 하나로 통합 — 옛 로컬 데이터를 정리하는 코드만 남김',
      '재해위험도 총점·등급 산정을 프론트 계산으로 확정해 입력 중 즉시 반영',
      '경로 스코프 규칙과 스타일 가이드를 저장소 문서로 정리',
    ],
    learned:
      '만든 기능을 지우는 데는 만들 때보다 큰 확신이 필요했습니다. 남겨두면 아무도 뭐라 하지 않으니까요. 다만 이 결정에는 빚이 남았습니다 — 작성 중 이탈 복구가 지금은 없고, 되살린다면 저장 경로를 늘리지 않는 방식이어야 한다고 보고 있습니다.',
    note: '프로젝트는 현재도 진행 중이며, 백엔드 개발자와 데이터 구조를 함께 다듬고 있습니다. 운영 이관은 아직 이뤄지지 않았습니다.',
  },
]

/* ===========================================================================
 * 05. Other Projects
 * ---------------------------------------------------------------------------
 * ⚠️ 경력기술서에서 확인된 것만 남겼습니다. 시간 역순.
 * 뒤 5개는 Frontend Mentor 챌린지(개인 학습)로, role에 출처를 명시해
 * 재직 프로젝트와 섞여 실무로 오해되지 않게 한다.
 * ========================================================================= */
const projects: PortfolioData['projects'] = [
  {
    id: 'solar-river-monitoring',
    title: '솔라리버 태양광 모니터링 Web & QR Scanner App',
    subtitle: '실시간 발전 데이터 시각화 및 설비 등록 자동화 플랫폼',
    period: '2022.08 – 2023.04 (Web 2022.08~2023.01 · App 2022.12~2023.04)',
    description:
      '태양광 발전소 운영자가 실시간 발전 데이터를 확인하고 현장 설비를 등록하는 모니터링 플랫폼입니다. 화면 설계·퍼블리싱·기능 개발을 80% 비중으로 담당했습니다.',
    role: '노벨테크놀로지 재직 중 개발 (화면 설계 · 퍼블리싱 · 기능 개발)',
    highlights: [
      'AmCharts 기반 발전량 시각화 대시보드 구현 — 운영자가 설비 상태를 직관적으로 판단할 수 있는 모니터링 환경 구축',
      '발전 로그 데이터 Excel Export 및 Print 기능 개발 — 수작업 관리 절차 제거',
      'QR Scanner 연동 장치 등록 기능 구현 — 현장 장비 등록 과정의 디지털 전환 및 입력 오류 가능성 감소',
      'Android Hybrid WebView 렌더링 구조 최적화 — 초기 로딩 지연 개선',
    ],
    tech: ['PHP', 'MySQL', 'AJAX', 'Android Hybrid', 'AmCharts'],
    links: [],
    images: [
      { src: solariverWMain, device: 'web' },
      { src: solariverMLogin, device: 'mobile' },
      { src: solariverWReInv, device: 'web' },
      { src: solariverMCreate, device: 'mobile' },
      { src: solariverWPwDayD, device: 'web' },
      { src: solariverWPwDayG, device: 'web' },
      { src: solariverMModule, device: 'mobile' },
    ],
  },
  {
    id: 'remp-monitoring-renewal',
    title: 'REMP 태양광 모니터링 Web & App 리뉴얼',
    subtitle: '인증·알림 기능 고도화를 통한 서비스 안정성 강화',
    period: '2022.01 – 2022.06 (Web 2022.01~2022.03 · App 2022.03~2022.06)',
    description:
      '기존 태양광 모니터링 시스템의 구조를 개선하고 인증·알림 기능을 고도화한 리뉴얼 프로젝트입니다. 기능 개선 및 유지보수를 50% 비중으로 담당했습니다.',
    role: '노벨테크놀로지 재직 중 개발 (기능 개선 · 유지보수)',
    highlights: [
      'Firebase Cloud Messaging 기반 설비 이상 알림 Push 기능 개선 — 장애 발생 시 즉시 인지 가능한 알림 체계 구축',
      'Token 인증 기반 Instance API 구조 개편 — 인증 안정성 향상 및 세션 처리 구조 개선',
      '로그인 모듈 및 WebView 통신 로직 리팩토링 — 불필요 요청 감소',
      'JS/CSS 리소스 경량화 — 화면 응답 속도 개선',
    ],
    tech: ['PHP', 'MySQL', 'AJAX', 'Android Hybrid', 'AmCharts'],
    links: [],
    images: [
      { src: nremsMain, device: 'mobile' },
      { src: nremsLogin, device: 'mobile' },
      { src: nremsG1, device: 'mobile' },
      { src: nremsG2, device: 'mobile' },
    ],
  },
  {
    id: '153media-agency-sites',
    title: '153MEDIA 웹 에이전시 프로젝트',
    subtitle: 'Resort 스파밸리 · 엠모니터 · 스마트팔공산 외 CMS 유지보수 9개 사이트',
    period: '2017.07 – 2018.07',
    description:
      '기업·지자체 웹사이트를 구축·운영하는 에이전시에서 반응형 퍼블리싱과 PHP 기반 게시판·관리자 기능을 개발했습니다.',
    role: '153MEDIA 재직 중 개발 (퍼블리싱 · 기능 개발 · 유지보수)',
    highlights: [
      'Resort 스파밸리 — 반응형 웹 구현 및 영문 페이지 퍼블리싱',
      '엠모니터 — 관리자 알림 메일 자동화, 게시물 상위 노출 기능 및 메뉴 UI 개선',
      '스마트팔공산 — GPS 기반 위치 매핑 기능 개발, 메인·상세 페이지 퍼블리싱',
      '애드피크 외 9개 사이트 CMS 유지보수 — PHP·JS 기반 다수 사이트 안정 운영',
    ],
    tech: ['HTML5', 'CSS3', 'PHP', 'MySQL', 'JavaScript', 'jQuery', 'AJAX'],
    links: [],
    images: [
      { src: media153Palgongsan, device: 'web' },
      { src: media153Donga, device: 'web' },
      { src: media153Apartment1, device: 'web' },
      { src: media153Apartment2, device: 'web' },
    ],
  },
  {
    id: 'halfline-sports-community',
    title: '하프라인(Playball24) 스포츠 커뮤니티 플랫폼',
    subtitle: '실시간 메시징 기능 및 데이터 안정성 구조 설계',
    period: '2014.01 – 2015.03',
    description:
      '스포츠 커뮤니티 사이트의 실시간 메시징 기능 개발과 DB 운영을 담당했습니다. 페이지 리로드 없이 동작하는 인터랙션과 SQL Injection 방어 구조를 설계했습니다.',
    role: '(주)트론트 재직 중 개발',
    highlights: [
      'AJAX + JSON 기반 비동기 메시징 통신 구조 설계 — 페이지 리로드 없는 실시간 송수신',
      '읽음 상태·신규 메시지 상태 UI 동기화 로직 개발',
      'MS-SQL 프로시저 스케줄링 기반 메시지 알림 시스템 구현',
      '서버단 입력값 검증 및 쿼리 필터링 로직 설계 — SQL Injection 및 비정상 요청 차단',
    ],
    tech: ['PHP', 'ASP', 'MySQL', 'MS-SQL', 'JavaScript', 'jQuery', 'AJAX'],
    links: [],
  },
  {
    id: 'personal-finance-app',
    title: 'Personal Finance App',
    subtitle: '종합 자산 관리 및 예산 편성 기능을 제공하는 개인 금융 관리 웹 서비스',
    period: '2025.01.23 – 2025.02.10',
    description:
      '예산·자산 CRUD, 실시간 데이터 동기화, 무한 스크롤, 반응형 디자인을 구현했습니다.',
    role: 'Frontend Mentor 챌린지 (팀) — Redux 기반 상태 관리와 Firebase 데이터 퍼시스턴스 담당',
    highlights: [
      'Redux Toolkit으로 Pot(자산) 상태를 전역화 — 복잡한 props drilling을 막고 데이터 일관성 유지',
      'Intersection Observer 기반 무한 스크롤 — 대량 청구서 리스트의 초기 로딩과 브라우저 부하를 절감',
      'Firebase Firestore 비동기 통신을 공통 모듈로 추상화 — 팀 리팩토링 과정에서 유지보수성 향상',
      'Custom Hook 기반 알림 시스템 — Toast UI에 CRUD 피드백을 연결해 작업 상태를 명확히 전달',
    ],
    tech: ['React', 'Redux Toolkit', 'Firebase', 'Tailwind CSS'],
    links: [
      { type: 'demo', url: 'https://toy-personal-finance.web.app/' },
      {
        type: 'github',
        url: 'https://github.com/Bang04/frontend-mentor-challenges/tree/b6b7812cf3b339931a81d192c73b989b73ff100a/personal-finance-app',
      },
    ],
    images: [
      { src: potWeb, device: 'web' },
      { src: recurringTablet, device: 'tablet' },
      { src: recurringApp, device: 'mobile' },
    ],
  },
  {
    id: 'product-list-with-cart',
    title: 'Product List with Cart',
    subtitle: '실시간 장바구니 연동 및 주문 프로세스를 경험할 수 있는 커머스 웹 앱',
    period: '2025.02.27 – 2025.03.12',
    description:
      '상태 기반 장바구니, 실시간 수량 계산, 주문 확인 시스템을 구현했습니다.',
    role: 'Frontend Mentor 챌린지 (개인) — TypeScript 데이터 모델링과 반응형 UI 개발',
    highlights: [
      'Redux로 장바구니 상태 동기화 — 추가·삭제·수량 변경 시 합계 금액이 실시간으로 반영되는 데이터 흐름 구현',
      '재고 수량 제한, 장바구니 비우기 등 실제 커머스 플로우를 고려한 유효성 검증·예외 처리',
      'Bulma CSS 기반 모듈형 스타일링 — 클래스 기반 스타일 정의로 가독성 높은 UI 코드 작성',
    ],
    tech: ['React', 'TypeScript', 'Redux', 'Bulma'],
    links: [
      { type: 'demo', url: 'https://b-dessert.vercel.app/' },
      {
        type: 'github',
        url: 'https://github.com/Bang04/frontend-mentor-solo/tree/a8f24fc04ac8e7788a8ec5fb985f1f430d8d54ac/product-list-with-cart-main',
      },
    ],
    images: [
      { src: cartWeb, device: 'web' },
      { src: cartTablet, device: 'tablet' },
      { src: cartApp, device: 'mobile' },
    ],
  },
  {
    id: 'entertainment-webapp',
    title: 'Entertainment Web App',
    subtitle: '영화 및 TV 시리즈 탐색과 개인화된 북마크 기능을 제공하는 플랫폼',
    period: '2025.01.23 – 2025.02.10',
    description: '커스텀 슬라이더, 북마크 시스템, 복합 검색 기능을 구현했습니다.',
    role: 'Frontend Mentor 챌린지 (팀) — 외부 의존성 없는 핵심 UI 컴포넌트와 북마크 상태 관리 담당',
    highlights: [
      '`useRef`와 상태만으로 만든 순수 React 커스텀 슬라이더 — 외부 라이브러리 없이 패키지 경량화',
      'Redux 기반 북마크 동기화 — 여러 페이지에서 같은 콘텐츠의 북마크 상태가 즉시 연동되도록 설계',
      'CSS Grid 기반 반응형 레이아웃 — 다양한 해상도에서 콘텐츠 가독성 확보',
    ],
    tech: ['React', 'TypeScript', 'Redux', 'Styled Components'],
    links: [
      {
        type: 'github',
        url: 'https://github.com/Bang04/frontend-mentor-challenges/tree/b6b7812cf3b339931a81d192c73b989b73ff100a/entertainment-webapp',
      },
    ],
    images: [
      { src: enterWeb, device: 'web' },
      { src: enterApp, device: 'mobile' },
    ],
  },
  {
    id: 'crowdfunding-product-page',
    title: 'Crowdfunding Product Page',
    subtitle: '실시간 펀딩 현황 업데이트 기능을 갖춘 제품 크라우드 펀딩 페이지',
    period: '2025.02.10 – 2025.02.19',
    description: '동적 진행률 바, 실시간 모금액 업데이트, 후원 모달을 구현했습니다.',
    role: 'Frontend Mentor 챌린지 (팀) — 상태 변화 시각화와 모바일 인터랙션 UI 담당',
    highlights: [
      '후원 성공 시 모금액과 진행률 바가 애니메이션과 함께 즉시 업데이트되도록 로직 구성',
      '모바일 환경을 고려한 접근성 있는 햄버거 메뉴·네비게이션·모달 인터랙션 구현',
      '다양한 후원 플랜(Pledge)을 단일 공통 컴포넌트로 구조화 — 코드 중복 최소화',
    ],
    tech: ['React', 'Redux', 'Bulma'],
    links: [
      {
        type: 'github',
        url: 'https://github.com/Bang04/frontend-mentor-challenges/tree/b6b7812cf3b339931a81d192c73b989b73ff100a/crowdfunding-product-page',
      },
    ],
    images: [
      { src: crowdWeb, device: 'web' },
      { src: crowdApp, device: 'mobile' },
    ],
  },
  {
    id: 'agency-landing-page',
    title: 'Agency Landing Page',
    subtitle: '심미적 디자인과 퍼포먼스를 고려한 기업 홍보용 반응형 랜딩 페이지',
    period: '2025.06.17 – 2025.06.23',
    description: '모던 UI 퍼블리싱, 시맨틱 마크업, 완전 반응형 대응을 구현했습니다.',
    role: 'Frontend Mentor 챌린지 (개인) — 디자인 시스템 기반 UI 퍼블리싱과 Tailwind 반응형 코드 작성',
    highlights: [
      'Tailwind CSS 유틸리티 클래스로 스타일 코드량을 줄이면서 디자인 일관성 유지',
      '시맨틱 마크업 준수 — 검색 엔진 최적화와 웹 접근성을 고려한 HTML 구조 설계',
      '데스크탑·태블릿·모바일에 최적화된 레이아웃 전환 구현',
    ],
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    links: [
      { type: 'demo', url: 'https://b-sunnyside.vercel.app' },
      {
        type: 'github',
        url: 'https://github.com/Bang04/frontend-mentor-solo/tree/a8f24fc04ac8e7788a8ec5fb985f1f430d8d54ac/sunnyside-agency-landing-page',
      },
    ],
    images: [{ src: sunnysideWeb, device: 'web' }],
  },
]

/* ===========================================================================
 * 06. Experience
 * ---------------------------------------------------------------------------
 * end 를 생략하면 "현재"로 표시된다. 최신 항목이 위로 오도록 직접 정렬해 둔다.
 * 연봉·퇴사사유는 포트폴리오 특성상 제외했습니다.
 * ========================================================================= */
const experiences: PortfolioData['experiences'] = [
  {
    id: 'exp-ahjoo',
    kind: 'work',
    organization: '아주엔지니어링',
    title: '정보통신부 / 프론트엔드 개발',
    start: '2024.03',
    // end 생략 → "현재"
    location: 'Gyeonggi',
    description:
      '재난안전 분야 웹 시스템의 프론트엔드를 설계·개발합니다. 급경사지 안전관리 시스템에서는 초기 기획·화면설계·데이터 명세 작성을 담당한 뒤 실태조사 도메인 개발을 맡았습니다.',
    achievements: [
      '급경사지 안전관리 시스템의 초기 기획·레이아웃 설계·데이터 명세서를 작성해 백엔드와의 논의 기준을 마련',
      '급경사지 실태조사 5단계 워크플로와 지도 관제 화면을 담당 — 부분 수정을 지원하지 않는 저장 API에 맞춰 전 필드(약 110개) 전송 구조를 설계하고 저장 누락을 해소',
      '지도 마커 렌더링 최적화 — 선택 변경당 재부착 2,889건 → 2건',
      '등록·수정·검토 화면을 하나의 폼으로 통합하고, additive prop 확장으로 기존 호출부 무수정 유지',
      '다섯 플랫폼이 공유하는 셸을 수정하지 않고 도메인을 격리 구현 — 경로 스코프 규칙과 파괴적 저장 API 취급 규칙을 저장소 문서로 명문화',
    ],
    tech: [
      'React',
      'TypeScript',
      'TanStack Query',
      'React Router',
      'TailwindCSS',
      'Google Maps Platform',
      'Vite',
    ],
  },
  {
    id: 'exp-novel',
    kind: 'work',
    organization: '노벨테크놀로지',
    title: '기술연구소 · 주임연구원 (웹개발)',
    start: '2020.04',
    end: '2023.08',
    location: 'Gyeonggi',
    description:
      '태양광 발전 모니터링 플랫폼(솔라리버 · REMP)의 웹 화면과 하이브리드 앱을 개발했습니다. 발전량 시각화 대시보드 구축, 장치 등록 프로세스 디지털화, 인증 구조 개편, Push 알림 개선을 담당했습니다.',
    achievements: [
      'AmCharts 기반 발전량 시각화 대시보드 구현 (솔라리버)',
      'QR 스캐너 연동 장치 등록 프로세스 디지털화 — 현장 입력 오류 가능성 감소',
      'Token 인증 방식을 Instance 기반 API 구조로 개편 (REMP)',
      'Firebase Cloud Messaging 기반 설비 이상 알림 Push 시스템 개선',
      'Android Hybrid WebView 렌더링 최적화 및 JS/CSS 경량화 리팩토링',
    ],
    tech: [
      'PHP',
      'MySQL',
      'JavaScript',
      'jQuery',
      'AJAX',
      'Android Hybrid',
      'Firebase',
      'AmCharts',
    ],
  },
  {
    id: 'edu-acorn',
    kind: 'training',
    organization: '에이콘아카데미',
    title: '자바 웹 개발자 양성과정 (프론트엔드 ReactJS·AngularJS 특화)',
    start: '2019.03',
    end: '2019.08',
    description:
      '프론트엔드 개발자로 전환하기 위해 자바 기반 웹 개발자 양성과정을 수료했습니다.',
    achievements: [
      'ReactJS·AngularJS 기반 프론트엔드 개발 과정 수료 (2019.03.12 ~ 2019.08.02)',
    ],
    tech: ['Java', 'ReactJS', 'AngularJS'],
  },
  {
    id: 'exp-153media',
    kind: 'work',
    organization: '153MEDIA',
    title: '개발팀 (웹 퍼블리싱 · PHP 개발)',
    start: '2017.07',
    end: '2018.07',
    location: 'Daegu',
    description:
      '기업·지자체 웹사이트 구축·운영 에이전시에서 메인·서브 페이지 UI 퍼블리싱과 반응형 웹 구현, PHP 기반 게시판·관리자 기능 개발을 담당했습니다.',
    achievements: [
      '반응형 웹 구현 및 다국어(영문) 페이지 퍼블리싱 (Resort 스파밸리)',
      '관리자 알림 메일 자동화 및 게시물 상위 노출·메뉴 UI 개선 (엠모니터)',
      'GPS 기반 위치 매핑 기능 개발 및 메인·상세 페이지 퍼블리싱 (스마트팔공산)',
      '애드피크 외 9개 사이트 CMS 유지보수',
    ],
    tech: ['HTML5', 'CSS3', 'PHP', 'MySQL', 'JavaScript', 'jQuery', 'AJAX'],
  },
  {
    id: 'exp-tron',
    kind: 'work',
    organization: '(주)트론트',
    title: '개발팀 (웹 개발)',
    start: '2014.01',
    end: '2015.03',
    location: 'Daegu',
    description:
      '스포츠 커뮤니티 사이트(하프라인/Playball24)의 기능 개발과 DB 운영을 담당했습니다. 실시간 메시지 알림 시스템 설계와 서버단 보안 로직 구축이 핵심 업무였습니다.',
    achievements: [
      'MS-SQL 프로시저 스케줄링을 활용한 실시간 메시지 알림 시스템 설계 및 구현',
      'AJAX 비동기 처리 기반 사용자 인터랙션 기능 개발',
      '서버단 데이터 검증 및 쿼리 보안 로직 설계 — SQL Injection 대응',
      '게시판 스킨 선택 기능 개발, MySQL 백업·복구 운영 및 쿼리 튜닝',
    ],
    tech: [
      'HTML5',
      'CSS3',
      'PHP',
      'ASP',
      'MySQL',
      'MS-SQL',
      'JavaScript',
      'jQuery',
      'AJAX',
    ],
  },
  {
    id: 'edu-sejong',
    kind: 'education',
    organization: '세종사이버대학교',
    title: '소프트웨어공학과 학사 (4년제)',
    start: '2021.03',
    end: '2022.10',
    location: 'Seoul',
    achievements: [],
  },
  {
    id: 'edu-yeongjin',
    kind: 'education',
    organization: '영진전문대학',
    title: '컴퓨터정보계열 웹프로그래밍전공 (2·3년제)',
    start: '2011.03',
    end: '2014.02',
    location: 'Daegu',
    achievements: [
      "졸업작품 — '공부의 신': 웹과 모바일을 연동한 기능성 학습 게임 구현",
    ],
  },
  {
    id: 'cert-info-processing',
    kind: 'certificate',
    organization: '한국산업인력공단',
    title: '정보처리기사',
    start: '2018.08',
    achievements: [],
  },
]

/* ===========================================================================
 * 07. Contact
 * ========================================================================= */
const contact: PortfolioData['contact'] = {
  heading: '함께 일해요',
  message:
    '지도·관제처럼 데이터가 많은 화면을 다루는 팀, 구조를 정리하며 만들어 가는 팀이라면 특히 반갑습니다. 포트폴리오에 적힌 숫자는 어떤 것이든 근거를 설명해 드릴 수 있습니다.',
  email: profile.email,
  // TODO: https://formspree.io 에서 폼을 만들고 엔드포인트를 넣으면
  // 문의 폼이 활성화된다. 비워두면 "이메일 복사" UI만 표시된다.
  formspreeEndpoint: '',
}

/* ---------------------------------------------------------------------------
 * export
 * ------------------------------------------------------------------------- */

export {
  profile,
  nav,
  featuredProject,
  timeline,
  projects,
  experiences,
  contact,
}