"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, FolderKanban, LogOut, Moon, Sun } from "lucide-react";
import { ReactNode, useState } from "react";
import { useTheme } from "next-themes";
import LogoutButton from "../../../components/LogoutButton";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Blogs", href: "/admin/blog", icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-[#1c1c1c] text-gray-100 transition-colors">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#272727] shadow-xl z-40 transform transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-6 border-gray-700">
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded hover:bg-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 mx-3 rounded-lg transition 
                  ${active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>


        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700 flex justify-between items-center">
          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-800"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Bar (mobile) */}
        <header className="sticky top-0 z-30 bg-[#1c1c1c] shadow-sm flex items-center justify-between p-4 md:hidden">

            <Link href="/admin">
                <h2 className="font-semibold text-white text-lg" >Admin</h2>

            </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded hover:bg-gray-800"
            >
              ☰
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-[#1c1c1c]">
          {children}
        </main>
      </div>
    </div>
  );
}
