'use client';

import SharedSectionHeader from '@/components/shared/sections/SharedSectionHeader';
import EmployeePatientsList from './components/EmployeePatientsList';
import PatientsSearchBar from '@/components/shared/patients/PatientsSearchBar';
import React, { useEffect, useState } from 'react';

export default function EmployeePatients({ currentUser, role }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <SharedSectionHeader
        Icon="pacientes"
        title="Pacientes"
        subtitle="Lista de todos los pacientes de la clínica"
      />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <PatientsSearchBar
          searchValue={searchTerm}
          setSearchValue={setSearchTerm}
          onSearch={setSearchTerm}
        />
      </div>

      <EmployeePatientsList currentUser={currentUser} role={role} searchTerm={searchTerm} />
    </div>
  );
}
