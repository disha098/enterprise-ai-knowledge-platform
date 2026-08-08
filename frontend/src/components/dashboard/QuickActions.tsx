import {
  Upload,
  MessageSquare,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Upload Document",
    description: "Add a PDF, DOCX or TXT file",
    icon: Upload,
    path: "/documents/upload",
  },
  {
    title: "Start New Chat",
    description: "Ask questions about your knowledge base",
    icon: MessageSquare,
    path: "/chat",
  },
  {
    title: "View Documents",
    description: "Manage your uploaded documents",
    icon: FileText,
    path: "/documents",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Quickly access common tasks.
        </p>
      </div>

      <div className="mt-6 space-y-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.path}
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Icon size={21} />
              </div>

              <div>
                <h3 className="font-medium text-slate-900">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}

      </div>
    </div>
  );
}