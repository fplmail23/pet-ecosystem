import { auth } from "@clerk/nextjs/server";

async function getUsers(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function UsersPage() {
  const { getToken } = await auth();
  const token = await getToken();
  const users = await getUsers(token ?? "");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
        <p className="text-gray-500 mt-1">{users.length} usuario{users.length !== 1 ? "s" : ""} registrado{users.length !== 1 ? "s" : ""}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <input type="text" placeholder="Buscar usuarios..." className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        {users.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {users.map((user: any) => (
              <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-indigo-600">
                      {(user.firstName?.[0] ?? user.email?.[0] ?? "?").toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName ? `${user.firstName} ${user.lastName ?? ""}`.trim() : "Sin nombre"}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {user.isActive ? "Activo" : "Inactivo"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString("es")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <div className="text-5xl mb-3">👥</div>
            <p className="text-sm font-medium">No hay usuarios registrados aun</p>
          </div>
        )}
      </div>
    </div>
  );
}