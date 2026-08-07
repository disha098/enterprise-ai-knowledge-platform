import DashboardLayout from "../components/layout/DashboardLayout";
import DocumentTable from "../components/documents/DocumentTable";
import EmptyDocuments from "../components/documents/EmptyDocuments";
import { Upload } from "lucide-react";
import { Link } from "react-router-dom";

export default function Documents() {
  const documents: any[] = [];

  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Documents
            </h1>

            <p className="text-slate-500 mt-1">
              Upload and manage your knowledge base.
            </p>
          </div>

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