export default function ServiciosPortalPage() {
  const categories = [
    { icon: "🏥", title: "Clinicas", desc: "Veterinarios y especialistas" },
    { icon: "🚶", title: "Paseadores", desc: "Paseos y cuidado diario" },
    { icon: "✂️", title: "Grooming", desc: "Estetica y cuidado" },
    { icon: "🏠", title: "Boarding", desc: "Cuidado en casa" },
    { icon: "🛍️", title: "Tiendas", desc: "Productos y accesorios" },
    { icon: "🎓", title: "Entrenadores", desc: "Adiestramiento" },
  ];
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-900">Servicios</h1><p className="text-gray-500 mt-1">Encuentra los mejores proveedores cerca de ti</p></div>
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
        <input type="text" placeholder="Buscar clinicas, paseadores, tiendas..." className="w-full text-sm focus:outline-none text-gray-700" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
            <div className="text-3xl mb-3">{c.icon}</div>
            <h3 className="font-semibold text-gray-900">{c.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}