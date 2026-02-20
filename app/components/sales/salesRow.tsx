import { Order } from "@/app/types/sales";

export default function SaleRow({ sale }: { sale: Order }) {
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
          <span className="text-[10px] font-mono text-slate-600 truncate max-w-30">
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