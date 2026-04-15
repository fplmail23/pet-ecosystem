import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

async function getProviderStats(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch { return null; }
}

async function getProviders(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/providers`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch { return []; }
}

const TYPE_LABELS: Record<string, string> = {
  CLINIC: "Clinica", STORE: "Tienda", WALKER: "Paseador",
  GROOMING: "Grooming", DAYCARE: "Daycare", BOARDING: "Boarding", OTHER: "Otro"
};

const STATUS_STYLES: Record<string, string> = {
  PENDING_REVIEW: "bg-amber-100 text-amber-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  SUSPENDED: "bg-orange-100 text-orange-800",
  INACTIVE: "bg-gray-100 text-gray-800",
};

const STATUS_LABELS: Record<string, string> = {
  PENDING_REVIEW: "Pendiente", APPROVED: "Aprobado",
  REJECTED: "Rechazado", SUSPENDED: "Suspendido", INACTIVE: "Inactivo"
};

export default async function ProvidersPage() {
  const { getToken } = await auth();
  const token = await getToken();
  const [stats, allProviders] = await Promise.all([
    getProviderStats(token ?? ""),
    getProviders(token ?? ""),
  ]);

  const statCards = [
    { label: "Pendientes", count: stats?.pending ?? 0, color: "bg-amber-100 text-amber-800" },
    { label: "Aprobados", count: stats?.approved ?? 0, color: "bg-green-100 text-green-800" },
    { label: "Suspendidos", count: stats?.suspended ?? 0, color: "bg-red-100 text-red-800" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proveedores</h1>
          <p className="text-gray-500 mt-1">Gestiona clinicas, tiendas, paseadores y mas</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-gray-900">{s.count}</div>
            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${s.color}`}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Buscar proveedores..." className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none">
              <option value="">Todos los tipos</option>
              {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none">
              <option value="">Todos los estados</option>
              {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>

        {allProviders.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {allProviders.map((p: any) => (
              <div key={p.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-indigo-600">
                      {p.tradeName?.[0]?.toUpperCase() ?? "P"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.tradeName}</p>
                    <p className="text-xs text-gray-500">
                      {TYPE_LABELS[p.providerType] ?? p.providerType} · {p.ownerEmail ?? "Sin email"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[p.status] ?? "bg-gray-100 text-gray-800"}`}>
                    {STATUS_LABELS[p.status] ?? p.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(p.createdAt).toLocaleDateString("es")}
                  </span>
                  <Link href={`/dashboard/providers/${p.id}`} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                    Ver detalle →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <div className="text-5xl mb-3">🏢</div>
            <p className="text-sm font-medium">No hay proveedores registrados aun</p>
            <p className="text-xs mt-1">Los proveedores apareceran aqui cuando se registren</p>
          </div>
        )}
      </div>
    </div>
  );
}