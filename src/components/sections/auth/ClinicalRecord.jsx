'use client';

import { useMemo, useState } from 'react';
import MAP from '@/data/ClinicalRecordMap.json';

/* Field renderer */
function Field({ f, value, onChange }) {
  if (f.type === 'select') {
    return (
      <div className="space-y-1">
        {/* Label */}
        <label className="text-sm font-medium">{f.label}</label>
        {/* Control */}
        <select
          className="w-full rounded border px-3 py-2"
          value={value ?? ''}
          onChange={(e) => onChange(f.id, e.target.value)}
        >
          <option value="">Seleccione</option>
          {(f.options || []).map((opt) => (
            <option key={String(opt)} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (f.type === 'radio') {
    const opts = f.options && f.options.length ? f.options : ['Sí', 'No'];
    return (
      <div className="space-y-1">
        {/* Label */}
        <span className="text-sm font-medium">{f.label}</span>
        {/* Options */}
        <div className="flex flex-wrap gap-4">
          {opts.map((opt) => (
            <label key={String(opt)} className="flex items-center gap-2">
              <input
                type="radio"
                name={`q-${f.id}`}
                checked={value === opt}
                onChange={() => onChange(f.id, opt)}
              />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (f.type === 'textarea') {
    return (
      <div className="space-y-1">
        {/* Label */}
        <label className="text-sm font-medium">{f.label}</label>
        {/* Control */}
        <textarea
          className="w-full rounded border px-3 py-2"
          value={value ?? ''}
          onChange={(e) => onChange(f.id, e.target.value)}
          rows={4}
        />
      </div>
    );
  }

  return (
    <div className="h-full space-y-1 overflow-y-auto">
      {/* Label */}
      <label className="text-sm font-medium">{f.label}</label>
      {/* Control */}
      <input
        type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
        className="w-full rounded border px-3 py-2"
        value={value ?? ''}
        onChange={(e) =>
          onChange(f.id, f.type === 'number' ? Number(e.target.value) : e.target.value)
        }
      />
    </div>
  );
}

/* Page */
export default function ClinicalRecordTestPage() {
  /* Selectors state */
  const [specialty, setSpecialty] = useState('weight');
  const [variant, setVariant] = useState('basic'); // basic | full

  /* Meta ids */
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');

  /* Resolve config from JSON */
  const datasetKey = useMemo(() => {
    if (specialty === 'weight') return variant === 'full' ? 'weightFullHistory' : 'weight';
    if (specialty === 'dental') return variant === 'full' ? 'dentalFullHistory' : 'dental';
    if (specialty === 'stetic') return variant === 'full' ? 'steticFullHistory' : 'stetic';
    return 'weight';
  }, [specialty, variant]);

  const config = MAP?.[datasetKey] ?? [];

  /* Local form state */
  const ordered = useMemo(
    () =>
      [...config]
        .sort((a, b) => a.id - b.id)
        .map((f) => ({
          id: f.id,
          key: f.key,
          label: f.label,
          type: f.type,
          options: f.options,
        })),
    [config]
  );

  const [form, setForm] = useState({});
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [createdId, setCreatedId] = useState('');

  /* Change handler */
  const handleChange = (qId, val) => {
    setForm((s) => ({ ...s, [qId]: val }));
  };

  /* Submit handler */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError('');
    setCreatedId('');

    const answers = ordered.map((f) => ({
      qId: f.id,
      key: f.key,
      label: f.label,
      type: f.type,
      value: form[f.id] ?? null,
      options: f.options,
    }));

    try {
      const res = await fetch('/api/clinical-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId,
          doctorId,
          specialty,
          answers,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Error');
      } else {
        setCreatedId(data.recordId);
        setForm({});
      }
    } catch {
      setError('Error de red');
    } finally {
      setPending(false);
    }
  };

  /* UI */
  return (
    <div className="mx-auto h-full max-w-5xl overflow-y-auto p-6">
      {/* Title */}
      <h1 className="mb-6 text-xl font-semibold">Nuevo historial clínico</h1>

      {/* Controls */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {/* Specialty */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Especialidad</label>
          <select
            className="w-full rounded border px-3 py-2"
            value={specialty}
            onChange={(e) => {
              setSpecialty(e.target.value);
              setForm({});
              setCreatedId('');
              setError('');
            }}
          >
            <option value="weight">Control de peso</option>
            <option value="dental">Dental</option>
            <option value="stetic">Estética</option>
          </select>
        </div>

        {/* Variant */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Variante</label>
          <select
            className="w-full rounded border px-3 py-2"
            value={variant}
            onChange={(e) => {
              setVariant(e.target.value);
              setForm({});
              setCreatedId('');
              setError('');
            }}
          >
            <option value="basic">Básico</option>
            <option value="full">Completo</option>
          </select>
        </div>

        {/* Patient */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Patient ID</label>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="ObjectId del paciente"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </div>

        {/* Doctor */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Doctor ID</label>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="ObjectId del médico"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border bg-white p-6">
        {/* Fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ordered.map((f) => (
            <Field key={f.id} f={f} value={form[f.id]} onChange={handleChange} />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={pending || !patientId || !doctorId}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {pending ? 'Guardando...' : 'Crear historial'}
          </button>
          {createdId && <span className="text-green-700">Creado: {createdId}</span>}
          {error && <span className="text-red-700">{error}</span>}
        </div>
      </form>
    </div>
  );
}
