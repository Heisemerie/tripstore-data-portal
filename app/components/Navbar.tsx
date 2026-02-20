import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          DataPortal
        </Link>
        <div className="space-x-6">
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/users" className="hover:underline">
            Users
          </Link>
          <Link href="/sales" className="hover:underline">
            Sales
          </Link>
        </div>
      </div>
    </nav>
  );
}
