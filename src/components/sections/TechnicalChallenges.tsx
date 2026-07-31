import { challenges } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'
import type { Challenge, ChallengeTag } from '@/types'

/**
 * 태그 라벨
 * ---------------------------------------------------------------------------
 * 색으로 분류를 표현하지 않고 텍스트 라벨을 쓴다.
 * 태그가 8종이면 색으로는 절대 구분되지 않는다 — 사람이 기억할 수 있는
 * 색-의미 매핑은 대여섯 개가 한계고, 그마저도 색각 이상 사용자에겐 무의미하다.
 * 분류가 많아지는 순간 색은 정보가 아니라 장식이 된다.
 */
const TAG_LABELS: Record<ChallengeTag, string> = {
  architecture: 'Architecture',
  map: 'Map',
  state: 'State',
  form: 'Form',
  data: 'Data',
  component: 'Component',
  parsing: 'Parsing',
  infra: 'Infra',
}

/**
 * 문제 → 접근 → 결과 세 블록
 * ---------------------------------------------------------------------------
 * 라벨을 화면에 그대로 드러내는 이유:
 * 읽는 사람이 "이 문단이 상황인지 해결인지"를 추론하지 않아도 되게 하려고.
 * 기술 글에서 독자를 잃는 가장 흔한 지점이 "지금 무슨 얘기 중이지?"다.
 */
function Block({
  label,
  text,
  emphasis = false,
}: {
  label: string
  text: string
  emphasis?: boolean
}) {
  return (
    <div>
      <p
        className={`mb-1 font-mono text-[10.5px] font-semibold tracking-wider uppercase ${
          emphasis
            ? 'text-accent-600 dark:text-accent-400'
            : 'text-zinc-400 dark:text-zinc-500'
        }`}
      >
        {label}
      </p>
      <p
        className={`text-[13.5px] leading-relaxed ${
          emphasis
            ? 'font-medium text-zinc-800 dark:text-zinc-200'
            : 'text-zinc-600 dark:text-zinc-400'
        }`}
      >
        {text}
      </p>
    </div>
  )
}

function ChallengeCard({
  challenge,
  index,
}: {
  challenge: Challenge
  index: number
}) {
  return (
    <li className="card flex flex-col p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        {/* tabular-nums: 숫자 폭을 고정해 01, 02… 가 세로로 정렬되게 한다.
            비례폭 폰트에서 1은 좁고 0은 넓어 그냥 두면 미세하게 어긋난다. */}
        <span className="font-mono text-xs text-zinc-300 tabular-nums dark:text-zinc-700">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="chip font-mono text-[10.5px]! tracking-wide">
          {TAG_LABELS[challenge.tag]}
        </span>
      </div>

      <h3 className="mb-4 text-[15px] leading-snug font-bold">
        {challenge.title}
      </h3>

      <div className="space-y-3.5">
        <Block label="Problem · 무엇이 문제였나" text={challenge.problem} />
        <Block label="Approach · 어떻게 접근했나" text={challenge.approach} />
        <Block label="Result · 무엇이 달라졌나" text={challenge.result} emphasis />
      </div>

      {/* mt-auto: 카드 높이가 서로 달라도 키워드 줄을 바닥에 정렬시킨다. */}
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {challenge.keywords.map((keyword) => (
          <li
            key={keyword}
            className="rounded-md bg-zinc-50 px-2 py-0.5 font-mono text-[10.5px] text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400"
          >
            {keyword}
          </li>
        ))}
      </ul>
    </li>
  )
}

export function TechnicalChallenges() {
  return (
    <Section
      id="challenges"
      eyebrow="Technical Challenges"
      title="기술적으로 막혔던 지점들"
      description={`총 ${challenges.length}건. 각 항목은 "무엇이 문제였나 → 어떻게 판단했나 → 무엇이 달라졌나" 순서로 정리했습니다. 성능 관련 개선은 다음 섹션에서 따로 다룹니다.`}
    >
      <ol className="grid gap-4 sm:grid-cols-2">
        {challenges.map((challenge, index) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            index={index}
          />
        ))}
      </ol>
    </Section>
  )
}
