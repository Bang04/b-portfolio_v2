import { ArrowUp } from 'lucide-react'
import { profile } from '@/data/portfolioData'
import { SOCIAL_ICONS } from './socialIcons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-zinc-500 dark:text-zinc-500">
          <p className="font-medium text-zinc-700 dark:text-zinc-300">
            {profile.name} · {profile.role}
          </p>
          <p className="mt-1">
            © {year} {profile.nameEn}. Built with React, TypeScript & Tailwind
            CSS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {profile.socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.platform]
            return (
              <a
                key={social.platform}
                href={social.url}
                // 외부 링크는 target="_blank" 와 rel="noreferrer"를 함께 쓴다.
                // rel이 없으면 새 창이 window.opener로 원본 페이지를 조작할 수 있다
                // (tabnabbing 취약점). 최신 브라우저는 기본 차단하지만 명시가 안전하다.
                target={social.platform === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
                className="inline-flex size-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                <Icon size={18} />
              </a>
            )
          })}

          <a
            href="#top"
            aria-label="맨 위로"
            title="맨 위로"
            className="ml-1 inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
