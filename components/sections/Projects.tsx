"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { PROJECTS, SUB_PROJECTS, type Project } from "@/constants/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import SubProjectCard from "../ui/SubProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
              <motion.div key={project.slug} variants={cardVariants}>
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
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
        <SubProjectCard projects={SUB_PROJECTS} onSelect={setSelectedProject} />
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
