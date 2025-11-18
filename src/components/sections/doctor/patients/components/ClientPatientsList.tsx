'use client';

import { useState, useMemo } from 'react';
import DoctorPatientCard from './DoctorPatientCard';
import PatientsSearchBar from '@/components/shared/patients/PatientsSearchBar';
import { UserData } from '@/lib/auth/getCurrentUser';

interface ClientPatientsListProps {
  patients: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    lastVisit?: Date | null;
  }[];
  currentUser: UserData | null;
  role?: string;
}

export default function ClientPatientsList({
  patients,
  currentUser,
  role,
}: ClientPatientsListProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return patients;
    const lower = search.toLowerCase();
    return patients.filter(
      (p) =>
        p.fullName.toLowerCase().includes(lower) ||
        p.email.toLowerCase().includes(lower) ||
        p.phone.toLowerCase().includes(lower)
    );
  }, [search, patients]);

  return (
    <div className="grid h-full max-h-[600px] grid-cols-1 gap-3 overflow-y-auto">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <PatientsSearchBar onSearch={setSearch} searchValue={search} setSearchValue={setSearch} />
      </div>

      <div className="grid grid-cols-1 gap-3 overflow-y-auto">
        {filtered.map((patient) => (
          <DoctorPatientCard
            key={patient._id}
            patient={patient}
            currentUser={currentUser}
            role={role}
          />
        ))}
      </div>
    </div>
  );
}
