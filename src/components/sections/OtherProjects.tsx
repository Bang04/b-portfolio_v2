import { ArrowUpRight, ExternalLink, FileText } from 'lucide-react'
import type { ComponentType } from 'react'
import { projects } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'
import { GithubIcon } from '@/components/common/BrandIcons'
import type { BrandIconProps } from '@/components/common/BrandIcons'
import type { Project, ProjectLink, ProjectLinkType } from '@/types'

/** 링크 종류별 기본 라벨과 아이콘 */
const LINK_META: Record<
  ProjectLinkType,
  { label: string; icon: ComponentType<BrandIconProps> }
> = {
  demo: { label: 'Live Demo', icon: ExternalLink },
  github: { label: 'GitHub', icon: GithubIcon },
  article: { label: '관련 글', icon: FileText },
}

function ProjectLinkButton({ link }: { link: ProjectLink }) {
  const meta = LINK_META[link.type]
  const Icon = meta.icon
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      <Icon size={13} />
      {link.label ?? meta.label}
    </a>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card flex flex-col p-5 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold">{project.title}</h3>
          <p className="mt-0.5 text-sm text-zinc-500">{project.subtitle}</p>
        </div>
        <span className="shrink-0 font-mono text-[11px] whitespace-nowrap text-zinc-400">
          {project.period}
        </span>
      </div>

      <p className="mt-2 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>

      <p className="mt-3 text-[13px] text-zinc-500">
        <span className="font-semibold text-zinc-600 dark:text-zinc-400">
          역할
        </span>{' '}
        · {project.role}
      </p>

      {/* 성과 목록 — 카드의 핵심.
          "무엇을 했다"가 아니라 "무엇이 어떻게 좋아졌다"로 쓴다. */}
      {project.highlights.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex gap-2 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400"
            >
              <ArrowUpRight
                size={13}
                aria-hidden="true"
                className="text-accent-500 mt-1 shrink-0"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {/* mt-auto: 카드 높이가 서로 달라도 태그/버튼 줄을 바닥에 정렬시킨다.
          그리드 카드에서 아래쪽이 들쭉날쭉해 보이는 문제를 이 한 줄로 해결한다. */}
      <div className="mt-auto pt-5">
        <ul className="flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech} className="chip font-mono">
              {tech}
            </li>
          ))}
        </ul>

        {/* links가 비면 버튼 줄 자체를 렌더하지 않는다.
            빈 배열일 때 여백만 남는 것도 "데이터 없을 때의 모습"을
            설계하지 않은 흔적으로 보인다. */}
        {project.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.links.map((link) => (
              <ProjectLinkButton key={link.url} link={link} />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export function OtherProjects() {
  return (
    <Section
      id="other-projects"
      eyebrow="Other Projects"
      title="그 외 작업"
      description="대표 프로젝트 외에, 업무 중 필요해서 만든 도구와 개인 프로젝트입니다."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
