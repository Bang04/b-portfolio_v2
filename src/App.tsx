import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { FeaturedProject } from '@/components/sections/FeaturedProject'
import { Timeline } from '@/components/sections/Timeline'
import { OtherProjects } from '@/components/sections/OtherProjects'
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
 *  02 About Me      어떤 사람인가 + 일하는 방식
 *  03 Featured      가장 잘 아는 것 하나를 깊게 (소개 → 목표 → 역할 → 스택 → 결과 → 딥다이브)
 *  04 Timeline      그 결과에 도달하기까지 판단이 어떻게 바뀌었나
 *  05 Others        폭(breadth)의 증거
 *  06 Experience    이력의 사실관계
 *  07 Contact       다음 행동
 *
 * Timeline을 03 바로 뒤에 둔 이유:
 *  03이 "무엇을 만들었나"의 완성된 모습이라면, 04는 거기 도달하기까지의 과정이다.
 *  결과를 먼저 보여준 직후여야 "저걸 어떻게 했지?"라는 질문이 살아 있다.
 *  뒤로 밀면 이미 궁금증이 식은 뒤라 그냥 작업 로그로 읽힌다.
 *
 * 왜 Skills를 독립 섹션으로 두지 않았나?
 *  "React를 씁니다"는 정보가 아니다. "이 프로젝트에서 React로 무엇을 했나"가 정보다.
 *  스택을 쓴 맥락에서 떼어내면 남는 건 로고 나열뿐이라, 03 안으로 넣었다.
 *
 * 예전엔 Challenges·Performance·Principles가 04~07로 독립해 있었다.
 *  세 섹션 모두 "Project 하나를 깊게 파고드는 딥다이브"였을 뿐 About·Others와
 *  동급인 별개 주제가 아니었고, 같은 사건을 형식만 바꿔 여러 번 설명하고
 *  있었다. Challenges·Performance는 03 안의 "딥다이브"로, Principles는
 *  02 About의 "일하는 방식"으로 접었다 — 정보는 그대로 두고 위계와 중복만
 *  바로잡았다.
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
        <Timeline />
        <OtherProjects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
