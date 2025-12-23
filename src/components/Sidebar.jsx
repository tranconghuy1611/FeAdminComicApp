import { NavLink } from "react-router-dom";
import { useState } from "react";

// Sử dụng Material Symbols từ Google Fonts (đã có trong HTML gốc)
// Bạn cần thêm link fonts vào index.html hoặc public/index.html:
// <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />

const menus = [
  { name: "Dashboard", path: "/admin", icon: "dashboard" },
  { name: "Quản lý Truyện", path: "/admin/comics", icon: "book_2", fill: true },
  { name: "Người dùng", path: "/admin/users", icon: "group" },
  { name: "Báo cáo", path: "/admin/reports", icon: "flag" },
  { name: "Cài đặt", path: "/admin/settings", icon: "settings" },
];

export default function Sidebar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="hidden w-64 flex-col border-r border-[#dbe0e6] bg-white dark:bg-[#1A2633] dark:border-[#2A3B4D] md:flex">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#137fec] text-white">
              <span className="material-symbols-outlined text-2xl">book_2</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-bold leading-normal text-[#111418] dark:text-white">
                Admin Panel
              </h3>
              <p className="text-xs font-normal text-[#617589] dark:text-[#94A3B8]">
                Quản trị viên
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {menus.map((menu) => (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-[#617589] hover:bg-[#f6f7f8] hover:text-[#111418] dark:text-[#94A3B8] dark:hover:bg-[#2A3B4D] dark:hover:text-white transition-colors ${
                    isActive
                      ? "bg-[#137fec]/10 text-[#137fec] dark:bg-[#137fec]/20 dark:text-white"
                      : ""
                  } ${menu.fill ? " [&_.fill-1]:fill-1" : ""}`
                }
              >
                <span className={`material-symbols-outlined ${menu.fill ? "fill-1" : ""}`}>
                  {menu.icon}
                </span>
                <span className="text-sm font-medium">{menu.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="border-t border-[#dbe0e6] pt-4 dark:border-[#2A3B4D]">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[#617589] hover:bg-red-50 hover:text-red-600 dark:text-[#94A3B8] dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>
    </aside>
  );
}