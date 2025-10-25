'use client';

/* state */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import PatientsTable from './Components/PatientsTable';
import { useDoctorStatsStore } from '@/Zustand/useDoctorStatsStore';

/* container */
export default function DoctorPatients() {
  // Zustand
  const setVisiblePatientsCount = useDoctorStatsStore((state) => state.setVisiblePatientsCount);

  /* data */
  const router = useRouter();
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  /* fetch */
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch('/api/users', { method: 'GET' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al obtener pacientes');
        const onlyPatients = (data.users || []).filter((u) => u.role === 'patient');
        setPatients(onlyPatients);
        setFiltered(onlyPatients);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPatients();
  }, []);

  /* filter */
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFiltered(
      patients.filter(
        (p) => p.fullName?.toLowerCase().includes(term) || p.email?.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, patients]);

  /* actions */
  const handleView = (id) => router.push(`/doctor/patients/${id}`);

  useEffect(() => {
    setVisiblePatientsCount(filtered.length);
  }, [filtered.length, setVisiblePatientsCount]);
  
  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <Header />
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      <PatientsTable items={filtered} onView={handleView} />
    </div>
  );
}
