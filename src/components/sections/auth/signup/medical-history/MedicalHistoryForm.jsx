'use client';

import { useMemo, useState, useCallback, memo } from 'react';
import TabsHeader from './components/TabsHeader';
import ActionButtons from './components/ActionButtons';
import questions from '@/data/questions.json';
import { useRouter } from 'next/navigation';

const FieldRenderer = memo(function FieldRenderer({ q, value, onChange }) {
  const { id, question, type, placeholder, required, options } = q;

  // Simple switch
  switch (type) {
    case 'text':
      return (
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
          <input
            type="text"
            required={required}
            value={value ?? ''} // Fallback
            onChange={(e) => onChange(id, e.target.value)}
            placeholder={placeholder || ''}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
          />
        </div>
      );

    case 'number':
      return (
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
          <input
            type="number"
            required={required}
            value={value ?? ''} // Fallback
            onChange={(e) => onChange(id, e.target.value)}
            placeholder={placeholder || ''}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
          />
        </div>
      );

    case 'date':
      return (
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
          <input
            type="date"
            required={required}
            value={value ?? ''} // Fallback
            onChange={(e) => onChange(id, e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
          />
        </div>
      );

    case 'textarea':
      return (
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
          <textarea
            required={required}
            value={value ?? ''} // Fallback
            onChange={(e) => onChange(id, e.target.value)}
            placeholder={placeholder || ''}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
            rows={3}
          />
        </div>
      );

    case 'select':
      return (
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
          <select
            required={required}
            value={value ?? ''} // Fallback
            onChange={(e) => onChange(id, e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
          >
            <option value="">Seleccione</option>
            {options?.map((opt) => (
              <option key={String(opt)} value={typeof opt === 'object' ? opt.value : opt}>
                {typeof opt === 'object' ? opt.label : opt}
              </option>
            ))}
          </select>
        </div>
      );

    case 'radio':
      return (
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
          <div className="flex flex-wrap gap-4">
            {options?.map((opt) => {
              const val = typeof opt === 'object' ? opt.value : opt;
              const lbl = typeof opt === 'object' ? opt.label : opt;
              return (
                <label key={String(val)} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`q-${id}`}
                    value={val}
                    checked={value === val}
                    onChange={() => onChange(id, val)}
                  />
                  {lbl}
                </label>
              );
            })}
          </div>
        </div>
      );

    default:
      return null;
  }
});

export default function MedicalHistoryForm() {
  // Hooks
  const router = useRouter();

  // State
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState('weight');

  // Stable list
  const activeQuestions = useMemo(() => {
    return questions.filter(
      (q) => q.specialties.includes(activeTab) && q.versions.includes('short')
    );
  }, [activeTab]);

  // Stable setter
  const handleChange = useCallback((id, val) => {
    setFormData((prev) => {
      if (prev[id] === val) return prev;
      return { ...prev, [id]: val };
    });
  }, []);

  return (
    <div className="h-full overflow-y-auto p-4 py-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header block */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Historial Clínico</h1>
          <p className="text-sm text-gray-600 md:text-base">Selecciona el tipo de consulta</p>
        </div>

        {/* Card block */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const storedUser = localStorage.getItem('signupUser');
              if (!storedUser) {
                alert('No se encontró la información del usuario');
                return;
              }
              const user = JSON.parse(storedUser);

              await fetch('/api/users/specialty', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: user.id,
                  specialty: activeTab,
                }),
              });

              const payload = {
                patient: user.id,
                doctor: null,
                specialty: activeTab,
                version: 'short',
                answers: formData,
              };

              try {
                const res = await fetch('/api/clinical-records', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                });

                const data = await res.json();

                if (!res.ok) {
                  alert(data.error || 'Error al guardar historial clínico');
                  return;
                }

                console.log('Historial clínico creado:', data);

                alert('Cuenta creada y historial clínico guardado correctamente');
                router.push('/auth/login');
              } catch (error) {
                console.error(error);
                alert('Error al guardar el historial clínico');
              }
            }}
            className="grid grid-cols-2 items-center space-x-4 p-4 md:p-8"
          >
            {/* Fields block */}
            {activeQuestions.map((q) => (
              <FieldRenderer
                key={`q-${q.id}`}
                q={q}
                value={formData[q.id]}
                onChange={handleChange}
              />
            ))}

            {/* Actions block */}
            <ActionButtons activeTab={activeTab} />
          </form>
        </div>

        {/* Progress block */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-blue-500"></div>
          <div className="h-2 w-8 rounded-full bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
}
