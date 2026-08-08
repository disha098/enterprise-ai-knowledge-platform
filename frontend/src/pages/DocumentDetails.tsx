import {
  ArrowLeft,
  FileText,
  Download,
  MessageSquare,
  Trash2,
  Calendar,
  HardDrive,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function DocumentDetails() {
  const document = {
    name: "Synopsis 020726 rev03.docx",
    type: "DOCX",
    size: "0.03 MB",
    uploaded: "Aug 8, 2026",
    status: "Ready",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Back */}
        <Link
          to="/documents"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Documents
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Document Details
            </h1>

            <p className="mt-1 text-slate-500">
              View information and available actions for this document.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Download size={18} />
              Download
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              <MessageSquare size={18} />
              Open in Chat
            </button>
          </div>
        </div>

        {/* Document overview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* File icon */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
              <FileText
                size={40}
                className="text-blue-600"
              />
            </div>

            {/* Name */}
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-500">
                Document
              </p>

              <h2 className="mt-1 break-all text-2xl font-semibold text-slate-900">
                {document.name}
              </h2>

              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <CheckCircle size={14} />
                {document.status}
              </span>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Document Information
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* File Type */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <FileText
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  File Type
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {document.type}
                </p>
              </div>
            </div>

            {/* File Size */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                <HardDrive
                  size={20}
                  className="text-purple-600"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  File Size
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {document.size}
                </p>
              </div>
            </div>

            {/* Uploaded */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                <Calendar
                  size={20}
                  className="text-orange-600"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Uploaded
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {document.uploaded}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Delete Document
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Permanently remove this document from your knowledge base.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={17} />
              Delete Document
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}