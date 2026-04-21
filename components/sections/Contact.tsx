"use client";

import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";

import GithubIcon from "@/components/ui/GithubIcon";

const LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/kkang123",
    icon: () => <GithubIcon size={18} />,
  },
  {
    label: "Velog",
    href: "https://velog.io/@kkang123/posts",
    icon: ExternalLink,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-(--bg-sub)">
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
            04
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-(--text)">
            Contact
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8 max-w-lg"
        >
          {/* 소개 문구 */}
          {/* TODO: 본인 연락처 소개 문구로 변경해주세요 */}
          <p className="text-lg text-(--text-sub) font-body leading-relaxed">
            새로운 기회나 협업 제안은 언제든 환영합니다.
            <br />
            편하게 연락 주시면 감사합니다!
          </p>

          {/* 링크 목록 */}
          <div className="flex flex-col gap-4">
            {/* 이메일 */}
            <a
              href="mailto:one98kr@naver.com"
              className="inline-flex items-center gap-3 group"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full border border-(--border) text-(--text-sub) group-hover:border-(--accent) group-hover:text-(--accent) transition-colors">
                <Mail size={18} />
              </span>
              <span className="font-body text-(--text) group-hover:text-(--accent) transition-colors underline-offset-4 group-hover:underline">
                one98kr@naver.com
              </span>
            </a>

            {LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group"
              >
                <span className="w-10 h-10 flex items-center justify-center rounded-full border border-(--border) text-(--text-sub) group-hover:border-(--accent) group-hover:text-(--accent) transition-colors">
                  <Icon size={18} />
                </span>
                <span className="font-body text-(--text) group-hover:text-(--accent) transition-colors underline-offset-4 group-hover:underline">
                  {label}
                </span>
              </a>
            ))}
            {/* TODO: 링크드인, 노션 등 추가하고 싶은 링크가 있으면 LINKS 배열에 추가해주세요 */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
