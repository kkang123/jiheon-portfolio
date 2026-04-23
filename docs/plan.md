# 포트폴리오 개발 플랜 (2026-03-31)

## 현황

포트폴리오 사이트 기본 구현 완료. 개인 정보 입력 및 콘텐츠 채우기 단계.

---

## 완료된 작업

- [x] 프로젝트 세팅 (Next.js 16, TypeScript, Tailwind v4, Framer Motion, next-themes)
- [x] 디자인 시스템 — CSS 변수, 아이보리 테마, 다크모드 (`globals.css`)
- [x] `app/layout.tsx` — ThemeProvider, DM Serif Display, Pretendard 폰트
- [x] `Header` — 스크롤 blur 효과, 모바일 햄버거 메뉴, 다크모드 토글
- [x] `Footer`
- [x] `Hero` 섹션 — stagger 애니메이션, CTA 버튼
- [x] `About` 섹션 — 2컬럼 레이아웃, 키워드 블록, 프로필 이미지 영역
- [x] `Skills` 섹션 — Language / Frontend / Tools 탭, AnimatePresence
- [x] `Projects` 섹션 — main / sub 프로젝트 분리, ProjectCard
- [x] `Contact` 섹션 — 이메일, GitHub, Velog 링크
- [x] `constants/skills.ts`, `constants/projects.ts` 데이터 파일
- [x] CLAUDE.md 스타일링·다크모드 규칙 정비

---

## 남은 작업

### 콘텐츠 채우기 (직접 수정 필요)

- [ ] `components/sections/Hero.tsx` — 한 줄 소개 문구 수정
- [ ] `components/sections/About.tsx` — KEYWORDS 배열에 키워드 3개 작성
- [ ] `constants/skills.ts` — 각 스킬 description을 본인 경험 수준으로 수정
- [ ] `constants/projects.ts` — PROJECTS, SUB_PROJECTS에 실제 프로젝트 추가
- [ ] `components/layout/Header.tsx` — 로고 텍스트 변경 (현재 `JH.`)

### 에셋 추가 (파일 직접 추가 필요)

- [ ] `public/assets/profile.jpg` — 본인 사진
- [ ] `public/assets/projects/*.png` — 프로젝트 스크린샷

### SEO / 배포 설정

- [ ] `app/layout.tsx` — `metadataBase` 도메인 설정
- [ ] OG 이미지 제작 및 `public/og-image.png` 추가
- [ ] `app/layout.tsx` — OG 이미지 메타태그 적용
- [ ] Vercel 배포 연결 (도메인 설정)

### 선택적 개선

- [ ] Contact 섹션에 링크드인 / 노션 링크 추가 (있을 경우)
- [ ] 프로젝트 상세 페이지 (`/projects/[slug]`) 추가 여부 결정
- [ ] 반응형 최종 검수 (모바일 375px, 태블릿 768px)
- [ ] 라이트하우스 점수 확인 (성능·접근성)

---

## 기술 메모

| 항목 | 내용 |
|------|------|
| Tailwind 버전 | v4 — `tailwind.config.ts` 없음, `globals.css`에서 `@theme` / `@custom-variant` 사용 |
| CSS 변수 문법 | `bg-(--bg)`, `text-(--text)` (Tailwind v4 단축 문법) |
| GitHub 아이콘 | lucide-react에 없어 `components/ui/GithubIcon.tsx` SVG 컴포넌트로 대체 |
| Framer Motion | `Variants` 타입 import 필요 (`ease` 타입 엄격화) |
| Pretendard 폰트 | `public/fonts/PretendardVariable.woff2` — 이미 추가됨 ✅ |
