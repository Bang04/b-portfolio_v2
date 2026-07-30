import { ArrowUpRight, ExternalLink, FileText, Sparkles } from 'lucide-react'
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

/**
 * 썸네일 영역
 * ---------------------------------------------------------------------------
 * thumbnail이 아직 없어도 카드가 무너지지 않도록 자리표시자를 렌더한다.
 * "데이터가 없을 때의 모습"까지 설계해두는 습관이 실무에서 큰 차이를 만든다.
 */
function Thumbnail({ project }: { project: Project }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      {project.thumbnail ? (
        <img
          src={project.thumbnail}
          alt={`${project.title} 화면 캡처`}
          // loading="lazy": 화면 밖 이미지는 스크롤이 가까워질 때 받아온다.
          // 첫 화면 로딩 속도에 직접적인 영향을 준다.
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <div
          aria-hidden="true"
          className="from-accent-500/10 flex size-full items-center justify-center bg-linear-to-br to-sky-500/10"
        >
          <span className="font-mono text-[11px] tracking-widest text-zinc-400 uppercase">
            No preview
          </span>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { featured } = project

  return (
    // group 클래스: 부모에 hover가 걸렸을 때 자식 스타일을 바꾸기 위한 표시.
    // 자식에서 group-hover:* 로 참조한다.
    <article
      className={`card group flex flex-col p-5 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700 ${
        // featured 카드는 2열 그리드에서 한 줄 전체를 차지한다.
        featured ? 'sm:col-span-2' : ''
      }`}
    >
      <div
        className={featured ? 'grid gap-6 sm:grid-cols-[1fr_1.2fr]' : 'contents'}
      >
        <Thumbnail project={project} />

        <div className="mt-4 flex flex-1 flex-col sm:mt-0">
          <div className="mb-2 flex items-start justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold">
                {project.title}
                {featured && (
                  <Sparkles
                    size={14}
                    className="text-accent-500"
                    aria-label="주요 프로젝트"
                  />
                )}
              </h3>
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

          {/* 성과 목록 — 이 부분이 카드의 핵심이다 */}
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
            <ul className="mb-4 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <li key={tech} className="chip font-mono">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {project.links.map((link) => (
                <ProjectLinkButton key={link.url} link={link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  // featured 를 먼저 보여준다. 원본 배열을 mutate 하지 않도록 복사 후 정렬한다.
  // (sort는 제자리 정렬이라 import한 배열을 직접 건드리면 다른 컴포넌트에도 영향이 간다)
  const sorted = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  )

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="프로젝트"
      description="맡은 역할과 실제로 개선된 지점을 중심으로 정리했습니다."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {sorted.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
