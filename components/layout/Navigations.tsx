interface MenuItem {
  label: string;
  href: string;
  menuCode: string;
}

interface BreadcrumbProps {
  menuItems: MenuItem[];
  activeMenu?: MenuItem;
}

export default function Navigations({ activeMenu }: BreadcrumbProps) {
  return (
    <div className="navigations_wrap">
      <div className="pageTitle">
        {activeMenu ? activeMenu.label : "메뉴를 선택하세요"}
      </div>
      <div className="navigations_inner">
        <span className="home"></span>
        {activeMenu && <span>{activeMenu.label}</span>}
        <span>목록</span>
      </div>
    </div>
  );
}
