import { useState, useCallback } from 'react';

interface SubmitParams {
  patientId: string;
  specialty: string;
  version: string;
  answers: Array<{ questionId: string; value: any }>;
}

interface SubmitResponse {
  ok: boolean;
  clinicalRecord?: any;
  error?: any;
}

export function useCreateClinicalRecordDoctor() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [record, setRecord] = useState(null);

  const submit = useCallback(
    async ({ patientId, specialty, version, answers }: SubmitParams): Promise<SubmitResponse> => {
      setIsSubmitting(true);
      setError(null);
      setRecord(null);

      try {
        const res = await fetch('/api/clinicalRecords', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patientId, specialty, version, answers }),
        });

        if (!res.ok) {
          const fail = await res.json();
          setError(fail?.error || 'Error');
          setIsSubmitting(false);
          return { ok: false, error: fail?.error || 'Error' };
        }

        const data = await res.json();
        setRecord(data?.clinicalRecord || null);
        setIsSubmitting(false);

        return { ok: true, clinicalRecord: data?.clinicalRecord || null };
      } catch (err) {
        setError('Error');
        setIsSubmitting(false);
        return { ok: false, error: 'Error' };
      }
    },
    []
  );

  return { submit, isSubmitting, error, record };
}

// const { submit, isSubmitting, error, record } = useCreateClinicalRecordDoctor()
// submit({ patientId, specialty, version, answers })
