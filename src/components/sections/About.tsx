import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'
import { Reveal } from '@/components/common/Reveal'

/**
 * About — 자기소개 + 작업 원칙
 * ---------------------------------------------------------------------------
 * "어떻게 일하는가"만 말한다. 무엇을 만들었는지(숫자·기술 스택)는 Hero와
 * Featured Project가 이미 말하므로 여기서 반복하지 않는다.
 * 작업 원칙은 구 Engineering Principles 섹션을 접어온 것이다.
 */
export function About() {
  return (
    <Section id="about" eyebrow="About" title="어떤 개발자인가요">
      {/* 본문 */}
      <div className="max-w-2xl space-y-5 text-[15px] leading-[1.85] text-zinc-600 dark:text-zinc-400">
        {profile.bio.map((paragraph, index) => (
          // key로 index를 쓰는 것은 보통 안티패턴이지만,
          // 이 배열은 정적이고 순서가 절대 바뀌지 않으므로 안전하다.
          // 추가/삭제/정렬이 생기는 목록에는 반드시 고유 id를 쓸 것.
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* 작업 원칙 ---------------------------------------------------------
          예전엔 별도 섹션(Engineering Principles)이었다. 원칙만 따로 늘어
          놓으면 자기소개서 문장이 되므로, 각 항목이 근거(딥다이브/limits)로
          가는 링크를 반드시 데리고 있다 — 좋은 말이 아니라 검증 가능한
          주장으로 남기려는 목적이다. */}
      <ol className="mt-12 grid gap-4 sm:grid-cols-3">
        {profile.workingStyle.map((principle, index) => (
          <Reveal key={principle.id} delay={index * 0.06}>
            <li className="card flex h-full flex-col p-6">
              <span className="font-mono text-xs text-zinc-300 tabular-nums dark:text-zinc-700">
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3 className="mt-2 text-[15.5px] leading-snug font-bold">
                {principle.title}
              </h3>

              <p className="mt-2.5 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {principle.body}
              </p>

              <div className="mt-auto pt-5">
                <a
                  href={principle.evidenceRef.href}
                  className="group/evidence inline-flex items-center gap-1.5 rounded-xl bg-zinc-50 px-3.5 py-2.5 text-[12.5px] font-medium text-zinc-600 transition hover:bg-zinc-100 dark:bg-zinc-800/40 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                  <span className="font-mono text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                    근거
                  </span>
                  {principle.evidenceRef.label}
                  <ArrowUpRight
                    size={12}
                    aria-hidden="true"
                    className="text-zinc-400 transition group-hover/evidence:text-accent-500"
                  />
                </a>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
