import { IClinicalRecord, IClinicalRecordResponse } from '@/types';
import { useState, useEffect } from 'react';

export function useGetPatientClinicalRecords(id: string): {
  data: IClinicalRecord[] | null;
  isLoading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<IClinicalRecord[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    async function fetchRecord() {
      try {
        const res = await fetch(`/api/clinicalRecords/${id}`);
        if (!res.ok) throw new Error('Error fetching clinical record');
        const json: IClinicalRecordResponse = await res.json();
        setData(json.data);
      } catch (err: unknown) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecord();
  }, [id]);

  return { data, isLoading, error };
}
