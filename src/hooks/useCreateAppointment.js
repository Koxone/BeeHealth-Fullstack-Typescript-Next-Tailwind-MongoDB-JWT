'use client';

import { useCallback, useState } from 'react';

export function useCreateAppointment() {
  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Action
  const createAppointment = useCallback(
    async ({ patientId, patientName, date, time, phone = '', email = '', reason, specialty }) => {
      // Guard
      if (!patientName || !date || !time || !reason || !specialty) {
        throw new Error('Faltan campos obligatorios');
      }

      setLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetch('/api/google/calendar/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            patientId,
            patientName,
            specialty,
            date,
            time,
            phone,
            email,
            reason,
          }),
        });

        if (!res.ok) {
          const errJson = await res.json().catch(() => null);
          const msg = errJson?.error || 'No se pudo crear la cita';
          throw new Error(msg);
        }

        const json = await res.json();
        setData(json?.data ?? json);
        return json?.data ?? json;
      } catch (e) {
        setError(e.message || 'Error desconocido');
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Reset
  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  // API
  return { createAppointment, loading, error, data, reset };
}

// // Example.jsx
// 'use client';

// import { useState } from 'react';
// import { useCreateAppointment } from '@/hooks/useCreateAppointment';

// export default function Example() {
//   // Local
//   const [form, setForm] = useState({
//     patientName: 'Laura Hernández',
//     date: '2025-11-07',
//     time: '10:30',
//     phone: '5551234567',
//     email: 'laura@example.com',
//     reason: 'Consulta inicial',
//     specialty: 'weight',
//   });

//   // Hook
//   const { createAppointment, loading, error, data } = useCreateAppointment();

//   // Submit
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     await createAppointment(form);
//   };

//   // UI
//   return (
//     <form onSubmit={onSubmit}>
//       <button type="submit" disabled={loading}>
//         {loading ? 'Creando' : 'Crear cita'}
//       </button>
//       {error && <p>Error {error}</p>}
//       {data && <p>Creada {data.id}</p>}
//     </form>
//   );
// }
