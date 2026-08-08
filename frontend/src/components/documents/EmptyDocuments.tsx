import { FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyDocuments() {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <FileText className="text-blue-600" size={40} />
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-slate-800">
        No documents uploaded
      </h2>

      <p className="mx-auto mt-2 max-w-md text-slate-500">
        Upload PDFs, DOCX or TXT files to start building your AI knowledge base.
      </p>

      <Link
        to="/documents/upload"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-blue-700"
      >
        <Upload size={18} />
        Upload First Document
      </Link>

    </div>
  );
}