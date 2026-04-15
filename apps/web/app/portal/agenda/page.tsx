export default function AgendaPage() {
  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-gray-900">Mi agenda</h1><p className="text-gray-500 mt-1">Citas, recordatorios y actividades</p></div>
      <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100">
        <div className="text-6xl mb-4">📅</div>
        <p className="text-lg font-medium text-gray-900">Tu agenda esta vacia</p>
        <p className="text-sm mt-2">Agenda una cita o crea un recordatorio</p>
      </div>
    </div>
  );
}