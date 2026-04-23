# CLAUDE.md - jiheon-portfolio

이 파일은 Claude가 jiheon-portfolio 프로젝트를 도울 때 참고하는 가이드입니다.

---

## 프로젝트 개요

김지헌의 프론트엔드 개발자 포트폴리오 사이트입니다.
참고 사이트: https://www.seungyn.com

---

## 기술 스택

| 기술          | 버전              | 용도        |
| ------------- | ----------------- | ----------- |
| Next.js       | 16.x (App Router) | 프레임워크  |
| TypeScript    | latest            | 타입 안정성 |
| Tailwind CSS  | latest            | 스타일링    |
| next-themes   | latest            | 다크모드    |
| Framer Motion | latest            | 애니메이션  |

---

## 디자인 시스템

### 색상 토큰 (CSS Variables)

```css
/* 라이트 모드 - 아이보리 테마 */
:root {
  --bg: #fdfaf4; /* 메인 배경 */
  --bg-sub: #f5f0e8; /* 카드/서브 배경 */
  --text: #1c1917; /* 메인 텍스트 */
  --text-sub: #78716c; /* 서브 텍스트 */
  --accent: #c17b2f; /* 포인트 컬러 (웜 골드) */
  --border: #e7dfd3; /* 보더 */
}

/* 다크 모드 */
.dark {
  --bg: #141210;
  --bg-sub: #1e1b18;
  --text: #f5f0e8;
  --text-sub: #a8a29e;
  --accent: #e09a4a;
  --border: #2c2824;
}
```

### 다크모드 규칙

- `next-themes`의 `ThemeProvider`로 관리
- Tailwind v4 `@custom-variant dark (&:where(.dark, .dark *))` 전략 사용
- CSS 변수값 교체 방식으로 처리 — `globals.css`의 `.dark { }` 블록에서 토큰 재정의
- `dark:` 접두사 사용 불필요
- 시스템 설정을 기본값으로 따름 (`defaultTheme: 'system'`)

---

## 폴더 구조

```
jiheon-portfolio/
├── app/
│   ├── layout.tsx          # ThemeProvider, 폰트, 글로벌 메타태그
│   ├── page.tsx            # 섹션 조합 (Hero, About, Skills, Projects, Contact)
│   └── globals.css         # CSS 변수, 글로벌 스타일
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # 네비게이션 + 다크모드 토글
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx        # 인트로 섹션
│   │   ├── About.tsx       # 자기소개 섹션
│   │   ├── Skills.tsx      # 기술 스택 섹션 (탭 UI)
│   │   ├── Projects.tsx    # 프로젝트 섹션
│   │   └── Contact.tsx     # 연락처 섹션
│   └── ui/
│       ├── ProjectCard.tsx
│       ├── SkillBadge.tsx
│       └── ThemeToggle.tsx
├── constants/
│   ├── skills.ts           # 기술 스택 데이터
│   └── projects.ts         # 프로젝트 데이터
└── public/
    └── assets/
        ├── profile.jpg
        └── projects/       # 프로젝트 스크린샷
```

---

## 섹션 구성

### Hero

- 인트로 문구 + 이름
- 짧은 한 줄 소개
- About / Projects로 이동하는 CTA 버튼

### 01. About

- 나를 표현하는 키워드 3개 + 스토리
- 프로필 이미지

### 02. Skills

- Language / Frontend / Tools 탭으로 분류
- 각 스킬에 간단한 설명 포함

### 03. Projects

- 주요 프로젝트 카드 형태로 표시
- 사용 기술 스택 태그
- GitHub 링크 / 배포 링크

### 04. Contact

- 이메일
- GitHub 링크
- 간단한 소개 문구

---

## 컴포넌트 작성 규칙

### 기본 규칙

- 모든 컴포넌트는 TypeScript로 작성
- `interface`로 Props 타입 정의
- `'use client'`는 필요한 경우에만 상단에 선언 (이벤트 핸들러, useState, useEffect 사용 시)
- 서버 컴포넌트를 기본으로 사용

### 예시

```tsx
// 서버 컴포넌트 (기본)
export default function Hero() {
  return (
    <section id="hero">
      ...
    </section>
  )
}

// 클라이언트 컴포넌트 (필요한 경우만)
'use client'

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  deployUrl?: string
}

export default function ProjectCard({ title, description, techStack, githubUrl, deployUrl }: ProjectCardProps) {
  return (
    ...
  )
}
```

### 스타일링 규칙

