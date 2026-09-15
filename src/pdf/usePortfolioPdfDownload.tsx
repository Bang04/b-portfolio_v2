import { useCallback, useState } from 'react'
import { profile } from '@/data/portfolioData'

export type PdfDownloadStatus = 'idle' | 'generating' | 'error'

/**
 * @react-pdf/renderer는 번들이 무거워 Hero가 항상 들고 있으면 안 된다.
 * 그래서 렌더러와 문서 컴포넌트 둘 다 클릭 시점에 동적 import 한다 —
 * 처음 방문한 사람의 초기 로딩에는 영향이 없다.
 */
export function usePortfolioPdfDownload() {
  const [status, setStatus] = useState<PdfDownloadStatus>('idle')

  const download = useCallback(async () => {
    if (status === 'generating') return
    setStatus('generating')
    try {
      const [{ pdf }, { PortfolioPdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./PortfolioPdfDocument'),
      ])

      const blob = await pdf(<PortfolioPdfDocument />).toBlob()

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${profile.nameEn.replace(/\s+/g, '_')}_포트폴리오_요약.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)

      setStatus('idle')
    } catch (error) {
      console.error('PDF 생성 실패', error)
      setStatus('error')
    }
  }, [status])

  return { download, status }
}
