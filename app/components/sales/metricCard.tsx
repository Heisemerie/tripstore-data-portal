export default function MetricCard({
  label,
  value,
  prefix = "",
  color = "text-white",
}: {
  label: string;
  value: number;
  prefix: string;
  color?: string;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl grow min-w-35">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className={`text-xl font-black ${color}`}>
        {prefix}
        {Math.round(value).toLocaleString()}
      </p>
    </div>
  );
}
