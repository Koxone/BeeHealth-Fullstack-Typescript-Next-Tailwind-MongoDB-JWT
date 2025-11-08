import {
  Pill,
  FileText,
  Syringe,
  Package,
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  TrendingDown,
} from 'lucide-react';
import AlertCard from './components/AlertCard';
import ViewMoreButton from '@/components/shared/dashboard/accountingSummary/components/ViewMoreButton';

export default function GeneralInventoryAlerts({ role }) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="from-medtrack-green-dark to-medtrack-green-solid relative overflow-hidden bg-linear-to-r px-6 py-5">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 animate-pulse rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
              <AlertTriangle className="h-6 w-6 text-white" />
              <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white">
                <span className="text-xs font-bold text-rose-600">0</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl">Alertas de Inventario</h2>
              <p className="text-sm text-rose-100">Sin alertas activas</p>
            </div>
          </div>

          {/* View More Button */}
          <ViewMoreButton role={role} route="inventory" />
        </div>
      </div>

      {/* Stats */}
      <div className="bg-medtrack-green-light grid grid-cols-3 gap-4 border-b-2 border-gray-200 px-6 py-4">
        <div className="text-center">
          <div className="mb-1 flex items-center justify-center gap-1">
            <AlertCircle className="h-4 w-4 text-rose-600" />
            <p className="text-xs font-semibold text-gray-600">Críticos</p>
          </div>
          <p className="text-2xl font-bold text-rose-600">0</p>
        </div>
        <div className="text-center">
          <div className="mb-1 flex items-center justify-center gap-1">
            <TrendingDown className="h-4 w-4 text-amber-600" />
            <p className="text-xs font-semibold text-gray-600">Bajos</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">0</p>
        </div>
        <div className="text-center">
          <div className="mb-1 flex items-center justify-center gap-1">
            <Package className="h-4 w-4 text-gray-600" />
            <p className="text-xs font-semibold text-gray-600">Total</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* Alert Items */}
      <div className="h-full max-h-[300px] space-y-2 overflow-y-auto pt-6">
        <AlertCard />
        <AlertCard />
        <AlertCard />
        <AlertCard />
        <AlertCard />
        <AlertCard />
      </div>

      {/* Empty state */}
      {/* <div className="py-12 text-center">
        <div className="relative mb-4 inline-block">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-green-100 to-emerald-100">
            <Package className="h-10 w-10 text-green-600" />
          </div>
          <div className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 shadow-lg">
            <span className="text-xl text-white">✓</span>
          </div>
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">¡Todo está bajo control!</h3>
        <p className="mb-1 text-gray-600">No hay alertas de inventario</p>
        <p className="text-sm text-gray-500">Todo el stock está en niveles óptimos</p>
      </div> */}
    </div>
  );
}
