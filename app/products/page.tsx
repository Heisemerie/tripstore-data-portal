"use client";

import { useState, useMemo } from "react";
import productsData from "../data/oldProducts.json";
import { Product } from "../types/product";
import ProductCard from "../components/products/productCard";

const products = productsData as Product[];
const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Filter products based on search query
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const searchStr =
        `${item.name} ${item.brand} ${item.gender}`.toLowerCase();
      return searchStr.includes(searchQuery.toLowerCase());
    });
  }, [searchQuery]);

  // 2. Pagination Logic (Calculated from filtered list)
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset to page 1 when searching
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Inventory <span className="text-indigo-500">Gallery</span>
            </h1>
            <p className="text-slate-400 mt-2">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, brand..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-sm rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 whitespace-nowrap">
              PAGE {currentPage} / {totalPages || 1}
            </div>
          </div>
        </header>

        {/* --- Responsive Grid / Empty State --- */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-500 text-lg">
              No products found matching
              <span className="text-white">{searchQuery}</span>
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-indigo-400 hover:text-indigo-300 font-bold text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* --- Pagination Controls --- */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={() => {
                setCurrentPage((p) => p - 1);
                window.scrollTo(0, 0);
              }}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-slate-800 rounded-full hover:bg-slate-700 disabled:opacity-30 transition-all font-semibold"
            >
              Previous
            </button>
            <button
              onClick={() => {
                setCurrentPage((p) => p + 1);
                window.scrollTo(0, 0);
              }}
              disabled={currentPage === totalPages}
              className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500 disabled:opacity-30 transition-all font-semibold shadow-lg shadow-indigo-500/20"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
