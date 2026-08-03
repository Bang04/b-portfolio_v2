import type { ComponentType, ReactNode } from 'react'
import {
  AlertTriangle,
  ArrowDown,
  ChevronRight,
  Code,
  Database,
  ExternalLink,
  FileText,
  Layers,
  Map,
  Server,
  Target,
  Wrench,
} from 'lucide-react'
import { featuredProject } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'
import { ArchitectureDiagram } from '@/components/common/ArchitectureDiagram'
import { GithubIcon } from '@/components/common/BrandIcons'
import type { BrandIconProps } from '@/components/common/BrandIcons'
import type {
  ArchitectureLayer,
  ProjectGoal,
  ProjectLinkType,
  SkillIconName,
  SkillLevel,
} from '@/types'

/* ---------------------------------------------------------------------------
 * 이름(데이터) → 컴포넌트(화면) 매핑
 * ---------------------------------------------------------------------------
 * portfolioData.ts 가 lucide-react 를 직접 import 하지 않도록 문자열로 한 단계
 * 끊어둔다. 덕분에 데이터 파일은 순수 데이터로 남고, 나중에 JSON이나 API로
 * 옮겨도 그대로 동작한다. Record 타입이라 새 이름을 추가하면 여기를 채울
 * 때까지 컴파일이 통과되지 않는다 — 매핑 누락을 런타임에 발견할 일이 없다.
 * ------------------------------------------------------------------------- */
const CATEGORY_ICONS: Record<
  SkillIconName,
  ComponentType<{ size?: number; className?: string }>
> = {
  code: Code,
  layers: Layers,
  database: Database,
  server: Server,
  map: Map,
  wrench: Wrench,
}

const LINK_META: Record<
  ProjectLinkType,
  { label: string; icon: ComponentType<BrandIconProps> }
> = {
  demo: { label: 'Live Demo', icon: ExternalLink },
  github: { label: 'GitHub', icon: GithubIcon },
  article: { label: '관련 글', icon: FileText },
}

/**
 * 숙련도별 스타일과 라벨
 * ---------------------------------------------------------------------------
 * 색만으로 구분하지 않고 라벨(툴팁)도 함께 제공한다.
 * 색각 이상(color blindness) 사용자에게 색은 정보가 되지 못한다 — WCAG 1.4.1.
 */
const LEVEL_STYLES: Record<SkillLevel, { className: string; label: string }> = {
  core: {
    className:
      'bg-accent-50 text-accent-700 ring-1 ring-accent-200 dark:bg-accent-500/15 dark:text-accent-300 dark:ring-accent-500/30',
    label: '주력 — 이 프로젝트에서 주도적으로 사용',
  },
  working: {
    className:
      'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-300',
    label: '실제로 붙여서 동작시킴',
  },
  learning: {
    className:
      'bg-transparent text-zinc-500 ring-1 ring-dashed ring-zinc-300 dark:text-zinc-500 dark:ring-zinc-700',
    label: '일부만 사용 / 학습 중',
  },
}

/* ---------------------------------------------------------------------------
 * 하위 섹션 껍데기
 * ---------------------------------------------------------------------------
 * Featured Project 안에만 5개 블록이 들어간다. 매번 제목 마크업을 손으로 적으면
 * 반드시 한 곳이 어긋나므로 여기서 한 번만 정의한다.
 * Section(h2) 아래에 오므로 제목 레벨은 h3다 — 시각적 크기가 아니라
 * 문서 구조를 기준으로 정해야 스크린리더의 목차 탐색이 망가지지 않는다.
 * ------------------------------------------------------------------------- */
