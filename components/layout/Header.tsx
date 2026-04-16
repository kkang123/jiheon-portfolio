"use client";

import { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";

import ThemeToggle from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md border-b border-(--border)" : ""
      }`}
      style={
        scrolled
          ? {
              backgroundColor: "color-mix(in srgb, var(--bg) 85%, transparent)",
            }
          : {}
      }
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}

        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            history.pushState(null, "", window.location.pathname);
          }}
          className="font-display text-xl text-(--text) hover:text-(--accent) transition-colors"
        >
          JH.
        </button>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-(--text-sub) hover:text-(--text) transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* 우측: 테마 토글 + 모바일 햄버거 */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-md text-(--text-sub) hover:text-(--text) hover:bg-(--bg-sub) transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="메뉴 열기"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden border-t border-(--border) bg-(--bg)">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={handleNavClick}
                className="text-(--text-sub) hover:text-(--text) transition-colors py-1"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
