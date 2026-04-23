"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  SKILLS,
  SKILL_CATEGORIES,
  type SkillCategory,
} from "@/constants/skills";

export default function Skills() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("Frontend");

  const filtered = SKILLS.filter((s) => s.category === activeTab);

  return (
    <section id="skills" className="py-24 px-6 bg-(--bg-sub)">
      <div className="max-w-5xl mx-auto">
        {/* 섹션 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs text-(--accent) tracking-widest uppercase font-body mb-2">
            02
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-(--text)">
            Skills
          </h2>
        </motion.div>

        {/* 탭 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex gap-1 mb-10 border-b border-(--border)"
        >
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="relative px-4 py-2 text-sm font-body transition-colors"
              style={{
                color: activeTab === cat ? "var(--text)" : "var(--text-sub)",
              }}
            >
              {cat}
              {activeTab === cat && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: "var(--accent)" }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* 스킬 카드 목록 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((skill) => (
              <div
                key={skill.name}
                className="p-5 rounded-xl bg-(--bg) border border-(--border) hover:border-(--accent) transition-colors"
              >
                <h3 className="font-body font-semibold text-(--text) mb-1">
                  {skill.name}
                </h3>
                <p className="text-sm text-(--text-sub) font-body leading-relaxed whitespace-pre-line">
                  {skill.description}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
