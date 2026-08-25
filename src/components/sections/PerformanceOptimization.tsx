import { ArrowRight, CircleDot, Search, Wrench } from 'lucide-react'
import { performanceSpec } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'
import type { PerfCase, PerfMetric } from '@/types'

/**
 * 개선 수치 배지
 * ---------------------------------------------------------------------------
 * before → after → delta 를 한 줄에 붙여 보여준다.
 * "after"만 크게 쓰고 싶은 유혹이 있지만, 개선은 언제나 **차이**이지
 * 도달점이 아니다. before를 지우는 순간 그 숫자는 검증 불가능해진다.
 *
 * tabular-nums: 숫자 폭 고정. 3,479.82 같은 값에서 자릿수가 흔들리지 않게 한다.
 */
function MetricBadge({ metric }: { metric: PerfMetric }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/40">
      <p className="mb-2.5 text-[11.5px] font-medium text-zinc-500">
        {metric.label}
      </p>

      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="font-mono text-[15px] text-zinc-400 line-through decoration-zinc-300 tabular-nums dark:decoration-zinc-600">
          {metric.before}
        </span>
        <ArrowRight
          size={13}
          aria-hidden="true"
          className="shrink-0 text-zinc-300 dark:text-zinc-600"
        />
        <span className="text-accent-600 dark:text-accent-400 font-mono text-lg font-bold tabular-nums">
          {metric.after}
        </span>
      </div>

      <p className="mt-2 font-mono text-[11.5px] font-semibold text-emerald-600 dark:text-emerald-400">
        {metric.delta}
      </p>
    </div>
  )
}

/** 아이콘 + 제목 + 항목 목록 (원인 / 해결 공용) */
function StepList({
  icon: Icon,
  label,
  items,
}: {
  icon: typeof Search
  label: string
  items: string[]
}) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 font-mono text-[10.5px] font-semibold tracking-wider text-zinc-400 uppercase">
        <Icon size={11} aria-hidden="true" />
        {label}
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            <CircleDot
              size={11}
              aria-hidden="true"
              className="mt-[0.35em] shrink-0 text-zinc-300 dark:text-zinc-700"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PerfCaseCard({ perfCase }: { perfCase: PerfCase }) {
  return (
    // scroll-mt-32: Principles의 근거 링크(#perf-splitting 등)로 바로 이동할 때
    // 고정 헤더에 제목이 가리지 않도록 여백을 둔다.
    <article id={perfCase.id} className="card scroll-mt-32 p-6">
      <h3 className="text-[16px] leading-snug font-bold">{perfCase.title}</h3>
      <p className="mt-2.5 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {perfCase.situation}
      </p>

      {/* 넓은 화면에서는 본문(원인·해결)과 수치를 나란히 둔다.
          수치가 위나 아래로 밀리면 "무엇이 얼마나 좋아졌는지"를
          본문을 다 읽고 나서야 알게 된다. 결론은 옆에 있어야 한다. */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          <StepList icon={Search} label="Cause · 원인" items={perfCase.causes} />
          <StepList
            icon={Wrench}
            label="Solution · 해결"
            items={perfCase.solutions}
          />
        </div>

        <div className="space-y-4">
          <MetricBadge metric={perfCase.metric} />

          {/* 검증 방법 — 이 블록이 없으면 위 숫자는 그냥 주장이다. */}
          <div className="border-accent-300 dark:border-accent-500/40 border-l-2 pl-4">
            <p className="text-accent-700 dark:text-accent-400 mb-1.5 font-mono text-[10.5px] font-semibold tracking-wider uppercase">
              Verified · 어떻게 검증했나
            </p>
            <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {perfCase.verification}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export function PerformanceOptimization() {
  return (
    <Section
      id="performance"
      eyebrow="Performance"
      title="성능 개선"
      description="검증 방법을 적을 수 없는 항목은 이 섹션에 넣지 않았습니다. 측정하지 않은 개선은 개선이라고 부를 수 없기 때문입니다."
    >
      <div className="space-y-5">
        {performanceSpec.cases.map((perfCase) => (
          <PerfCaseCard key={perfCase.id} perfCase={perfCase} />
        ))}
      </div>

      {/* ── 아직 못 한 것 ────────────────────────────────────────────────
          이 블록을 넣을지 오래 고민했지만, 넣는 쪽이 맞다고 판단했다.
          "가상화 경험 있나요?"는 어차피 물어볼 질문이다. 먼저 답해두면
          솔직함의 근거가 되고, 감췄다가 들키면 위의 숫자까지 의심받는다. */}
      <div className="mt-10 rounded-2xl border border-dashed border-zinc-300 p-6 dark:border-zinc-700">
        <h3 className="text-[15px] font-bold">아직 적용하지 못한 것들</h3>
        <p className="mt-1.5 text-[13px] text-zinc-500">
          이 프로젝트에서 다루지 못한 영역입니다. 다음 과제로 기록해 둡니다.
        </p>

        <dl className="mt-5 grid gap-5 sm:grid-cols-3">
          {performanceSpec.notYet.map((item) => (
            <div key={item.title}>
              <dt className="text-[13.5px] font-semibold text-zinc-700 dark:text-zinc-300">
                {item.title}
              </dt>
              <dd className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
                {item.reason}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
