import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold text-indigo-600">Pet Ecosystem</span>
            <div className="flex items-center gap-6">
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Inicio</Link>
              <Link href="/dashboard/providers" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Proveedores</Link>
              <Link href="/dashboard/users" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Usuarios</Link>
              <Link href="/dashboard/support" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Soporte</Link>
            </div>
          </div>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}