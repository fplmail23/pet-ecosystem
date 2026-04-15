"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

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

interface Provider {
  id: string;
  tradeName: string;
  providerType: string;
  status: string;
  city?: string;
  email?: string;
  ownerEmail?: string;
  ownerFirstName?: string;
  createdAt: string;
}

interface Stats {
  pending: number;
  approved: number;
  suspended: number;
}

export function ProvidersClient({ providers, stats }: { providers: Provider[]; stats: Stats | null }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      const matchSearch =
        !search ||
        p.tradeName.toLowerCase().includes(search.toLowerCase()) ||
        p.ownerEmail?.toLowerCase().includes(search.toLowerCase()) ||
        p.city?.toLowerCase().includes(search.toLowerCase());

      const matchType = !typeFilter || p.providerType === typeFilter;
      const matchStatus = !statusFilter || p.status === statusFilter;

      return matchSearch && matchType && matchStatus;
    });
  }, [providers, search, typeFilter, statusFilter]);

  const statCards = [
    { label: "Pendientes", count: stats?.pending ?? 0, color: "bg-amber-100 text-amber-800", filter: "PENDING_REVIEW" },
    { label: "Aprobados", count: stats?.approved ?? 0, color: "bg-green-100 text-green-800", filter: "APPROVED" },
    { label: "Suspendidos", count: stats?.suspended ?? 0, color: "bg-red-100 text-red-800", filter: "SUSPENDED" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proveedores</h1>
          <p className="text-gray-500 mt-1">
            {filtered.length} de {providers.length} proveedor{providers.length !== 1 ? "es" : ""}
          </p>
        </div>
        {(search || typeFilter || statusFilter) && (
          <button
            onClick={() => { setSearch(""); setTypeFilter(""); setStatusFilter(""); }}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {statCards.map((s) => (
          <button
            key={s.label}
            onClick={() => setStatusFilter(statusFilter === s.filter ? "" : s.filter)}
            className={`bg-white rounded-xl border p-6 text-center transition-all hover:shadow-md ${
              statusFilter === s.filter ? "ring-2 ring-indigo-500 border-indigo-200" : "border-gray-200"
            }`}
          >
            <div className="text-3xl font-bold text-gray-900">{s.count}</div>
            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${s.color}`}>
              {s.label}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar por nombre, email o ciudad..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs">✕</button>
              )}
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los tipos</option>
              {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los estados</option>
              {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filtered.map((p) => (
              <div key={p.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-indigo-600">
                      {p.tradeName?.[0]?.toUpperCase() ?? "P"}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.tradeName}</p>
                    <p className="text-xs text-gray-500">
                      {TYPE_LABELS[p.providerType] ?? p.providerType}
                      {p.city ? ` · ${p.city}` : ""}
                      {p.ownerEmail ? ` · ${p.ownerEmail}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[p.status] ?? "bg-gray-100 text-gray-800"}`}>
                    {STATUS_LABELS[p.status] ?? p.status}
                  </span>
                  <span className="text-xs text-gray-400 hidden sm:block">
                    {new Date(p.createdAt).toLocaleDateString("es")}
                  </span>
                  <Link
                    href={`/dashboard/providers/${p.id}`}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap"
                  >
                    Ver detalle →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-sm font-medium">
              {providers.length === 0 ? "No hay proveedores registrados aun" : "No hay resultados para esta busqueda"}
            </p>
            {(search || typeFilter || statusFilter) && (
              <button onClick={() => { setSearch(""); setTypeFilter(""); setStatusFilter(""); }} className="text-xs text-indigo-600 mt-2 hover:underline">
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}