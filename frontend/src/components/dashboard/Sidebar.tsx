import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import type { LucideIcon } from "lucide-react";

interface MenuItem {
  name: string;
  icon: LucideIcon;
  path: string;
}

const menu: MenuItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Chat",
    icon: MessageSquare,
    path: "/chat",
  },
  {
    name: "Documents",
    icon: FileText,
    path: "/documents",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    name: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">

      <div className="border-b border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Enterprise AI
        </h1>

        <p className="text-sm text-slate-500">
          Knowledge Platform
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-5">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-5">
        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}