import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function PortalDashboard() {
  const user = await currentUser();

  const quickActions = [
    { href: "/portal/mascotas", icon: "🐾", title: "Mis mascotas", desc: "Gestiona el perfil de tus mascotas", color: "bg-indigo-50 border-indigo-100 hover:bg-indigo-100" },
    { href: "/portal/servicios", icon: "🏥", title: "Buscar clinicas", desc: "Agenda una cita veterinaria", color: "bg-blue-50 border-blue-100 hover:bg-blue-100" },
    { href: "/portal/servicios", icon: "🚶", title: "Paseadores", desc: "Reserva un paseo hoy", color: "bg-green-50 border-green-100 hover:bg-green-100" },
    { href: "/portal/servicios", icon: "🛍️", title: "Tienda", desc: "Productos para tu mascota", color: "bg-purple-50 border-purple-100 hover:bg-purple-100" },
    { href: "/portal/agenda", icon: "📅", title: "Mi agenda", desc: "Citas y recordatorios", color: "bg-amber-50 border-amber-100 hover:bg-amber-100" },
    { href: "/portal/gastos", icon: "💰", title: "Gastos", desc: "Control de gastos", color: "bg-red-50 border-red-100 hover:bg-red-100" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Hola, {user?.firstName ?? "bienvenido"} 👋</h1>
        <p className="text-gray-500 mt-1">Que necesitan tus mascotas hoy?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {quickActions.map((action) => (
          <Link key={action.title} href={action.href} className={`rounded-2xl border p-6 transition-all hover:shadow-md hover:-translate-y-0.5 ${action.color}`}>
            <div className="text-3xl mb-3">{action.icon}</div>
            <h3 className="text-base font-semibold text-gray-900">{action.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{action.desc}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Mis mascotas</h2>
            <Link href="/portal/mascotas" className="text-sm text-indigo-600 hover:text-indigo-800">Ver todas →</Link>
          </div>
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">🐾</div>
            <p className="text-sm">No tienes mascotas registradas aun</p>
            <Link href="/portal/mascotas/nueva" className="text-xs text-indigo-600 mt-2 inline-block hover:underline">
              Agregar mi primera mascota →
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Proximas citas</h2>
            <Link href="/portal/agenda" className="text-sm text-indigo-600 hover:text-indigo-800">Ver agenda →</Link>
          </div>
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📅</div>
            <p className="text-sm">No tienes citas proximas</p>
          </div>
        </div>
      </div>
    </div>
  );
}