"use client";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { mainMenu } from "@/lib/config/menu";
import { BASE_PATH } from "@/lib/config/site";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const activeKey = mainMenu.find((m) => pathname.startsWith(m.basePath))?.key;

  return (
    <div className="header_top">
      <div className="logo" onClick={() => router.push("/marketing/event")} style={{ cursor: "pointer" }}>
        <Image
          src={`${BASE_PATH}/image/common/KB_s_kr3.jpg`}
          alt="logo"
          width={800}
          height={217}
          style={{ height: '40px', width: 'auto' }}
          priority
        />
      </div>
      <div className="utils">
        <nav className="menu">
          <ul>
            {mainMenu.map((item) => (
              <li
                key={item.key}
                className={activeKey === item.key ? "active" : ""}
                onClick={() => router.push(item.children[0].children[0]?.href ?? item.basePath)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div className="user_info">
          <span className="account_name">계정명(관리자)</span>
          <span className="login_link">로그아웃</span>
        </div>
      </div>
    </div>
  );
}
