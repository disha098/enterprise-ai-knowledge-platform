export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-bold text-white shadow-lg">
        AI
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Enterprise AI
        </h1>

        <p className="text-sm text-slate-500">
          Knowledge Platform
        </p>
      </div>
    </div>
  );
}