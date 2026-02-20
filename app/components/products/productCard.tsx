import { Product } from "@/app/types/product";
import Image from "next/image";

export default function ProductCard({ item }: { item: Product }) {
  // Calculate total stock
  const totalStock = item.measurements.reduce(
    (acc, m) => acc + m.colors.reduce((cAcc, c) => cAcc + c.amount, 0),
    0,
  );

  // Get price display
  const prices = item.measurements.map((m) => m.price);
  const minPrice = Math.min(...prices);

  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 flex flex-col shadow-xl">
      {/* Image Container */}
      <div className="aspect-4/5 relative bg-slate-800 overflow-hidden">
        {item.images[0] ? (
          <Image
            src={item.images[0]}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-500">
            No Image
          </div>
        )}

        {/* Gender Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-400 border border-slate-700">
          {item.gender}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-tighter mb-1">
              {item.brand}
            </p>
            <h3 className="text-sm font-bold text-white leading-tight line-clamp-2 min-h-10">
              {item.name}
            </h3>
          </div>
        </div>

        <div className="mt-auto pt-4 flex justify-between items-center border-t border-slate-800">
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
              Starts at
            </p>
            <p className="text-lg font-black text-emerald-400">
              ₦{minPrice.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
              Stock
            </p>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${totalStock > 0 ? "text-indigo-400 bg-indigo-400/10" : "text-red-400 bg-red-400/10"}`}
            >
              {totalStock > 0 ? `${totalStock} Units` : "Out of Stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
