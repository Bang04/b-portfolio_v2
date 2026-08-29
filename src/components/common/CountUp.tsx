import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'

const NUMBER_PATTERN = /-?\d[\d,]*(?:\.\d+)?/g

function parseNumber(token: string): number {
  return Number(token.replace(/,/g, ''))
}

function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

/**
 * CountUp — 문자열 안의 숫자만 스크롤 진입 시 목표값까지 세어 올라가게 한다.
 * ---------------------------------------------------------------------------
 * Reveal.tsx와 같은 이유로 급경사지 프로젝트 섹션에만 쓴다. "2,889 → 2건"
 * 같은, 되물으면 근거를 댈 수 있는 숫자가 이 프로젝트 문체의 핵심이라
 * (Hero의 keywords proof, About workingStyle의 "측정하지 않은 개선은
 * 개선이 아니다") 그 숫자가 화면에 나타나는 순간을 강조하는 게 자연스럽다.
 * 반대로 근거 없는 숫자(예: 연도, 기간)에 카운트업을 붙이면 숫자가 전부
 * "연출"처럼 보여 오히려 신뢰를 깎는다 — 그래서 이 컴포넌트는 result.outcomes,
 * deepDive metric, profile.stats 처럼 실측 수치가 있는 곳에만 붙인다.
 *
 * portfolioData.ts를 건드리지 않고 문자열에서 숫자를 파싱하는 이유:
 * 그 파일은 이미 "숫자는 로그로 확인된 것만 쓴다"는 원칙으로 다 채워져
 * 있다. 숫자만 별도 필드로 뽑아 데이터 구조를 바꾸면 그 원칙과 무관한
 * 변경이 데이터 파일에 섞여 들어간다. 화면 쪽에서 완성된 문자열을 파싱하는
 * 쪽이 데이터는 그대로 두고 연출만 더하는 가장 작은 변경이다.
 *
 * 숫자가 2개 발견되면(예: "2,889 → 2") 마지막 숫자만 애니메이션 대상으로
 * 삼고 시작값은 첫 번째 숫자로 삼는다 — before를 보여주다가 after로
 * 줄어드는(또는 늘어나는) 흐름이 원본 문장의 의미와 같다. 숫자가 1개뿐이면
 * ("21청크") 0에서 그 값까지 세어 올라간다. `from`을 따로 넘기면(예: 성능
 * 지표의 before/after가 서로 다른 DOM에 이미 나뉘어 있는 경우) 그 문자열의
 * 마지막 숫자를 시작값으로 쓴다. 콤마·소수 자리는 목표 숫자의 표기를 그대로
 * 따라간다.
 */
export function CountUp({
  text,
  from,
  className,
  duration = 1.1,
}: {
  /** 숫자를 포함한 표시 문자열. 예: "2,889 → 2건", "21청크", "160건" */
  text: string
  /** 시작값을 별도 문자열에서 가져올 때만 지정한다. 예: "2,889건" */
  from?: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [display, setDisplay] = useState(text)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const matches = [...text.matchAll(NUMBER_PATTERN)]
    if (matches.length === 0) return // 숫자가 없는 문자열은 그대로 둔다

    const target = matches[matches.length - 1]
    const targetIndex = target.index ?? 0
    const prefix = text.slice(0, targetIndex)
    const suffix = text.slice(targetIndex + target[0].length)
    const toValue = parseNumber(target[0])

    let fromValue: number
    if (from) {
      const fromMatches = [...from.matchAll(NUMBER_PATTERN)]
      fromValue =
        fromMatches.length > 0
          ? parseNumber(fromMatches[fromMatches.length - 1][0])
          : 0
    } else {
      fromValue = matches.length >= 2 ? parseNumber(matches[0][0]) : 0
    }

    const decimals = target[0].includes('.') ? target[0].split('.')[1].length : 0

    if (fromValue === toValue) return // 변화가 없는 숫자는 세는 의미가 없다

    const controls = animate(fromValue, toValue, {
      duration,
      ease: 'easeOut',
      onUpdate: (value) => {
        setDisplay(`${prefix}${formatNumber(value, decimals)}${suffix}`)
      },
    })

    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- text/from/duration은 마운트 시점 값으로 고정해서 쓴다
  }, [isInView])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
