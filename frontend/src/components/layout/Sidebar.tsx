import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-slate-200 bg-white">

      <div className="border-b border-slate-200 p-6">

        <h1 className="text-2xl font-bold">
          Enterprise AI
        </h1>

        <p className="text-sm text-slate-500">
          Knowledge Platform
        </p>

      </div>

      <nav className="space-y-2 p-4">

        <Link
          to="/dashboard"
          className="block rounded-lg px-4 py-3 hover:bg-slate-100"
        >
          Dashboard
        </Link>

        <Link
          to="/chat"
          className="block rounded-lg px-4 py-3 hover:bg-slate-100"
        >
          Chat
        </Link>

        <Link
          to="/documents"
          className="block rounded-lg px-4 py-3 hover:bg-slate-100"
        >
          Documents
        </Link>

        <Link
          to="/settings"
          className="block rounded-lg px-4 py-3 hover:bg-slate-100"
        >
          Settings
        </Link>

      </nav>

    </aside>
  );
}