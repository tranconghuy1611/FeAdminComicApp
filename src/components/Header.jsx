import { useState } from "react";

export default function Header({ toggleMobileMenu }) {  // nếu cần mobile menu
  const [searchOpen, setSearchOpen] = useState(false); // cho mobile nếu muốn

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-[#dbe0e6] bg-white px-6 py-3 dark:bg-[#1A2633] dark:border-[#2A3B4D]">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-[#617589] dark:text-[#94A3B8]" onClick={toggleMobileMenu}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h2 className="text-xl font-bold leading-tight tracking-[-0.015em] text-[#111418] dark:text-white">
          Quản lý Truyện
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#617589] dark:text-[#94A3B8]">
            search
          </span>
          <input
            className="h-10 w-64 rounded-lg bg-[#f0f2f4] pl-10 pr-4 text-sm text-[#111418] focus:outline-none focus:ring-2 focus:ring-[#137fec]/50 dark:bg-[#2A3B4D] dark:text-white dark:placeholder:text-[#617589]"
            placeholder="Tìm kiếm nhanh..."
            type="text"
          />
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f2f4] hover:bg-[#e0e2e4] dark:bg-[#2A3B4D] dark:hover:bg-[#3A4B5D] transition-colors">
          <span className="material-symbols-outlined text-[#111418] dark:text-white">
            notifications
          </span>
        </button>

        <div
          className="h-8 w-8 rounded-full bg-cover bg-center ring-2 ring-white dark:ring-[#1A2633]"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUMEaaP6jLXYdQSoyRNh-sDsxI_m1uT82aaZrh3Q0tZKhAOqprtK1e-dlG3kvf9-ZDDsPM5Xb3vWlFHSzQRuATjih9NKMmWSmzmaVqnh_94DwShaiNinWoswG5_GVs4lNdOdQNX9L36IT-QJL1BhBwcoj_G26ztJ9J2ZLfZ7Nng9td6P46sWdAB2Fm7AfitdtyX_UMxv_RrgYnTjd3LIBb25Rb-c7A55jI05gB616Ti8IreVBeufcLQyYvxogx59-wjwtboeB5c_w')",
          }}
        />
      </div>
    </header>
  );
}