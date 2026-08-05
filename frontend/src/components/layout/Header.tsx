export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">

      <div>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Welcome back.
        </p>
      </div>

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
          D
        </div>

      </div>

    </header>
  );
}