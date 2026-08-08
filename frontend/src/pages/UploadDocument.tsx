import DashboardLayout from "../components/layout/DashboardLayout";
import UploadDropzone from "../components/documents/UploadDropzone";

import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function UploadDocument() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Page Header */}
        <div>

          <Link
              to="/documents"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
              <ArrowLeft size={18} />
              Back to Documents
          </Link>

          <p className="mt-2 text-slate-500">
            Upload PDFs, DOCX and TXT files to build your AI knowledge base.
          </p>
        </div>

        {/* Upload Component */}
        <UploadDropzone />

      </div>
    </DashboardLayout>
  );
}