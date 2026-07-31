import { ChevronDown } from 'lucide-react'
import type { ArchitectureSpec, DiagramNode } from '@/types'

/**
 * 아키텍처 다이어그램
 * ---------------------------------------------------------------------------
 * 왜 이미지(PNG/SVG)가 아니라 컴포넌트로 그리는가?
 *  1. 다크모드 — 이미지는 배경이 고정이라 다크에서 흰 사각형이 둥둥 뜬다.
 *  2. 반응형 — 이미지는 모바일에서 글자가 뭉개진다. DOM은 알아서 줄바꿈된다.
 *  3. 유지보수 — 구조가 바뀌면 데이터 배열만 고치면 된다.
 *     이미지는 원본 파일(.drawio, .fig)을 찾아내는 것부터 일이다.
 *  4. 접근성/검색 — 텍스트라서 스크린리더도 읽고 Ctrl+F로도 잡힌다.
 *
 * 레이아웃 원칙
 *  - 계층은 "위 → 아래" 한 방향으로만 쌓는다. 화살표가 위로 올라가는 순간
 *    독자는 의존 방향을 추적할 수 없게 된다. 다이어그램이 어려워 보이는
 *    이유는 대개 복잡해서가 아니라 방향이 일관되지 않아서다.
 */

/** 노드 색상 — tone 하나로 "누가 만든 것인가"를 구분한다 */
const NODE_TONES: Record<DiagramNode['tone'], string> = {
  // 내가 설계·구현한 영역
  accent:
    'border-accent-300 bg-accent-50 text-accent-900 dark:border-accent-500/40 dark:bg-accent-500/10 dark:text-accent-100',
  // 기존 공통 자산 (읽기만)
  neutral:
    'border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300',
  // 외부 시스템 — 점선으로 "내 통제 밖"임을 표시
  external:
    'border-dashed border-zinc-300 bg-transparent text-zinc-500 dark:border-zinc-600 dark:text-zinc-400',
}

function Node({ node }: { node: DiagramNode }) {
  return (
    <li
      className={`flex min-w-0 flex-1 basis-40 flex-col rounded-xl border px-3 py-2.5 ${NODE_TONES[node.tone]}`}
    >
      <span className="font-mono text-[12px] leading-snug font-semibold">
        {node.label}
      </span>
      {node.note && (
        <span className="mt-0.5 text-[11px] leading-snug opacity-70">
          {node.note}
        </span>
      )}
    </li>
  )
}

export function ArchitectureDiagram({
  diagram,
}: {
  diagram: ArchitectureSpec['diagram']
}) {
  const { caption, layers, legend } = diagram

  return (
    <figure className="m-0">
      <div className="card overflow-hidden p-5 sm:p-6">
        <ol className="space-y-0">
          {layers.map((layer, index) => (
            <li key={layer.id}>
              {/* 계층 카드 --------------------------------------------------
                  grid-cols-[7rem_1fr] : 넓은 화면에서 계층 이름을 왼쪽에 고정해
                  세로로 정렬시킨다. 이름 길이가 달라도 노드 시작선이 흔들리지 않는다. */}
              <div className="grid gap-3 sm:grid-cols-[8rem_1fr] sm:gap-5">
                <div className="sm:pt-2.5">
                  <p className="font-mono text-[11px] font-semibold tracking-[0.15em] text-zinc-900 uppercase dark:text-zinc-100">
                    {layer.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-zinc-500">
                    {layer.caption}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {layer.nodes.map((node) => (
                    <Node key={node.label} node={node} />
                  ))}
                </ul>
              </div>

              {/* 계층 사이 화살표 — 마지막 계층 뒤에는 붙이지 않는다.
                  aria-hidden: "아래쪽 화살표"라고 읽히면 소음일 뿐이다.
                  의존 방향은 아래 figcaption 문장이 대신 설명한다. */}
              {index < layers.length - 1 && (
                <div
                  aria-hidden="true"
                  className="flex items-center py-2 sm:pl-[8rem]"
                >
                  <div className="ml-0 sm:ml-5">
                    <ChevronDown size={15} className="text-zinc-300 dark:text-zinc-700" />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <figcaption className="mt-4 space-y-3">
        <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {caption}
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
          {legend.map((item) => (
            <li key={item} className="text-[12px] text-zinc-500">
              {item}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  )
}
