import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Copy, Mail, Send } from 'lucide-react'
import { contact, profile } from '@/data/portfolioData'
import { Section } from '@/components/common/Section'

/**
 * 이메일 주소 복사 버튼
 * ---------------------------------------------------------------------------
 * 여기에 이 컴포넌트의 어려운 부분이 다 들어있다:
 *  1. Clipboard API 는 Promise 기반이고 실패할 수 있다(권한 거부, http 환경).
 *  2. "복사됨" 표시를 일정 시간 후 되돌려야 한다 → setTimeout 정리 필요.
 */
function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  // useRef 로 타이머 id를 들고 있는 이유:
  // 일반 변수는 리렌더 때 초기화되고, useState는 값이 바뀌면 또 렌더를 유발한다.
  // "렌더와 무관하게 값을 기억"해야 할 때가 정확히 useRef의 용도다.
  const timerRef = useRef<number | undefined>(undefined)

  // 컴포넌트가 사라질 때 예약된 타이머를 취소한다.
  // 없으면 언마운트 후 setState가 호출돼 경고가 뜨고, 최악의 경우 메모리 누수가 된다.
  useEffect(() => {
    return () => window.clearTimeout(timerRef.current)
  }, [])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard API 는 https(또는 localhost)에서만 동작한다.
      // 실패 시 조용히 넘기지 않고 mailto로 대체 경로를 제공한다.
      window.location.href = `mailto:${email}`
    }
  }, [email])

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
    >
      {copied ? (
        <Check size={16} className="text-emerald-500" aria-hidden="true" />
      ) : (
        <Copy size={16} aria-hidden="true" />
      )}
      {copied ? '복사했습니다' : '이메일 주소 복사'}
      {/* aria-live="polite": 시각적으로는 버튼 글자가 바뀌지만
          스크린리더 사용자에게는 그 변화가 전달되지 않는다.
          별도 라이브 영역을 둬서 상태 변화를 읽어주게 한다. */}
      <span aria-live="polite" className="sr-only">
        {copied ? `${email} 이(가) 클립보드에 복사되었습니다` : ''}
      </span>
    </button>
  )
}

export function Contact() {
  const hasForm = Boolean(contact.formspreeEndpoint)

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={contact.heading}
      description={contact.message}
    >
      <div className="card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-400 inline-flex size-11 shrink-0 items-center justify-center rounded-xl">
              <Mail size={20} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs text-zinc-500">Email</p>
              {/* break-all: 좁은 화면에서 긴 이메일이 카드를 뚫고 나가는 것을 막는다 */}
              <p className="font-mono text-sm font-semibold break-all text-zinc-900 dark:text-zinc-100">
                {contact.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="bg-accent-600 hover:bg-accent-700 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition"
            >
              <Send size={16} aria-hidden="true" />
              메일 보내기
            </a>
            <CopyEmailButton email={contact.email} />
          </div>
        </div>

        {/* 문의 폼 자리 -------------------------------------------------------
            formspreeEndpoint 가 비어 있으면 아예 렌더하지 않는다.
            "동작하지 않는 폼"은 없는 폼보다 나쁘다 — 보낸 줄 알고 기다리게 되니까.
            4단계에서 엔드포인트를 채우고 전송/검증 로직을 붙인다. */}
        {hasForm ? (
          <p className="mt-6 border-t border-zinc-100 pt-6 text-sm text-zinc-500 dark:border-zinc-800">
            TODO(4단계): Formspree 연동 폼 구현 — 엔드포인트{' '}
            <code className="font-mono text-xs">
              {contact.formspreeEndpoint}
            </code>
          </p>
        ) : (
          <p className="mt-6 border-t border-zinc-100 pt-6 text-sm text-zinc-500 dark:border-zinc-800">
            {profile.location} 기준 평일 오전에 가장 빠르게 답장합니다.
          </p>
        )}
      </div>
    </Section>
  )
}
