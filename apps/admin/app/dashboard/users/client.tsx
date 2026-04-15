"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
}

export function UsersClient({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const name = `${u.firstName ?? ""} ${u.lastName ?? ""}`.toLowerCase();
      const matchSearch =
        !search ||
        name.includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone?.includes(search);
      const matchStatus =
        !statusFilter ||
        (statusFilter === "active" && u.isActive) ||
        (statusFilter === "inactive" && !u.isActive);
      return matchSearch && matchStatus;
    });
  }, [users, search, statusFilter]);

  const activeCount = users.filter((u) => u.isActive).length;
  const inactiveCount = users.filter((u) => !u.isActive).length;

  const statCards = [
    { label: "Activos", count: activeCount, color: "bg-green-100 text-green-800", filter: "active" },
    { label: "Inactivos", count: inactiveCount, color: "bg-red-100 text-red-800", filter: "inactive" },
    { label: "Total", count: users.length, color: "bg-blue-100 text-blue-800", filter: "" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-500 mt-1">{filtered.length} de {users.length} usuario{users.length !== 1 ? "s" : ""}</p>
        </div>
        {(search || statusFilter) && (
          <button onClick={() => { setSearch(""); setStatusFilter(""); }} className="text-sm text-indigo-600 hover:text-indigo-800">
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {statCards.map((s) => (
          <button
            key={s.label}
            onClick={() => setStatusFilter(statusFilter === s.filter ? "" : s.filter)}
            className={`bg-white rounded-xl border p-6 text-center transition-all hover:shadow-md ${statusFilter === s.filter && s.filter !== "" ? "ring-2 ring-indigo-500 border-indigo-200" : "border-gray-200"}`}
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
                placeholder="Buscar por nombre, email o telefono..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
              {search && <button onClick={() => setSearch("")} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs">✕</button>}
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {filtered.map((user) => (
              <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-indigo-600">
                      {(user.firstName?.[0] ?? user.email?.[0] ?? "?").toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName ? `${user.firstName} ${user.lastName ?? ""}`.trim() : "Sin nombre"}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}{user.phone ? ` · ${user.phone}` : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {user.isActive ? "Activo" : "Inactivo"}
                  </span>
                  <span className="text-xs text-gray-400">{new Date(user.createdAt).toLocaleDateString("es")}</span>
                  <Link href={`/dashboard/users/${user.id}`} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap">
                    Ver detalle →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-sm font-medium">{users.length === 0 ? "No hay usuarios registrados aun" : "No hay resultados"}</p>
            {(search || statusFilter) && (
              <button onClick={() => { setSearch(""); setStatusFilter(""); }} className="text-xs text-indigo-600 mt-2 hover:underline">Limpiar filtros</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}