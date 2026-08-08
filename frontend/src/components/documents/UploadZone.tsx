import { UploadCloud } from "lucide-react";

export default function UploadZone() {
  return (
    <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-16 shadow-sm">

      <div className="flex flex-col items-center text-center">

        <div className="rounded-full bg-blue-100 p-6">
          <UploadCloud
            size={42}
            className="text-blue-600"
          />
        </div>

        <h2 className="mt-6 text-3xl font-semibold text-slate-900">
          Drag & Drop your documents
        </h2>

        <p className="mt-3 max-w-lg text-slate-500">
          Upload PDF, DOCX or TXT files. Our AI will index them so you can chat
          with your documents.
        </p>

        <button
          className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-white font-medium transition hover:bg-blue-700"
        >
          Browse Files
        </button>

        <p className="mt-5 text-sm text-slate-400">
          Supported: PDF • DOCX • TXT
        </p>

        <p className="text-sm text-slate-400">
          Maximum size: 20 MB
        </p>

      </div>

    </div>
  );
}