import type { ComponentType } from 'react'
import { BookOpen, Flag, GitMerge, Puzzle, Ruler, Shield } from 'lucide-react'
import { principles } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'
import type { PrincipleIconName } from '@/types'

/**
 * 아이콘 이름(데이터) → 컴포넌트(화면) 매핑
 * Record 타입이므로 새 아이콘 이름을 타입에 추가하면
 * 여기를 채울 때까지 컴파일이 통과되지 않는다.
 */
const PRINCIPLE_ICONS: Record<
  PrincipleIconName,
  ComponentType<{ size?: number; className?: string }>
> = {
  ruler: Ruler,
  shield: Shield,
  puzzle: Puzzle,
  merge: GitMerge,
  book: BookOpen,
  flag: Flag,
}

/**
 * Engineering Principles
 * ---------------------------------------------------------------------------
 * 이 섹션이 실패하는 방식은 정해져 있다 — "좋은 말 모음"이 되는 것이다.
 * "테스트를 잘 짜자", "가독성이 중요하다" 같은 문장은 누구나 동의하지만
 * 아무것도 증명하지 못한다. 원칙은 그것을 지키느라 무언가를 포기한 사례가
 * 붙어 있을 때만 정보가 된다.
 *
 * 그래서 타입 단계에서 `evidence` 를 필수로 뒀고, 화면에서도 근거를 접지 않고
 * 항상 함께 보여준다. 근거를 못 쓰겠는 원칙은 애초에 내 원칙이 아니라는 뜻이다.
 */
export function EngineeringPrinciples() {
  return (
    <Section
      id="principles"
      eyebrow="Engineering Principles"
      title="일할 때 지키는 것들"
      description="좋은 말은 누구나 할 수 있어서, 각 항목마다 실제로 그렇게 한 사례를 함께 적었습니다."
    >
      <ol className="grid gap-4 sm:grid-cols-2">
        {principles.map((principle, index) => {
          const Icon = PRINCIPLE_ICONS[principle.icon]
          return (
            <li key={principle.id} className="card flex flex-col p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <span className="bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-400 inline-flex size-9 shrink-0 items-center justify-center rounded-xl">
                  <Icon size={17} />
                </span>
                <span className="font-mono text-xs text-zinc-300 tabular-nums dark:text-zinc-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* 원칙 문장은 명령형 한 줄로. 서술형("~하려고 노력합니다")은
                  기억에 남지 않고, 지켰는지 여부도 판정할 수 없다. */}
              <h3 className="text-[15.5px] leading-snug font-bold">
                {principle.title}
              </h3>

              <p className="mt-2.5 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {principle.body}
              </p>

              {/* mt-auto: 카드 높이가 달라도 근거 블록을 바닥에 정렬시킨다. */}
              <div className="mt-auto pt-5">
                <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/40">
                  <p className="mb-1.5 font-mono text-[10.5px] font-semibold tracking-wider text-zinc-400 uppercase">
                    실제로 이렇게 했습니다
                  </p>
                  <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {principle.evidence}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
