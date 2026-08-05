import type { ReactNode } from "react";
import Logo from "../ui/Logo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-between border-r border-slate-200 bg-white p-16">

          <div>
            <Logo />

            <div className="mt-20">
              <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                AI Powered Knowledge Platform
              </div>

              <h1 className="mt-8 text-5xl font-bold leading-tight text-slate-900">
                Chat with your
                <br />
                Enterprise
                <br />
                Documents
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                Upload PDFs, Word documents and reports.
                Our AI understands your knowledge base and
                gives accurate answers in seconds.
              </p>
            </div>
          </div>

          {/* Feature Cards */}

          <div className="space-y-4">

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Enterprise Security
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                JWT authentication with secure document access.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                AI Document Search
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Ask questions across all uploaded documents.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                Conversation History
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Resume previous chats anytime.
              </p>
            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex items-center justify-center p-8">

          <div className="w-full max-w-md">

            <div className="mb-10 lg:hidden">
              <Logo />
            </div>

            <h2 className="text-4xl font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-2 text-slate-600">
              {subtitle}
            </p>

            <div className="mt-10">
              {children}
            </div>

            <div className="mt-8 text-center text-xs text-slate-500">
              © 2026 Enterprise AI Knowledge Platform
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}