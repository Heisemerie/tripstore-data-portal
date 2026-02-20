import usersData from "../data/testUsers.json";
import { User } from "../types/users";

const users = usersData as User[];

export default function UsersPage() {
  const activeCount = users.filter((u) => u.status === "active").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
      <div className="max-w-400 mx-auto">
        {" "}
        {/* Increased max-width for ultra-wide screens */}
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">
              User Directory
            </h1>
            <p className="text-slate-400 mt-2 font-medium">
              Comprehensive overview of platform membership and financial
              engagement.
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <StatCard label="Total Users" value={users.length} />
            <StatCard
              label="Active Now"
              value={activeCount}
              color="text-emerald-400"
            />
          </div>
        </header>
        {/* --- Responsive Table Wrapper --- */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          {/* Horizontal scroll starts here. 
              The 'overflow-x-auto' allows swiping on mobile. 
          */}
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <table className="w-full min-w-275 border-collapse">
              <thead className="bg-slate-800/50">
                <tr className="text-left border-b border-slate-700">
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Identity
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Privilege
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Location
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                    Engagement
                  </th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((user) => (
                  <UserRow key={user._id.$oid} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserRow({ user }: { user: User }) {
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

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "active";

  return (
    <div className="flex items-center gap-2">
      <span className={`relative flex h-2 w-2`}>
        {isActive && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? "bg-emerald-500" : "bg-slate-600"}`}
        ></span>
      </span>
      <span
        className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-emerald-400" : "text-slate-500"}`}
      >
        {status}
      </span>
    </div>
  );
}

function StatCard({
  label,
  value,
  color = "text-white",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg min-w-40">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">
        {label}
      </p>
      <p className={`text-3xl font-black ${color} tracking-tighter`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}
