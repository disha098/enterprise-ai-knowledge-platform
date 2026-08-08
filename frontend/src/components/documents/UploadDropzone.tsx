import { useRef, useState } from "react";
import {
  UploadCloud,
  X,
  CheckCircle2,
} from "lucide-react";

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const ALLOWED_EXTENSIONS = ["pdf", "docx", "txt"];

export default function UploadDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [error, setError] = useState("");

  const validateFile = (selectedFile: File) => {
    setError("");

    const extension = selectedFile.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
      setError(
        "Only PDF, DOCX and TXT files are supported."
      );
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(
        "File size must be less than 20 MB."
      );
      return false;
    }

    return true;
  };

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) {
      return;
    }

    if (!validateFile(selectedFile)) {
      return;
    }

    setFile(selectedFile);
    setCompleted(false);
    setProgress(0);
    setError("");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFile(event.target.files?.[0] ?? null);

    // Allows selecting the same file again later.
    event.target.value = "";
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setDragging(false);

    const droppedFile =
      event.dataTransfer.files?.[0];

    handleFile(droppedFile ?? null);
  };

  const removeFile = () => {
    if (uploading) {
      return;
    }

    setFile(null);
    setProgress(0);
    setCompleted(false);
    setError("");
  };

  const simulateUpload = () => {
    if (!file || uploading) {
      return;
    }

    setUploading(true);
    setCompleted(false);
    setProgress(0);
    setError("");

    let value = 0;

    const timer = window.setInterval(() => {
      value += 10;

      setProgress(value);

      if (value >= 100) {
        window.clearInterval(timer);

        setUploading(false);
        setCompleted(true);
      }
    }, 200);
  };

  const fileExtension =
    file?.name
      .split(".")
      .pop()
      ?.toUpperCase() ?? "";

  return (
    <div className="space-y-6">

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf,.docx,.txt"
        onChange={handleInputChange}
      />

      {/* Upload Area */}
      {!file && !completed && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            rounded-3xl
            border-2
            border-dashed
            p-12
            shadow-sm
            transition-all
            duration-200
            ${
              dragging
                ? "border-blue-500 bg-blue-50"
                : "border-slate-300 bg-white hover:border-blue-400"
            }
          `}
        >
          <div className="flex flex-col items-center text-center">

            {/* Icon */}
            <div
              className={`
                rounded-full p-6 transition
                ${
                  dragging
                    ? "bg-blue-200"
                    : "bg-blue-100"
                }
              `}
            >
              <UploadCloud
                size={44}
                className="text-blue-600"
              />
            </div>

            {/* Heading */}
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">
              {dragging
                ? "Drop your document here"
                : "Drag & Drop your document"}
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-lg text-slate-500">
              Upload PDF, DOCX or TXT files to
              build your enterprise AI knowledge
              base.
            </p>

            {/* Browse Button */}
            <button
              type="button"
              onClick={() =>
                inputRef.current?.click()
              }
              className="mt-8 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              Browse Files
            </button>

            {/* File Information */}
            <div className="mt-5 space-y-1 text-sm text-slate-400">
              <p>
                Supported: PDF • DOCX • TXT
              </p>

              <p>
                Maximum file size: 20 MB
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Selected File */}
      {file && !completed && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-start justify-between">

            <div className="flex gap-4">

              {/* File Type */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 font-bold text-blue-600">
                {fileExtension}
              </div>

              {/* File Information */}
              <div className="min-w-0">

                <h3 className="break-all text-lg font-semibold text-slate-900">
                  {file.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {(
                    file.size /
                    1024 /
                    1024
                  ).toFixed(2)}{" "}
                  MB
                </p>

                {!uploading && (
                  <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    <CheckCircle2 size={15} />
                    Ready to Upload
                  </span>
                )}

                {uploading && (
                  <span className="mt-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    Processing...
                  </span>
                )}

              </div>

            </div>

            {/* Remove */}
            {!uploading && (
              <button
                type="button"
                onClick={removeFile}
                className="rounded-lg p-2 transition hover:bg-red-50"
                aria-label="Remove file"
              >
                <X
                  size={20}
                  className="text-red-500"
                />
              </button>
            )}

          </div>

          {/* Progress */}
          {uploading && (
            <div className="mt-8">

              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">
                  Uploading and processing...
                </span>

                <span className="text-slate-500">
                  {progress}%
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-200"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

              <p className="mt-3 text-sm text-slate-500">
                Preparing your document for AI
                processing.
              </p>

            </div>
          )}

          {/* Upload Button */}
          {!uploading && (
            <button
              type="button"
              onClick={simulateUpload}
              className="mt-8 w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Upload & Process
            </button>
          )}

        </div>
      )}

      {/* Success */}
      {completed && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2
              size={42}
              className="text-green-600"
            />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-slate-900">
            Document Ready
          </h2>

          <p className="mx-auto mt-3 max-w-md text-slate-600">
            Your document has been successfully
            processed and is ready for the next
            stage of the AI knowledge pipeline.
          </p>

          <button
            type="button"
            onClick={() => {
              setFile(null);
              setCompleted(false);
              setProgress(0);
            }}
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Upload Another Document
          </button>

        </div>
      )}

    </div>
  );
}