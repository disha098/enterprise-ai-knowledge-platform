import {
  FileText,
  MessageSquare,
  Bot,
  HardDrive,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import EmptyState from "../components/dashboard/EmptyState";

export default function Dashboard() {
  return (
    <DashboardLayout>

      <div className="grid gap-6 lg:grid-cols-4">

        <StatCard
          title="Documents"
          value={0}
          icon={FileText}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Conversations"
          value={0}
          icon={MessageSquare}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />

        <StatCard
          title="AI Requests"
          value={0}
          icon={Bot}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />

        <StatCard
          title="Storage"
          value="0 MB"
          icon={HardDrive}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />

      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">

        <RecentActivity />

        <EmptyState />

      </div>

    </DashboardLayout>
  );
}