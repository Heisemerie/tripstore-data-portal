import Link from "next/link";

export default function Home() {
  const pages = [
    { name: "Inventory (Products)", path: "/products", color: "bg-blue-500" },
    { name: "User Directory", path: "/users", color: "bg-green-500" },
    { name: "Sales Records", path: "/sales", color: "bg-purple-500" },
  ];

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Data Dashboard</h1>
      <p className="mb-12 text-gray-600">
        Select a category below to view detailed records.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Link key={page.path} href={page.path}>
            <div
              className={`${page.color} text-white p-10 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer`}
            >
              <h2 className="text-2xl font-semibold">{page.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
