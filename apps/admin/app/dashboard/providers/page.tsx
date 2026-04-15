export default function ProvidersPage() {
  const statuses = [
    { label: "Pendientes", count: 0, color: "bg-amber-100 text-amber-800" },
    { label: "Aprobados", count: 0, color: "bg-green-100 text-green-800" },
    { label: "Suspendidos", count: 0, color: "bg-red-100 text-red-800" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Proveedores</h1>
        <p className="text-gray-500 mt-1">Gestiona clinicas, tiendas, paseadores y mas</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statuses.map((s) => (
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
              <option value="CLINIC">Clinica</option>
              <option value="STORE">Tienda</option>
              <option value="WALKER">Paseador</option>
            </select>
            <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none">
              <option value="">Todos los estados</option>
              <option value="PENDING_REVIEW">Pendiente</option>
              <option value="APPROVED">Aprobado</option>
              <option value="SUSPENDED">Suspendido</option>
            </select>
          </div>
        </div>
        <div className="p-12 text-center text-gray-400">
          <div className="text-5xl mb-3">🏢</div>
          <p className="text-sm font-medium">No hay proveedores registrados aun</p>
        </div>
      </div>
    </div>
  );
}