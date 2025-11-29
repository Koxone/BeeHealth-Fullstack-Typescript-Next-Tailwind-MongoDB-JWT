import LoadingState from '@/components/shared/feedback/LoadingState';
import { useGetAllQuestions } from '@/hooks/clinicalRecords/useGetAllQuestions';
import { CalendarIcon } from 'lucide-react';

export default function FullVersion({ specialty, isReadOnly = true, formData, setFormData }) {
  // Fetch Questions to render UI
  const { questions, loading } = useGetAllQuestions();
  const filtered = questions?.filter((q) => q.version === 'full' && q.specialty === specialty);

  // Loading State
  if (loading) {
    return <LoadingState />;
  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <CalendarIcon className="h-5 w-5 text-blue-600" />
          Información Básica
        </h3>

        <span
          className={`mb-4 w-fit rounded-lg ${isReadOnly ? 'bg-beehealth-green-secondary-light text-beehealth-green-secondary-dark' : 'bg-beehealth-red-primary-light text-beehealth-red-primary-dark'} p-1 text-xs`}
        >
          {isReadOnly ? 'Solo Lectura' : 'Modo Edicion'}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered?.map((q) => (
          <div key={q?._id}>
            {/* Label */}
            <label className="mb-2 block text-sm font-semibold text-gray-700">{q?.text}</label>

            {/* Input or Textarea */}
            {q?.type === 'textarea' ? (
              <textarea
                rows={3}
                value={formData[q.questionId] || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [q.questionId]: e.target.value }))
                }
                readOnly={isReadOnly}
                disabled={isReadOnly}
                placeholder=""
                className={`focus:bg-beehealth-body-main bg-beehealth-body-main w-full resize-none rounded-xl border-2 px-4 py-3 transition outline-none ${
                  isReadOnly ? 'border-gray-300 bg-gray-100 text-gray-500' : 'border-gray-200'
                }`}
              />
            ) : q?.type === 'select' ? (
              <select
                value={formData[q.questionId] || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [q.questionId]: e.target.value }))
                }
                disabled={isReadOnly}
                className={`focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 px-4 py-3 transition outline-none ${
                  isReadOnly ? 'border-gray-300 bg-gray-100 text-gray-500' : 'border-gray-200'
                }`}
              >
                <option value="">Seleccionar</option>
                {q?.options?.map((opt) => (
                  <option key={opt._id} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : q?.type === 'radio' ? (
              <div className="flex gap-4">
                {q?.options?.map((opt) => (
                  <label key={opt._id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={q.questionId}
                      value={opt.value}
                      checked={formData[q.questionId] === opt.value}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, [q.questionId]: e.target.value }))
                      }
                      disabled={isReadOnly}
                      className="h-4 w-4"
                    />
                    <span className="text-sm text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>
            ) : q?.type === 'checkbox' ? (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData[q.questionId] === 'true' || formData[q.questionId] === true}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [q.questionId]: e.target.checked ? 'true' : 'false',
                    }))
                  }
                  disabled={isReadOnly}
                  className="h-4 w-4"
                />
                <span className="text-sm text-gray-700">{q?.text}</span>
              </div>
            ) : (
              <input
                type={q?.type}
                value={formData[q.questionId] || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, [q.questionId]: e.target.value }))
                }
                readOnly={isReadOnly}
                disabled={isReadOnly}
                placeholder=""
                className={`focus:bg-beehealth-body-main bg-beehealth-body-main w-full rounded-xl border-2 px-4 py-3 transition outline-none ${
                  isReadOnly ? 'border-gray-300 bg-gray-100 text-gray-500' : 'border-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
