"use client";

import { useState, useMemo } from "react";
import MetricCard from "../components/sales/metricCard";
import SaleRow from "../components/sales/salesRow";
import salesData from "../data/oldSales.json";
import { Order } from "../types/sales";

const sales = salesData as Order[];

export default function SalesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Filter Logic: Matches Order Number, Rep Name, or Payment Type
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      const searchStr = `
        ${sale.orderNumber} 
        ${sale.salesRep.name} 
        ${sale.payment.type} 
        ${sale.payment.details.transactionId || ""}
      `.toLowerCase();
      return searchStr.includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  // 2. Dynamic Metrics: Updated based on filtered results
  const totalRevenue = filteredSales.reduce((acc, sale) => acc + sale.total, 0);
  const totalTax = filteredSales.reduce((acc, sale) => acc + sale.tax, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 ">
      <div className="max-w-7xl mx-auto">
        {/* Header & Search Bar */}
        <header className="mb-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-black text-white tracking-tight">
              Sales <span className="text-violet-500">Analytics</span>
            </h1>
            <p className="text-slate-400 mt-1">
              {searchQuery
                ? `Found ${filteredSales.length} matches for "${searchQuery}"`
                : "Real-time revenue and transaction tracking."}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-80 group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-500 group-focus-within:text-violet-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Order #, Rep, or Payment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-sm rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all placeholder:text-slate-600"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <MetricCard
                label="Total Revenue"
                value={totalRevenue}
                prefix="₦"
                color="text-emerald-400"
              />
              <MetricCard
                label="Tax"
                value={totalTax}
                prefix="₦"
                color="text-amber-400"
              />
            </div>
          </div>
        </header>

        {/* Sales Table / Empty State */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="overflow-x-auto">
            {filteredSales.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/40 text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-800">
                    <th className="px-6 py-4">Order Details</th>
                    <th className="px-6 py-4">Sales Representative</th>
                    <th className="px-6 py-4">Payment & Transaction</th>
                    <th className="px-6 py-4 text-right">Discounts</th>{" "}
                    {/* Added field */}
                    <th className="px-6 py-4 text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredSales.map((sale) => (
                    <SaleRow key={sale.orderNumber} sale={sale} />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-slate-500 mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-white font-bold">No sales records found</h3>
                <p className="text-slate-500 text-sm mt-1">
                  Try adjusting your search query.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-violet-400 hover:text-violet-300 text-xs font-bold uppercase tracking-widest"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
