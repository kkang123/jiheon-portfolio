"use client";

import { motion, type Variants } from "framer-motion";

import { ChevronDown } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center text-center gap-4 max-w-2xl"
      >
        <motion.p
          variants={item}
          className="text-sm md:text-base text-(--text-sub) tracking-widest uppercase font-body"
        >
          안녕하세요,
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-(--text) leading-tight"
        >
          김지헌입니다.
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg md:text-xl text-(--text-sub) font-body mt-2"
        >
          사용자 경험을 고민하고 누구나 읽기 쉬운 코드를 지향하는 프론트엔드
          개발자입니다.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-3 mt-6"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-(--accent) text-white font-body text-sm font-medium hover:opacity-90 transition-opacity"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-(--border) text-(--text) font-body text-sm font-medium hover:bg-(--bg-sub) transition-colors"
          >
            연락하기
          </a>
        </motion.div>
      </motion.div>

      {/* 스크롤 유도 아이콘 */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute bottom-10 text-(--text-sub)"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
