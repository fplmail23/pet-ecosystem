import Link from "next/link";

const features = [
  { icon: "🏥", title: "Clinicas veterinarias", desc: "Agenda citas con las mejores clinicas. Historial medico digital para tu mascota.", color: "bg-blue-50 border-blue-100" },
  { icon: "🚶", title: "Paseadores profesionales", desc: "Paseadores verificados con seguimiento GPS en tiempo real y reporte al finalizar.", color: "bg-green-50 border-green-100" },
  { icon: "🛍️", title: "Tiendas especializadas", desc: "Productos premium para tu mascota. Entrega a domicilio y suscripciones.", color: "bg-purple-50 border-purple-100" },
  { icon: "✂️", title: "Grooming y cuidado", desc: "Servicios de estetica y cuidado profesional. Agenda y paga en un solo lugar.", color: "bg-amber-50 border-amber-100" },
  { icon: "📊", title: "Control de gastos", desc: "Lleva el registro de todos los gastos de tu mascota. Presupuestos y reportes.", color: "bg-red-50 border-red-100" },
  { icon: "📅", title: "Agenda inteligente", desc: "Recordatorios de vacunas, medicacion, citas y mas. Nunca olvides nada.", color: "bg-indigo-50 border-indigo-100" },
];

const stats = [
  { value: "500+", label: "Proveedores activos" },
  { value: "10k+", label: "Mascotas registradas" },
  { value: "50k+", label: "Servicios completados" },
  { value: "4.9★", label: "Calificacion promedio" },
];

const steps = [
  { num: "01", title: "Crea tu cuenta gratis", desc: "Registrate y agrega el perfil de tu mascota en menos de 2 minutos." },
  { num: "02", title: "Encuentra servicios cerca", desc: "Busca clinicas, paseadores y tiendas verificadas en tu ciudad." },
  { num: "03", title: "Reserva y paga seguro", desc: "Agenda, paga y recibe confirmacion instantanea. Todo en un solo lugar." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-24 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🐾</span>
              <span>La plataforma #1 para mascotas en Panama</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Todo lo que tu
              <span className="text-indigo-600"> mascota </span>
              necesita
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Clinicas, paseadores, tiendas y grooming en un solo lugar. Gestiona la salud, el cuidado y los gastos de tu mascota desde cualquier dispositivo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sign-up" className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all hover:shadow-lg hover:-translate-y-0.5">
                Empieza gratis →
              </Link>
              <Link href="/servicios" className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border border-gray-200 hover:border-indigo-200 hover:text-indigo-600 transition-all">
                Ver servicios
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 mt-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-indigo-600">{s.value}</div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Todo el ecosistema pet en un solo lugar</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Conectamos duenos de mascotas con los mejores proveedores de servicios verificados</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className={`rounded-2xl border p-8 hover:shadow-md transition-all hover:-translate-y-1 ${f.color}`}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tan facil como 1, 2, 3</h2>
            <p className="text-xl text-gray-500">Empieza en menos de 5 minutos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="text-6xl font-bold text-indigo-100 mb-4">{s.num}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Empieza hoy, es gratis</h2>
          <p className="text-xl text-indigo-100 mb-8">Unete a miles de duenos que ya confian en Pet Ecosystem para cuidar a sus mascotas</p>
          <Link href="/sign-up" className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all inline-block">
            Crear cuenta gratis →
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="text-white font-bold">Pet Ecosystem</span>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/servicios" className="hover:text-white transition-colors">Servicios</Link>
              <Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link>
              <Link href="/sign-in" className="hover:text-white transition-colors">Iniciar sesion</Link>
            </div>
            <p className="text-sm">© 2026 Pet Ecosystem. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}