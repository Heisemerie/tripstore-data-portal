import { User } from "@/app/types/users";
import StatusBadge from "./statusBadge";

export default function UserRow({ user }: { user: User }) {
  const initials = `${user.firstname[0]}${user.lastname[0]}`;
  const spend = parseFloat(user.total_purchases?.$numberDecimal || "0");

  return (
    <tr className="hover:bg-slate-800/40 transition-all group">
      {/* Identity */}
      <td className="px-8 py-5 whitespace-nowrap">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black border border-indigo-500/20">
            {initials}
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100">
              {user.firstname} {user.lastname}
            </div>
            <div className="text-xs text-slate-500">{user.email}</div>
          </div>
        </div>
      </td>

      {/* Privilege */}
      <td className="px-8 py-5 whitespace-nowrap">
        <span className="text-[10px] font-black bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700 uppercase tracking-tighter">
          {user.user_type}
        </span>
      </td>

      {/* Status */}
      <td className="px-8 py-5 whitespace-nowrap">
        <StatusBadge status={user.status} />
      </td>

      {/* Location */}
      <td className="px-8 py-5 whitespace-nowrap text-sm text-slate-400">
        {user.city ? (
          `${user.city}, ${user.state}`
        ) : (
          <span className="text-slate-700 italic">Remote / Unset</span>
        )}
      </td>

      {/* Engagement */}
      <td className="px-8 py-5 whitespace-nowrap text-center">
        <div className="inline-block px-3 py-1 bg-emerald-500/5 rounded-full border border-emerald-500/10">
          <span className="text-sm font-bold text-emerald-500">
            {user.points?.toLocaleString()}
          </span>
          <span className="ml-2 text-[10px] text-slate-600 font-bold uppercase">
            Points
          </span>
        </div>
      </td>

      {/* Revenue */}
      <td className="px-8 py-5 whitespace-nowrap text-right">
        <div className="text-sm font-mono font-black text-white">
          ₦{spend.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
      </td>
    </tr>
  );
}
