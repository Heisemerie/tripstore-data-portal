export default function StatCard({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg min-w-40">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">
        {label}
      </p>
      <p className={`text-3xl font-black ${color} tracking-tighter`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}
