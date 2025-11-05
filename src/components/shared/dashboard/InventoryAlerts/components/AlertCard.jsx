import { AlertTriangle, Pill } from 'lucide-react';

function AlertCard() {
  return (
    <div className="px-4">
      <div className="relative flex items-center justify-between rounded-xl border-2 border-rose-300 bg-linear-to-r from-rose-50 to-red-50 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <div className="relative z-10 flex min-w-0 flex-1 items-center gap-3">
          <div className="relative rounded-xl bg-rose-100 p-3">
            <Pill className="h-5 w-5 text-rose-600" />
            <div className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-rose-500" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <p className="truncate text-sm font-bold text-gray-900">Atorvastatina 20mg</p>
              <span className="animate-pulse rounded-full bg-rose-600 px-2 py-0.5 text-xs font-bold text-white">
                CRÍTICO
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-rose-600">Stock: 0 unidades</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">Mínimo: 15</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-[20%] rounded-full bg-linear-to-r from-rose-500 to-red-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="mb-1 text-xs font-medium text-rose-600">Faltan 15 unid.</p>
            <p className="text-xs text-gray-500">0% del mínimo</p>
          </div>
          <AlertTriangle className="h-6 w-6 shrink-0 animate-bounce text-rose-600" />
        </div>
      </div>
    </div>
  );
}

export default AlertCard;
