import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Notification */}

        <button
          className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100"
        >
          <Bell size={20} />
        </button>

        {/* User */}

        <button
          className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-100"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
            D
          </div>

          <div className="hidden text-left lg:block">

            <p className="font-medium">
              Disha
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>

          </div>

          <ChevronDown size={18} />

        </button>

      </div>

    </header>
  );
}