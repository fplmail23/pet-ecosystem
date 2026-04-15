import Link from "next/link";

const services = [
  { icon: "🏥", title: "Clinicas veterinarias", desc: "Agenda citas con veterinarios verificados", href: "/sign-up", color: "bg-blue-50 border-blue-100" },
  { icon: "🚶", title: "Paseadores profesionales", desc: "Paseos con seguimiento GPS en tiempo real", href: "/sign-up", color: "bg-green-50 border-green-100" },
  { icon: "✂️", title: "Grooming y estetica", desc: "Servicios de cuidado y estetica profesional", href: "/sign-up", color: "bg-purple-50 border-purple-100" },
  { icon: "🏠", title: "Boarding y cuidado", desc: "Cuidado de tu mascota en casa del cuidador", href: "/sign-up", color: "bg-amber-50 border-amber-100" },
  { icon: "🛍️", title: "Tiendas especializadas", desc: "Productos premium con entrega a domicilio", href: "/sign-up", color: "bg-red-50 border-red-100" },
  { icon: "🎓", title: "Entrenadores", desc: "Adiestramiento profesional certificado", href: "/sign-up", color: "bg-indigo-50 border-indigo-100" },
];

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Todos nuestros servicios</h1>
          <p className="text-xl text-gray-500">Encuentra el servicio perfecto para tu mascota</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link key={s.title} href={s.href} className={`rounded-2xl border p-8 hover:shadow-md transition-all hover:-translate-y-1 ${s.color}`}>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
              <p className="text-indigo-600 text-sm font-medium mt-4">Registrate para acceder →</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/sign-up" className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all">
            Empieza gratis →
          </Link>
        </div>
      </div>
    </div>
  );
}