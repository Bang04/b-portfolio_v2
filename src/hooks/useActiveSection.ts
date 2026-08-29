import { useEffect, useState } from 'react'

/**
 * 현재 화면에 보이는 섹션의 id를 반환한다. Header의 활성 메뉴 표시에 쓰인다.
 * ---------------------------------------------------------------------------
 * scroll 이벤트 + getBoundingClientRect() 로도 구현할 수 있지만,
 * 그 방식은 스크롤 1픽셀마다 콜백이 돌아 메인 스레드를 잡아먹는다.
 * IntersectionObserver 는 브라우저가 교차 여부만 계산해 알려주므로 훨씬 싸다.
 *
 * ROOT_MARGIN: 화면 중앙의 얇은 띠를 기준으로 삼아,
 * 섹션이 그 띠를 지나는 순간에만 활성으로 잡히게 한다.
 */
const ROOT_MARGIN = '-45% 0px -50% 0px'

export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))

    // 정리(cleanup)를 잊으면 컴포넌트가 사라진 뒤에도 옵저버가 살아남아
    // 메모리 누수와 "없는 상태 업데이트" 경고를 일으킨다.
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ids는 호출부에서 고정 참조로 넘긴다
  }, [ids])

  return active
}

/** 스크롤이 일정량 내려갔는지 여부 (헤더 배경/그림자 전환용) */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll() // 새로고침 후 중간부터 시작하는 경우를 위해 최초 1회 실행
    // passive: true → 브라우저에 "preventDefault 안 쓴다"고 알려 스크롤 성능을 지킨다.
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
