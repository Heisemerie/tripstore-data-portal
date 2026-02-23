import { useState } from "react";
import { Order } from "../../types/sales";

export default function SaleRow({ sale }: { sale: Order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dateStr = new Date(sale.timestamp.$date).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <tr
        onClick={() => setIsExpanded(!isExpanded)}
        className={`group hover:bg-slate-800/30 transition-all cursor-pointer ${isExpanded ? "bg-slate-800/20" : ""}`}
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <svg
              className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? "rotate-90 text-violet-400" : ""}`}
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
              <span className="text-sm font-mono font-bold text-violet-400">
                {sale.orderNumber}
              </span>
              <span className="text-[10px] text-slate-500">{dateStr}</span>
            </div>
          </div>
        </td>

        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
              {sale.salesRep.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-200">
                {sale.salesRep.name}
              </span>
              <span className="text-[10px] text-slate-500 italic">
                ID: {sale.salesRep.id}
              </span>
            </div>
          </div>
        </td>

        <td className="px-6 py-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-slate-500">
              {sale.payment.type}
            </span>
            <span className="text-[10px] font-mono text-slate-400 truncate max-w-xs">
              {sale.payment.details.transactionId}
            </span>
          </div>
        </td>

        {/* Discounts Column */}
        <td className="px-6 py-4 text-right">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-amber-500">
              -₦{sale.discountAmount?.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500">
              {sale.discountPercentage}% OFF
            </span>
          </div>
        </td>

        <td className="px-6 py-4 text-right">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-emerald-400">
              ₦{sale.total.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500">v{sale.__v}</span>
          </div>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-slate-900/40 border-b border-slate-800/50">
          <td colSpan={5} className="px-6 py-6 border-l-2 border-violet-500">
            <div className="mb-6">
              <p className="text-[10px] font-mono text-slate-600 uppercase">
                System Object ID: {sale._id.$oid}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 justify-between">
              {/* Itemized Table with all OrderItem fields */}
              <div className="flex-1 overflow-x-auto">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Line Items
                </h4>
                <div className="bg-slate-950/50 rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-800/30 text-slate-400 uppercase font-bold">
                      <tr>
                        <th className="px-4 py-3">Product / SKU / ID</th>
                        <th className="px-4 py-3">Specs</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-center">Qty</th>
                        <th className="px-4 py-3 text-right">Unit Price</th>
                        <th className="px-4 py-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {sale.items.map((item) => (
                        <tr key={item._id.$oid} className="text-slate-300">
                          <td className="px-4 py-3">
                            <div className="font-bold text-slate-100">
                              {item.product}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {item.sku}
                            </div>
                            <div className="text-[9px] text-slate-600 font-mono">
                              ID: {item._id.$oid}
                            </div>
                          </td>
                          <td className="px-4 py-3 uppercase">
                            <span className="block">{item.size}</span>
                            <span className="text-slate-500">{item.color}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] border border-slate-700">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-right">
                            ₦{item.price.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-violet-400">
                            ₦{(item.quantity * item.price).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Financial Summary & Payment Details */}
              <div className="w-full lg:w-96 space-y-4">
                <div className="bg-slate-800/20 p-5 rounded-xl border border-slate-800/50">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 pb-2 border-b border-slate-700/50">
                    Full Financial Breakdown
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span>₦{sale.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-amber-500/80">
                      <span>Discount ({sale.discountPercentage}%)</span>
                      <span>-₦{sale.discountAmount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Tax (VAT)</span>
                      <span>₦{sale.tax.toLocaleString()}</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-700 flex justify-between items-center font-black text-white">
                      <span>Final Total</span>
                      <span className="text-emerald-400 text-xl">
                        ₦{sale.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/20 p-5 rounded-xl border border-slate-800/50">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 pb-2 border-b border-slate-700/50">
                    Payment & Meta
                  </h4>
                  <div className="space-y-3 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">REP EMAIL:</span>{" "}
                      <span className="text-slate-300">
                        {sale.salesRep.email}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">CARD TYPE:</span>{" "}
                      <span className="text-slate-300">
                        {sale.payment.details.cardType}
                      </span>
                    </div>
                    {sale.payment.details.first6Digits !== "N/A" && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">CARD NUM:</span>{" "}
                        <span className="text-slate-300 font-mono">
                          {sale.payment.details.first6Digits}******
                          {sale.payment.details.last4Digits}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">VERSION:</span>{" "}
                      <span className="text-slate-300">{sale.__v}</span>
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
