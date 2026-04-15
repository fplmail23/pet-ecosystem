export default function GastosPage() {
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-900">Control de gastos</h1><p className="text-gray-500 mt-1">Registra y analiza los gastos de tus mascotas</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {["Este mes","Ultimo mes","Total"].map((l) => (
          <div key={l} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="text-2xl font-bold text-gray-900">$0</div>
            <div className="text-sm text-gray-500 mt-1">{l}</div>
          </div>
        ))}
      </div>
      <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
        <div className="text-6xl mb-4">💰</div>
        <p className="text-lg font-medium text-gray-900">Sin gastos registrados</p>
        <p className="text-sm mt-2">Los gastos de citas, compras y servicios apareceran aqui</p>
      </div>
    </div>
  );
}