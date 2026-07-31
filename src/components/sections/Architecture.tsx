import { AlertTriangle, ChevronRight } from 'lucide-react'
import { architecture, featuredProject } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'
import { ArchitectureDiagram } from '@/components/common/ArchitectureDiagram'
import type { ArchitectureLayer } from '@/types'

/**
 * Architecture — 아키텍처 설계
 * ---------------------------------------------------------------------------
 * 원래 대표 프로젝트(03) 안의 "Deep Dive" 블록이었다. 독립 섹션으로 뺀 이유:
 *
 *  1. 분량 — 결정 9개 + 다이어그램은 h3 하나가 감당할 크기가 아니다.
 *     한 섹션 안에 두면 03의 스크롤이 끝나지 않고, 읽는 사람은 어디까지가
 *     "프로젝트 설명"이고 어디부터가 "설계 상세"인지 구분하지 못한다.
 *
 *  2. 목적지 — 아키텍처는 면접에서 가장 많이 파고드는 영역이다.
 *     "설계 얘기 좀 볼까요"에 대해 링크 하나로 보낼 수 있어야 하고,
 *     그러려면 h2 + 내비게이션 항목 + 고유 id 가 필요하다.
 *     곁가지 블록에는 셋 다 줄 수 없다.
 *
 *  3. 헤딩 레벨 — 섹션 안의 곁가지였을 때 결정 카드는 h4였다.
 *     h2(섹션) > h3(하위블록) > h4(카드)로 세 단계나 내려가 있으면
 *     스크린리더 목차에서 사실상 묻힌다. 독립시키면 h2 > h3 로 한 단계 올라온다.
 *
 * 왜 03 바로 다음인가?
 *  03이 "무엇을 만들었고 무엇이 달라졌나"라면 여기는 "그게 어떤 모양이었나"다.
 *  결과를 본 직후여야 구조 이야기가 궁금해진다. 뒤로 밀면 그냥 설계 문서가 된다.
 */

/* ---------------------------------------------------------------------------
 * 아키텍처 결정 카드
 * ---------------------------------------------------------------------------
 * <details>/<summary> 를 쓴 이유:
 *  - 결정이 9개이고 각각 이유·트레이드오프까지 있어 전부 펼치면 벽이 된다.
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
          {/* 섹션이 h2이므로 카드 제목은 h3다.
              시각적 크기가 아니라 문서 구조를 기준으로 정해야
              스크린리더의 목차 탐색이 망가지지 않는다. */}
          <h3 className="text-[15px] font-bold">{layer.title}</h3>
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

export function Architecture() {
  const { summary, layers, diagram } = architecture

  return (
    <Section
      id="architecture"
      eyebrow="Architecture"
      title="아키텍처 설계"
      description="무엇을 썼는지가 아니라, 왜 그렇게 나눴고 그 대가로 무엇을 포기했는지를 적었습니다. 바로 위 대표 프로젝트의 설계 상세입니다."
    >
      <p className="mb-8 max-w-3xl text-[14.5px] leading-[1.85] text-zinc-600 dark:text-zinc-400">
        {summary}
      </p>

      {/* 읽는 법 안내 -----------------------------------------------------
          카드가 9개나 접혀 있으면 "여기서 뭘 해야 하지"가 먼저 온다.
          한 줄로 조작 방법과 카드 구조를 미리 말해두면 이탈이 줄어든다. */}
      <p className="mb-5 text-[12.5px] text-zinc-500">
        각 카드는 <span className="font-semibold">선택 → 이유 → 대가</span> 순서로
        펼쳐집니다. 관심 있는 항목만 열어 보셔도 됩니다.
      </p>

      <div className="space-y-3">
        {layers.map((layer, index) => (
          <ArchitectureCard
            key={layer.id}
            layer={layer}
            // 첫 카드만 펼쳐둔다 — "이건 열리는 카드"라는 신호를 주기 위해서.
            defaultOpen={index === 0}
          />
        ))}
      </div>

      {/* ── 다이어그램 ─────────────────────────────────────────────────── */}
      <h3 className="mt-16 mb-1.5 text-xl font-bold tracking-tight">
        Architecture Diagram
      </h3>
      <p className="mb-6 max-w-3xl text-[13.5px] leading-relaxed text-zinc-500">
        이미지가 아니라 데이터로 정의했습니다. 다크모드에서 깨지지 않고, 구조가
        바뀌면 배열 하나만 고치면 되며, 텍스트라서 검색과 스크린리더에도 잡힙니다.
      </p>
      <ArchitectureDiagram diagram={diagram} />

      {/* 03으로 돌아가는 길 ------------------------------------------------
          독립 섹션으로 떼어내면 생기는 부작용이 하나 있다 —
          검색이나 링크로 여기에 바로 도착한 사람은 이게 어느 프로젝트의
          구조인지 모른다. 되돌아갈 링크 한 줄로 그 맥락을 복구해 준다. */}
      <p className="mt-10 text-[13px] text-zinc-500">
        이 구조가 실제로 어떤 화면과 결과를 만들었는지는{' '}
        <a
          href="#project"
          className="text-accent-600 dark:text-accent-400 font-medium underline underline-offset-4"
        >
          대표 프로젝트 · {featuredProject.title}
        </a>
        에 있습니다.
      </p>
    </Section>
  )
}
