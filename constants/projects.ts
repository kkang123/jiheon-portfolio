export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  deployUrl?: string;
  imageUrl?: string;
  period: string;
  type: "main" | "sub";
  team: "solo" | "team";
  teamSize?: number;
  deprecated?: boolean;
  deprecatedReason?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "반복",
    description: "프로젝트 설명",
    techStack: ["React", "NextJs"],
    githubUrl: "https://github.com/kkang123/banbok/tree/main/apps/frontend",
    deployUrl: "https://banbok-coding.vercel.app/",
    imageUrl: "/assets/projects/banbok.png",
    period: "2025.03 ~ 04 (리팩토링 : 2025.09 ~ 10)",
    type: "main",
    team: "team",
    teamSize: 2,
  },
  {
    title: "For Dogs(Refactor)",
    description: "프로젝트 설명",
    techStack: ["React", "..."],
    githubUrl: "https://github.com/kkang123/for-dogs-services",
    deployUrl: "https://www.fordogs.store/",
    imageUrl: "/assets/projects/For Dogs_team.jpg",
    period: "2024.05 ~ 2024.10",
    type: "main",
    team: "team",
    teamSize: 2,
    deprecated: true,
    deprecatedReason: "운영 중단 · AWS 만료",
  },
  {
    title: "For Dogs",
    description: "프로젝트 설명",
    techStack: ["React", "..."],
    githubUrl: "https://github.com/kkang123/ForDogs_Shop",
    deployUrl: "https://fordogs-shop.vercel.app/",
    imageUrl: "/assets/projects/For Dogs_solo.jpg",
    period: "2024.01 ~ 2024.02",
    type: "main",
    team: "solo",
  },
  {
    title: "줍깅",
    description: "프로젝트 설명",
    techStack: ["React", "..."],
    githubUrl: "https://github.com/kkang123/jubging",
    deployUrl: "https://jubging.netlify.app/",
    imageUrl: "/assets/projects/jubging.jpg",
    period: "2023.10 ~ 2023.11",
    type: "main",
    team: "team",
    teamSize: 4,
  },
];

export const SUB_PROJECTS: Project[] = [
  {
    title: "김지헌 포트폴리오",
    description: "프로젝트 내용을 정리한 저만의 포트폴리오 사이트입니다.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "next-themes",
    ],
    githubUrl: "https://github.com/kkang123/jiheon-portfolio/",
    deployUrl: "https://jiheon.vercel.app/",
    imageUrl: "/assets/projects/jiheon-portfolio.png",
    period: "2026.03 ~ 2026.04",
    type: "sub",
    team: "solo",
  },
  {
    title: "로아왕",
    description: "프로젝트 설명",
    techStack: ["Next.js", "TypeScript"],
    githubUrl: "https://github.com/kkang123/loaking",
    deployUrl: "배포 URL (없으면 이 줄 제거)",
    imageUrl: "/assets/projects/jubging.jpg",
    period: "2026.02 ~ 진행 중",
    type: "sub",
    team: "solo",
  },
];
