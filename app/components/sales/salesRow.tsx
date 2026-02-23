import { useState } from "react";
import { Order } from "../../types/sales";

export default function SaleRow({ sale }: { sale: Order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dateStr = new Date(sale.timestamp.$date).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      {/* Main Row */}
      <tr
        onClick={() => setIsExpanded(!isExpanded)}
        className={`group hover:bg-slate-800/30 transition-all cursor-pointer ${isExpanded ? "bg-slate-800/20" : ""}`}
      >
        {/* Order Info */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <svg
              className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isExpanded ? "rotate-90 text-violet-400" : "group-hover:text-slate-300"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-sm font-mono font-bold text-violet-400 group-hover:text-violet-300 transition-colors">
                {sale.orderNumber}
              </span>
              <span className="text-xs text-slate-500 mt-0.5">{dateStr}</span>
            </div>
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

      {/* Expanded Accordion Row */}
      {isExpanded && (
        <tr className="bg-slate-900/40 border-b border-slate-800/50">
          <td colSpan={4} className="px-6 py-6 border-l-2 border-violet-500">
            <div className="flex flex-col lg:flex-row gap-8 justify-between max-w-5xl mx-auto">
              {/* Left Column: Line Items Table */}
              <div className="flex-1">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Itemized Receipt
                </h4>
                <div className="bg-slate-950/50 rounded-xl border border-slate-800 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-800/30 text-slate-400 text-[10px] uppercase font-bold">
                      <tr>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3 text-center">Qty</th>
                        <th className="px-4 py-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {sale.items.map((item, idx) => (
                        <tr
                          key={idx}
                          className="text-slate-300 hover:bg-slate-800/20 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium">
                            {item.product}
                          </td>
                          <td className="px-4 py-3 text-center text-slate-500">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-right font-mono">
                            ₦{(item.quantity * item.price).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Payment & Summary Info */}
              <div className="w-full lg:w-80 flex flex-col gap-4">
                {/* Payment Information Card */}
                <div className="bg-slate-800/20 p-5 rounded-xl border border-slate-800/50">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-700/50 pb-2">
                    Payment Information
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Method</span>
                      <span className="text-violet-400 font-bold bg-violet-500/10 px-2 py-0.5 rounded text-xs uppercase tracking-wider">
                        {sale.payment.type}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 text-slate-400">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500">
                        Transaction ID
                      </span>
                      <span className="text-xs font-mono text-slate-300 break-all bg-slate-950/50 p-1.5 rounded border border-slate-800">
                        {sale.payment.details.transactionId}
                      </span>
                    </div>

                    {/* Conditionally render Card Details if they exist and aren't "N/A" */}
                    {sale.payment.details.cardType !== "N/A" && (
                      <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-slate-700/50">
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-slate-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                          {sale.payment.details.cardType}
                        </span>
                        <span className="font-mono text-xs text-slate-300 tracking-widest">
                          {sale.payment.details.first6Digits.slice(0, 4)} ****{" "}
                          {sale.payment.details.last4Digits}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary Block Card */}
                <div className="bg-slate-800/20 p-5 rounded-xl border border-slate-800/50">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span>₦{sale.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>VAT (7.5%)</span>
                      <span>₦{sale.tax.toLocaleString()}</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-700/50 flex justify-between items-center font-black text-white">
                      <span>Grand Total</span>
                      <span className="text-emerald-400 text-xl tracking-tight">
                        ₦{sale.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
