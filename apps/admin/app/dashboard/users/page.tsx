export default function UsersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
        <p className="text-gray-500 mt-1">Gestiona los duenos de mascotas registrados</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <input type="text" placeholder="Buscar usuarios..." className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none">
              <option value="">Todos los roles</option>
              <option value="PET_OWNER">Dueno de mascota</option>
              <option value="CLINIC_OWNER">Clinica</option>
              <option value="STORE_OWNER">Tienda</option>
              <option value="WALKER">Paseador</option>
            </select>
          </div>
        </div>
        <div className="p-12 text-center text-gray-400">
          <div className="text-5xl mb-3">👥</div>
          <p className="text-sm font-medium">No hay usuarios registrados aun</p>
          <p className="text-xs mt-1">Los usuarios apareceran aqui cuando se registren</p>
        </div>
      </div>
    </div>
  );
}