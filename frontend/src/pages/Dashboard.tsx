import DashboardLayout from "../components/layout/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";

import {
  FileText,
  MessageSquare,
  Bot,
  HardDrive,
} from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Documents"
          value={0}
          icon={<FileText className="h-7 w-7 text-blue-600" />}
          color="bg-blue-100"
        />

        <StatCard
          title="Conversations"
          value={0}
          icon={<MessageSquare className="h-7 w-7 text-green-600" />}
          color="bg-green-100"
        />

        <StatCard
          title="AI Requests"
          value={0}
          icon={<Bot className="h-7 w-7 text-purple-600" />}
          color="bg-purple-100"
        />

        <StatCard
          title="Storage"
          value="0 MB"
          icon={<HardDrive className="h-7 w-7 text-orange-600" />}
          color="bg-orange-100"
        />

      </div>

    </DashboardLayout>
  );
}