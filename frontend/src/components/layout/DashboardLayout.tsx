import type { ReactNode } from "react";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        <Topbar />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}