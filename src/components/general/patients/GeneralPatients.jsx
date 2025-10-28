import PatientsSearchBar from '@/components/general/patients/components/PatientsSearchBar';
import PatientsHeader from '@/components/general/patients/components/PatientsHeader';
import PatientsList from '@/components/general/patients/components/PatientsList';
import { cookies } from 'next/headers';

export default async function GeneralPatients() {
  // Read cookie in the server
  const cookieHeader = await cookies();

  // Extract user_type value safely
  const type = Array.from(cookieHeader).find(([name]) => name === 'user_type')?.[1];

  return (
    <div className="h-full space-y-6 overflow-y-auto">
      <PatientsHeader />

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <PatientsSearchBar />
      </div>

      <PatientsList type={type} />
    </div>
  );
}
