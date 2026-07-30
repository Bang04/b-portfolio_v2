# assets 폴더 사용법

## 어디에 무엇을 두는가

| 파일                     | 위치                  | 이유                                                                                                                                                              |
| ------------------------ | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 프로필 사진, 프로젝트 캡처 | `src/assets/`         | `import` 해서 쓰면 Vite가 **해시 붙은 파일명**으로 빌드한다(`hero-a1b2c3.png`). 내용이 바뀌면 파일명도 바뀌므로 브라우저 캐시 문제가 없다. 없는 파일을 import하면 **빌드가 실패**해 오타를 미리 잡아준다. |
| 이력서 PDF               | `public/resume.pdf`   | 주소를 그대로 유지해야 한다. 이력서 링크를 이메일이나 이력서 사이트에 붙여넣었는데 배포마다 해시가 바뀌면 링크가 깨진다. `public/`의 파일은 이름 그대로 서빙된다.                       |
| OG 대표 이미지           | `public/og-image.png` | 위와 같은 이유 + 외부 크롤러(카카오톡, 트위터)가 고정 URL로 접근해야 한다. (5단계에서 추가)                                                                                |

**한 줄 원칙**: 코드가 참조하는 것은 `src/assets/`, 바깥세상이 URL로 참조하는 것은 `public/`.

## 지금 채워야 할 것

```
src/assets/
├── profile.jpg                    ← TODO: 프로필 사진 (정사각형, 최소 640×640 권장)
├── profile-placeholder.svg        ← 지금 쓰이는 임시 이미지
└── projects/
    ├── inje-dashboard.png         ← TODO: 프로젝트 캡처 (16:9 권장, 1600×900)
    ├── slope-web.png              ← TODO
    └── agent-studio.png           ← TODO
public/
├── favicon.svg                    ← 필요하면 교체
└── resume.pdf                     ← TODO: 실제 이력서 PDF로 교체 (현재는 자리표시자)
```

## 교체하는 방법

`src/data/portfolioData.ts` 상단에서 import 하고 해당 필드에 넣는다.

```ts
import profileImage from '@/assets/profile.jpg'
import injeThumb from '@/assets/projects/inje-dashboard.png'

const profile = {
  // ...
  avatar: profileImage, // profilePlaceholder 대신
}

const projects = [
  {
    id: 'inje-dashboard',
    // ...
    thumbnail: injeThumb, // 주석 해제
  },
]
```

`thumbnail`이 없으면 카드에 "No preview" 자리표시자가 렌더된다 —
이미지를 아직 못 준비했어도 레이아웃은 깨지지 않는다.

## 이미지 최적화 팁

- 캡처는 PNG보다 **WebP**가 보통 40~70% 작다. `.webp`로 저장하면 import 방식은 동일하다.
- 프로필 사진은 화면에 280px로 표시되므로 640px 이상은 낭비다. 리사이즈해서 넣자.
- 용량이 큰 이미지를 그대로 올리면 Lighthouse 점수가 즉시 떨어진다. 배포 전(5단계) 한 번 점검할 것.
