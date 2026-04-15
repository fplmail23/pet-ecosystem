import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { UserActions } from "./actions";

async function getUser(id: string, token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()).data;
  } catch { return null; }
}

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { getToken } = await auth();
  const token = await getToken();
  const user = await getUser(id, token ?? "");

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Usuario no encontrado</p>
        <Link href="/dashboard/users" className="text-indigo-600 text-sm mt-2 inline-block">Volver</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/dashboard/users" className="text-gray-400 hover:text-gray-600 text-sm">← Usuarios</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-600">{user.firstName ?? user.email}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    {(user.firstName?.[0] ?? user.email?.[0] ?? "?").toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {user.firstName ? `${user.firstName} ${user.lastName ?? ""}`.trim() : "Sin nombre"}
                  </h1>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {user.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-gray-100">
              <div><span className="text-gray-500">Email:</span><span className="font-medium ml-1">{user.email}</span></div>
              <div><span className="text-gray-500">Telefono:</span><span className="font-medium ml-1">{user.phone ?? "—"}</span></div>
              <div><span className="text-gray-500">Idioma:</span><span className="font-medium ml-1">{user.preferredLanguage ?? "es"}</span></div>
              <div><span className="text-gray-500">Moneda:</span><span className="font-medium ml-1">{user.preferredCurrency ?? "USD"}</span></div>
              <div><span className="text-gray-500">Zona horaria:</span><span className="font-medium ml-1">{user.timezone ?? "—"}</span></div>
              <div><span className="text-gray-500">Registrado:</span><span className="font-medium ml-1">{new Date(user.createdAt).toLocaleDateString("es")}</span></div>
            </div>
          </div>

          {user.pets?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Mascotas ({user.pets.length})</h2>
              <div className="space-y-2">
                {user.pets.map((pet: any) => (
                  <div key={pet.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🐾</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{pet.name}</p>
                        <p className="text-xs text-gray-500">{pet.vitalStatus}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(pet.createdAt).toLocaleDateString("es")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {user.providers?.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Negocios registrados ({user.providers.length})</h2>
              <div className="space-y-2">
                {user.providers.map((p: any) => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{p.tradeName}</p>
                      <p className="text-xs text-gray-500">{p.providerType}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === "APPROVED" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                      {p.status === "APPROVED" ? "Aprobado" : "Pendiente"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <UserActions userId={user.id} isActive={user.isActive} />
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Resumen</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Mascotas</span>
                <span className="text-gray-900">{user.pets?.length ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Negocios</span>
                <span className="text-gray-900">{user.providers?.length ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ultima actualizacion</span>
                <span className="text-gray-900">{new Date(user.updatedAt).toLocaleDateString("es")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}