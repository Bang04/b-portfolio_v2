import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { FeaturedProject } from '@/components/sections/FeaturedProject'
import { Architecture } from '@/components/sections/Architecture'
import { Timeline } from '@/components/sections/Timeline'
import { TechnicalChallenges } from '@/components/sections/TechnicalChallenges'
import { PerformanceOptimization } from '@/components/sections/PerformanceOptimization'
import { EngineeringPrinciples } from '@/components/sections/EngineeringPrinciples'
import { OtherProjects } from '@/components/sections/OtherProjects'
import { ResumeSummary } from '@/components/sections/ResumeSummary'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

/**
 * 최상위 레이아웃
 * ---------------------------------------------------------------------------
 * 의도적으로 아무 로직도 두지 않았다. App은 "무엇이 어떤 순서로 있는지"만 말한다.
 * 데이터 조회·상태 관리는 각 섹션이 자기 것만 책임진다.
 * 이렇게 두면 섹션 순서를 바꾸거나 하나를 떼어내는 일이 한 줄 수정으로 끝난다.
 *
 * 섹션 순서 = 읽는 사람이 판단을 내리는 순서
 *  01 Hero          누구인가
 *  02 About Me      어떤 사람인가
 *  03 Featured      가장 잘 아는 것 하나를 깊게 (소개 → 목표 → 역할 → 스택 → 기능 → 결과)
 *  04 Architecture  그 결과를 만든 구조를 어떻게 나눴나
 *  05 Timeline      그 구조에 도달하기까지 판단이 어떻게 바뀌었나
 *  06 Challenges    그 안에서 무엇에 막혔고 어떻게 뚫었나
 *  07 Performance   숫자로 증명되는 개선
 *  08 Principles    그 판단들을 관통하는 기준
 *  09 Others        폭(breadth)의 증거
 *  10 Resume        여기까지를 이력서 한 장으로
 *  11 Experience    이력의 사실관계
 *  12 Contact       다음 행동
 *
 * 왜 Architecture를 03에서 떼어 04로 세웠나?
 *  결정 9개 + 다이어그램은 한 섹션의 곁가지가 감당할 분량이 아니다.
 *  붙여 두면 03의 스크롤이 끝나지 않고, 무엇이 프로젝트 설명이고 무엇이
 *  설계 상세인지 경계가 사라진다. 게다가 아키텍처는 면접에서 가장 많이
 *  파고드는 영역이라 링크 하나로 보낼 수 있어야 하는데, 곁가지 블록에는
 *  고유 id도 내비게이션 항목도 줄 수 없다.
 *  03 바로 뒤에 둔 이유는 순서 그 자체다 — 결과를 본 직후여야
 *  "저게 어떤 모양이었지?"가 살아 있다.
 *
 * Timeline이 04가 아니라 05가 된 이유:
 *  04가 "완성된 구조"라면 05는 "그 구조에 도달한 과정"이다.
 *  구조를 먼저 보여준 뒤에야 타임라인의 판단 전환이 의미를 갖는다.
 *  순서를 뒤집으면 아직 모르는 구조에 대한 회고를 먼저 읽게 된다.
 *
 * 왜 Resume Summary를 Experience 앞에 뒀나?
 *  이력서의 문법을 그대로 따랐다 — 맨 위 요약문, 그 아래 경력 상세.
 *  09까지 읽지 않고 건너뛴 사람도 여기서 전체를 회수할 수 있고,
 *  다 읽은 사람에게는 정리가 된다. 뒤에 두면 같은 말을 두 번 하는 꼴이다.
 *
 * 왜 Skills를 독립 섹션으로 두지 않았나?
 *  "React를 씁니다"는 정보가 아니다. "이 프로젝트에서 React로 무엇을 했나"가 정보다.
 *  스택을 쓴 맥락에서 떼어내면 남는 건 로고 나열뿐이라, 03 안으로 넣었다.
 *
 * 왜 06~08을 03에서 분리했나?
 *  하나의 프로젝트 카드에 다 넣으면 스크롤이 끝나지 않고, 무엇이 중요한지도
 *  사라진다. 성격이 다른 정보(문제해결 / 측정 / 가치관)는 헤딩을 나눠야
 *  읽는 사람이 필요한 곳으로 건너뛸 수 있다.
 */
export default function App() {
  return (
    <>
      <Header />

      {/* id="main": 헤더의 '본문으로 건너뛰기' 스킵 링크가 착지하는 지점.
          Hero가 min-h-svh로 화면을 꽉 채우므로 별도 상단 여백은 주지 않는다.
          (헤더는 fixed라 문서 흐름에서 빠져 있다) */}
      <main id="main">
        <Hero />
        <About />
        <FeaturedProject />
        <Architecture />
        <Timeline />
        <TechnicalChallenges />
        <PerformanceOptimization />
        <EngineeringPrinciples />
        <OtherProjects />
        <ResumeSummary />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
