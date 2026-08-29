import { ArrowUpRight, ExternalLink, FileText } from 'lucide-react'
import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'
import { GithubIcon } from '@/components/common/BrandIcons'
import type { BrandIconProps } from '@/components/common/BrandIcons'
import type { Project, ProjectLink, ProjectLinkType, ProjectShot } from '@/types'

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

/* ---------------------------------------------------------------------------
 * 스크린샷 갤러리 — 겹쳐 쌓인 스크린샷이 가로로 펼쳐지는 하나의 모션
 * ---------------------------------------------------------------------------
 * 카드마다 다른 모션(스택/프레임/모자이크/틸트)을 써봤지만, 9개가 나란히
 * 있으니 오히려 산만했다. 하나의 동작으로 통일하고, 그 대신 이미지 자체를
 * 최대한 키워 "무엇을 만들었는지"가 스크린샷만으로도 눈에 들어오게 한다.
 * 최대 3장을 겹쳐 쌓아두고 hover하면 회전이 풀리며 가로로 나란히 슬라이드된다.
 * ------------------------------------------------------------------------- */
const STACK_LIMIT = 3

const GALLERY_HEIGHT = 'h-64'

function OverflowBadge({ count }: { count: number }) {
  if (count <= 0) return null
  return (
    <span className="absolute right-3 bottom-3 z-20 rounded-full bg-zinc-900/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-sm">
      +{count}
    </span>
  )
}

/**
 * 스크린샷이 한 장뿐인 프로젝트(Sunnyside 등)는 겹칠 상대가 없다.
 * 스택 대신 갤러리 영역을 꽉 채우는 큰 단일 이미지로 보여준다.
 */
function SingleShot({ shot }: { shot: ProjectShot }) {
  return (
    <div className={`relative overflow-hidden bg-zinc-100 ${GALLERY_HEIGHT} dark:bg-zinc-900`}>
      <motion.img
        src={shot.src}
        alt=""
        loading="lazy"
        className="size-full object-cover object-top"
        initial={{ scale: 1.04 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}

/**
 * Stack Slide — 스크린샷이 카드 중앙에 비스듬히 겹쳐 쌓여 있다가, hover하면
 * 회전이 0으로 접히며 겹침 없이 가로로 나란히 슬라이드된다. 부채꼴(호를
 * 그리며 회전)과 다른 점은 펼친 뒤에도 카드들이 수평을 유지한다는 것 —
 * "옆으로 밀어 편다"는 동작 하나만 남긴다.
 */
function StackSlideGallery({ images }: { images: ProjectShot[] }) {
  if (images.length === 1) return <SingleShot shot={images[0]} />

  const shown = images.slice(0, STACK_LIMIT)
  const rest = shown.length - 1

  return (
    <motion.div
      className={`relative overflow-hidden bg-zinc-100 ${GALLERY_HEIGHT} dark:bg-zinc-900`}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {shown.map((shot, index) => {
        const offset = index - rest / 2
        return (
          <motion.div
            key={shot.src}
            className="absolute top-1/2 left-1/2 h-52 w-40 overflow-hidden rounded-xl border-2 border-white shadow-xl dark:border-zinc-800"
            style={{ zIndex: shown.length - index }}
            variants={{
              rest: {
                x: `calc(-50% + ${offset * 18}px)`,
                y: '-50%',
                rotate: offset * 8,
              },
              hover: {
                x: `calc(-50% + ${offset * 128}px)`,
                y: '-50%',
                rotate: 0,
              },
            }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
          >
            <img
              src={shot.src}
              alt=""
              loading="lazy"
              className="size-full object-cover object-top"
            />
          </motion.div>
        )
      })}
      <OverflowBadge count={images.length - shown.length} />
    </motion.div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card flex flex-col overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700">
      {project.images && project.images.length > 0 && (
        <StackSlideGallery images={project.images} />
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2">
          <h3 className="text-base font-bold">{project.title}</h3>
          <p className="mt-0.5 text-sm text-zinc-500">{project.subtitle}</p>
          <p className="mt-1 font-mono text-[11px] text-zinc-400">{project.period}</p>
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
      description="대표 프로젝트 외에, 업무 중 필요해서 만든 도구와 실력을 다진 학습 프로젝트입니다."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
