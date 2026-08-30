import { Download, MapPin } from 'lucide-react'
import { profile } from '@/data/portfolioData'
import { GithubIcon } from '@/components/common/BrandIcons'
import { CountUp } from '@/components/common/CountUp'

/**
 * Hero — 첫 화면
 * ---------------------------------------------------------------------------
 * 이 화면의 독자는 채용 담당자이고, 머무는 시간은 길게 잡아도 10초다.
 * 그래서 정보를 "읽는 순서"가 아니라 "포기하는 순서"로 설계했다.
 * 3초에 이탈해도 / 6초에 이탈해도 / 끝까지 읽어도, 각각 다른 층위의 결론이 남는다.
 *
 *   3초  이름 · 헤드라인 · 한 줄 소개  → "구조를 보는 사람이구나"
 *   6초  + 키워드 5개(근거 포함)        → "무엇으로 그걸 증명하지"
 *   10초 + 소개 3줄 · CTA               → "어디를 눌러야 확인되지"
 *
 * 기능 나열을 여기 두지 않은 이유:
 * "무엇을 만들었다"는 아래 섹션에 이미 충분히 있다. 같은 정보를 두 번 쓰면
 * Hero는 목차가 되고, 목차는 아무도 기억하지 않는다.
 * Hero가 팔아야 하는 건 산출물이 아니라 **판단의 방식**이다.
 */
export function Hero() {
  const { headline, heroIntro, keywords, cta, stats } = profile
  const github = profile.socials.find((social) => social.platform === 'github')

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

          min-h에 svh를 쓴 이유: 모바일에서 100vh는 주소창 높이를 포함해
          실제보다 커지고, 스크롤하면 레이아웃이 튄다. svh(small viewport height)가 안전하다. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-accent-400/20 dark:bg-accent-600/20 absolute -top-40 -right-32 size-96 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 size-96 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-600/10" />
      </div>

      <div className="relative mx-auto grid w-full max-w-5xl items-center gap-12 px-6 py-28 md:grid-cols-[1.55fr_1fr]">
        {/* ── 좌측: 텍스트 ── */}
        <div>
          {/* 직함 + 위치 — 스캔하는 사람이 가장 먼저 확인하는 두 가지.
              헤드라인 위에 두어 "누구의 말인지"를 먼저 성립시킨다. */}
          <p className="text-accent-600 dark:text-accent-400 mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[13px] tracking-wide">
            {profile.role}
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
              ·
            </span>
            <span className="inline-flex items-center gap-1 text-zinc-500">
              <MapPin size={13} aria-hidden="true" />
              {profile.location}
            </span>
          </p>

          {/* 헤드라인 ----------------------------------------------------
              h1은 이름이 아니라 헤드라인이 맡는다.
              "안녕하세요, OOO입니다"는 정보량이 0이고, 이름은 바로 아래 줄과
              헤더 로고에서 이미 두 번 노출된다. 페이지에서 가장 큰 글자는
              가장 하고 싶은 말이 차지해야 한다.

              headline을 배열로 받아 <span className="block">로 끊는 이유:
              줄바꿈 지점이 곧 강세다. 자동 줄바꿈에 맡기면 화면 폭마다
              다른 곳에서 끊겨 의도한 리듬이 사라진다. */}
          <h1 className="text-4xl leading-[1.2] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
            {headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* 이름 — 굵게 처리해 시선을 한 번 잡는다 */}
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {profile.name}
            </span>
          </p>

          {/* 핵심 키워드 5개 — 임시 숨김 처리
              바로 아래 "대표 숫자 3개"(stats)와 내용이 겹친다. 예를 들어 첫 카드
              "렌더링 최적화 · 2,889 → 2건"은 stats의 "선택당 마커 재부착 · 2,889 → 2건"과
              같은 사건을 가리킨다. 같은 근거를 같은 화면에서 두 번 보여줄 필요는 없으므로
              stats만 남긴다. */}
          {false && (
            <ul className="mt-7 flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <li
                  key={keyword.label}
                  className="rounded-xl border border-zinc-200 bg-white/60 px-3 py-2 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                  <span className="block text-[12.5px] leading-tight font-semibold text-zinc-800 dark:text-zinc-200">
                    {keyword.label}
                  </span>
                  <span className="text-accent-600 dark:text-accent-400 mt-0.5 block font-mono text-[11px] leading-tight tabular-nums">
                    {keyword.proof}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* 대표 숫자 3개 ---------------------------------------------------
              구 About 섹션의 숫자 지표를 옮겨왔다. About은 "어떻게 일하는가"만
              말하고, 검증 가능한 숫자는 근거가 함께 있는 Hero/Project에 몰아
              둔다 — 같은 숫자를 두 섹션에서 반복하지 않기 위해서다. */}
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-mono text-xl font-bold text-zinc-900 tabular-nums dark:text-zinc-50">
                  <CountUp text={stat.value} />
                  {stat.suffix && (
                    <span className="text-accent-500 ml-0.5 text-sm font-medium">
                      {stat.suffix}
                    </span>
                  )}
                </dd>
                <dt className="mt-0.5 text-xs text-zinc-500">{stat.label}</dt>
              </div>
            ))}
          </dl>

          {/* 소개 3줄 ------------------------------------------------------
              세로 라인(border-l)으로 묶어 "이 셋은 한 덩어리"임을 보여준다.
              불릿 점 대신 라인을 쓴 이유는 위의 키워드 목록과 시각적으로
              구분하기 위해서다. 같은 페이지에서 목록 표시가 두 번 반복되면
              둘의 관계를 독자가 추측해야 한다. */}
          <ul className="mt-8 max-w-xl space-y-3 border-l-2 border-zinc-200 pl-5 dark:border-zinc-800">
            {heroIntro.map((line) => (
              <li
                key={line}
                className="text-[14.5px] leading-relaxed text-zinc-600 dark:text-zinc-400"
              >
                {line}
              </li>
            ))}
          </ul>

          {/* Call To Action ------------------------------------------------
              버튼은 이력서 다운로드(주) + GitHub(보조) 둘로 고정한다.
              같은 무게의 버튼이 셋 이상이면 사용자는 아무것도 누르지 않는다. */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={cta.secondary.href}
              // download 속성: 브라우저가 새 탭에서 열지 않고 바로 내려받게 한다.
              // 값을 주면 저장될 파일명을 지정할 수 있다.
              // 파일명을 데이터에서 조립해 이름이 바뀌어도 따라오게 한다.
              download={
                cta.secondary.download ? `${profile.name}_이력서.pdf` : undefined
              }
              className="bg-accent-600 hover:bg-accent-700 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-sm transition"
            >
              <Download size={16} aria-hidden="true" />
              {cta.secondary.label}
            </a>

            {github && (
              <a
                href={github.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <GithubIcon size={16} />
                {github.label}
              </a>
            )}
          </div>
        </div>

        {/* ── 우측: 프로필 사진 ──
            모바일(md 미만)에서는 숨긴다. 좁은 화면에서 사진이 화면 절반을 먹으면
            정작 읽어야 할 소개 문구가 아래로 밀려난다.

            self-start: 좌측 컬럼이 길어져도 사진은 위쪽에 붙어 있게 한다.
            (기본 stretch면 사진이 세로 중앙으로 내려가 헤드라인과 어긋난다) */}
        <div className="hidden self-start md:block md:pt-4">
          <div className="relative mx-auto w-full max-w-64">
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
