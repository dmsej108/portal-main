import type { Metadata } from "next";
import { menuMetadata } from "@/lib/config/metadata";

// 동적 메타데이터 생성 (Next.js 표준 방법)
export async function generateMetadata(): Promise<Metadata> {
  const meta = menuMetadata["/event"];
  
  return {
    title: `${meta.title} | Portal Admin`,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: `${meta.title} | Portal Admin`,
      description: meta.description,
      type: "website",
    },
  };
}

export default function SubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
