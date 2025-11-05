import EmployeePatientCard from './EmployeePatientCard';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export default async function EmployeePatientsList({ currentUser, role }) {
  // Get Patients
  await connectDB();

  let query = { role: 'patient', isActive: true };

  const patients = await User.find(query, '-password -resetToken').sort({ createdAt: -1 }).lean();

  return (
    <div className="grid h-full max-h-[600px] grid-cols-1 gap-3 overflow-y-auto">
      {patients.map((patient) => (
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
