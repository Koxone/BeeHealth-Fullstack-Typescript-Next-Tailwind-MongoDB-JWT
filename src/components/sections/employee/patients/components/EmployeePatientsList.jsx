'use client';

import { useGetAllPatients } from '@/hooks/patients/get/useGetAllPatients';
import EmployeePatientCard from './EmployeePatientCard';

export default function EmployeePatientsList({ currentUser, role, searchTerm }) {
  const { patients } = useGetAllPatients();

  const filteredPatients = patients.filter((patient) => {
    const searchLower = searchTerm.toLowerCase();

    return (
      patient.fullName.toLowerCase().includes(searchLower) ||
      patient.phone.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="grid h-full max-h-[600px] grid-cols-1 gap-3 overflow-y-auto">
      {filteredPatients.map((patient) => (
        <EmployeePatientCard
          key={patient._id}
          patient={patient}
          currentUser={currentUser}
          role={role}
        />
      ))}
    </div>
  );
}
