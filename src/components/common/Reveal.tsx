import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export const REVEAL_EASE = [0.21, 0.47, 0.32, 0.98] as const
export const REVEAL_VIEWPORT = { once: true, margin: '-10% 0px' } as const

/**
 * Reveal — 스크롤로 들어올 때 한 번만 떠오르는 연출
 * ---------------------------------------------------------------------------
 * 급경사지 프로젝트 섹션(Timeline · Featured Project · About)과 Other
 * Projects의 스크린샷 갤러리처럼 스크롤이 유독 긴 곳에만 쓴다. 애니메이션이
 * 그 길이를 지루하지 않게 끊어주는 역할을 하는 곳에만 넣고, 짧은 섹션에는
 * 넣지 않는다. 전역에 뿌리면 장식이 목적을 잃고 반복되는 틱이 된다.
 *
 * viewport.once = true 인 이유: 스크롤을 오르내릴 때마다 다시 실행되면
 * "한 번 봤던 걸 계속 다시 본다"는 피로감만 남긴다. 처음 등장할 때 한 번이
 * 이 연출의 전제다.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.55, delay, ease: REVEAL_EASE }}
    >
      {children}
    </motion.div>
  )
}
