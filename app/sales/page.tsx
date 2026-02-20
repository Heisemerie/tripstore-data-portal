import salesData from "../data/oldSales.json";
import { Order } from "../types/sales";

const sales = salesData as Order[];

export default function SalesPage() {
  // Aggregate Metrics
  const totalRevenue = sales.reduce((acc, sale) => acc + sale.total, 0);
  const totalTax = sales.reduce((acc, sale) => acc + sale.tax, 0);
  const avgOrderValue = totalRevenue / sales.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header & Stats */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Sales <span className="text-violet-500">Analytics</span>
            </h1>
            <p className="text-slate-400 mt-1">
              Real-time revenue and transaction tracking.
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <MetricCard
              label="Total Revenue"
              value={totalRevenue}
              prefix="₦"
              color="text-emerald-400"
            />
            <MetricCard label="Avg. Order" value={avgOrderValue} prefix="₦" />
            <MetricCard
              label="Tax Collected"
              value={totalTax}
              prefix="₦"
              color="text-amber-400"
            />
          </div>
        </header>

        {/* Sales Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/40 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-800">
                  <th className="px-6 py-4">Order Details</th>
                  <th className="px-6 py-4">Sales Representative</th>
                  <th className="px-6 py-4">Payment Method</th>
                  <th className="px-6 py-4 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sales.map((sale) => (
                  <SaleRow key={sale.orderNumber} sale={sale} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaleRow({ sale }: { sale: Order }) {
  const dateStr = new Date(sale.timestamp.$date).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <tr className="group hover:bg-slate-800/30 transition-all cursor-default">
      {/* Order Info */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-mono font-bold text-violet-400 group-hover:text-violet-300 transition-colors">
            {sale.orderNumber}
          </span>
          <span className="text-xs text-slate-500 mt-0.5">{dateStr}</span>
        </div>
      </td>

      {/* Sales Rep */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
            {sale.salesRep.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-200 capitalize">
              {sale.salesRep.name}
            </span>
            <span className="text-[10px] text-slate-500 lowercase">
              {sale.salesRep.email}
            </span>
          </div>
        </div>
      </td>

      {/* Payment Type */}
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">
            {sale.payment.type}
          </span>
          <span className="text-[10px] font-mono text-slate-600 truncate max-w-[120px]">
            {sale.payment.details.transactionId}
          </span>
        </div>
      </td>

      {/* Financials */}
      <td className="px-6 py-4 text-right">
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-emerald-400">
            ₦{sale.total.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500 italic">
            Tax: ₦{sale.tax.toLocaleString()}
          </span>
        </div>
      </td>
    </tr>
  );
}

function MetricCard({
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
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex-grow min-w-[140px]">
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
