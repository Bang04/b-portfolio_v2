import { Award, BadgeCheck, Briefcase, GraduationCap, School } from 'lucide-react'
import type { ComponentType } from 'react'
import { experiences } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'
import type { Experience as ExperienceItem, ExperienceKind } from '@/types'

/** 항목 종류별 아이콘과 한글 라벨 */
const KIND_META: Record<
  ExperienceKind,
  { icon: ComponentType<{ size?: number; className?: string }>; label: string }
> = {
 work: { icon: Briefcase, label: '경력' },
  education: { icon: GraduationCap, label: '학력' },
  training: { icon: School, label: '교육 이수' },
  certificate: { icon: BadgeCheck, label: '자격' },
  award: { icon: Award, label: '수상' },
}

/**
 * 기간 표기.
 * 자격·수상은 원래 "기간"이 아니라 취득/수상 시점 하나뿐이라, end가 없으면
 * "진행 중"이 아니라 그 시점 자체가 전부다 — start만 보여준다.
 * work·education·training은 end가 없으면 지금도 진행 중이라는 뜻이므로 "현재"로 표기한다.
 */
function formatPeriod(item: ExperienceItem): string {
  if (!item.end && (item.kind === 'certificate' || item.kind === 'award')) {
    return item.start
  }
  return `${item.start} – ${item.end ?? '현재'}`
}

function TimelineItem({ item }: { item: ExperienceItem }) {
  const meta = KIND_META[item.kind]
  const Icon = meta.icon
  // "재직 중" 배지는 경력에만 의미가 있다. 자격증·수상처럼 end가 원래
  // 없는 항목까지 !item.end로 판정하면 전부 "재직 중"으로 잘못 표시된다.
  const isCurrent = item.kind === 'work' && !item.end

  return (
    // `group` 을 붙여두면 자식에서 이 <li>의 상태를 참조할 수 있다.
    // 여기서는 group-last: 로 "마지막 항목일 때"를 자식이 알아채게 쓴다.
    <li className="group relative pb-10 pl-12 last:pb-0">
      {/* 세로 선 ------------------------------------------------------------
          각 항목이 자기 왼쪽에 선을 그린다. 부모에 긴 선 하나를 그리는 방식보다
          마지막 항목에서 선을 끊기가 훨씬 쉽다.
          absolute + top-10 bottom-0 → 아이콘 아래부터 다음 항목까지만 연결.
          group-last:hidden → 마지막 항목에서는 아래로 뻗는 선을 지운다. */}
      <span
        aria-hidden="true"
        className="absolute top-10 bottom-0 left-[15px] w-px bg-zinc-200 group-last:hidden dark:bg-zinc-800"
      />

      {/* 아이콘 노드 */}
      <span
        aria-hidden="true"
        className={`absolute top-0 left-0 inline-flex size-8 items-center justify-center rounded-full border ${
          isCurrent
            ? 'border-accent-300 bg-accent-50 text-accent-600 dark:border-accent-500/40 dark:bg-accent-500/15 dark:text-accent-400'
            : 'border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900'
        }`}
      >
        <Icon size={15} />
      </span>

      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <h3 className="text-base font-bold">{item.title}</h3>
        {isCurrent && (
          <span className="bg-accent-50 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300 rounded-full px-2 py-0.5 text-[11px] font-semibold">
            재직 중
          </span>
        )}
      </div>

      <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {item.organization}
        {item.location && (
          <span className="font-normal text-zinc-400"> · {item.location}</span>
        )}
      </p>

      {/* <time> 태그는 기계가 읽을 수 있는 날짜라는 의미를 준다.
          여기서는 '월' 정밀도라 dateTime 속성은 생략했다 — 잘못된 값보다 없는 게 낫다. */}
      <p className="mt-0.5 font-mono text-xs text-zinc-400 tabular-nums">
        {formatPeriod(item)}
      </p>

      {item.description && (
        <p className="mt-3 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {item.description}
        </p>
      )}

      {item.achievements.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {item.achievements.map((achievement) => (
            <li
              key={achievement}
              className="relative pl-4 text-[13px] leading-relaxed text-zinc-600 before:absolute before:top-[9px] before:left-0 before:size-1 before:rounded-full before:bg-zinc-300 dark:text-zinc-400 dark:before:bg-zinc-600"
            >
              {achievement}
            </li>
          ))}
        </ul>
      )}

      {item.tech && item.tech.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {item.tech.map((tech) => (
            <li key={tech} className="chip font-mono">
              {tech}
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

export function Experience() {
  /**
   * 종류별로 묶어서 보여준다.
   * ---------------------------------------------------------------------------
   * 왜 한 줄 타임라인이 아니라 그룹인가?
   *   경력과 자격증이 시간순으로 섞이면 "이 사람 커리어가 어땠는지" 읽기 어렵다.
   *   채용 담당자는 보통 경력 → 학력 → 그 외 순으로 훑는다. 그 순서를 그대로 따른다.
   */
  const order: ExperienceKind[] = ['work', 'education', 'training', 'certificate', 'award']
  const groups = order
    .map((kind) => ({
      kind,
      label: KIND_META[kind].label,
      items: experiences.filter((item) => item.kind === kind),
    }))
    // 데이터가 없는 그룹은 제목도 띄우지 않는다. 빈 섹션은 미완성처럼 보인다.
    .filter((group) => group.items.length > 0)

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="경력 · 학력"
      description="PHP·MySQL 서비스 개발에서 시작해 태양광 모니터링, React 기반 웹 서비스를 거쳐 지금은 재난안전 관제 시스템을 만들고 있습니다. 맡았던 일과 그로 인해 달라진 결과를 함께 적었습니다."
    >
      <div className="space-y-14">
        {groups.map((group) => (
          <div key={group.kind}>
            <h3 className="mb-6 font-mono text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
              {group.label}
            </h3>
            <ol>
              {group.items.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Section>
  )
}
