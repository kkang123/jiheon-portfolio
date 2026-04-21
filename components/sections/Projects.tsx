"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { PROJECTS, SUB_PROJECTS } from "@/constants/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import GithubIcon from "@/components/ui/GithubIcon";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs text-(--accent) tracking-widest uppercase font-body mb-2">
            03
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-(--text)">
            Projects
          </h2>
        </motion.div>

        {/* Main Projects */}
        {PROJECTS.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          >
            {PROJECTS.map((project) => (
              <motion.div key={project.title} variants={cardVariants}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="mb-20 p-10 rounded-2xl border border-dashed border-(--border) text-center">
            <p className="text-(--text-sub) font-body text-sm">
              TODO: constants/projects.ts의 PROJECTS 배열에
              <br />
              본인 프로젝트를 추가해주세요.
            </p>
          </div>
        )}

        {/* Sub Projects */}
        {SUB_PROJECTS.length > 0 && (
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
              {SUB_PROJECTS.map((project) => (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-(--border) bg-(--bg-sub) hover:border-(--accent) transition-colors"
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
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs font-body rounded-full border border-(--border) text-(--text-sub)"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-(--text-sub) hover:text-(--accent) transition-colors"
                      aria-label="GitHub"
                    >
                      <GithubIcon size={16} />
                    </a>
                    {project.deployUrl && (
                      <a
                        href={project.deployUrl}
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
        )}
      </div>
    </section>
  );
}
