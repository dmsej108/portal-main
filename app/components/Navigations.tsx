interface MenuItem {
  label: string;
  href: string;
  menuCode: string;
}

interface NavigationsProps {
  menuItems: MenuItem[];
  activeMenu?: MenuItem | undefined;
}

export default function Navigations({ menuItems, activeMenu }: NavigationsProps) {
  
    return (
      <div className="navigations_wrap">
        <div className="pageTitle">
          {activeMenu ? activeMenu.label : "메뉴를 선택하세요"}
        </div>
       <div className="navigations_inner">
        <span className="home"></span>
        <span>{activeMenu ? activeMenu.label : "메뉴를 선택하세요"}</span>
        <span>목록</span>
       </div>
      </div>
    );
  }