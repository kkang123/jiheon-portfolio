"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const KEYWORDS: { title: string; description: string }[] = [
  {
    title: "성장",
    description:
      "새로운 기술을 배우는 것을 즐기며, 지금은 그 기술을 실제 프로젝트에 적용하고 개선하는 데 집중하고 있습니다. 단순히 사용하는 것을 넘어 왜 이 기술이 필요한지를 이해하며 학습하고, 기능 구현에 그치지 않고 사용자 경험까지 고민하며 개발합니다.",
  },
  {
    title: "협업",
    description:
      "팀 프로젝트에서 리더 역할을 맡아 팀원들과 소통하며 기술적으로 부족한 부분과 전체 프로젝트 흐름을 이끈 경험이 있습니다. 프론트엔드를 주도적으로 담당하며 백엔드 개발자와 여러 차례 협업했고, 예상치 못한 이슈가 생겨도 함께 원인을 분석하고 해결하며 성장해왔습니다.",
  },
  {
    title: "코드 품질",
    description:
      "나만 이해하는 코드보다 팀원 누구나 읽기 쉬운 코드를 지향합니다. 완벽할 수는 없지만, 널리 통용되는 패턴과 컨벤션을 따르며 유지보수하기 좋은 구조를 꾸준히 고민합니다.",
  },
];

export default function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-24 px-6">
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
            01
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-(--text)">
            About Me
          </h2>
        </motion.div>

        {/* 2컬럼 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* 좌측: 텍스트 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {KEYWORDS.length > 0 ? (
              KEYWORDS.map((kw) => (
                <div
                  key={kw.title}
                  className="p-5 rounded-xl bg-(--bg-sub) border border-(--border)"
                >
                  <h3 className="font-display text-xl text-(--accent) mb-2">
                    {kw.title}
                  </h3>
                  <p className="text-(--text-sub) font-body text-sm leading-relaxed">
                    {kw.description}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-5 rounded-xl bg-(--bg-sub) border border-(--border) border-dashed flex flex-col gap-6">
                KEYWORDS 배열에 키워드를 추가칸
              </div>
            )}
          </motion.div>

          {/* 우측: 프로필 이미지 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center h-full"
          >
            {!imgError ? (
              <div className="relative w-full aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden border border-(--border)">
                <Image
                  src="/assets/jjibi.jpg"
                  alt="김지헌 프로필 사진"
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover"
                  loading="eager"
                  priority
                  onError={() => setImgError(true)}
                />
              </div>
            ) : (
              <div className="w-full aspect-square max-w-sm mx-auto rounded-2xl border border-dashed border-(--border) bg-(--bg-sub) flex items-center justify-center">
                <p className="text-(--text-sub) text-sm font-body text-center px-4">
                  TODO: public/assets/profile.jpg
                  <br />에 본인 사진을 추가해주세요
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
