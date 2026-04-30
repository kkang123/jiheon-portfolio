"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { type Project } from "@/constants/projects";
import TechBadge from "./TechBadge";
import GithubIcon from "@/components/ui/GithubIcon";
import { PROJECT_DETAILS } from "@/constants/projectDetails";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

interface SubProjectListProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export default function SubProjectCard({
  projects,
  onSelect,
}: SubProjectListProps) {
  if (projects.length === 0) return null;

  return (
    <>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="font-display text-2xl text-(--text) mb-8"
      >
        Side Projects
      </motion.h3>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col gap-4"
      >
        {projects.map((project) => (
          <motion.div
            key={project.slug}
            variants={cardVariants}
            onMouseEnter={() => {
              const detail = PROJECT_DETAILS.find(
                (d) => d.slug === project.slug,
              );
              detail?.images?.forEach((src) => {
                const img = new window.Image();
                img.src = src;
              });
            }}
            onClick={() => onSelect(project)}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-(--border) bg-(--bg-sub) hover:border-(--accent) transition-colors cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h4 className="font-body font-semibold text-(--text)">
                  {project.title}
                </h4>
                <span className="text-xs text-(--text-sub) font-body">
                  {project.period}
                </span>
              </div>
              <p className="text-sm text-(--text-sub) font-body">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.techStack.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>

            <div
              className="flex gap-3 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--text-sub) hover:text-(--accent) transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon size={16} />
                </a>
              )}
              {project.links.deployUrl && (
                <a
                  href={project.links.deployUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--text-sub) hover:text-(--accent) transition-colors"
                  aria-label="배포 링크"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
