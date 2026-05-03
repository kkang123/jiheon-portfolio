"use client";

import { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

import type { Project } from "@/constants/projects";
import { PROJECT_DETAILS } from "@/constants/projectDetails";
import TechBadge from "./TechBadge";
import GithubIcon from "@/components/ui/GithubIcon";
import ProjectImageSlider from "@/components/ui/ProjectImageSlider";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-xl text-(--accent) mb-3">{children}</h3>
  );
}

function ModalContent({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const detail = PROJECT_DETAILS.find((d) => d.slug === project.slug);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-(--bg) rounded-2xl"
      >
        {/* 헤더 */}
        <div className="sticky top-0 bg-(--bg) z-10 px-6 pt-6 pb-4 border-b border-(--border)">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-2xl md:text-3xl text-(--text)">
                {project.title}
              </h2>
              <p className="text-sm text-(--text-sub) font-body">
                {project.role} · {project.period}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="모달 닫기"
              className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-(--text-sub) hover:text-(--text) hover:bg-(--bg-sub) transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* 링크 버튼 */}
          {(project.links.github ||
            project.links.deployUrl ||
            project.links.figma) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-(--border) text-xs font-body text-(--text-sub) hover:text-(--accent) hover:border-(--accent) transition-colors"
                >
                  <GithubIcon size={13} />
                  GitHub
                </a>
              )}
              {project.links.deployUrl && (
                <a
                  href={project.links.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-(--border) text-xs font-body text-(--text-sub) hover:text-(--accent) hover:border-(--accent) transition-colors"
                >
                  <ExternalLink size={13} />
                  배포 링크
                </a>
              )}
              {project.links.figma && (
                <a
                  href={project.links.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-(--border) text-xs font-body text-(--text-sub) hover:text-(--accent) hover:border-(--accent) transition-colors"
                >
                  <ExternalLink size={13} />
                  Figma
                </a>
              )}
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className="px-6 py-6 flex flex-col gap-8">
          {/* 이미지 슬라이더 */}
          {detail?.images && detail.images.length > 0 && (
            <ProjectImageSlider images={detail.images} title={project.title} />
          )}

          {/* 기술 스택 */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>

          {/* 배경 & 목적 */}
          {detail?.background && (
            <div>
              <SectionTitle>배경 &amp; 목적</SectionTitle>
              <p className="text-sm font-body text-(--text-sub) leading-relaxed whitespace-pre-line">
                {detail.background}
              </p>
            </div>
          )}

          {/* 목표 */}
          {(detail?.goals?.length ?? 0) > 0 && (
            <div>
              <SectionTitle>목표</SectionTitle>
              <ul className="flex flex-col gap-2">
                {detail!.goals!.map((goal, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm font-body text-(--text-sub)"
                  >
                    <span className="text-(--accent) mt-0.5 shrink-0">•</span>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 주요 기능 */}
          {(detail?.features?.length ?? 0) > 0 && (
            <div>
              <SectionTitle>주요 기능</SectionTitle>
              <div className="flex flex-col gap-3">
                {detail!.features!.map((feature, i) => (
                  <div key={i}>
                    <p className="text-sm font-body font-semibold text-(--text) mb-0.5">
                      {feature.title}
                    </p>
                    <p className="text-sm font-body text-(--text-sub) leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 트러블 슈팅 */}
          {(detail?.challenges?.length ?? 0) > 0 && (
            <div>
              <SectionTitle>트러블 슈팅</SectionTitle>
              <div className="flex flex-col gap-4">
                {detail!.challenges!.map((challenge, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-(--border) overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-(--bg-sub)">
                      <p className="text-xs font-body text-(--accent) font-semibold mb-1 uppercase tracking-wide">
                        문제
                      </p>
                      <p className="text-sm font-body text-(--text-sub) leading-relaxed">
                        {challenge.problem}
                      </p>
                    </div>
                    <div className="px-4 py-3 bg-(--bg)">
                      <p className="text-xs font-body text-(--accent) font-semibold mb-1 uppercase tracking-wide">
                        해결
                      </p>
                      <p className="text-sm font-body text-(--text-sub) leading-relaxed">
                        {challenge.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 배운 점 / 회고 */}
          {detail?.learnings && (
            <div>
              <SectionTitle>배운 점 / 회고</SectionTitle>
              <p className="text-sm font-body text-(--text-sub) leading-relaxed whitespace-pre-line">
                {detail.learnings}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {project && <ModalContent project={project} onClose={onClose} />}
    </AnimatePresence>,
    document.body,
  );
}
