export default function SupportPage() {
  const stats = [
    { label: "Abiertos", count: 0, color: "bg-red-100 text-red-800" },
    { label: "En revision", count: 0, color: "bg-amber-100 text-amber-800" },
    { label: "Resueltos", count: 0, color: "bg-green-100 text-green-800" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Soporte y disputas</h1>
        <p className="text-gray-500 mt-1">Gestiona casos de soporte y disputas entre usuarios y proveedores</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-gray-900">{s.count}</div>
            <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${s.color}`}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Buscar casos..." className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none">
              <option value="">Todos los estados</option>
              <option value="OPEN">Abierto</option>
              <option value="IN_REVIEW">En revision</option>
              <option value="RESOLVED">Resuelto</option>
            </select>
          </div>
        </div>
        <div className="p-12 text-center text-gray-400">
          <div className="text-5xl mb-3">🎫</div>
          <p className="text-sm font-medium">No hay casos de soporte aun</p>
        </div>
      </div>
    </div>
  );
}