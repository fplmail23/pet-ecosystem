import Link from "next/link";
export default function MascotasPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Mis mascotas</h1><p className="text-gray-500 mt-1">Gestiona el perfil de tus mascotas</p></div>
        <Link href="/portal/mascotas/nueva" className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">+ Agregar mascota</Link>
      </div>
      <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
        <div className="text-6xl mb-4">🐾</div>
        <p className="text-lg font-medium text-gray-900">No tienes mascotas registradas</p>
        <p className="text-sm mt-2">Agrega el perfil de tu mascota para empezar</p>
        <Link href="/portal/mascotas/nueva" className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors inline-block">Agregar mi primera mascota</Link>
      </div>
    </div>
  );
}