import DoctorPatientDetail from '@/components/sections/doctor/patients/[id]/DoctorPatientDetail';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export const runtime = 'nodejs';

export default async function DoctorPatientDetailPage(props) {
  const params = await props.params; 

  await connectDB();

  const patient = await User.findById(params.id, '-password -resetToken').lean();

  if (!patient) {
    return <p className="p-8 text-center text-gray-600">Paciente no encontrado</p>;
  }

  const serializedPatient = {
    ...patient,
    _id: patient._id.toString(),
  };

  const currentUser = await getCurrentUser();
  const role = currentUser?.role;
  const specialty = currentUser?.specialty;

  return (
    <div className="h-screen overflow-hidden pb-40">
      <DoctorPatientDetail
        patient={serializedPatient}
        role={role}
        currentUser={currentUser}
        specialty={specialty}
      />
    </div>
  );
}
