export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactanos</h1>
          <p className="text-xl text-gray-500">Estamos aqui para ayudarte</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
              <textarea rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Como podemos ayudarte?" />
            </div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Enviar mensaje
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[{icon:"📧",label:"Email",val:"hola@petecosystem.com"},{icon:"📱",label:"WhatsApp",val:"+507 6000-0000"},{icon:"📍",label:"Ciudad",val:"Panama, Panama"}].map((c) => (
            <div key={c.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <div className="text-2xl mb-2">{c.icon}</div>
              <p className="text-xs font-medium text-gray-900">{c.label}</p>
              <p className="text-xs text-gray-500 mt-1">{c.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}