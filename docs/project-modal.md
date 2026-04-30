# 프로젝트 상세 모달 구현

## 개요

Projects 섹션 카드 클릭 시 Framer Motion 기반 모달로 상세 정보를 보여주는 기능.
URL 변경 없이 동작하며, 이미지 슬라이더 / ESC·backdrop 닫기 / 스크롤 잠금 포함.

---

## 파일 구조

```
constants/
├── projects.ts         ← 카드 표시용 데이터 (Project 인터페이스)
└── projectDetails.ts   ← 모달 상세 데이터 (ProjectDetail 인터페이스)

components/ui/
├── ProjectCard.tsx     ← onClick prop 추가
├── ProjectModal.tsx    ← 신규 생성 (portal 기반 모달)
└── ProjectImageSlider.tsx  ← 신규 생성 (이미지 슬라이더)

components/sections/
└── Projects.tsx        ← 모달 상태 + 연결
```

---

## constants/projects.ts — 카드용 데이터

```ts
export type ProjectType = "main" | "sub";

export interface Project {
  slug: string; // projectDetails.ts와 연결하는 key
  title: string;
  description: string; // 카드에 표시되는 한 줄 설명
  period: string;
  role: string;
  techStack: string[];
  thumbnail: string;
  type: ProjectType;
  team: "solo" | "team";
  teamSize?: number;
  deprecated?: boolean;
  deprecatedReason?: string;
  links: {
    github?: string;
    deployUrl?: string;
    figma?: string;
  };
}
```

- `deprecated: true` + `deprecatedReason` → 카드 이미지 위에 "서비스 종료" 뱃지 표시
- `team` / `teamSize` → 카드 우상단 "개인" / "팀 N인" 뱃지 표시

---

## constants/projectDetails.ts — 모달 상세 데이터

```ts
export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectChallenge {
  problem: string;
  solution: string;
}

export interface ProjectDetail {
  slug: string;           // projects.ts의 slug와 동일하게 작성
  images?: string[];
  background?: string;
  goals?: string[];
  features?: ProjectFeature[];
  challenges?: ProjectChallenge[];
  learnings?: string;
}

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    slug: "banbok",       // ← projects.ts의 slug와 일치해야 연결됨
    images: [...],
    background: "...",
    goals: ["..."],
    features: [{ title: "...", description: "..." }],
    challenges: [{ problem: "...", solution: "..." }],
    learnings: "...",
  },
];
```

**데이터 추가 방법:** `projects.ts`에 카드 정보 추가 → `projectDetails.ts`에 동일한 `slug`로 상세 내용 추가하면 모달에 자동 연결.

---

## components/ui/ProjectCard.tsx — 변경 사항

기존 코드 그대로 유지 + 아래만 추가:

- `'use client'` 선언 추가
- Props에 `onClick?: () => void` 추가
- 루트 div에 `onClick={onClick}`, `cursor-pointer` 추가
- 링크 버튼 div에 `onClick={(e) => e.stopPropagation()}` 추가 (카드 클릭과 링크 클릭 분리)

---

## components/ui/ProjectImageSlider.tsx — 신규 생성

- Props: `images?: string[]`, `title: string`
- `images.length === 0` → placeholder ("이미지 없음")
- `images.length === 1` → 단일 next/image
- `images.length >= 2` → useState(index), 좌우 화살표 버튼, dot indicator
- 이미지 전환: `AnimatePresence mode="wait"` + fade (`opacity 0↔1, duration 0.25`)
- 컨테이너: `relative w-full aspect-video overflow-hidden rounded-xl bg-(--bg-sub)`

---

## components/ui/ProjectModal.tsx — 신규 생성

- Props: `project: Project | null`, `onClose: () => void`
- Portal: `ReactDOM.createPortal(..., document.body)` — `mounted` 상태로 SSR 안전 처리
- body 스크롤 잠금: `useEffect`에서 `overflow: hidden` / cleanup
- ESC 키: `useEffect`에서 keydown 리스너
- backdrop: `fixed inset-0 z-50 rgba(0,0,0,0.6)` → 클릭 시 닫힘
- 모달 패널: `max-w-3xl max-h-[90vh] overflow-y-auto`, `motion.div` slide-up 애니메이션

**모달 내부 렌더 순서:**

1. 헤더 (sticky): 제목 + 역할·기간 + X 버튼 + 링크 버튼들
2. 이미지 슬라이더 (`detail.images` 있을 때만)
3. 기술 스택 배지 (`project.techStack`)
4. 배경 & 목적 (`detail.background` 있을 때만)
5. 목표 (`detail.goals` 있을 때만)
6. 주요 기능 (`detail.features` 있을 때만)
7. 기술적 도전 & 해결 (`detail.challenges` 있을 때만)
8. 배운 점 / 회고 (`detail.learnings` 있을 때만)

**slug 조회 방식:**

```ts
const detail = PROJECT_DETAILS.find((d) => d.slug === project.slug);
```

---

## components/sections/Projects.tsx — 변경 사항

기존 코드 그대로 유지 + 아래만 추가:

```tsx
const [selectedProject, setSelectedProject] = useState<Project | null>(null);
```

- 메인 프로젝트 `<ProjectCard>` → `onClick={() => setSelectedProject(project)}`
- 사이드 프로젝트 리스트 아이템 → `onClick={() => setSelectedProject(project)}`
- return 닫히기 직전에 추가:

```tsx
<ProjectModal
  project={selectedProject}
  onClose={() => setSelectedProject(null)}
/>
```

---

## 주의사항

- `ReactDOM.createPortal`은 SSR에서 `document` 접근 불가 → `useEffect`로 `mounted` 확인 후 렌더
- `AnimatePresence`는 `ProjectModal` 최상위에서 감싸야 exit 애니메이션 작동
- `GithubIcon` 컴포넌트(`components/ui/GithubIcon.tsx`) 기존 것 재사용
- 색상 하드코딩 금지 (backdrop `rgba` 제외)
- 모달 상세 필드는 전부 optional — 데이터 없으면 해당 섹션 미렌더링

---

## 검증 방법

1. 카드 클릭 → 모달 오버레이로 열림 (카드 내용 유지 확인)
2. backdrop 클릭 / ESC → 모달 닫힘
3. 모달 열릴 때 배경 스크롤 잠금, 닫힐 때 해제
4. `projectDetails.ts`에 데이터 없는 프로젝트 → 모달 열려도 오류 없음
5. `images` 배열 길이에 따른 슬라이더 동작 (0 / 1 / 2+ 케이스)
6. 링크 버튼 클릭 → 모달 열리지 않고 링크만 이동
7. 사이드 프로젝트도 클릭 시 모달 열림 확인
8. 다크모드 전환 시 모달 색상 정상 적용
