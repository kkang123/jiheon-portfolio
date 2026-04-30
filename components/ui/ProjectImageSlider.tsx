"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectImageSliderProps {
  images?: string[];
  title: string;
}

export default function ProjectImageSlider({
  images = [],
  title,
}: ProjectImageSliderProps) {
  const [index, setIndex] = useState(0);

  const containerClass =
    "relative w-full aspect-video overflow-hidden rounded-xl bg-(--bg-sub)";

  if (images.length === 0) {
    return (
      <div className={containerClass}>
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-(--text-sub) text-sm font-body">
            이미지 없음
          </span>
        </div>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={containerClass}>
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-contain"
        />
      </div>
    );
  }

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col gap-3">
      <div className={containerClass}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${title} 스크린샷 ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* 좌우 화살표 */}
        <button
          onClick={prev}
          aria-label="이전 이미지"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-(--bg)/80 text-(--text-sub) hover:text-(--text) transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="다음 이미지"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-(--bg)/80 text-(--text-sub) hover:text-(--text) transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dot indicator */}
      <div className="flex items-center justify-center gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`${i + 1}번째 이미지`}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === index ? "bg-(--accent)" : "bg-(--border)"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
