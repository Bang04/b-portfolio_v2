import type { ReactNode } from 'react'

interface SectionProps {
  /** DOM id. portfolioData.nav 의 id 와 반드시 일치해야 한다. */
  id: string
  /** 섹션 제목 위에 붙는 작은 라벨 (예: 'ABOUT') */
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

/**
 * 모든 섹션의 공통 껍데기
 * ---------------------------------------------------------------------------
 * 왜 이런 래퍼를 만드나?
 *  - 섹션 6개에 상하 여백·최대폭·제목 타이포를 매번 손으로 적으면
 *    반드시 한 곳이 어긋난다. 여백 불일치는 아마추어처럼 보이는 1순위 원인이다.
 *  - 나중에 "모든 섹션 여백을 조금 줄이자"는 요청이 오면 이 파일만 고치면 된다.
 *
 * 접근성 포인트
 *  - aria-labelledby 로 섹션과 그 제목을 연결하면
 *    스크린리더가 "About 영역" 처럼 읽어준다. 랜드마크 탐색이 가능해진다.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
}: SectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`border-t border-zinc-100 py-20 sm:py-28 dark:border-zinc-900 ${className}`}
    >
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-12 max-w-2xl">
          <p className="text-accent-600 dark:text-accent-400 mb-3 font-mono text-xs font-medium tracking-[0.2em] uppercase">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
