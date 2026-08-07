import { UploadCloud } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">

      <div className="flex flex-col items-center text-center">

        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <UploadCloud
            className="text-blue-600"
            size={36}
          />
        </div>

        <h2 className="text-2xl font-semibold">
          No Documents Yet
        </h2>

        <p className="mt-3 max-w-md text-slate-500">
          Upload your first PDF, DOCX or TXT file to start
          chatting with your enterprise knowledge base.
        </p>

        <button
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Upload Document
        </button>

      </div>

    </div>
  );
}