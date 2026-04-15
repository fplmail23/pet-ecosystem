import { currentUser, auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { ActivityChart } from "./activity-chart";

async function getStats(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }, cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()).data;
  } catch { return null; }
}

async function getActivity(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/activity`, {
      headers: { Authorization: `Bearer ${token}` }, cache: "no-store",
    });
    if (!res.ok) return [];
    return (await res.json()).data ?? [];
  } catch { return []; }
}

async function getApiHealth() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, { cache: "no-store" });
    return await res.json();
  } catch { return { status: "error" }; }
}

const TYPE_LABELS: Record<string, string> = {
  CLINIC: "Clinica", STORE: "Tienda", WALKER: "Paseador",
  GROOMING: "Grooming", DAYCARE: "Daycare", BOARDING: "Boarding", OTHER: "Otro"
};

export default async function DashboardPage() {
  const user = await currentUser();
  const { getToken } = await auth();
  const token = await getToken();
  const [stats, activity, health] = await Promise.all([
    getStats(token ?? ""),
    getActivity(token ?? ""),
    getApiHealth(),
  ]);

  const cards = [
    { title: "Usuarios registrados", value: stats?.totalUsers ?? 0, icon: "👥", color: "bg-blue-50 border-blue-200" },
    { title: "Proveedores activos", value: stats?.totalProviders ?? 0, icon: "🏢", color: "bg-green-50 border-green-200" },
    { title: "Pendientes aprobacion", value: stats?.pendingProviders ?? 0, icon: "⏳", color: "bg-amber-50 border-amber-200" },
    { title: "Ingresos del mes", value: `$${stats?.totalRevenueMonth ?? 0}`, icon: "💰", color: "bg-purple-50 border-purple-200" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido, {user?.firstName ?? "Admin"}</h1>
        <p className="text-gray-500 mt-1">Panel de administracion del ecosistema pet</p>
        <div className="mt-2 inline-flex items-center gap-2 text-sm">
          <span className={`w-2 h-2 rounded-full ${health.status === "ok" ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-gray-500">API {health.status === "ok" ? "operacional" : "con problemas"}</span>
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

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Actividad ultimos 7 dias</h2>
        <p className="text-sm text-gray-500 mb-4">Usuarios y proveedores registrados por dia</p>
        <ActivityChart data={activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Usuarios recientes</h2>
            <Link href="/dashboard/users" className="text-sm text-indigo-600 hover:text-indigo-800">Ver todos →</Link>
          </div>
          {stats?.recentUsers?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentUsers.map((u: any) => (
                <div key={u.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{u.firstName ?? "Sin nombre"} {u.lastName ?? ""}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString("es")}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">👥</div>
              <p className="text-sm">No hay usuarios aun</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Proveedores pendientes</h2>
            <Link href="/dashboard/providers" className="text-sm text-indigo-600 hover:text-indigo-800">Ver todos →</Link>
          </div>
          {stats?.recentPendingProviders?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentPendingProviders.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.tradeName}</p>
                    <p className="text-xs text-gray-500">{TYPE_LABELS[p.providerType] ?? p.providerType}</p>
                  </div>
                  <Link href={`/dashboard/providers/${p.id}`} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                    Revisar →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">🏢</div>
              <p className="text-sm">No hay proveedores pendientes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}