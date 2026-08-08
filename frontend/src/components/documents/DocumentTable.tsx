import {
  FileText,
  MoreVertical,
  Eye,
  MessageSquare,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Document {
  id: number | string;
  name: string;
  size: string;
  created_at: string;
  status?: "Ready" | "Processing" | "Failed";
}

interface Props {
  documents: Document[];
}

export default function DocumentTable({ documents }: Props) {
  const [openMenu, setOpenMenu] = useState<number | string | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="border-b border-slate-200">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Document
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Size
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Uploaded
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Status
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="border-b border-slate-100 transition hover:bg-slate-50 last:border-b-0"
            >
              {/* Document */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <FileText
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <p className="font-medium text-slate-800">
                      {doc.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      Document
                    </p>
                  </div>
                </div>
              </td>

              {/* Size */}
              <td className="px-6 py-4 text-sm text-slate-600">
                {doc.size}
              </td>

              {/* Uploaded */}
              <td className="px-6 py-4 text-sm text-slate-600">
                {doc.created_at}
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    doc.status === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : doc.status === "Failed"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {doc.status ?? "Ready"}
                </span>
              </td>

              {/* Actions */}
              <td className="relative px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu(
                      openMenu === doc.id ? null : doc.id
                    )
                  }
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label={`Actions for ${doc.name}`}
                >
                  <MoreVertical size={20} />
                </button>

                {openMenu === doc.id && (
                  <div className="absolute right-6 top-14 z-20 w-48 rounded-xl border border-slate-200 bg-white py-2 text-left shadow-lg">
                    <Link
                      to={`/documents/${doc.id}`}
                      onClick={() => setOpenMenu(null)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <Eye size={17} />
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        console.log("Open in chat:", doc.id);
                        setOpenMenu(null);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <MessageSquare size={17} />
                      Open in Chat
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      type="button"
                      onClick={() => {
                        console.log("Delete document:", doc.id);
                        setOpenMenu(null);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}