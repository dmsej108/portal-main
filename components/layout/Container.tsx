"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Navigations from "./Navigations";
import { mainMenu, LeafMenuItem } from "@/lib/config/menu";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const activeMain = mainMenu.find((m) => pathname.startsWith(m.basePath));
  const subMenuItems = activeMain?.children ?? [];

  const activeLeaf = subMenuItems
    .flatMap((g) => g.children)
    .find((leaf) => pathname === leaf.href || pathname.startsWith(leaf.href + "/"));

  const activeMenuAsFlat: LeafMenuItem | undefined = activeLeaf;

  return (
    <div className="wrapper">
      <Header />
      <Sidebar menuItems={subMenuItems} />
      <div className="container">
        <Navigations menuItems={subMenuItems.flatMap((g) => g.children)} activeMenu={activeMenuAsFlat} />
        <div className="contents">
          {children}
        </div>
      </div>
    </div>
  );
}
