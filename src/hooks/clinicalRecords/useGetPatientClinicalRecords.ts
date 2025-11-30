import { IClinicalRecord, IClinicalRecordResponse } from '@/types';
import { useState, useEffect, useCallback } from 'react';

export function useGetPatientClinicalRecords(id: string): {
  data: IClinicalRecord[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
} {
  /* State */
  const [data, setData] = useState<IClinicalRecord[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  /* Fetch function */
  const fetchRecord = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);

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
  }, [id]);

  /* Auto load */
  useEffect(() => {
    fetchRecord();
  }, [fetchRecord]);

  return { data, isLoading, error, refetch: fetchRecord };
}
