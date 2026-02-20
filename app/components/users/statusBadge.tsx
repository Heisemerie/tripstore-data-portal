export default function StatusBadge({ status }: { status: string }) {
  const isActive = status === "active";

  return (
    <div className="flex items-center gap-2">
      <span className={`relative flex h-2 w-2`}>
        {isActive && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? "bg-emerald-500" : "bg-slate-600"}`}
        ></span>
      </span>
      <span
        className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-emerald-400" : "text-slate-500"}`}
      >
        {status}
      </span>
    </div>
  );
}
