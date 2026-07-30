import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Contact } from '@/components/sections/Contact'

/**
 * 최상위 레이아웃
 * ---------------------------------------------------------------------------
 * 의도적으로 아무 로직도 두지 않았다. App은 "무엇이 어떤 순서로 있는지"만 말한다.
 * 데이터 조회·상태 관리는 각 섹션이 자기 것만 책임진다.
 * 이렇게 두면 섹션 순서를 바꾸거나 하나를 떼어내는 일이 한 줄 수정으로 끝난다.
 *
 * 섹션 순서는 방문자가 궁금해하는 순서와 같다:
 *   누구인가(Hero) → 어떤 사람인가(About) → 무엇을 할 수 있나(Skills)
 *   → 실제로 뭘 만들었나(Projects) → 어디서 일했나(Experience) → 어떻게 연락하나(Contact)
 */
export default function App() {
  return (
    <>
      <Header />

      {/* id="main": 헤더의 '본문으로 건너뛰기' 스킵 링크가 착지하는 지점.
          Hero가 min-h-[100svh]로 화면을 꽉 채우므로 별도 상단 여백은 주지 않는다.
          (헤더는 fixed라 문서 흐름에서 빠져 있다) */}
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
