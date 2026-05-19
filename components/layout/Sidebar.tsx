"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SubMenuItem } from "@/lib/config/menu";

interface SidebarProps {
  menuItems: SubMenuItem[];
}

export default function Sidebar({ menuItems }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getInitialOpen = () => {
    const active = menuItems.find((m) => pathname.startsWith(m.basePath));
    return active ? active.key : (menuItems[0]?.key ?? null);
  };

  const [openKey, setOpenKey] = useState<string | null>(getInitialOpen);

  useEffect(() => {
    const active = menuItems.find((m) => pathname.startsWith(m.basePath));
    if (active) setOpenKey(active.key);
  }, [pathname, menuItems]);

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar_group_list">
          {menuItems.map((group) => {
            const isGroupActive = pathname.startsWith(group.basePath);
            const isOpen = openKey === group.key;

            return (
              <li key={group.key} className="sidebar_group_item">
                <button
                  className={`sidebar_group_btn${isGroupActive ? " active" : ""}${isOpen ? " open" : ""}`}
                  onClick={() => toggle(group.key)}
                >
                  {group.label}
                </button>
                {isOpen && (
                  <ul className="sidebar_leaf_list">
                    {(() => {
                      const bestMatch = group.children
                        .filter(l => pathname === l.href || pathname.startsWith(l.href + "/"))
                        .reduce<typeof group.children[0] | null>((best, l) =>
                          !best || l.href.length > best.href.length ? l : best
                        , null);
                      return group.children.map((leaf) => {
                      const isLeafActive = bestMatch?.menuCode === leaf.menuCode;
                      return (
                        <li key={leaf.menuCode}>
                          <span
                            className={`sidebar_leaf_link${isLeafActive ? " active" : ""}`}
                            onClick={() => router.push(leaf.href)}
                            title={leaf.label}
                          >
                            {leaf.label}
                          </span>
                        </li>
                      );
                    });
                    })()}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
