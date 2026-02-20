import MetricCard from "../components/sales/metricCard";
import SaleRow from "../components/sales/salesRow";
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
