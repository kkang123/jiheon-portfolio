import type { Metadata } from "next";
import { DM_Serif_Display } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "김지헌 | Frontend Developer",
  description: "프론트엔드 개발자 김지헌의 포트폴리오입니다.",
  metadataBase: new URL("https://jiheon.vercel.app/"),
  openGraph: {
    title: "김지헌 | Frontend Developer",
    description: "프론트엔드 개발자 김지헌의 포트폴리오입니다.",
    type: "website",
    images: [{ url: "assets/jjibi.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${dmSerif.variable} ${pretendard.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
