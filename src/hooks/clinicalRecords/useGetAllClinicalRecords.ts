// Clinical records hook
import { useEffect, useState } from 'react';

type Filters = {
  patient?: string;
  doctor?: string;
  specialty?: string;
  version?: string | number;
  page?: string | number;
  limit?: string | number;
  sort?: string;
};

type ClinicalRecord = any; // Puedes tiparlo si quieres

export function useGetAllClinicalRecords(filters: Filters = {}) {
  // State
  const [data, setData] = useState<ClinicalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Build query
  const buildQuery = () => {
    const params = new URLSearchParams();

    // Loop filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });

    return params.toString();
  };

  // Fetch function
  const fetchRecords = async () => {
    setLoading(true);
    setError(null);

    try {
      const query = buildQuery();
      const url = query ? `/api/clinical-records?${query}` : `/api/clinical-records`;

      const res = await fetch(url);
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || 'Error fetching records');

      setData(json.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto fetch
  useEffect(() => {
    fetchRecords();
  }, [JSON.stringify(filters)]);

  return {
    data,
    loading,
    error,
    refetch: fetchRecords,
  };
}

// Patient
// const { data } = useClinicalRecords({ patient: patientId });

// Doctor
// const { data } = useClinicalRecords({ doctor: doctorId });
