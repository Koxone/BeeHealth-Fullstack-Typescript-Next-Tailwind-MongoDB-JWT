'use client';

/* state */
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import PatientsTable from './Components/PatientsTable';
import { useDoctorStatsStore } from '@/Zustand/useDoctorStatsStore';

/* Fetcher */
async function fetchPatients() {
  const res = await fetch('/api/users');
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al obtener pacientes');
  return (data.users || []).filter((u) => u.role === 'patient');
}

export default function DoctorPatients() {
  // Zustand
  const setVisiblePatientsCount = useDoctorStatsStore((state) => state.setVisiblePatientsCount);

  // Router
  const router = useRouter();

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  // Tanstack
  const {
    data: patients = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    staleTime: 1000 * 60 * 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return patients.filter(
      (p) => p.fullName?.toLowerCase().includes(term) || p.email?.toLowerCase().includes(term)
    );
  }, [patients, searchTerm]);

  useEffect(() => {
    setVisiblePatientsCount(filtered.length);
  }, [filtered.length, setVisiblePatientsCount]);

  const handleView = (id) => router.push(`/doctor/patients/${id}`);

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <Header />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {isLoading && <p className="text-center text-gray-500">Cargando pacientes...</p>}
      {isError && (
        <p className="text-center text-red-500">Error: {error.message || 'Error desconocido'}</p>
      )}
      {!isLoading && !isError && <PatientsTable items={filtered} onView={handleView} />}
    </div>
  );
}
