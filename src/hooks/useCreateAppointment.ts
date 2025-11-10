'use client';

import { useCallback, useState } from 'react';

// Params
interface CreateAppointmentParams {
  patientId?: string;
  patientName: string;
  date: string;
  time: string;
  phone?: string;
  email?: string;
  reason: string;
  specialty: string;
}

// Response
interface AppointmentResponse {
  success: boolean;
  data?: any;
  message?: string;
}

// Hook return
interface UseCreateAppointmentResult {
  createAppointment: (params: CreateAppointmentParams) => Promise<AppointmentResponse>;
  loading: boolean;
  error: string | null;
  data: any | null;
  reset: () => void;
}

export function useCreateAppointment(): UseCreateAppointmentResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const createAppointment = useCallback(
    async ({
      patientId,
      patientName,
      date,
      time,
      phone = '',
      email = '',
      reason,
      specialty,
    }: CreateAppointmentParams): Promise<AppointmentResponse> => {
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
        const response: AppointmentResponse = {
          success: true,
          data: json?.data ?? json,
          message: 'Cita creada correctamente',
        };

        setData(response.data);
        return response;
      } catch (e: any) {
        setError(e.message || 'Error desconocido');
        throw e;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

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
