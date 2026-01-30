import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/admin.css";
import Container from "./components/container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 루트에서 기본 메타데이터 설정 (모든 페이지에 공통 적용)
export const metadata: Metadata = {
  title: {
    template: "%s | Portal Admin",
    default: "Portal Admin",
  },
  description: "관리자 포털 시스템",
  keywords: ["관리자", "포털", "admin"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Container>{children}</Container>
      </body>
    </html>
  );  
}
