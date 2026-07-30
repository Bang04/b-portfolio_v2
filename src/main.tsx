import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * 애플리케이션 진입점
 * ---------------------------------------------------------------------------
 * StrictMode 는 개발 모드에서만 동작하며, 컴포넌트를 의도적으로 두 번 렌더한다.
 * "왜 콘솔 로그가 두 번 찍히지?"의 정답이 이것이다. 버그가 아니라,
 * 정리(cleanup)를 빠뜨린 useEffect 를 개발 중에 잡아내려는 장치다.
 * 프로덕션 빌드에서는 한 번만 렌더된다.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
