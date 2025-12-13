import { Calendar, Clock, Power } from 'lucide-react';

export default function ToggleDietCard({ diet, handleDietClick, patientId }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300 ${
        diet?.isActive
          ? 'bg-beehealth-green-secondary-light border-beehealth-green-secondary-dark'
          : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Diet info */}
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-700">{diet?.diet?.name}</h4>
          <span className="bg-beehealth-blue-primary-light text-beehealth-blue-primary-dark mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold">
            {diet?.diet?.category}
          </span>

          {/* Meta info */}
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>Asignada: {formatDate(diet?.assignedAt as unknown as string)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>
                Tiempo activa:{' '}
                {Math.floor(
                  (Date.now() - new Date(diet?.assignedAt as unknown as string).getTime()) /
                    86400000
                )}{' '}
                Días
              </span>
            </div>
          </div>
        </div>

        {/* Power button */}
        <button
          onClick={() => handleDietClick(diet)}
          className={`relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
            diet?.isActive
              ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.7)]'
              : 'bg-gray-300 shadow-md hover:bg-gray-400'
          }`}
        >
          <Power
            className={`h-10 w-10 ${diet?.isActive ? 'text-white' : 'text-gray-500'}`}
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
}
