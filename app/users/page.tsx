import StatCard from "../components/users/statCard";
import UserRow from "../components/users/userRow";
import usersData from "../data/testUsers.json";
import { User } from "../types/users";

const users = usersData as User[];

export default function UsersPage() {
  const activeCount = users.filter((u) => u.status === "active").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 ">
      <div className="mx-auto">
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
