"use client";
import { useState, useMemo } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CATEGORY_LABELS: Record<string, string> = {
  service_issue: "Problema de servicio",
  payment_issue: "Problema de pago",
  provider_issue: "Problema con proveedor",
  account_issue: "Problema de cuenta",
  other: "Otro",
};

const SEVERITY_STYLES: Record<string, string> = {
  high: "bg-red-100 text-red-800",
  normal: "bg-amber-100 text-amber-800",
  low: "bg-gray-100 text-gray-800",
};

const STATUS_STYLES: Record<string, string> = {
  OPEN: "bg-red-100 text-red-800",
  IN_REVIEW: "bg-amber-100 text-amber-800",
  WAITING_USER: "bg-blue-100 text-blue-800",
  RESOLVED: "bg-green-100 text-green-800",
  CLOSED: "bg-gray-100 text-gray-800",
};

const STATUS_LABELS: Record<string, string> = {
  OPEN: "Abierto",
  IN_REVIEW: "En revision",
  WAITING_USER: "Esperando usuario",
  RESOLVED: "Resuelto",
  CLOSED: "Cerrado",
};

interface Case {
  id: string;
  category: string;
  severity: string;
  status: string;
  contextType?: string;
  contextId?: string;
  createdAt: string;
  updatedAt: string;
  createdByEmail?: string;
  createdByFirstName?: string;
  createdByLastName?: string;
}

export function SupportClient({ cases, stats }: { cases: Case[]; stats: any }) {
  const { getToken } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      const matchSearch =
        !search ||
        c.category.toLowerCase().includes(search.toLowerCase()) ||
        c.createdByEmail?.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = !statusFilter || c.status === statusFilter;
      const matchSeverity = !severityFilter || c.severity === severityFilter;
      return matchSearch && matchStatus && matchSeverity;
    });
  }, [cases, search, statusFilter, severityFilter]);

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const token = await getToken();
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/support/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setUpdatingId(null);
    }
  };

  const statCards = [
    { label: "Abiertos", count: stats?.open ?? 0, color: "bg-red-100 text-red-800", filter: "OPEN" },
    { label: "En revision", count: stats?.inReview ?? 0, color: "bg-amber-100 text-amber-800", filter: "IN_REVIEW" },
    { label: "Resueltos", count: stats?.resolved ?? 0, color: "bg-green-100 text-green-800", filter: "RESOLVED" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Soporte y disputas</h1>
          <p className="text-gray-500 mt-1">{filtered.length} de {cases.length} caso{cases.length !== 1 ? "s" : ""}</p>
        </div>
        {(search || statusFilter || severityFilter) && (
          <button onClick={() => { setSearch(""); setStatusFilter(""); setSeverityFilter(""); }} className="text-sm text-indigo-600 hover:text-indigo-800">
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {statCards.map((s) => (
          <button
            key={s.label}
            onClick={() => setStatusFilter(statusFilter === s.filter ? "" : s.filter)}
            className={`bg-white rounded-xl border p-6 text-center transition-all hover:shadow-md ${statusFilter === s.filter ? "ring-2 ring-indigo-500 border-indigo-200" : "border-gray-200"}`}
          >
            <div className="text-3xl font-bold text-gray-900">{s.count}</div>
            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${s.color}`}>{s.label}</div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar por categoria, email o ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
              {search && <button onClick={() => setSearch("")} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs">✕</button>}
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Todos los estados</option>
              {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Todas las prioridades</option>
              <option value="high">Alta</option>
              <option value="normal">Normal</option>
              <option value="low">Baja</option>
            </select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filtered.map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🎫</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-gray-900">
                        {CATEGORY_LABELS[c.category] ?? c.category}
                      </p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${SEVERITY_STYLES[c.severity] ?? "bg-gray-100 text-gray-800"}`}>
                        {c.severity === "high" ? "Alta" : c.severity === "normal" ? "Normal" : "Baja"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {c.createdByEmail ?? "Sin email"}
                      {c.contextType ? ` · ${c.contextType}` : ""}
                      {" · "}{new Date(c.createdAt).toLocaleDateString("es")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[c.status] ?? "bg-gray-100 text-gray-800"}`}>
                    {STATUS_LABELS[c.status] ?? c.status}
                  </span>
                  <select
                    value={c.status}
                    disabled={updatingId === c.id}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <div className="text-5xl mb-3">🎫</div>
            <p className="text-sm font-medium">{cases.length === 0 ? "No hay casos de soporte aun" : "No hay resultados"}</p>
            {(search || statusFilter || severityFilter) && (
              <button onClick={() => { setSearch(""); setStatusFilter(""); setSeverityFilter(""); }} className="text-xs text-indigo-600 mt-2 hover:underline">Limpiar filtros</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}