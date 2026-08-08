import { Bell, ChevronDown, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageInfo: Record<
  string,
  { title: string; subtitle: string }
> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back 👋",
  },

  "/documents": {
    title: "Documents",
    subtitle: "Manage your AI knowledge base",
  },

  "/documents/upload": {
    title: "Upload Documents",
    subtitle: "Upload files for AI processing",
  },

  "/chat": {
    title: "AI Chat",
    subtitle: "Ask questions about your documents",
  },

  "/analytics": {
    title: "Analytics",
    subtitle: "Monitor usage and performance",
  },

  "/profile": {
    title: "Profile",
    subtitle: "Manage your account",
  },

  "/settings": {
    title: "Settings",
    subtitle: "Configure your workspace",
  },
};

export default function Topbar() {
  const { pathname } = useLocation();

  const page =
    pageInfo[pathname] ?? {
      title: "Enterprise AI",
      subtitle: "",
    };

  return (
    <header className="flex items-center justify-between border-b bg-white px-9 py-5">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          {page.title}
        </h1>

        <p className="mt-1 text-slate-500">
          {page.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">
          <Search
            className="absolute left-4 top-3.5 text-slate-400"
            size={20}
          />

          <input
            placeholder="Search..."
            className="w-80 rounded-xl border py-3 pl-11 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        <button className="rounded-xl border p-3 hover:bg-slate-100">
          <Bell size={20} />
        </button>

        <button className="flex items-center gap-3 rounded-xl border px-4 py-2 hover:bg-slate-100">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            D
          </div>

          <div className="text-left">
            <h3 className="font-semibold">
              Disha
            </h3>

            <p className="text-sm text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown size={18} />

        </button>

      </div>

    </header>
  );
}