- CSS 변수는 Tailwind v4 단축 문법으로 사용: `bg-(--bg)`, `text-(--text)`
- Tailwind 유틸리티 클래스 우선 사용
- 인라인 스타일은 동적 값이 필요한 경우에만 허용
- 다크모드는 `dark:` 접두사 없이 CSS 변수로 처리 (globals.css의 `.dark { }` 블록에서 변수값 교체)

---

## 애니메이션 규칙 (Framer Motion)

- 스크롤 진입 애니메이션은 `whileInView` 사용
- 페이지 진입 애니메이션은 `Hero` 섹션에만 적용
- 과한 애니메이션 지양 — 심플하게 fade + slide up 위주로
- `viewport={{ once: true }}`로 한 번만 실행

```tsx
// 권장 패턴
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
```

---

## 데이터 관리 규칙

프로젝트 데이터와 스킬 데이터는 `constants/` 폴더에서 관리합니다.

```ts
// constants/projects.ts
export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  deployUrl?: string;
  imageUrl?: string;
  period: string;
}

export const PROJECTS: Project[] = [
  {
    title: "",
    description: "",
    techStack: [],
    githubUrl: "",
    period: "",
  },
];
```

```ts
// constants/skills.ts
export type SkillCategory = "Language" | "Frontend" | "Tools";

export interface Skill {
  name: string;
  description: string;
  category: SkillCategory;
}

export const SKILLS: Skill[] = [
  {
    name: "",
    description: "",
    category: "Frontend",
  },
];
```

---

## Git 브랜치 전략

```
main   ← Vercel 프로덕션 배포 (직접 push 금지)
dev    ← 기본 개발 브랜치 (세팅, 패키지 설치 등)
feat/* ← 섹션 단위 작업 브랜치
```

### 작업 흐름

```bash
# 섹션 작업 시작
git checkout dev
git checkout -b feat/hero

# 작업 후
git add .
git commit -m "feat: Hero 섹션 추가"
git push origin feat/hero

# GitHub에서 feat/hero → dev PR 생성 후 merge
# 배포 시 dev → main PR merge → Vercel 자동 배포
```

### 커밋 컨벤션

| 타입       | 용도                            |
| ---------- | ------------------------------- |
| `feat`     | 새로운 섹션 또는 기능 추가      |
| `style`    | 스타일 변경 (색상, 레이아웃 등) |
| `fix`      | 버그 수정                       |
| `chore`    | 패키지 설치, 설정 파일 변경     |
| `refactor` | 코드 구조 개선                  |

---

## 개발 순서 가이드

Claude가 작업을 도울 때 아래 순서를 참고합니다.

1. `globals.css` — CSS 변수 + 글로벌 스타일 세팅
2. `app/layout.tsx` — ThemeProvider + 폰트 설정
3. `Header.tsx` — 네비게이션 + 다크모드 토글
4. `Hero.tsx` — 인트로 섹션
5. `About.tsx` — 자기소개 섹션
6. `constants/skills.ts` + `Skills.tsx` — 기술 스택
7. `constants/projects.ts` + `Projects.tsx` — 프로젝트
8. `Contact.tsx` — 연락처
9. `Footer.tsx` — 푸터
10. SEO 메타태그, OG 이미지 설정

---

## 배포 환경

- **플랫폼**: Vercel
- **프로덕션**: `main` 브랜치 push 시 자동 배포
- **프리뷰**: `dev`, `feat/*` 브랜치 push 시 Preview URL 자동 생성

---

### 폰트

| 용도      | 폰트             | 적용 대상                             |
| --------- | ---------------- | ------------------------------------- |
| Display   | DM Serif Display | 섹션 제목, Hero 이름 등 큰 텍스트     |
| Body / UI | Pretendard       | 본문, 버튼, 네비게이션 등 전반적인 UI |

#### 적용 규칙

- `DM Serif Display`는 `next/font/google`으로 로드
- `Pretendard`는 CDN 또는 `next/font/local`로 로드 (Google Fonts 미제공)
- Hero 이름, 섹션 타이틀 → `font-display` (DM Serif Display)
- 나머지 모든 텍스트 → `font-body` (Pretendard)
- Tailwind에 `fontFamily` 커스텀으로 등록해서 사용

```tsx
// tailwind.config.ts
fontFamily: {
  display: ['DM Serif Display', 'serif'],
  body: ['Pretendard', 'sans-serif'],
}
```

## 주의사항

- `'use client'` 남발 금지 — 꼭 필요한 컴포넌트에만 사용
- 이미지는 반드시 `next/image` 사용
- 링크는 반드시 `next/link` 사용
- 외부 링크(`target="_blank"`)는 반드시 `rel="noopener noreferrer"` 추가
- 반응형은 모바일 퍼스트로 작성 (`sm:`, `md:`, `lg:` 순서)
