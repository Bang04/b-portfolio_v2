import { useEffect, useState } from 'react'

/**
 * 현재 화면에 보이는 섹션의 id를 반환한다.
 * ---------------------------------------------------------------------------
 * 원래 Header.tsx 안에 있던 훅을 그대로 옮겼다.
 * ProjectSubNav도 같은 방식의 활성 섹션 추적이 필요해지면서, 로직이
 * 두 컴포넌트에 복제될 뻔했다 — "같은 정보는 한 곳에서만 정의한다"는
 * 이 프로젝트의 원칙(EngineeringPrinciples 04)을 훅 레벨에서도 지킨 것이다.
 *
 * scroll 이벤트 + getBoundingClientRect() 로도 구현할 수 있지만,
 * 그 방식은 스크롤 1픽셀마다 콜백이 돌아 메인 스레드를 잡아먹는다.
 * IntersectionObserver 는 브라우저가 교차 여부만 계산해 알려주므로 훨씬 싸다.
 *
 * rootMargin 을 인자로 받게 한 이유:
 *   Header는 화면 중앙의 얇은 띠('-45% 0px -50% 0px')를 기준으로 삼지만,
 *   ProjectSubNav는 헤더(64px) + 서브내비(44px) 높이만큼 상단을 더 잘라내야
 *   섹션이 그 아래로 실제로 들어왔을 때만 활성으로 잡힌다. 기본값은 Header와
 *   동일하게 두어 기존 동작을 그대로 유지한다.
 */
export function useActiveSection(
  ids: string[],
  rootMargin = '-45% 0px -50% 0px',
): string {
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
      { rootMargin, threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))

    // 정리(cleanup)를 잊으면 컴포넌트가 사라진 뒤에도 옵저버가 살아남아
    // 메모리 누수와 "없는 상태 업데이트" 경고를 일으킨다.
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ids는 호출부에서 고정 참조로 넘긴다
  }, [ids, rootMargin])

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
