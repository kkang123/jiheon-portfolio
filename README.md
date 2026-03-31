# jihean-portfolio

포트폴리오 사이트

# jihean-portfolio

포트폴리오 사이트

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
jihean-portfolio/
├── app/
│   ├── layout.tsx          # ThemeProvider, 폰트, 메타태그
│   ├── page.tsx            # 메인 (섹션 조합)
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # nav + 다크모드 토글
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx        # 인트로 ("안녕하세요, 강지헌입니다")
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
