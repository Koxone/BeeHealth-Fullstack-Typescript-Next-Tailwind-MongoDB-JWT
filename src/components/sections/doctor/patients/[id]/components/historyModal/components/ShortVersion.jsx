import LoadingState from '@/components/shared/feedback/LoadingState';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/useGetAllQuestions';
import { CalendarIcon, Ruler, Scale } from 'lucide-react';
import React from 'react';

export default function ShortVersion({ specialty }) {
  const { questions, loading } = useGetAllQuestions();

  const filtered = questions?.filter((q) => q.version === 'short' && q.specialty === specialty);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <CalendarIcon className="h-5 w-5 text-blue-600" />
        Información Básica
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered?.map((q) => (
          <div key={q?._id}>
            {/* Label */}
            <label className="mb-2 block text-sm font-semibold text-gray-700">{q?.text}</label>

            {/* Input or Textarea */}
            {q?.type === 'textarea' ? (
              /* Textarea */
              <textarea
                rows={3}
                id={q?.questionId}
                placeholder=""
                className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            ) : (
              /* Input */
              <input
                id={q?.questionId}
                type={q?.type}
                placeholder=""
                className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3 transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            )}
          </div>
        ))}

        {/* Weight */}
        {/* <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Peso (kg) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Scale className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id={ID.weight}
              type="number"
              step="0.1"
              required
              disabled={isReadOnly}
              value={getValueByQuestionId(7)}
              onChange={(e) => setAnswer(ID.weight, e.target.value)}
              className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              placeholder="75.5"
            />
          </div>
        </div> */}

        {/* Height or Size */}
        {/* <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Talla (cm) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Ruler className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              id={ID.size}
              type="number"
              step="0.1"
              disabled={isReadOnly}
              value={getValueByQuestionId(8)}
              onChange={(e) => {
                // Prefer size id if exists
                setAnswer(ID.size, e.target.value);
              }}
              className="focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 py-3 pr-4 pl-11 transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              placeholder="180"
            />
          </div>
        </div> */}

        {/* IMC (read-only view) */}
        {/* <div className="md:col-span-1">
          <label className="mb-2 block text-sm font-semibold text-gray-700">IMC</label>
          <input
            id={ID.imc}
            type="text"
            readOnly
            value={calculateBMI(record)}
            className="w-full rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-3"
            placeholder="Calculado automáticamente"
          />
        </div> */}
      </div>
    </div>
  );
}
