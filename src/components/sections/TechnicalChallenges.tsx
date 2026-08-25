import { ChevronRight } from 'lucide-react'
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

/**
 * Challenge 카드 — <details>/<summary> 아코디언
 * ---------------------------------------------------------------------------
 * 이전에는 12장을 2열 그리드에 전부 펼쳐 두었다. 카드 하나가 Problem·
 * Approach·Result 세 문단이라, 펼친 채로 12개면 스크롤이 한 화면 반을
 * 넘어가고 "지금 몇 번째를 읽고 있는지"조차 놓치기 쉬웠다.
 *
 * 그래서 FeaturedProject의 ArchitectureCard와 같은 패턴을 그대로 가져왔다 —
 * 접었을 때는 제목·태그·요약(result 한 줄)만 보이고, 펼쳐야 본문이 드러난다.
 * 같은 상호작용을 이미 한 번 만들어 뒀는데 여기서 새로 발명하면, 사이트
 * 안에 "펼치는 방법"이 두 가지가 되어 오히려 일관성이 깨진다.
 *
 * 네이티브 <details>를 쓰는 이유는 ArchitectureCard와 동일하다 — 키보드
 * 조작·Ctrl+F 검색 시 자동 펼침·aria-expanded 를 브라우저가 대신해 준다.
 *
 * 첫 카드만 defaultOpen인 이유: 접힌 채로 시작하면 "이게 펼쳐지는 카드"라는
 * 사실 자체를 못 알아챌 수 있다. 하나를 열어 신호를 준다.
 */
function ChallengeCard({
  challenge,
  index,
  defaultOpen,
}: {
  challenge: Challenge
  index: number
  defaultOpen: boolean
}) {
  return (
    <li>
      <details open={defaultOpen} className="card group/details p-0">
        <summary className="flex cursor-pointer list-none items-start gap-3 p-5">
          <ChevronRight
            size={16}
            aria-hidden="true"
            className="text-accent-500 mt-1 shrink-0 transition-transform duration-200 group-open/details:rotate-90"
          />

          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {/* tabular-nums: 숫자 폭을 고정해 01, 02… 가 세로로 정렬되게 한다. */}
              <span className="font-mono text-xs text-zinc-300 tabular-nums dark:text-zinc-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="chip font-mono text-[10.5px]! tracking-wide">
                {TAG_LABELS[challenge.tag]}
              </span>
            </div>

            <h3 className="text-[15px] leading-snug font-bold">
              {challenge.title}
            </h3>

            {/* 접혔을 때도 결과 한 줄은 보이게 한다 — "펼쳐야만 성과를 알 수
                있는" 카드는 스캔하는 사람이 그냥 지나치기 쉽다. */}
            <p className="group-open/details:hidden mt-1.5 line-clamp-1 text-[12.5px] text-zinc-500">
              {challenge.result}
            </p>
          </div>
        </summary>

        {/* id를 접힌 본문 쪽에 둔 이유: Principles의 근거 링크(#ch-isolation 등)로
            들어왔을 때, 이 요소가 <details> 안의 "펼쳐야 보이는" 영역이라
            브라우저가 조상 <details>를 자동으로 열어준다(HTML 표준의 fragment
            reveal 동작). id를 summary나 details 자체에 두면 이 효과가 없다. */}
        <div
          id={challenge.id}
          className="scroll-mt-32 space-y-3.5 border-t border-zinc-100 px-5 pt-5 pb-5 dark:border-zinc-800"
        >
          <Block label="Problem · 무엇이 문제였나" text={challenge.problem} />
          <Block label="Approach · 어떻게 접근했나" text={challenge.approach} />
          <Block label="Result · 무엇이 달라졌나" text={challenge.result} emphasis />

          <ul className="flex flex-wrap gap-1.5 pt-1">
            {challenge.keywords.map((keyword) => (
              <li
                key={keyword}
                className="rounded-md bg-zinc-50 px-2 py-0.5 font-mono text-[10.5px] text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400"
              >
                {keyword}
              </li>
            ))}
          </ul>
        </div>
      </details>
    </li>
  )
}

export function TechnicalChallenges() {
  return (
    <Section
      id="challenges"
      eyebrow="Technical Challenges"
      title="기술적으로 막혔던 지점들"
      description={`총 ${challenges.length}건. 제목 옆 태그로 먼저 스캔하고, 필요한 카드만 펼쳐서 "무엇이 문제였나 → 어떻게 판단했나 → 무엇이 달라졌나"를 확인하세요. 성능 관련 개선은 다음 섹션에서 따로 다룹니다.`}
    >
      <ol className="space-y-3">
        {challenges.map((challenge, index) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            index={index}
            defaultOpen={index === 0}
          />
        ))}
      </ol>
    </Section>
  )
}
