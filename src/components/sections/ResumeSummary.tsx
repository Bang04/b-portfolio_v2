import { ArrowRight, Check, Download, Minus } from 'lucide-react'
import { profile, resume } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'

/**
 * Resume Summary — 이력서 한 장 요약
 * ---------------------------------------------------------------------------
 * 왜 이 섹션이 필요한가
 *  포트폴리오를 처음부터 끝까지 읽는 사람은 거의 없다. 대부분은 Hero에서
 *  훑고, 관심이 가면 한두 섹션을 열어 보고, "그래서 이 사람 뭘 할 줄 아는가"를
 *  스스로 요약해야 하는 상태로 끝난다. 그 요약을 독자에게 맡기면 대개
 *  가장 인상적인 한 줄만 남고 나머지는 사라진다. 그래서 내가 직접 적는다.
 *
 * Hero와 중복이 아닌 이유
 *  Hero는 "3초 안에 남길 인상"이고 여기는 "이력서에 옮겨 적을 수 있는 사실"이다.
 *  Hero의 키워드는 단어 + 숫자 한 조각이지만, 여기 highlights는 그대로 복사해
 *  붙여 넣을 수 있는 완성된 문장이다. 그래서 이 블록만 문장이 길다.
 *
 * 왜 하필 Experience(11) 바로 앞인가
 *  이력서의 문법을 그대로 따랐다 — 맨 위 요약문, 그 아래 경력 상세.
 *  요약을 읽고 "더 볼 만하다"고 판단한 사람만 아래로 내려가면 된다.
 *  뒤에 두면 이미 상세를 다 읽은 사람에게 같은 말을 반복하는 꼴이 된다.
 *
 * 레이아웃 원칙
 *  이 섹션은 "읽는" 곳이 아니라 "스캔하는" 곳이다. 그래서 다른 섹션과 달리
 *  카드 안에 긴 문단을 넣지 않고, 왼쪽에 사실/역량, 오른쪽에 성과 불릿을
 *  나란히 두어 눈이 한 번에 훑고 지나가게 만들었다.
 */
export function ResumeSummary() {
  const { headline, facts, strengths, highlights, gaps } = resume

  return (
    <Section
      id="resume"
      eyebrow="Resume Summary"
      title="한 장으로 요약하면"
      description="위 섹션들에서 근거를 밝힌 내용만 모았습니다. 여기 처음 등장하는 성과는 없습니다."
    >
      {/* ── 요약문 ──────────────────────────────────────────────────────
          max-w-3xl: 한 줄이 너무 길면 다음 줄 첫 글자를 찾는 데 눈이
          되돌아가야 한다. 읽기 편한 한 줄은 대략 45~75자다. */}
      <p className="mb-10 max-w-3xl text-[15.5px] leading-[1.9] text-zinc-700 dark:text-zinc-300">
        {headline}
      </p>

      {/* ── 사실 요약 ───────────────────────────────────────────────────
          dl(정의 목록)을 쓴 이유: 이건 "용어 → 값" 구조라서 의미상 정확하고,
          스크린리더도 짝으로 읽어준다. div 두 개로 만들면 그 관계가 사라진다. */}
      <dl className="mb-14 grid gap-x-6 gap-y-5 border-y border-zinc-100 py-6 sm:grid-cols-2 lg:grid-cols-4 dark:border-zinc-900">
        {facts.map((fact) => (
          <div key={fact.term}>
            <dt className="font-mono text-[10.5px] tracking-wider text-zinc-400 uppercase">
              {fact.term}
            </dt>
            <dd className="mt-1.5 text-[13.5px] leading-snug text-zinc-700 dark:text-zinc-300">
              {fact.desc}
            </dd>
          </div>
        ))}
      </dl>

      {/* ── 핵심 역량 + 대표 성과 ───────────────────────────────────────
          두 블록을 세로로 쌓지 않고 나란히 둔다. 성격이 다른 정보를
          위아래로 두면 아래쪽은 "부록"으로 읽히는데, 여기서는 둘 다
          같은 무게여야 한다. lg 미만에서는 한 줄에 둘 다 넣을 폭이
          안 나오므로 그때만 세로로 떨어진다. */}
      <div className="grid gap-x-12 gap-y-14 lg:grid-cols-2">
        {/* 핵심 역량 -------------------------------------------------- */}
        <div>
          <h3 className="mb-5 text-lg font-bold tracking-tight">핵심 역량</h3>
          <ul className="space-y-4">
            {strengths.map((strength) => (
              <li key={strength.id} className="card p-5">
                <p className="text-accent-700 dark:text-accent-400 text-[14px] font-bold">
                  {strength.label}
                </p>
                {/* 역량 이름 아래에 반드시 근거가 붙는다.
                    타입이 evidence를 필수로 요구하므로 근거 없는 역량은
                    애초에 데이터로 존재할 수 없다 — 화면에서 방어할 필요가 없다. */}
                <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {strength.evidence}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* 대표 성과 -------------------------------------------------- */}
        <div>
          <h3 className="mb-2 text-lg font-bold tracking-tight">대표 성과</h3>
          <p className="mb-5 text-[12.5px] text-zinc-500">
            이력서에 그대로 옮겨 적을 수 있는 형태로 썼습니다.
          </p>
          <ul className="space-y-3.5">
            {highlights.map((item) => (
              <li
                key={item.id}
                className="flex gap-3 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400"
              >
                <Check
                  size={14}
                  aria-hidden="true"
                  className="text-accent-500 mt-[0.35em] shrink-0"
                />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── 아직 없는 것 ────────────────────────────────────────────────
          점선 테두리 + 낮은 대비로 "본문보다 한 단계 아래"임을 표시한다.
          숨기지 않되 강조하지도 않는다는 뜻이다. 아이콘도 체크(✓)가 아니라
          빼기(−)를 쓴다 — 같은 목록 모양에 같은 아이콘을 쓰면
          훑는 사람에게는 성과 목록이 하나 더 있는 것처럼 보인다. */}
      <div className="mt-16 rounded-2xl border border-dashed border-zinc-300 p-6 sm:p-7 dark:border-zinc-700">
        <h3 className="text-[15px] font-bold">아직 해보지 않은 것</h3>
        <p className="mt-2 mb-5 max-w-2xl text-[13px] leading-relaxed text-zinc-500">
          요약은 과장이 가장 쉽게 스며드는 자리라, 경계선을 같은 화면에
          적어 둡니다. 면접에서 "이건 안 해보셨죠?"를 먼저 말하는 쪽이
          언제나 유리하다고 생각합니다.
        </p>
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {gaps.map((gap) => (
            <li key={gap.id} className="flex gap-2.5">
              <Minus
                size={13}
                aria-hidden="true"
                className="mt-[0.4em] shrink-0 text-zinc-400"
              />
              <div>
                <p className="text-[13.5px] font-semibold text-zinc-700 dark:text-zinc-300">
                  {gap.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                  {gap.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ── 다음 행동 ───────────────────────────────────────────────────
          요약을 다 읽은 사람에게 갈 곳을 준다. 두 개까지만 둔다 —
          같은 무게의 선택지가 셋을 넘으면 아무것도 누르지 않는다. */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <a
          href={profile.resumeUrl}
          download
          className="bg-accent-600 hover:bg-accent-700 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition"
        >
          <Download size={15} aria-hidden="true" />
          이력서 (PDF)
        </a>
        <a
          href="#experience"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          경력 상세 보기
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </Section>
  )
}
