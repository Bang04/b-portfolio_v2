import { nav, projectNav } from '@/data/portfolioData'
import { useActiveSection } from '@/hooks/useActiveSection'

/**
 * Project 서브 내비게이션
 * ---------------------------------------------------------------------------
 * 헤더의 최상위 메뉴는 9개에서 5개로 줄었다(Header.tsx 참고). 줄어든 4개
 * (Timeline·Challenges·Performance·Principles)는 사라진 게 아니라 여기로
 * 옮겨왔다 — Project를 읽는 동안에만 나타나는 얇은 서브 탭 바다.
 *
 * "Project 안에 있을 때만" 을 어떻게 판단하나
 *   모든 섹션 id(about ~ contact)를 감시하다가, 지금 화면 중앙에 걸린
 *   섹션이 projectNav에 속한 id(project/timeline/challenges/performance/
 *   principles)일 때만 이 바를 보여준다. About이나 Other Projects로
 *   넘어가는 순간 자동으로 접힌다 — 상태를 따로 손으로 관리하지 않는다.
 *
 *   전체 id 목록을 하드코딩하지 않고 nav + projectNav 두 배열에서 뽑아
 *   합친 이유: 두 배열이 이 사이트의 전체 섹션 id를 이미 빠짐없이 갖고
 *   있다. 여기서 또 나열하면 셋 중 하나가 바뀔 때 나머지를 잊기 쉽다.
 *
 * 항상 마운트해 두고 opacity/translate로 보이고 감추는 이유
 *   조건부 렌더(`{isInCluster && <nav>}`)로 완전히 뗐다 붙였다 하면,
 *   그 아래 콘텐츠가 매번 위아래로 순간 이동하듯 밀린다. 이 바는
 *   `fixed`라 문서 흐름에서 이미 빠져 있으므로, 위치는 고정해두고
 *   보이는 상태만 트랜지션으로 바꾸는 편이 훨씬 자연스럽다.
 */
const ALL_SECTION_IDS = Array.from(
  new Set([...nav.map((item) => item.id), ...projectNav.map((item) => item.id)]),
)

const PROJECT_CLUSTER_IDS = new Set(projectNav.map((item) => item.id))

export function ProjectSubNav() {
  const active = useActiveSection(ALL_SECTION_IDS)
  const isInCluster = PROJECT_CLUSTER_IDS.has(active)

  return (
    <div
      // aria-hidden: 클러스터 밖에 있을 때는 스크린리더 탐색 순서에서도 건너뛴다.
      aria-hidden={!isInCluster}
      className={`fixed inset-x-0 top-16 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md transition-all duration-300 dark:border-zinc-800/80 dark:bg-zinc-950/90 ${
        isInCluster
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-2 opacity-0'
      }`}
    >
      <nav
        aria-label="Project 하위 섹션"
        className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-6 py-2.5"
      >
        {projectNav.map((item) => {
          const isActive = active === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'true' : undefined}
              tabIndex={isInCluster ? 0 : -1}
              className={`shrink-0 rounded-lg px-3 py-1.5 font-mono text-[12px] font-medium tracking-wide whitespace-nowrap transition ${
                isActive
                  ? 'bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300'
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-500 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200'
              }`}
            >
              {item.label}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
