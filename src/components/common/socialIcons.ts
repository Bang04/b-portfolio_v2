import type { ComponentType } from 'react'
import { Mail, Rss } from 'lucide-react'
import type { SocialPlatform } from '@/types'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import type { BrandIconProps } from './BrandIcons'

/**
 * 플랫폼 → 아이콘 매핑표
 * ---------------------------------------------------------------------------
 * if/switch 대신 객체(lookup table)로 두는 이유:
 *  - `Record<SocialPlatform, ...>` 로 선언하면 SocialPlatform에 새 값을 추가했을 때
 *    이 표를 채우지 않으면 **타입 에러**가 난다. 즉, 빠뜨릴 수가 없다.
 *  - switch 문은 default로 조용히 흘러가 아무것도 렌더하지 않는 사고가 잦다.
 *
 * 왜 BrandIcons.tsx 가 아니라 별도의 .ts 파일인가?
 *   React Fast Refresh(HMR)는 "컴포넌트만 export 하는 파일"에서만 상태를 보존한다.
 *   컴포넌트 파일에 상수를 같이 export 하면 수정할 때마다 화면이 통째로 리로드된다.
 *   그래서 상수·유틸은 컴포넌트 파일에서 분리하는 것이 규칙에 가깝다.
 *   (oxlint / eslint-plugin-react-refresh 가 잡아주는 경고가 바로 이것)
 */
export const SOCIAL_ICONS: Record<
  SocialPlatform,
  ComponentType<BrandIconProps>
> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  blog: Rss,
  email: Mail,
}
