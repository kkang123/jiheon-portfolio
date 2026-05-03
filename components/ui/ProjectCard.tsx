"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

import TechBadge from "./TechBadge";
import GithubIcon from "@/components/ui/GithubIcon";
import type { Project } from "@/constants/projects";
import { PROJECT_DETAILS } from "@/constants/projectDetails";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const handleMouseEnter = () => {
    const detail = PROJECT_DETAILS.find((d) => d.slug === project.slug);
    detail?.images?.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className={`group flex flex-col rounded-2xl border border-(--border) bg-(--bg-sub) overflow-hidden hover:-translate-y-1 transition-transform duration-200 ${onClick ? "cursor-pointer hover:-translate-y-1" : "cursor-default"}`}
    >
      {/* 프로젝트 이미지 */}
      <div className="relative w-full aspect-video bg-(--bg) overflow-hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain grayscale group-hover:grayscale-0 transition-[filter] duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center border-b border-(--border)">
            <span className="text-(--text-sub) text-xs font-body">
              이미지 없음
            </span>
          </div>
        )}
        {/* 서비스 종료 오버레이 뱃지 */}
        {project.deprecated && (
          <div className="flex items-center absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm">
            <span className="text-[10px] font-body text-red-400">
              • {project.deprecatedReason ?? "서비스 종료"}
            </span>
          </div>
        )}
      </div>

      {/* 카드 내용 */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* 기간 + 팀 정보 */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-(--text-sub) font-body">
            {project.period}
          </p>
          <span className="text-xs font-body px-2.5 py-1 rounded-full border border-(--border) text-(--text-sub)">
            {project.team === "solo" ? "개인" : `팀 ${project.teamSize}인`}
          </span>
        </div>
        {/* 제목 */}
        <h3 className="font-display text-xl text-(--text)">{project.title}</h3>

        {/* 설명 */}
        <p className="text-sm text-(--text-sub) font-body leading-relaxed flex-1">
          {project.description}
        </p>

        {/* 기술 스택 뱃지 */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>

        {/* 링크 버튼 */}
        <div className="flex gap-3 pt-2" onClick={(e) => e.stopPropagation()}>
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-body text-(--text-sub) hover:text-(--accent) transition-colors"
            >
              <GithubIcon size={14} />
              GitHub
            </a>
          )}
          {project.links.deployUrl && (
            <a
              href={project.links.deployUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-body text-(--text-sub) hover:text-(--accent) transition-colors"
            >
              <ExternalLink size={14} />
              배포 링크
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
