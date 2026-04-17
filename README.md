# jiheon-portfolio

포트폴리오 사이트

배포 주소 : https://jiheon.vercel.app/

## ⚙️ 기술 스택

next.js (app router) + typescript

```bash
npx create-next-app@latest . \ --typescript --tailwind --app --eslint
```

tailwindcss v4

next-themes # 다크모드
framer-motion # 스크롤 애니메이션

```bash
npm install next-themes framer-motion
```

## 📁 폴더 구조

```bash
jiheon-portfolio/
├── app/
│   ├── layout.tsx          # ThemeProvider, 폰트, 메타태그
│   ├── page.tsx            # 메인 (섹션 조합)
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # nav + 다크모드 토글
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx        # 인트로 ("안녕하세요, 김지헌입니다")
│   │   ├── About.tsx       # 자기소개 3개 키워드
│   │   ├── Skills.tsx      # 탭으로 분류된 기술 스택
│   │   ├── Projects.tsx    # 주요 프로젝트 카드
│   │   └── Contact.tsx     # 이메일 / 링크
│   └── ui/
│       ├── ProjectCard.tsx
│       ├── SkillBadge.tsx
│       └── ThemeToggle.tsx
├── constants/
│   ├── skills.ts           # 기술 스택 데이터
│   └── projects.ts         # 프로젝트 데이터
├── public/
│   └── assets/
│       ├── profile.jpg
│       └── projects/       # 프로젝트 스크린샷
├── next.config.ts
├── tailwind.config.ts
└── .env.local              # 이메일 등 민감 정보
```

## 색상 시스템

```css
/* globals.css */
:root {
  --bg: #fdfaf4; /* 아이보리 배경 */
  --bg-sub: #f5f0e8; /* 카드/섹션 배경 */
  --text: #1c1917; /* 메인 텍스트 */
  --text-sub: #78716c; /* 서브 텍스트 */
  --accent: #c17b2f; /* 포인트 (웜 골드) */
  --border: #e7dfd3;
}

.dark {
  --bg: #141210;
  --bg-sub: #1e1b18;
  --text: #f5f0e8;
  --text-sub: #a8a29e;
  --accent: #e09a4a;
  --border: #2c2824;
}
```

## 🐛 트러블슈팅

### next-themes 테마 전환 1회 스킵 현상

**증상**  
페이지 최초 로드 후 첫 번째 테마 토글 클릭 시, 토글 버튼 UI(아이콘)는 즉시 변경되지만, 실제 다크/라이트 모드 적용이 한 박자 늦게 반응하는 현상 발생하고 세 번째 클릭부터는 정상적으로 자리를 잡아 동작.

**배경**  
시간대에 따라 자동으로 테마를 전환하고자 `defaultTheme="system"` + `enableSystem` 조합을 선택했으나, 해당 옵션은 시간대가 아닌 **OS 다크모드 설정**을 따르는 기능임을 뒤늦게 파악. 의도와 다른 옵션을 사용한 것이 버그의 근본 원인이었음.

> 여기서 OS 다크모드 설정이란 맥(또는 기기)의 다크모드 설정을 사이트에 그대로 반영하는 기능

**원인**  
`ThemeProvider`의 `defaultTheme="system"` + `enableSystem` 조합 사용 시, next-themes가 초기 테마를 `"system"`으로 인식한 상태에서 시작됨.

`useTheme()`이 반환하는 `theme`과 `resolvedTheme`은 다른 값이다.

```ts
{
  theme: "system",        // localStorage/설정에 저장된 값
  resolvedTheme: "dark",  // 실제 DOM에 적용된 값
}
```

토글 로직에서 `theme`을 사용할 경우, 첫 번째 클릭이 `system → dark` 또는 `system → light`로 소비되어 실제 전환이 한 번 밀리는 구조적 문제가 발생.

```tsx
// ❌ Before
const { theme, setTheme } = useTheme();
setTheme(theme === "dark" ? "light" : "dark");
// theme이 "system"이면 첫 클릭이 소비됨
```

**해결**
`theme` 대신 `resolvedTheme`을 사용. `resolvedTheme`은 next-themes가 내부적으로 OS의 `prefers-color-scheme` 미디어 쿼리를 읽어 계산한 값으로, `enableSystem` 활성화 시 `"system"` 상태일 때도 항상 `"dark"` 또는 `"light"` 중 하나를 반환함.

```ts
// next-themes 내부 동작 (간략화)
resolvedTheme = theme === "system" ? systemTheme : theme;
```

```tsx
// ✅ After
const { resolvedTheme, setTheme } = useTheme();
setTheme(resolvedTheme === "dark" ? "light" : "dark");
// 항상 "dark" | "light" 중 하나이므로 첫 클릭부터 정상 동작
```

`enableSystem`을 제거하고 `defaultTheme`을 명시적으로 고정. 추가로 `disableTransitionOnChange`를 적용해 테마 전환 시 CSS transition 충돌도 방지.

```tsx
// ✅ After
<ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
```

**배운 점**  
`useTheme()`이 반환하는 `theme`과 `resolvedTheme`은 다른 값이다.

|                        | `theme`                      | `resolvedTheme`            |
| ---------------------- | ---------------------------- | -------------------------- |
| 의미                   | localStorage에 저장된 설정값 | 실제 DOM에 적용된 값       |
| `enableSystem` 사용 시 | `"system"` 반환 가능         | 항상 `"dark"` \| `"light"` |

토글처럼 **현재 실제 적용된 테마**를 기준으로 판단해야 하는 로직에서는 `theme` 대신 `resolvedTheme`을 사용해야 예측 가능한 동작을 보장할 수 있다.
