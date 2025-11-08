import ViewMoreButton from '@/components/shared/dashboard/accountingSummary/components/ViewMoreButton';
import { Users, Pill, AlertCircle, ChevronRight, TrendingUp, DollarSign } from 'lucide-react';

export default function DoctorAccountingSummary({ role }) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="from-medtrack-green-dark to-medtrack-green-solid relative overflow-hidden bg-linear-to-r px-6 py-5">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-white/10" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-24 w-24 rounded-full bg-white/10" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white md:text-2xl">Resumen Contable</h2>
              <p className="text-sm text-blue-100">Estado financiero actual</p>
            </div>
          </div>

          {/* View More Button */}
          <ViewMoreButton role={role} route="accounting" />
        </div>
      </div>

      {/* Total */}
      <div className="border-b-2 border-gray-200 bg-medtrack-green-light px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="from-medtrack-green-dark to-medtrack-green-solid rounded-lg bg-linear-to-r p-2 shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-xs text-gray-500">Consultas + Medicamentos</p>
            </div>
          </div>
          <div className="text-right">
            <p className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
              $0
            </p>
            <p className="flex items-center justify-end gap-1 text-xs font-semibold text-green-600">
              <TrendingUp className="h-3 w-3" />
              +0% vs mes anterior
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="space-y-3 p-6">
        {[
          {
            icon: Users,
            label: 'Consultas',
            value: '0 pacientes',
            amount: 0,
            gradient: 'from-blue-500 to-indigo-600',
            bgGradient: 'from-blue-50 to-indigo-50',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            textColor: 'text-blue-600',
            borderColor: 'border-blue-200',
          },
          {
            icon: Pill,
            label: 'Medicamentos',
            value: '0 vendidos',
            amount: 0,
            gradient: 'from-emerald-500 to-green-600',
            bgGradient: 'from-emerald-50 to-green-50',
            iconBg: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
            textColor: 'text-emerald-600',
            borderColor: 'border-emerald-200',
          },
          {
            icon: AlertCircle,
            label: 'Pendiente de cobro',
            value: '0 consultas',
            amount: 0,
            gradient: 'from-amber-500 to-orange-600',
            bgGradient: 'from-amber-50 to-orange-50',
            iconBg: 'bg-amber-100',
            iconColor: 'text-amber-600',
            textColor: 'text-amber-600',
            borderColor: 'border-amber-200',
          },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className={`relative flex items-center justify-between rounded-xl border-2 ${item.borderColor} bg-linear-to-r ${item.bgGradient} p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            >
              <div className="flex items-center gap-3">
                <div className={`${item.iconBg} rounded-xl p-3`}>
                  <Icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{item.label}</p>
                  <p className="font-bold text-gray-900">{item.value}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${item.textColor}`}>${item.amount}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
