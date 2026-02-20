import Link from "next/link";

export default function Home() {
  const pages = [
    {
      name: "Inventory",
      subtitle: "Products",
      description: "Manage stock levels, pricing, and product variants.",
      path: "/products",
      icon: (
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
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      glow: "group-hover:shadow-indigo-500/20",
      accent: "text-indigo-400",
    },
    {
      name: "Directory",
      subtitle: "Users",
      description: "Monitor user activity, roles, and engagement points.",
      path: "/users",
      icon: (
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      glow: "group-hover:shadow-emerald-500/20",
      accent: "text-emerald-400",
    },
    {
      name: "Analytics",
      subtitle: "Sales",
      description: "Track revenue, tax collections, and sales rep performance.",
      path: "/sales",
      icon: (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      glow: "group-hover:shadow-violet-500/20",
      accent: "text-violet-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
              System v2.4.1 Active
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Tripstore{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-500">
              Data Portal
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Centralized management hub for legacy Tripstore inventory, users,
            and financial records. Real-time synchronization across all modules.
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Link key={page.path} href={page.path} className="group">
              <div
                className={`relative h-full bg-slate-900 border border-slate-800 p-8 rounded-3xl transition-all duration-300 group-hover:-translate-y-2 group-hover:border-slate-700 shadow-xl ${page.glow}`}
              >
                {/* Icon Circle */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 ${page.accent} group-hover:bg-slate-700 transition-colors`}
                >
                  {page.icon}
                </div>

                <div className="mb-4">
                  <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mb-1">
                    {page.name}
                  </h3>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    {page.subtitle}
                  </h2>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {page.description}
                </p>

                {/* Bottom Link Indicator */}
                <div className="flex items-center text-xs font-bold text-slate-500 group-hover:text-white transition-colors">
                  EXPLORE DATA
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>

                {/* Decorative Gradient Background (Hidden until hover) */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/3 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center border-t border-slate-900 pt-8">
          <p className="text-slate-600 text-xs font-medium uppercase tracking-widest">
            Last Database Sync: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
