"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const KEYWORDS: { title: string; description: string }[] = [
  /*
  {
    title: "성장",
    description: "새로운 기술을 배우는 것을 즐기며, 매일 조금씩 더 나은 개발자가 되기 위해 노력합니다.",
  },
  {
    title: "협업",
    description: "팀원들과의 소통을 중요하게 생각하며, 함께 더 좋은 결과물을 만드는 것에 보람을 느낍니다.",
  },
  {
    title: "사용자 경험",
    description: "코드의 동작뿐 아니라 사용자가 실제로 느끼는 경험까지 고민하며 개발합니다.",
  },
  */
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
                <div>
                  <h3 className="font-body font-semibold text-(--text) text-sm mb-2">
                    UX 중심 사고
                  </h3>
                  <p className="text-(--text-sub) font-body text-sm leading-relaxed">
                    저는 사용자가 서비스를 이용할 때 무엇이 불편한지, 어떻게
                    하면 더 직관적일지를 고민하며 개발합니다. 기능 구현에 그치지
                    않고 사용자 경험을 고려한 인터페이스를 만드는 것을 중요하게
                    생각합니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-body font-semibold text-(--text) text-sm mb-2">
                    코드 품질
                  </h3>
                  <p className="text-(--text-sub) font-body text-sm leading-relaxed">
                    코드를 작성할 때는 나만 이해하는 코드보다 팀원 누구나 읽기
                    쉬운 코드를 지향하며, 완벽할 수는 없지만, 널리 통용되는
                    패턴과 컨벤션을 따르려 노력하며 유지보수하기 좋은 구조를
                    고민합니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-body font-semibold text-(--text) text-sm mb-2">
                    지속적 학습
                  </h3>
                  <p className="text-(--text-sub) font-body text-sm leading-relaxed">
                    새로운 기술을 학습하고 실제 프로젝트에 적용해보는 과정에서
                    웹 개발의 흥미를 느끼고 있습니다. 프론트엔드를 주도적으로
                    담당하며 백엔드 개발자와 협업한 경험이 많아, API 연동
                    과정에서 발생하는 문제를 함께 분석하고 해결하는 데
                    익숙합니다.
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          {/* 우측: 프로필 이미지 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
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
