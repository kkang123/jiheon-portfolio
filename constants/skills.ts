export type SkillCategory = "Language" | "Frontend" | "Tools";

export interface Skill {
  name: string;
  description: string;
  category: SkillCategory;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  "Language",
  "Frontend",
  "Tools",
];

export const SKILLS: Skill[] = [
  {
    name: "HTML",
    description: "시맨틱 마크업, 웹 접근성",
    category: "Language",
  },
  {
    name: "CSS",
    description: "Flexbox, Grid, 반응형 레이아웃 등을 구현",
    category: "Language",
  },
  {
    name: "JavaScript",
    description: "ES6+, 비동기 처리, DOM 조작 구현 설계",
    category: "Language",
  },
  {
    name: "TypeScript",
    description: "정적 타입으로 안전한 코드 작성을 선호",
    category: "Language",
  },
  {
    name: "Python",
    description:
      "학부생 시절 쉽게 입문하여 흥미롭게 배운 언어이며, 초기에는 코딩 테스트 학습을 위해 사용",
    category: "Language",
  },

  {
    name: "React",
    description: "Hooks, 컴포넌트 설계, 상태 관리",
    category: "Frontend",
  },
  {
    name: "Next.js",
    description: `• RSC로 SSR 구현 및 번들 최적화\n• next/image로 이미지 최적화\n• metadata로 SEO 설정·Google Search Console 색인 확보`,
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    description: "유틸리티 기반 빠른 스타일링",
    category: "Frontend",
  },
  {
    // 제거 대상
    name: "React-Query",
    // name: "React Context 대신 react-query",
    description: "",
    category: "Frontend",
  },
  {
    name: "Recoil",
    description: `• atom으로 장바구니·로그인 상태를 전역 관리\n• effects로 localStorage 연동해 새로고침 후에도 상태 유지`,
    category: "Frontend",
  },
  {
    name: "Zustand",
    description: `• persist 미들웨어로 인증 상태를 localStorage에 영속화\n• partialize로 직렬화 대상 상태를 선별해 불필요한 저장 방지`,
    category: "Frontend",
  },
  {
    name: "Framer Motion",
    description: `• Variants · staggerChildren으로 텍스트 요소 순차 등장 구현\n• AnimatePresence로 메뉴 슬라이드 및 탭 전환 퇴장 애니메이션 처리\n• layoutId로 탭 인디케이터 자연스러운 이동 구현\n• whileInView + viewport once로 스크롤 진입 시 섹션 페이드인`,
    category: "Frontend",
  },

  {
    name: "Git",
    description: "버전 관리, 브랜치 전략",
    category: "Tools",
  },
  {
    name: "GitHub",
    description: "코드 협업, PR 리뷰",
    category: "Tools",
  },
  {
    name: "Figma",
    description: "UI/UX 디자인, 프로토타이핑",
    category: "Tools",
  },
  {
    name: "Vercel",
    description: "프론트엔드 배포, CI/CD",
    category: "Tools",
  },
  {
    name: "Firebase",
    description: "",
    category: "Tools",
  },
  {
    name: "AWS S3",
    description: "",
    category: "Tools",
  },
];