function SubSection({
  step,
  title,
  description,
  children,
}: {
  /** '01'~'06'. 생략하면 본문 흐름 밖의 심화 블록으로 렌더된다. */
  step?: string
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <div className="mt-16 first:mt-0">
      <div className="mb-6">
        <h3 className="flex items-baseline gap-2.5 text-xl font-bold tracking-tight">
          {step && (
            <span className="text-accent-500/70 font-mono text-sm">{step}</span>
          )}
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-[14px] leading-relaxed text-zinc-500">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * 아키텍처 결정 카드
 * ---------------------------------------------------------------------------
 * <details>/<summary> 를 쓴 이유:
 *  - 결정이 8개이고 각각 이유·트레이드오프까지 있어 전부 펼치면 벽이 된다.
 *  - 하지만 접어두면 안 읽힐 위험이 있으므로 첫 카드는 열어둔다(defaultOpen).
 *    "이건 펼쳐지는 것"이라는 신호를 주는 게 목적이다.
 *  - 직접 useState로 만들 수도 있지만, 네이티브 요소는 키보드 조작·
 *    Ctrl+F 검색 시 자동 펼침·aria-expanded 를 브라우저가 알아서 해준다.
 *    같은 동작을 손으로 만들면 대개 그중 하나를 빠뜨린다.
 * ------------------------------------------------------------------------- */
function ArchitectureCard({
  layer,
  defaultOpen,
}: {
  layer: ArchitectureLayer
  defaultOpen: boolean
}) {
  return (
    <details open={defaultOpen} className="card group/details p-0">
      <summary className="flex cursor-pointer list-none items-start gap-3 p-5">
        <ChevronRight
          size={16}
          aria-hidden="true"
          className="text-accent-500 mt-0.5 shrink-0 transition-transform duration-200 group-open/details:rotate-90"
        />
        <div className="min-w-0">
          <h4 className="text-[15px] font-bold">{layer.title}</h4>
          <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
            {layer.summary}
          </p>
        </div>
      </summary>

      <div className="space-y-4 border-t border-zinc-100 px-5 pt-5 pb-5 dark:border-zinc-800">
        {/* 선택 → 이유 → 대가 순서. 이 순서가 곧 설계 설명의 문법이다. */}
        <div>
          <p className="mb-1.5 font-mono text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
            Decision · 무엇을 택했나
          </p>
          <p className="text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {layer.decision}
          </p>
        </div>

        {/* 이유 블록만 배경을 준다 — 이 섹션에서 가장 중요한 문단이기 때문이다. */}
        <div className="border-accent-300 dark:border-accent-500/40 rounded-r-lg border-l-2 bg-zinc-50 py-3 pr-3 pl-4 dark:bg-zinc-800/40">
          <p className="text-accent-700 dark:text-accent-400 mb-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase">
            Why · 왜 이렇게 했나
          </p>
          <p className="text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {layer.reason}
          </p>
        </div>

        <div>
          <p className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
            <AlertTriangle size={11} aria-hidden="true" />
            Trade-off · 무엇을 포기했나
          </p>
          <p className="text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {layer.tradeoff}
          </p>
        </div>

        <ul className="flex flex-wrap gap-1.5 pt-1">
          {layer.keywords.map((keyword) => (
            <li key={keyword} className="chip font-mono text-[11px]!">
              {keyword}
            </li>
          ))}
        </ul>
      </div>
    </details>
  )
}

/**
 * 목표 카드 — 불편(problem) → 목표(goal) → 판정 기준(measure)
 * ---------------------------------------------------------------------------
 * problem을 먼저 보여주는 순서가 이 카드의 전부다.
 * "지도 기반 관제 화면 구축"으로 시작하면 그건 할 일 목록이지 목표가 아니다.
 * 목표는 언제나 "지금 무엇이 불편한가"에서 나온다.
 */
function GoalCard({ goal, index }: { goal: ProjectGoal; index: number }) {
  return (
    <li className="card flex flex-col p-5">
      <div className="mb-3 flex items-start gap-3">
        {/* tabular-nums: 숫자 폭 고정 — 01, 02… 가 세로로 정렬된다 */}
        <span className="font-mono text-xs text-zinc-300 tabular-nums dark:text-zinc-700">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h4 className="text-[15px] leading-snug font-bold">{goal.title}</h4>
      </div>

      <div className="space-y-3.5">
        <div>
          <p className="mb-1 font-mono text-[10.5px] font-semibold tracking-wider text-zinc-400 uppercase">
            문제 · 무엇이 불편했나
          </p>
          <p className="text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            {goal.problem}
          </p>
        </div>

        <div className="border-accent-300 dark:border-accent-500/40 rounded-r-lg border-l-2 bg-zinc-50 py-3 pr-3 pl-4 dark:bg-zinc-800/40">
          <p className="text-accent-700 dark:text-accent-400 mb-1 font-mono text-[10.5px] font-semibold tracking-wider uppercase">
            목표 · 그래서 무엇을 하려 했나
          </p>
          <p className="text-[13.5px] leading-relaxed text-zinc-700 dark:text-zinc-300">
            {goal.goal}
          </p>
        </div>
      </div>

      {/* mt-auto: 카드 높이가 달라도 판정 기준 줄을 바닥에 정렬시킨다.
          이 줄이 06 결과 섹션과 짝을 이룬다 —
          판정 방법이 없는 목표는 목표가 아니라 소망이다. */}
      <div className="mt-auto flex gap-2 pt-4 text-[12.5px] leading-relaxed text-zinc-500">
        <Target size={13} aria-hidden="true" className="mt-0.5 shrink-0" />
        <span>
          <span className="font-semibold">판정 기준</span> · {goal.measure}
        </span>
      </div>
    </li>
  )
}

export function FeaturedProject() {
  const {
    title,
    subtitle,
    period,
    domain,
    team,
    client,
    overview,
    goals,
    role,
    techStack,
    features,
    result,
    architecture,
    links,
  } = featuredProject

  return (
    <Section
      id="project"
      eyebrow="Featured Project"
      title="대표 프로젝트"
      description="가장 오래 붙들고 있었고, 설명할 것이 가장 많은 프로젝트입니다."
    >
      {/* ── 프로젝트 헤더 ─────────────────────────────────────────────── */}
      <div className="card mb-14 p-6 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <div>
            <p className="text-accent-600 dark:text-accent-400 mb-2 font-mono text-[11px] tracking-[0.15em] uppercase">
              {domain}
            </p>
            <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
            <p className="mt-1.5 text-[15px] text-zinc-500">{subtitle}</p>
          </div>
        </div>

        {/* 기간 · 인원 · 담당범위 --------------------------------------
            인원을 밝히는 게 손해처럼 느껴질 수 있지만 반대다.
            팀 규모가 없으면 읽는 사람은 "혼자 다 했나?"를 추측해야 하고,
            추측은 대개 과장을 의심하는 쪽으로 기운다.
            4명 중 어디까지가 내 몫이었는지를 먼저 밝히면 나머지가 다 믿을 만해진다. */}
        <dl className="mt-5 grid gap-x-6 gap-y-3 border-t border-zinc-100 pt-5 sm:grid-cols-3 dark:border-zinc-800">
          {[
            { term: '기간', desc: period },
            { term: '인원', desc: team },
            { term: '대상', desc: client },
          ].map((item) => (
            <div key={item.term}>
              <dt className="font-mono text-[10.5px] tracking-wider text-zinc-400 uppercase">
                {item.term}
              </dt>
              <dd className="mt-1 text-[13.5px] text-zinc-700 dark:text-zinc-300">
                {item.desc}
              </dd>
            </div>
          ))}
        </dl>

        {/* 핵심 성과 미리보기 ---------------------------------------------
            같은 데이터를 06 결과 섹션에서 다시 자세히 설명하므로 값을
            복제해 두지 않는다. result.outcomes 앞 4개를 그대로 가져와
            숫자만 먼저 보여준다 — 스크롤 없이 "이 프로젝트가 뭘 해냈는지"를
            3초 안에 스캔하게 하려는 목적으로, 아래에서 근거를 확인할 수
            있다는 걸 안내(→ 06 프로젝트 결과)해 뒤로 미룬 설명을 찾기 쉽게 한다. */}
        <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-zinc-100 pt-5 sm:grid-cols-4 dark:border-zinc-800">
          {result.outcomes.slice(0, 4).map((outcome) => (
            <div key={outcome.id}>
              <dt className="text-[11px] leading-snug text-zinc-500">
                {outcome.label}
              </dt>
              <dd className="text-accent-600 dark:text-accent-400 mt-1 font-mono text-[15px] font-bold tabular-nums">
                {outcome.value}
              </dd>
            </div>
          ))}
        </dl>
        <a
          href="#project-result"
          className="text-accent-600 dark:text-accent-400 mt-4 inline-block text-[12px] font-medium hover:underline"
        >
          근거 자세히 보기 → 06 프로젝트 결과
        </a>

        {links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-zinc-100 pt-5 dark:border-zinc-800">
            {links.map((link) => {
              const meta = LINK_META[link.type]
              const Icon = meta.icon
              return (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  <Icon size={13} />
                  {link.label ?? meta.label}
                </a>
              )
            })}
          </div>
        )}
      </div>

      {/* ── 01. 프로젝트 소개 ─────────────────────────────────────────── */}
      <SubSection step="01" title="프로젝트 소개">
        <div className="space-y-4 text-[15px] leading-[1.85] text-zinc-600 dark:text-zinc-400">
          {overview.map((paragraph, index) => (
            // key로 index를 쓰는 것은 보통 안티패턴이지만, 이 배열은 정적이고
            // 순서가 절대 바뀌지 않으므로 안전하다.
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </SubSection>

      {/* ── 02. 프로젝트 목표 ─────────────────────────────────────────── */}
      <SubSection
        step="02"
        title="프로젝트 목표"
        description="“무엇을 만든다”가 아니라 “무엇이 불편한가”에서 출발해 정리했습니다. 각 목표에는 달성 여부를 판정할 기준을 함께 적었고, 그 결과는 06에서 다시 확인합니다."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {goals.map((goal, index) => (
            <GoalCard key={goal.id} goal={goal} index={index} />
          ))}
        </ul>
      </SubSection>

      {/* ── 03. 담당 역할 ─────────────────────────────────────────────── */}
      <SubSection step="03" title="담당 역할" description={role.scope}>
        {/* 도메인 단위로 묶는다.
            기능을 평평하게 나열하면 "무엇을 타이핑했나"만 보이고,
            도메인으로 묶으면 "무엇을 책임졌나"가 보인다. */}
        <div className="grid gap-4 sm:grid-cols-2">
          {role.domains.map((rd) => (
            <div key={rd.id} className="card p-5">
              <h4 className="text-accent-700 dark:text-accent-400 mb-3 font-mono text-[12px] font-semibold tracking-wider uppercase">
                {rd.title}
              </h4>
              <ul className="space-y-2">
                {rd.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-accent-400 mt-[0.62em] size-1.5 shrink-0 rounded-full"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 경계선 블록 ---------------------------------------------------
            이 박스가 이 섹션에서 가장 중요할 수 있다.
            "어디까지가 내 일이 아닌지"를 먼저 밝히면 위의 주장 전체가 믿을 만해진다.
            감췄다가 하나 들키면 나머지도 전부 의심받는다. */}
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
          <p className="mb-3 flex items-center gap-1.5 text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">
            <AlertTriangle size={13} aria-hidden="true" className="text-zinc-400" />
            여기까지는 제가 한 일이 아닙니다
          </p>
          <ul className="space-y-1.5">
            {role.boundaries.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-[13px] leading-relaxed text-zinc-500"
              >
                <span aria-hidden="true">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SubSection>

      {/* ── 04. 기술 스택 ─────────────────────────────────────────────── */}
      <SubSection
        step="04"
        title="기술 스택"
        description="이름만 나열하면 로고 모음일 뿐입니다. 각 항목에 이 프로젝트에서 무엇에 썼는지를 함께 적었습니다. 점선 표기는 부분 사용/학습 중인 항목입니다."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {techStack.map((category) => {
            const Icon = CATEGORY_ICONS[category.icon]
            return (
              <div key={category.id} className="card p-5">
                <h4 className="mb-4 flex items-center gap-2.5 text-sm font-semibold">
                  <span className="bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-400 inline-flex size-8 items-center justify-center rounded-lg">
                    <Icon size={16} />
                  </span>
                  {category.title}
                </h4>

                <ul className="space-y-2.5">
                  {category.skills.map((skill) => {
                    const style = LEVEL_STYLES[skill.level]
                    return (
                      <li key={skill.name}>
                        <span
                          title={style.label}
                          className={`inline-flex rounded-lg px-2.5 py-1 text-[13px] font-medium ${style.className}`}
                        >
                          {skill.name}
                        </span>
                        {skill.note && (
                          <p className="mt-1 text-[12px] leading-snug text-zinc-500">
                            {skill.note}
                          </p>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </SubSection>

      {/* ── 05. 핵심 기능 ─────────────────────────────────────────────── */}
      <SubSection
        step="05"
        title="핵심 기능"
        description="기능 목록이 아니라 문제 목록으로 읽히도록, 각 항목마다 “이게 없을 때 무엇이 불편했는지”를 먼저 적었습니다."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <li key={feature.id} className="card flex flex-col p-5">
              <h4 className="text-[14.5px] font-bold">{feature.title}</h4>

              <div className="mt-3 space-y-3">
                <div>
                  <p className="mb-1 font-mono text-[10.5px] font-semibold tracking-wider text-zinc-400 uppercase">
                    이게 없으면
                  </p>
                  <p className="text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {feature.problem}
                  </p>
                </div>

                <div>
                  <p className="text-accent-600 dark:text-accent-400 mb-1 flex items-center gap-1 font-mono text-[10.5px] font-semibold tracking-wider uppercase">
                    <ArrowDown size={10} aria-hidden="true" />
                    그래서
                  </p>
                  <p className="text-[13.5px] leading-relaxed font-medium text-zinc-800 dark:text-zinc-200">
                    {feature.solution}
                  </p>
                </div>
              </div>

              {feature.detail && (
                // mt-auto: 카드 높이가 서로 달라도 부연 줄을 바닥에 정렬시킨다.
                // 그리드에서 아래쪽이 들쭉날쭉해 보이는 문제를 이 한 줄로 해결한다.
                <p className="mt-auto border-t border-zinc-100 pt-3.5 font-mono text-[11.5px] leading-snug text-zinc-400 dark:border-zinc-800">
                  {feature.detail}
                </p>
              )}
            </li>
          ))}
        </ul>
      </SubSection>

      {/* ── 06. 프로젝트 결과 ─────────────────────────────────────────── */}
      <div id="project-result" className="scroll-mt-32">
        <SubSection
          step="06"
          title="프로젝트 결과"
          description="02에서 세운 목표의 판정 기준에 대한 답입니다. 헤더의 요약 숫자는 여기 outcomes와 같은 데이터입니다."
        >
        <p className="mb-6 text-[14.5px] leading-[1.85] text-zinc-600 dark:text-zinc-400">
          {result.summary}
        </p>

        {/* 지표 목록 -----------------------------------------------------
            before → after 형태를 값 안에 그대로 넣었다.
            "after"만 크게 쓰면 숫자가 커 보이지만 검증은 불가능해진다.
            개선은 언제나 도달점이 아니라 차이다. */}
        <dl className="grid gap-4 sm:grid-cols-2">
          {result.outcomes.map((outcome) => (
            <div key={outcome.id} className="card p-5">
              <dt className="text-[12px] font-medium text-zinc-500">
                {outcome.label}
              </dt>
              <dd>
                <p className="text-accent-600 dark:text-accent-400 mt-1.5 font-mono text-[17px] font-bold tabular-nums">
                  {outcome.value}
                </p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {outcome.description}
                </p>
              </dd>
            </div>
          ))}
        </dl>

        {/* 회고 ----------------------------------------------------------
            성과만 있고 회고가 없으면 "운이 좋았던 프로젝트"와 구분되지 않는다.
            불편했던 점과 남은 과제를 같이 적어야 판단의 근거가 드러난다. */}
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 p-6 dark:border-zinc-700">
          <h4 className="mb-4 text-[15px] font-bold">돌아보면</h4>
          <ul className="space-y-3">
            {result.retrospective.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[13.5px] leading-relaxed text-zinc-600 dark:text-zinc-400"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.62em] size-1.5 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        </SubSection>
      </div>

      {/* ── 심화: 프로젝트 아키텍처 ───────────────────────────────────
          step 번호를 주지 않은 이유: 위 01~06은 프로젝트를 이해하는 데
          필요한 최소 흐름이고, 아키텍처는 그걸 다 읽은 사람에게만 필요한
          상세다. 같은 번호 체계에 넣으면 "여기까지 읽어야 한다"는
          압박이 생기고, 이탈 지점이 앞당겨진다. */}
      <div className="mt-20 border-t border-zinc-100 pt-4 dark:border-zinc-900">
        <p className="font-mono text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
          Deep Dive
        </p>
      </div>

      <SubSection
        title="프로젝트 아키텍처"
        description="무엇을 썼는지가 아니라, 왜 그렇게 나눴고 그 대가로 무엇을 포기했는지를 적었습니다."
      >
        <p className="mb-6 text-[14.5px] leading-[1.85] text-zinc-600 dark:text-zinc-400">
          {architecture.summary}
        </p>

        <div className="space-y-3">
          {architecture.layers.map((layer, index) => (
            <ArchitectureCard
              key={layer.id}
              layer={layer}
              // 첫 카드만 펼쳐둔다 — "이건 열리는 카드"라는 신호를 주기 위해서.
              defaultOpen={index === 0}
            />
          ))}
        </div>

        <h4 className="mt-12 mb-1.5 text-base font-bold">Architecture Diagram</h4>
        <p className="mb-5 text-[13.5px] leading-relaxed text-zinc-500">
          이미지가 아니라 데이터로 정의했습니다. 다크모드에서 깨지지 않고, 구조가
          바뀌면 배열 하나만 고치면 되며, 텍스트라서 검색과 스크린리더에도 잡힙니다.
        </p>
        <ArchitectureDiagram diagram={architecture.diagram} />
      </SubSection>
    </Section>
  )
}
