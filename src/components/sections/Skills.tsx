import { Cloud, Code, Database, Layers, Server, Wrench } from 'lucide-react'
import type { ComponentType } from 'react'
import { skillCategories } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'
import type { SkillIconName, SkillLevel } from '@/types'

/**
 * 아이콘 이름(데이터) → 실제 컴포넌트(화면) 매핑
 * ---------------------------------------------------------------------------
 * data 파일이 lucide-react를 직접 import하지 않게 하려고 문자열로 한 단계 끊었다.
 * 덕분에 portfolioData.ts 는 순수 데이터로 남고, 나중에 JSON이나 API로
 * 옮기더라도 그대로 동작한다. Record 타입이라 새 아이콘 이름을 추가하면
 * 여기를 채울 때까지 컴파일이 통과되지 않는다.
 */
const CATEGORY_ICONS: Record<
  SkillIconName,
  ComponentType<{ size?: number; className?: string }>
> = {
  code: Code,
  layers: Layers,
  database: Database,
  server: Server,
  cloud: Cloud,
  wrench: Wrench,
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
    label: '주력 — 실무에서 주도적으로 사용',
  },
  working: {
    className:
      'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700',
    label: '실무 경험 있음',
  },
  learning: {
    className:
      'bg-transparent text-zinc-500 ring-1 ring-dashed ring-zinc-300 dark:text-zinc-500 dark:ring-zinc-700',
    label: '학습 중',
  },
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="기술 스택"
      description="테두리가 진한 항목이 주력 기술입니다. 점선은 학습 중인 기술로, 실무 경험과 구분해 표기했습니다."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {skillCategories.map((category) => {
          const Icon = CATEGORY_ICONS[category.icon]
          return (
            <div key={category.id} className="card p-5">
              <h3 className="mb-4 flex items-center gap-2.5 text-sm font-semibold">
                <span className="bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-400 inline-flex size-8 items-center justify-center rounded-lg">
                  <Icon size={16} />
                </span>
                {category.title}
              </h3>

              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const style = LEVEL_STYLES[skill.level]
                  return (
                    <li key={skill.name}>
                      <span
                        // title은 마우스 툴팁만 제공한다. 터치 기기에서는 보이지 않으므로
                        // 색과 테두리 모양으로도 구분되게 해둔 것이다.
                        title={
                          skill.note
                            ? `${style.label} · ${skill.note}`
                            : style.label
                        }
                        className={`inline-flex rounded-lg px-2.5 py-1 text-[13px] font-medium ${style.className}`}
                      >
                        {skill.name}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
