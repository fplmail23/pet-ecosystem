import { currentUser } from "@clerk/nextjs/server";

async function getStats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, { cache: "no-store" });
    return await res.json();
  } catch {
    return { status: "error" };
  }
}

export default async function DashboardPage() {
  const user = await currentUser();
  const stats = await getStats();

  const cards = [
    { title: "Usuarios registrados", value: "0", icon: "👥", color: "bg-blue-50 border-blue-200" },
    { title: "Proveedores activos", value: "0", icon: "🏢", color: "bg-green-50 border-green-200" },
    { title: "Reservas hoy", value: "0", icon: "📅", color: "bg-purple-50 border-purple-200" },
    { title: "Ingresos del mes", value: "$0", icon: "💰", color: "bg-amber-50 border-amber-200" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido, {user?.firstName ?? "Admin"}</h1>
        <p className="text-gray-500 mt-1">Panel de administracion del ecosistema pet</p>
        <div className="mt-2 inline-flex items-center gap-2 text-sm">
          <span className={`w-2 h-2 rounded-full ${stats.status === "ok" ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-gray-500">API {stats.status === "ok" ? "operacional" : "con problemas"}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.title} className={`rounded-xl border p-6 ${card.color}`}>
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm text-gray-600 mt-1">{card.title}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Proveedores pendientes</h2>
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">🏢</div>
            <p className="text-sm">No hay proveedores pendientes</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actividad reciente</h2>
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-sm">Sin actividad reciente</p>
          </div>
        </div>
      </div>
    </div>
  );
}