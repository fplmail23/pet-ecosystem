import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  const nav = [
    { href: "/portal/dashboard", icon: "🏠", label: "Inicio" },
    { href: "/portal/mascotas", icon: "🐾", label: "Mis mascotas" },
    { href: "/portal/servicios", icon: "🔍", label: "Servicios" },
    { href: "/portal/agenda", icon: "📅", label: "Agenda" },
    { href: "/portal/gastos", icon: "💰", label: "Gastos" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 fixed h-full">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="text-lg font-bold text-indigo-600">Pet Ecosystem</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-sm font-medium">
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <UserButton afterSignOutUrl="/" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.firstName ?? "Usuario"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 md:ml-64">
        <header className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🐾</span>
            <span className="font-bold text-indigo-600">Pet Ecosystem</span>
          </Link>
          <UserButton afterSignOutUrl="/" />
        </header>
        <main className="p-6">{children}</main>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around py-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 px-3 py-2 text-gray-500 hover:text-indigo-600">
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}