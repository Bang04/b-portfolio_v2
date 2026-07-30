import { useCallback, useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import type { ThemeMode } from '@/types'

const STORAGE_KEY = 'theme'

/**
 * 현재 테마를 읽는다.
 * ---------------------------------------------------------------------------
 * "상태의 출처(source of truth)"를 <html class="dark"> 로 삼는 게 핵심이다.
 * index.html 의 인라인 스크립트가 이미 클래스를 붙여놨으므로,
 * React는 그 결과를 *읽기만* 하면 된다. 그래야 화면과 상태가 어긋나지 않는다.
 *
 * useState의 초기값을 함수로 넘긴 이유(lazy initializer):
 * 값으로 넘기면 매 렌더마다 DOM을 읽는 낭비가 생긴다.
 */
function readTheme(): ThemeMode {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeMode>(readTheme)

  // theme 상태가 바뀔 때마다 DOM 클래스와 localStorage를 동기화한다.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // 시크릿 모드 등에서 쓰기가 막힐 수 있다. 저장 실패가 토글을 막아선 안 된다.
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      // 아이콘만 있는 버튼은 스크린리더가 읽을 텍스트가 없다.
      // aria-label 은 "옵션"이 아니라 필수다.
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={isDark}
      title={isDark ? '라이트 모드' : '다크 모드'}
      className={`inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 ${className}`}
    >
      {/* 아이콘을 조건부로 하나만 렌더하지 않고 둘 다 두고 회전/투명도로 전환하면
          레이아웃 흔들림 없이 부드럽게 바뀐다. (grid로 같은 칸에 겹쳐 배치) */}
      <span className="grid place-items-center">
        <Sun
          size={17}
          className={`col-start-1 row-start-1 transition-all duration-300 ${
            isDark ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0'
          }`}
        />
        <Moon
          size={17}
          className={`col-start-1 row-start-1 transition-all duration-300 ${
            isDark ? 'scale-100 rotate-0' : 'scale-50 -rotate-90 opacity-0'
          }`}
        />
      </span>
    </button>
  )
}
