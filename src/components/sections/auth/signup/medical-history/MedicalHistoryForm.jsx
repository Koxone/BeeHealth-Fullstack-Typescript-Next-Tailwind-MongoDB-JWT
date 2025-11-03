'use client';

import { useMemo, useState } from 'react';

import TabsHeader from './components/TabsHeader';
import ActionButtons from './components/ActionButtons';
import InputField from './formFields/InputField';
import SelectField from './formFields/SelectField';
import SectionContainer from './components/SectionContainer';
import TextareaField from './formFields/TextareaField';
import DateField from './formFields/DateField';
import CheckboxGroupField from './formFields/CheckboxGroupField';
import RadioGroupField from './formFields/RadioGroupField';

import {
  indexByQId,
  CONTROL_PESO_IDS,
  ODONTOLOGIA_IDS,
  ESTETICO_IDS,
  YES_NO,
  normalizeField,
} from './formFields/medicalHistoryConfig';

/* Group by original section */
function groupBySection(index, ids) {
  const groups = new Map();
  for (const id of ids) {
    const f = index.get(id);
    if (!f) continue;
    const sec = f.__section || 'Sección';
    if (!groups.has(sec)) groups.set(sec, []);
    groups.get(sec).push(f);
  }
  return Array.from(groups.entries()).map(([title, fields]) => ({
    title,
    fields,
    grid: true,
  }));
}

/* Field renderer */
function FieldRenderer({ field, value, onChange }) {
  const f = normalizeField(field);
  const wrapperClass = 'col-span-1';

  /* Shared props */
  const shared = {
    label: f.label,
    placeholder: f.placeholder,
    required: !!f.required,
  };

  /* Switch minimal */
  if (f.kind === 'input') {
    const inputType = field.type === 'number' ? 'number' : 'text';
    return (
      <div className={wrapperClass}>
        <InputField
          type={inputType}
          {...shared}
          value={field.value || ''}
          onChange={(e) => onChange(f.qId, e.target.value)}
        />
      </div>
    );
  }

  if (f.kind === 'select') {
    const opts = Array.isArray(f.options) ? f.options : [];
    return (
      <div className={wrapperClass}>
        <SelectField
          options={opts}
          {...shared}
          value={value || ''}
          onChange={(e) => onChange(f.qId, e.target.value)}
        />
      </div>
    );
  }

  if (f.kind === 'textarea') {
    return (
      <div className={wrapperClass}>
        <TextareaField
          value={value || ''}
          onChange={(e) => onChange(f.qId, e.target.value)}
          rows={2}
          {...shared}
        />
      </div>
    );
  }

  if (f.kind === 'date') {
    return (
      <div className={wrapperClass}>
        <DateField
          value={value || ''}
          onChange={(e) => onChange(f.qId, e.target.value)}
          {...shared}
        />
      </div>
    );
  }

  if (f.kind === 'radio') {
    return (
      <div className={wrapperClass}>
        <RadioGroupField
          value={value || ''}
          onChange={(val) => onChange(f.qId, val)}
          name={`q_${f.qId}`}
          options={YES_NO}
          label={f.label}
        />
      </div>
    );
  }

  return null;
}

/* Main */
export default function MedicalHistoryForm() {
  // Tabs State
  const [activeTab, setActiveTab] = useState('peso');

  // Form States
  const [formData, setFormData] = useState({});

  // Fields Handler
  const handleChange = (qId, value) => {
    setFormData((prev) => ({ ...prev, [qId]: value }));
  };

  /* Index */
  const byId = useMemo(() => indexByQId(), []);

  /* IDs per tab */
  const pickedIds = useMemo(() => {
    if (activeTab === 'peso') return CONTROL_PESO_IDS;
    if (activeTab === 'odontologia') return ODONTOLOGIA_IDS;
    if (activeTab === 'estetico') return ESTETICO_IDS;
    return [];
  }, [activeTab]);

  /* Sections */
  const sections = useMemo(() => groupBySection(byId, pickedIds), [byId, pickedIds]);

  return (
    <div className="h-full overflow-y-auto p-4 py-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Historial Clínico</h1>
          <p className="text-sm text-gray-600 md:text-base">Selecciona el tipo de consulta</p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formData);
            }}
            className="p-4 md:p-8"
          >
            {sections.length === 0 ? (
              <div className="text-sm text-red-600">No hay preguntas para este formulario.</div>
            ) : (
              sections.map((section) => (
                <SectionContainer key={section.title} title={section.title}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {section.fields.map((f) => (
                      <FieldRenderer
                        key={f.qId}
                        field={f}
                        value={formData[f.qId]}
                        onChange={handleChange}
                      />
                    ))}
                  </div>
                </SectionContainer>
              ))
            )}

            {/* Actions */}
            <ActionButtons activeTab={activeTab} />
          </form>
        </div>

        {/* Progress */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-blue-500"></div>
          <div className="h-2 w-8 rounded-full bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
}
