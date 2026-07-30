/**
 * 브랜드 아이콘 (GitHub / LinkedIn / Blog)
 * ---------------------------------------------------------------------------
 * 왜 별도 파일인가?
 *   lucide-react v1 부터 GitHub·LinkedIn 같은 **브랜드 로고 아이콘이 제거**됐다
 *   (상표권 이슈). 그래서 `import { Github } from 'lucide-react'` 는 이제 실패한다.
 *   공식 브랜드 가이드의 SVG 경로를 직접 넣어 쓴다.
 *
 * lucide 아이콘과 인터페이스를 맞춰뒀기 때문에(size / className / aria-hidden)
 * 호출하는 쪽에서는 lucide 아이콘과 구분 없이 섞어 쓸 수 있다.
 */

export interface BrandIconProps {
  /** px 단위. lucide의 `size` prop과 동일한 의미. */
  size?: number
  className?: string
}

/**
 * 브랜드 로고는 선(stroke)이 아니라 면(fill)으로 그려진다.
 * 그래서 `fill="currentColor"` 로 두고 부모의 text-* 색을 물려받게 한다.
 */
export function GithubIcon({ size = 20, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ size = 20, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.94v5.66H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .78 0 1.75v20.5C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z" />
    </svg>
  )
}
