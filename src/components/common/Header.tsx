import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { nav, profile } from '@/data/portfolioData'
import { ThemeToggle } from './ThemeToggle'

/**
 * 현재 화면에 보이는 섹션의 id를 반환한다.
 * ---------------------------------------------------------------------------
 * scroll 이벤트 + getBoundingClientRect() 로도 구현할 수 있지만,
 * 그 방식은 스크롤 1픽셀마다 콜백이 돌아 메인 스레드를 잡아먹는다.
 * IntersectionObserver 는 브라우저가 교차 여부만 계산해 알려주므로 훨씬 싸다.
 *
 * rootMargin 의 '-45% 0px -50% 0px' 의미:
 *   뷰포트 위 45%, 아래 50%를 잘라낸 "화면 중앙의 얇은 띠"만 감지 영역으로 삼는다.
 *   → 화면 중앙을 지나가는 섹션이 활성 항목이 된다. (가장 자연스러운 체감)
 */
function useActiveSection(ids: string[]): string {
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
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))

    // 정리(cleanup)를 잊으면 컴포넌트가 사라진 뒤에도 옵저버가 살아남아
    // 메모리 누수와 "없는 상태 업데이트" 경고를 일으킨다.
    return () => observer.disconnect()
  }, [ids])

  return active
}

/** 스크롤이 일정량 내려갔는지 여부 (헤더 배경/그림자 전환용) */
function useScrolled(threshold = 8): boolean {
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

// nav id 목록은 렌더마다 새 배열이 되면 useEffect가 매번 재실행된다.
// 컴포넌트 바깥에 한 번만 만들어 참조를 고정한다.
const NAV_IDS = nav.map((item) => item.id)

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(NAV_IDS)
  const scrolled = useScrolled()

  // 모바일 메뉴가 열려 있는 동안 배경 스크롤을 잠근다.
  // 이걸 안 하면 메뉴 위에서 스크롤할 때 뒤 페이지가 움직여 어색하다.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // ESC 로 닫기 — 키보드 사용자에게는 사실상 필수 동작이다.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      {/* 스킵 링크: Tab을 처음 눌렀을 때 나타나 본문으로 바로 이동시킨다.
          sr-only 로 숨기고 focus:not-sr-only 로 드러내는 게 표준 패턴. */}
      <a
        href="#main"
        className="bg-accent-600 focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 sr-only focus:rounded-lg focus:px-4 focus:py-2 focus:text-white"
      >
        본문으로 건너뛰기
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          {/* 로고 — 맨 위로 */}
          <a
            href="#top"
            className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100"
          >
            {profile.nameEn.split(' ')[0].toLowerCase()}
            <span className="text-accent-500">.dev</span>
          </a>

          {/* 데스크톱 내비게이션
              섹션이 8개라 md(768px)에서는 로고·토글까지 한 줄에 들어가지 않는다.
              브레이크포인트는 "기기"가 아니라 "레이아웃이 깨지는 지점"에서 잡는다.
              그래서 md가 아니라 lg(1024px)를 기준으로 두었다. */}
          <nav
            aria-label="주요 섹션"
            className="hidden items-center gap-0.5 lg:flex"
          >
            {nav.map((item) => {
              const isActive = active === item.id
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  // aria-current 로 "현재 위치"를 보조기기에도 알린다.
                  aria-current={isActive ? 'true' : undefined}
                  className={`rounded-lg px-2.5 py-2 text-[13px] font-medium transition ${
                    isActive
                      ? 'text-accent-600 dark:text-accent-400'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 lg:hidden dark:border-zinc-800 dark:text-zinc-400"
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 메뉴 패널
          hidden 대신 조건부 렌더를 쓰는 이유: 닫혀 있을 때 링크가 Tab 순서에
          남아 있으면 "보이지 않는 곳으로 포커스가 사라지는" 문제가 생긴다. */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-16 z-40 overflow-y-auto bg-white/95 backdrop-blur-md lg:hidden dark:bg-zinc-950/95"
        >
          <nav aria-label="주요 섹션 (모바일)" className="flex flex-col p-6">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="border-b border-zinc-100 py-4 text-lg font-medium text-zinc-800 dark:border-zinc-900 dark:text-zinc-200"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
