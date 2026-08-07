import { Clock3 } from "lucide-react";

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-3">

        <Clock3
          className="text-blue-600"
          size={22}
        />

        <h2 className="text-xl font-semibold">
          Recent Activity
        </h2>

      </div>

      <div className="rounded-xl border border-dashed border-slate-300 py-14 text-center">

        <p className="text-lg font-medium text-slate-700">
          No recent activity
        </p>

        <p className="mt-2 text-slate-500">
          Upload your first document to begin using the platform.
        </p>

      </div>

    </div>
  );
}