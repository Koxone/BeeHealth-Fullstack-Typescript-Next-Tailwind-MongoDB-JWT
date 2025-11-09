import { useState, useEffect } from 'react';

// Types
interface ClinicalRecord {
  _id: string;
  patient: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
  };
  doctor: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
  };
  specialty: string;
  version: string;
  answers: { [key: string]: any };
  createdAt: string;
  updatedAt: string;
}

interface ClinicalRecordResponse {
  data: ClinicalRecord[];
}

export function useClinicalRecord(id: string): {
  data: ClinicalRecord[] | null;
  isLoading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<ClinicalRecord[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);

    async function fetchRecord() {
      try {
        const res = await fetch(`/api/clinical-records/${id}`);
        if (!res.ok) throw new Error('Error fetching clinical record');
        const json: ClinicalRecordResponse = await res.json();
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
