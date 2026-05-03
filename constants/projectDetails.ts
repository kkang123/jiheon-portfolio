export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectChallenge {
  problem: string;
  solution: string;
}

export interface ProjectDetail {
  slug: string; // constants/projects.ts의 slug와 연결
  images?: string[];
  background?: string;
  goals?: string[];
  features?: ProjectFeature[];
  challenges?: ProjectChallenge[];
  learnings?: string;
}

// main
export const PROJECT_DETAILS: ProjectDetail[] = [
  // slug를 key로 projects.ts의 프로젝트와 연결
  {
    slug: "banbok",
    images: [
      "/assets/projects/banbok/screen1.png",
      "/assets/projects/banbok/screen2.png",
    ],
    background: "이 프로젝트를 만들게 된 배경이나 문제를 서술해주세요.",
    goals: ["목표 1", "목표 2"],
    features: [{ title: "기능 이름", description: "기능 설명" }],
    challenges: [
      {
        problem: "겪었던 기술적 문제를 구체적으로 작성해주세요.",
        solution: "어떻게 해결했는지 작성해주세요.",
      },
    ],
    learnings: "이 프로젝트를 통해 배운 점이나 회고를 작성해주세요.",
  },

  // sub
  {
    slug: "jiheon-portfolio",
    images: [
      "/assets/projects/jihean-portfolio.png",
      "/assets/portfolios/home.png",
      "/assets/portfolios/skill.png",
      "/assets/portfolios/project.png",
      "/assets/portfolios/contact.png",
      "/assets/portfolios/detail.png",
    ],
    background:
      "프론트엔드 개발자로서 내 이름을 검색했을 때 나오는 포트폴리오 사이트가 남들처럼 있으면 좋겠다고 생각했다. 이유는 취업 시 제출할 용도와 프로젝트를 진행함에 따라서 지속적으로 추가할 수 있다는 장점이 있기 때문이다. React SPA는 CSR 방식이라 검색엔진에 잘 노출되지 않는 문제가 있어, Next.js SSG로 빌드 시점에 완성된 HTML을 생성하는 방식을 선택했다. 포트폴리오 사이트 자체가 Next.js, TypeScript를 실제로 사용한 프로젝트 증명이 되도록 기술 스택을 설계했다.",
    goals: [
      "Google 검색에서 내 이름으로 노출되는 SEO 최적화 포트폴리오 구현",
      "Next.js · TypeScript · Tailwind CSS 등 기술 스택을 포트폴리오 자체로 증명",
      "다크/라이트 모드 지원 및 Supabase 기반 방문자 카운팅 기능 구현",
      "프로젝트 카드 클릭 시 상세 모달로 포트폴리오 내용을 효과적으로 전달",
    ],
    features: [
      {
        title: "다크모드 (next-themes)",
        description:
          "OS 시스템 설정을 기본값으로 감지하며, resolvedTheme 기반 토글로 첫 클릭부터 정확하게 전환된다. ThemeProvider의 enableSystem과 useTheme()의 theme/resolvedTheme 차이를 이해하고 적용했다.",
      },
      {
        title: "방문자 카운터 (Supabase)",
        description:
          "Supabase PostgreSQL daily_views 테이블에 날짜별 방문 수를 저장한다. localStorage로 하루 1회 중복 방지, total은 sum(count) 집계 쿼리로 계산해 동기화 문제를 방지했다. Next.js Route Handler를 통해서만 DB에 접근하고 RLS를 적용해 클라이언트 직접 접근을 차단했다.",
      },
      {
        title: "프로젝트 상세 모달",
        description:
          "카드 클릭 시 Framer Motion 기반 모달이 열린다. ReactDOM.createPortal로 document.body에 렌더링하고, ESC 키·backdrop 클릭으로 닫힌다. 데이터는 projects.ts(카드)와 projectDetails.ts(상세)로 분리해 관리한다.",
      },
      {
        title: "스크롤 애니메이션 (Framer Motion)",
        description:
          "whileInView + staggerChildren으로 섹션 진입 시 요소들이 순차 등장한다. AnimatePresence로 모바일 메뉴 진입/퇴장 애니메이션을 처리했다. viewport={{ once: true }}로 재진입 시 재실행을 방지했다.",
      },
    ],
    challenges: [
      {
        problem:
          "next-themes에서 enableSystem 사용 시 useTheme()의 theme 값이 'system'으로 반환돼 첫 번째 토글 클릭이 system → dark/light 전환으로 소비됐다. 결과적으로 실제 테마 전환이 한 박자씩 밀리는 현상이 발생했다.",
        solution:
          "theme 대신 resolvedTheme을 사용. resolvedTheme은 next-themes가 내부적으로 OS의 prefers-color-scheme을 읽어 계산한 값으로, enableSystem 활성화 시 'system' 상태에서도 항상 'dark' | 'light' 중 하나를 반환해 첫 클릭부터 정상 동작한다.",
      },
      {
        problem:
          "서버는 사용자의 theme 값을 알 수 없어 기본값(라이트 모드 아이콘)으로 HTML을 렌더링하고, 브라우저에서 JS 실행 후 실제 테마로 교체되는 찰나에 아이콘이 깜빡이는 FOUC(Flash of Unstyled Content) 현상이 발생했다.",
        solution:
          "mounted 상태 체크를 추가해 테마가 확정되기 전까지 렌더링을 생략했다. 동일 크기의 빈 div로 자리를 유지해 레이아웃 흔들림(CLS)도 함께 방지했다. layout.tsx의 html 태그에 suppressHydrationWarning을 추가해 next-themes가 클라이언트에서 class를 뒤늦게 주입할 때 발생하는 hydration 경고도 억제했다.",
      },
      {
        problem:
          "모바일 메뉴가 닫힐 때 조건부 렌더링(&&)으로 처리하면 menuOpen = false 순간 React가 DOM을 즉시 제거해 닫히는 애니메이션 없이 뚝 사라지는 끊김이 발생했다.",
        solution:
          "AnimatePresence + motion.div로 교체. AnimatePresence가 언마운트 타이밍을 가로채 exit 애니메이션(height: auto → 0, opacity: 1 → 0)이 끝날 때까지 DOM을 유지한다. motion.div에 overflow-hidden을 추가해 height 애니메이션 중 내용이 삐져나오는 것을 방지했다.",
      },
      {
        problem:
          "모달이 열리는 시점에 처음으로 이미지를 fetch하는 구조라, 첫 로드 시 최대 583ms이상의 지연들이 발생하는 경우가 있었다.  ",
        solution:
          "그래서 모달이 열리기 전에 카드에 마우스 hover 시 해당 프로젝트 이미지를 미리 preload하도록 구현했다. ProjectCard와 SubProjectCard 각각의 onMouseEnter 이벤트에서 new window.Image()로 이미지를 fetch해 브라우저 캐시에 저장해두고, 모달이 열릴 때는 캐시에서 즉시 표시되도록 했고 Network 탭 기준 개선 전 최대 583ms → 개선 후 6~11ms(캐시 히트)로 단축됐다. 페이지 초기 로드에는 영향 없이 hover 타이밍을 활용한 lazy preload 방식이다.",
      },
    ],
    learnings:
      "포트폴리오 사이트 자체가 기술 스택의 증명이 된다는 것을 체감했다.\n\nSSR 환경에서 클라이언트 전용 상태(theme, localStorage)를 다룰 때 hydration 문제를 반드시 고려해야 한다. useTheme()의 theme과 resolvedTheme 차이처럼 라이브러리 내부 동작을 이해하고 써야 예측 가능한 코드가 나온다는 것도 배웠다.\n\n조건부 렌더링(&&)과 AnimatePresence의 차이를 통해 'CSS transition은 DOM이 존재해야 동작한다'는 근본 원리를 이해했다. 단순히 애니메이션 라이브러리를 쓰는 것을 넘어 왜 AnimatePresence가 필요한지 설명할 수 있게 됐다.\n\n배포 환경에서 모달창을 열었을 때 이미지 로딩이 로컬보다 느리다는 것을 직접 체감한 뒤, 브라우저 캐시 동작 방식을 학습하고 preload 개념을 처음 적용해봤다. hover 같은 사용자 인터랙션 타이밍을 활용해 미리 리소스를 fetch 해두는 패턴이 UX개선에 효과적이라는 것을 체감했다.\n\n또한 이번 기회에 Supabase를 통해 DB를 활용하여 구현할 수 있었다. 단순한 카운팅 기능이지만 Vercel 서버리스 환경에서 메모리가 휘발되는 문제를 인지하고 DB 영속성 저장소를 선택하는 과정, 배열/큐 방식 대신 날짜를 기본키로 분리하는 관계형 DB 설계, total을 별도 컬럼 대신 sum(count) 집계 쿼리로 계산해 동기화 문제를 방지하는 방식까지 하나의 기능을 설계하면서 여러 기술적 판단을 직접 내려봤다. Next.js Route Handler와 RLS를 조합해 클라이언트 직접 접근을 차단하는 보안 설계도 함께 경험했다.",
  },
  {
    slug: "loaking",
    background: "...",
    // ...
  },
];
