import { profile } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'

/**
 * About — 자기소개 + 숫자 지표
 * ---------------------------------------------------------------------------
 * 글만 있으면 읽히지 않고, 숫자만 있으면 신뢰가 안 간다. 둘을 나란히 둔다.
 */
export function About() {
  return (
    <Section id="about" eyebrow="About" title="어떤 개발자인가요">
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
        {/* 본문 */}
        <div className="space-y-5 text-[15px] leading-[1.85] text-zinc-600 dark:text-zinc-400">
          {profile.bio.map((paragraph, index) => (
            // key로 index를 쓰는 것은 보통 안티패턴이지만,
            // 이 배열은 정적이고 순서가 절대 바뀌지 않으므로 안전하다.
            // 추가/삭제/정렬이 생기는 목록에는 반드시 고유 id를 쓸 것.
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* 숫자 지표 */}
        <dl className="grid grid-cols-3 gap-4 md:grid-cols-1">
          {profile.stats.map((stat) => (
            <div
              key={stat.label}
              className="card flex flex-col justify-center px-4 py-5"
            >
              {/* dt(용어)/dd(설명) 순서가 의미상 맞지만, 화면에서는 값이 위에 와야 한다.
                  order 유틸리티로 시각적 순서만 바꿔 의미와 표현을 분리한다. */}
              <dd className="order-1 font-mono text-2xl font-bold text-zinc-900 tabular-nums dark:text-zinc-50">
                {stat.value}
                {stat.suffix && (
                  <span className="text-accent-500 ml-0.5 text-base font-medium">
                    {stat.suffix}
                  </span>
                )}
              </dd>
              <dt className="order-2 mt-1 text-xs text-zinc-500">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
