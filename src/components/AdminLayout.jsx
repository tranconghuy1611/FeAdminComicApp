import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f6f7f8] dark:bg-[#101922]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <Header toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 p-4 md:p-6 lg:px-8 lg:py-8">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}