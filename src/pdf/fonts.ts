import { Font } from '@react-pdf/renderer'
import PretendardRegular from '@/assets/fonts/pretendard/Pretendard-Regular.otf'
import PretendardMedium from '@/assets/fonts/pretendard/Pretendard-Medium.otf'
import PretendardSemiBold from '@/assets/fonts/pretendard/Pretendard-SemiBold.otf'
import PretendardBold from '@/assets/fonts/pretendard/Pretendard-Bold.otf'

/**
 * 사이트 본문과 같은 Pretendard를 PDF에도 쓴다.
 * react-pdf는 가변 폰트의 굵기 축을 자동으로 못 뽑아내므로,
 * 웨이트별 정적 otf 4종을 register해 fontWeight로 선택되게 한다.
 */
export const PDF_FONT_FAMILY = 'Pretendard'

let registered = false

export function registerPdfFonts() {
  if (registered) return
  Font.register({
    family: PDF_FONT_FAMILY,
    fonts: [
      { src: PretendardRegular, fontWeight: 400 },
      { src: PretendardMedium, fontWeight: 500 },
      { src: PretendardSemiBold, fontWeight: 600 },
      { src: PretendardBold, fontWeight: 700 },
    ],
  })
  registered = true
}
