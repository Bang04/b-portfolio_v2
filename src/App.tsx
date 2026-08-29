import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { FeaturedProject } from '@/components/sections/FeaturedProject'
import { Experience } from '@/components/sections/Experience'
import { OtherProjects } from '@/components/sections/OtherProjects'
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
 *  03 Featured      가장 잘 아는 것 하나를 깊게 (목표 → 역할 → 스택 → 결과 → 딥다이브 → 아키텍처 → 타임라인 → 못 한 것)
 *  04 Experience    이력의 폭 — 경력의 신뢰를 먼저 준다
 *  05 Others        개인 학습·과거 프로젝트의 폭
 *  06 Contact       다음 행동
 *
 * 예전엔 Timeline이 03 바로 뒤에 독립 섹션으로 있었다. 그런데 각 구간을
 * work[]/learned로 풀어 쓰다 보니 마커 렌더링 성능 이슈 같은 사건이
 * 헤더(03) · 딥다이브(03) · 타임라인(04) 세 곳에서 반복 서술됐다.
 * 지금은 Timeline을 03 안의 압축된 서브섹션(진행 타임라인)으로 흡수해
 * 같은 이야기를 한 번만 하도록 정리했다.
 *
 * Experience를 Others보다 앞에 둔 이유:
 *  Others(개인 학습 프로젝트)를 먼저 보여주면 "혼자 만든 것"이 회사 경력보다
 *  먼저 읽힌다. 경력의 폭으로 신뢰를 먼저 준 다음, 개인 프로젝트로 학습
 *  의지를 보여주는 순서가 낫다고 판단했다.
 *
 * 왜 Skills를 독립 섹션으로 두지 않았나?
 *  "React를 씁니다"는 정보가 아니다. "이 프로젝트에서 React로 무엇을 했나"가 정보다.
 *  스택을 쓴 맥락에서 떼어내면 남는 건 로고 나열뿐이라, 03 안으로 넣었다.
 *
 * 예전엔 Challenges·Performance·Principles가 독립 섹션으로 있었다.
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
        <Experience />
        <OtherProjects />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
