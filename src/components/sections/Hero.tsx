import { ArrowRight, Download, MapPin } from 'lucide-react'
import { profile } from '@/data/portfolioData'
import { SOCIAL_ICONS } from '@/components/common/socialIcons'

/**
 * Hero — 첫 화면
 * ---------------------------------------------------------------------------
 * 방문자가 3초 안에 세 가지를 알아야 한다: 누구인가 / 무엇을 하는가 / 다음에 뭘 누를까.
 * 그래서 구성은 이름 → 한 줄 소개 → 주요 동작 버튼 2개 순서다.
 *
 * 버튼은 반드시 "주(primary) 1개 + 보조(secondary) 1개"로 둔다.
 * 같은 무게의 버튼을 3개 이상 나열하면 사용자는 아무것도 누르지 않는다.
 */
export function Hero() {
  return (
    // id="top" — 헤더 로고와 푸터 '맨 위로' 버튼의 앵커
    <section
      id="top"
      aria-label="소개"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* 배경 장식 ------------------------------------------------------------
          aria-hidden + pointer-events-none 이 중요하다.
          장식용 요소가 클릭을 가로채거나 스크린리더에 읽히면 방해만 된다.

          min-h에 100svh를 쓴 이유: 모바일에서 100vh는 주소창 높이를 포함해
          실제보다 커지고, 스크롤하면 레이아웃이 튄다. svh(small viewport height)가 안전하다. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-accent-400/20 dark:bg-accent-600/20 absolute -top-40 -right-32 size-96 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 size-96 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-600/10" />
      </div>

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 px-6 py-24 md:grid-cols-[1.4fr_1fr]">
        {/* ── 좌측: 텍스트 ── */}
        <div>
          <p className="text-accent-600 dark:text-accent-400 mb-4 font-mono text-sm tracking-wide">
            {profile.role}
          </p>

          <h1 className="text-4xl leading-[1.15] font-bold tracking-tight sm:text-5xl lg:text-6xl">
            안녕하세요,
            <br />
            {profile.name}입니다.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {profile.tagline}
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-sm text-zinc-500">
            <MapPin size={15} aria-hidden="true" />
            <span>{profile.location}</span>
          </div>

          {/* 주요 동작 버튼 */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="bg-accent-600 hover:bg-accent-700 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition"
            >
              프로젝트 보기
              <ArrowRight size={16} aria-hidden="true" />
            </a>

            <a
              href={profile.resumeUrl}
              // download 속성: 브라우저가 새 탭에서 열지 않고 바로 내려받게 한다.
              // 값을 주면 저장될 파일명을 지정할 수 있다.
              download="방은경_이력서.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <Download size={16} aria-hidden="true" />
              이력서 (PDF)
            </a>
          </div>

          {/* 소셜 링크 */}
          <ul className="mt-8 flex items-center gap-2">
            {profile.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.platform]
              const isMail = social.platform === 'email'
              return (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target={isMail ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="inline-flex size-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* ── 우측: 프로필 사진 ──
            모바일(md 미만)에서는 숨긴다. 좁은 화면에서 사진이 화면 절반을 먹으면
            정작 읽어야 할 소개 문구가 아래로 밀려난다. */}
        <div className="hidden md:block">
          <div className="relative mx-auto w-full max-w-70">
            <div className="from-accent-500/30 absolute -inset-3 rounded-4xl bg-linear-to-br to-sky-500/30 blur-xl" />
            <img
              src={profile.avatar}
              // alt은 "무엇이 보이는지"를 쓴다. "이미지", "사진" 같은 단어는 넣지 않는다.
              // (스크린리더가 이미 "그래픽"이라고 알려주므로 중복이다)
              alt={`${profile.name} 프로필`}
              width={320}
              height={320}
              // width/height를 명시하면 브라우저가 자리를 미리 잡아
              // 이미지 로딩 후 화면이 밀리는 현상(CLS)을 막는다.
              className="relative aspect-square w-full rounded-[1.75rem] border border-zinc-200 object-cover dark:border-zinc-800"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
