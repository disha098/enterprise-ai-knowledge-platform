import { CheckCircle2 } from "lucide-react";

const services = [
  "AI Service",
  "Document Processing",
  "Storage",
];

export default function SystemStatus() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          System Status
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current platform health.
        </p>
      </div>

      <div className="mt-6 space-y-4">

        {services.map((service) => (
          <div
            key={service}
            className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
          >

            <div className="flex items-center gap-3">

              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

              <span className="text-sm font-medium text-slate-700">
                {service}
              </span>

            </div>

            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle2 size={16} />
              Operational
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}