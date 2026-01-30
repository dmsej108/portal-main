"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Navigations from "./Navigations";

const menuItems = [
  {label: "이벤트 관리", href: "/event", menuCode: "EVENT"},
  {label: "시스템구현보고서", href: "/system", menuCode: "SYSTEM"},
  {label: "형상관리", href: "/config", menuCode: "CONFIG_MANAGEMENT"},
  {label: "인프라관리", href: "/infra", menuCode: "INFRA_MANAGEMENT"},
  {label: "데이터센터", href: "/datacenter", menuCode: "DATA_CENTER_MANAGEMENT"},
  {label: "계정관리", href: "/account", menuCode: "ACCOUNT_MANAGEMENT"},
];

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // 현재 경로에 맞는 메뉴 찾기
  const activeMenu = menuItems.find(item => pathname.includes(item.href));
  
  // 활성 메뉴 정보 확인 (디버깅용)
  console.log("현재 경로:", pathname);
  console.log("활성 메뉴:", activeMenu);

  return (
    <div className="wrapper">  
      <Header menuItems={menuItems} />
      <div className="container">
        <Navigations menuItems={menuItems} activeMenu={activeMenu} />
        <div className="contents">
          {children}  
        </div>
      </div>
    </div>
  );
}
