export type ProjectType = "main" | "sub";

export interface Project {
  slug: string;
  title: string;
  description: string;
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

export const PROJECTS: Project[] = [
  {
    slug: "banbok",
    title: "반복",
    description: "프로젝트 설명",
    techStack: ["React", "NextJs"],
    links: {
      github: "https://github.com/kkang123/banbok/tree/main/apps/frontend",
      deployUrl: "https://banbok-coding.vercel.app/",
    },
    thumbnail: "/assets/projects/banbok.png",
    period: "2025.03 ~ 04 (리팩토링 : 2025.09 ~ 10)",
    role: "프론트엔드 개발",

    type: "main",
    team: "team",
    teamSize: 2,
  },
  {
    slug: "for-dogs-refactor",
    title: "For Dogs(Refactor)",
    description: "프로젝트 설명",
    techStack: ["React", "..."],
    links: {
      github: "https://github.com/kkang123/for-dogs-services",
      deployUrl: "https://www.fordogs.store/",
    },
    thumbnail: "/assets/projects/For Dogs_team.jpg",
    period: "2024.05 ~ 2024.10",
    role: "프론트엔드 개발",

    type: "main",
    team: "team",
    teamSize: 2,
    deprecated: true,
    deprecatedReason: "운영 중단 · AWS 만료",
  },
  {
    slug: "for-dogs",
    title: "For Dogs",
    description: "프로젝트 설명",
    techStack: ["React", "..."],
    links: {
      github: "https://github.com/kkang123/ForDogs_Shop",
      deployUrl: "https://fordogs-shop.vercel.app/",
    },
    thumbnail: "/assets/projects/For Dogs_solo.jpg",
    period: "2024.01 ~ 2024.02",
    role: "프론트엔드 개발",

    type: "main",
    team: "solo",
  },
  {
    slug: "jubging",
    title: "줍깅",
    description: "프로젝트 설명",
    techStack: ["React", "..."],
    links: {
      github: "https://github.com/kkang123/jubging",
      deployUrl: "https://jubging.netlify.app/",
    },
    thumbnail: "/assets/projects/jubging.jpg",
    period: "2023.10 ~ 2023.11",
    role: "프론트엔드 개발",

    type: "main",
    team: "team",
    teamSize: 4,
  },
];

export const SUB_PROJECTS: Project[] = [
  {
    slug: "jiheon-portfolio",
    title: "김지헌 포트폴리오",
    description: "프로젝트 내용을 정리한 저만의 포트폴리오 사이트입니다.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "next-themes",
      "Supabase",
    ],
    links: {
      github: "https://github.com/kkang123/jiheon-portfolio/",
      deployUrl: "https://jiheon.vercel.app/",
    },
    thumbnail: "/assets/projects/jiheon-portfolio.png",
    period: "2026.03 ~ 2026.04",
    role: "프론트엔드 개발",

    type: "sub",
    team: "solo",
  },
  {
    slug: "loaking",
    title: "로아왕",
    description: "프로젝트 설명",
    techStack: ["Next.js", "TypeScript"],
    links: {
      github: "https://github.com/kkang123/loaking",
    },
    thumbnail: "/assets/projects/jubging.jpg",
    period: "2026.02 ~ 진행 중",
    role: "프론트엔드 개발",

    type: "sub",
    team: "solo",
  },
];
