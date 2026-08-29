import { Info, Lightbulb } from 'lucide-react'
import { motion } from 'framer-motion'
import { timeline } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'
import { REVEAL_EASE, REVEAL_VIEWPORT } from '@/components/common/Reveal'
import type { TimelineWeek } from '@/types'

/**
 * Development Timeline
 * ---------------------------------------------------------------------------
 * 이 섹션이 실패하는 방식은 하나다 — 작업 로그가 되는 것.
 * "1주차: A 구현 / 2주차: B 구현"은 읽는 사람에게 아무것도 남기지 않는다.
 * 그건 이력서가 아니라 커밋 로그의 요약본이다.
 *
 * 그래서 카드마다 `learned` 블록을 항상 펼쳐 둔다.
 * 무엇을 했는지(work)는 근거고, 생각이 어떻게 바뀌었는지(learned)가 주장이다.
 * 근거만 나열하면 성실해 보이고, 주장까지 있어야 판단력이 보인다.
 *
 * 레이아웃 원칙
 *  - 세로 레일 하나로 6주를 꿰어 "끊긴 6개"가 아니라 "이어진 하나"로 읽히게 한다.
 *  - 레일은 순수 장식이므로 aria-hidden. 순서 정보는 <ol>이 이미 갖고 있다.
 */

function WeekCard({ week }: { week: TimelineWeek }) {
  return (
    // relative + pl: 왼쪽 레일(부모의 border-l) 바깥으로 점을 걸치기 위한 기준점
    // motion.li: 6주치 카드가 세로로 길게 늘어서 있어, 전부 한 번에 보여주면
    // 스크롤이 그냥 문서 읽기가 된다. 카드가 뷰포트에 들어올 때마다 한 번씩
    // 떠오르게 해 "한 주 한 주 지나간다"는 리듬을 스크롤 자체에 실었다.
    <motion.li
      className="relative pb-10 pl-8 last:pb-0 sm:pl-10"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.55, ease: REVEAL_EASE }}
    >
      {/* 타임라인 점 -----------------------------------------------------
          -left-[7px]: 부모의 1px 레일 위에 14px 점의 중심을 맞춘다.
          (레일 두께 1 - 점 지름 14) / 2 = -6.5 → 반올림 -7 */}
      <span
        aria-hidden="true"
        className="border-accent-400 dark:border-accent-500 absolute top-1.5 -left-[7px] size-3.5 rounded-full border-2 bg-white dark:bg-zinc-950"
      />

      <div className="mb-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="text-accent-600 dark:text-accent-400 font-mono text-[11px] font-semibold tracking-[0.15em] uppercase">
          {week.label}
        </span>
        <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
          ·
        </span>
        <span className="text-[11.5px] font-medium text-zinc-500">
          {week.phase}
        </span>
      </div>

      <h3 className="text-[17px] leading-snug font-bold">{week.title}</h3>

      <ul className="mt-4 space-y-2">
        {week.work.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400"
          >
            <span
              aria-hidden="true"
              className="mt-[0.62em] size-1 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* 배운 것 ---------------------------------------------------------
          이 블록이 타임라인을 '작업 로그'와 '성장 스토리'로 가른다.
          접어두지 않는 이유: 접히는 순간 아무도 안 읽고,
          그러면 위의 work 목록만 남아 결국 작업 로그가 된다. */}
      <div className="border-accent-300 dark:border-accent-500/40 mt-5 rounded-r-lg border-l-2 bg-zinc-50 py-3.5 pr-4 pl-4 dark:bg-zinc-800/40">
        <p className="text-accent-700 dark:text-accent-400 mb-1.5 flex items-center gap-1.5 font-mono text-[10.5px] font-semibold tracking-wider uppercase">
          <Lightbulb size={11} aria-hidden="true" />
          이 주에 배운 것
        </p>
        <p className="text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
          {week.learned}
        </p>
      </div>

      {/* 근거가 없는 부분에 대한 표기.
          비워두고 싶은 유혹이 크지만, 확인되지 않은 구간을 스스로 밝히는 쪽이
          나머지 주차 전체의 신뢰도를 올린다. */}
      {week.note && (
        <p className="mt-3 flex gap-2 text-[12px] leading-relaxed text-zinc-500">
          <Info size={12} aria-hidden="true" className="mt-0.5 shrink-0" />
          <span>{week.note}</span>
        </p>
      )}
    </motion.li>
  )
}

export function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="Development Timeline"
      title="6주 동안 무엇이 바뀌었나"
      description="각 주의 “배운 것”이 다음 주에 한 일의 이유가 되도록 정리했습니다. 주차 구분은 실제 날짜가 아니라 작업의 전환점을 기준으로 나눈 것이며, 담긴 사실은 모두 커밋 로그에서 확인된 내용입니다."
    >
      {/* border-l 이 세로 레일 역할을 한다. 별도 요소를 두지 않아
          카드가 늘거나 줄어도 레일 길이가 자동으로 따라온다. */}
      <ol className="ml-1 border-l border-zinc-200 dark:border-zinc-800">
        {timeline.map((week) => (
          <WeekCard key={week.id} week={week} />
        ))}
      </ol>
    </Section>
  )
}
