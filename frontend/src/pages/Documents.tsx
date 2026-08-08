import DashboardLayout from "../components/layout/DashboardLayout";
import DocumentTable from "../components/documents/DocumentTable";
import EmptyDocuments from "../components/documents/EmptyDocuments";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";

export default function Documents() {
  const documents = [
      {
        id: 1,
        name: "Synopsis 020726 rev03.docx",
        size: "0.03 MB",
        created_at: "Aug 8, 2026",
        status: "Ready" as const,
      },
      {
        id: 2,
        name: "Enterprise AI Project Report.pdf",
        size: "2.4 MB",
        created_at: "Aug 7, 2026",
        status: "Processing" as const,
      },
      {
        id: 3,
        name: "Knowledge Base Notes.txt",
        size: "0.12 MB",
        created_at: "Aug 6, 2026",
        status: "Ready" as const,
      },
    ];

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex justify-end">

          <Link
            to="/documents/upload"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow hover:bg-blue-700"
          >
            <Upload size={18} />
            Upload Document
          </Link>

        </div>

        {documents.length === 0 ? (
          <EmptyDocuments />
        ) : (
          <DocumentTable documents={documents} />
        )}

      </div>

    </DashboardLayout>
  );
}