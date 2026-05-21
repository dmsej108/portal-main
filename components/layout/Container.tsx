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

  // 가장 긴 href 우선 매칭 (/marketing/event/regist가 /marketing/event보다 먼저 잡히지 않도록)
  const leafMenus = subMenuItems.flatMap((g) => g.children);
  const activeLeaf = leafMenus
    .filter((leaf) => pathname === leaf.href || pathname.startsWith(leaf.href + "/"))
    .reduce<LeafMenuItem | undefined>(
      (best, leaf) => (!best || leaf.href.length > best.href.length ? leaf : best),
      undefined,
    );

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
