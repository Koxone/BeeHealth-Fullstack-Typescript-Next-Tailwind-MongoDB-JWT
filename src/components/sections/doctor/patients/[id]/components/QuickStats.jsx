import { Activity, DollarSign, FileText, Heart, Scale, TrendingUp } from 'lucide-react';

export default function QuickStats({ patientRecord, specialty }) {
  function getAnswer(id) {
    return patientRecord?.[0]?.answers?.[id] || 'Sin respuesta';
  }

  // BMI calculation
  const height = Number(patientRecord?.[0]?.answers?.['6']);
  const weight = Number(patientRecord?.[0]?.answers?.['7']);

  const imc = height && weight ? (weight / (height / 100) ** 2).toFixed(2) : null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Consultas Totales */}
      <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--med-green)/10">
              <FileText className="h-6 w-6 text-(--med-green)" />
            </div>
            <div>
              <p className="text-3xl font-bold text-(--med-text-dark)">
                {patientRecord?.length > 0 ? patientRecord.length : 'Sin historial'}
              </p>
              <p className="text-sm text-(--med-text-muted)">Consultas Totales</p>
            </div>
          </div>
          <TrendingUp className="h-5 w-5 text-(--med-green)" />
        </div>
      </div>

      {/* Current Weight */}
      {specialty === 'weight' && (
        <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--med-blue-light)">
                <Scale className="h-6 w-6 text-(--med-blue)" />
              </div>
              <div>
                <p className="text-3xl font-bold text-(--med-text-dark)">
                  {patientRecord?.length > 0 ? getAnswer(7) : 'Sin historial'}
                </p>
                <p className="text-sm text-(--med-text-muted)">Peso Actual (kg)</p>
              </div>
            </div>
            <Activity className="h-5 w-5 text-(--med-blue)" />
          </div>
        </div>
      )}

      {/* Patients Debts */}
      {specialty === 'dental' && (
        <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--med-blue-light)">
                <DollarSign className="h-6 w-6 text-(--med-blue)" />
              </div>
              <div>
                <p className="text-3xl font-bold text-(--med-text-dark)">${getAnswer(161)}</p>
                <p className="text-sm text-(--med-text-muted)">Adeudos</p>
              </div>
            </div>
            <Activity className="h-5 w-5 text-(--med-blue)" />
          </div>
        </div>
      )}

      {/* IMC Actual */}
      <div className="bg-beehealth-body-main rounded-2xl border border-(--med-gray-border) p-6 shadow-sm transition hover:shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-(--med-purple)/10">
              <Heart className="h-6 w-6 text-(--med-purple)" />
            </div>
            <div>
              <p className="text-3xl font-bold text-(--med-text-dark)">{imc || 'Sin historial'}</p>
              <p className="text-sm text-(--med-text-muted)">IMC Actual</p>
            </div>
          </div>
          <Activity className="h-5 w-5 text-(--med-purple)" />
        </div>
      </div>
    </div>
  );
}
