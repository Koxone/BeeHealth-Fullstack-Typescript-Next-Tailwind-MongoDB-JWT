import DoctorPatientDetail from '@/components/sections/doctor/patients/[id]/DoctorPatientDetail';
import { getCurrentUser } from '@/lib/auth/getCurrentUser';
import { connectDB } from '@/lib/mongodb';
import User, { IUser } from '@/models/User';

export const runtime = 'nodejs';

interface DoctorPatientDetailPageProps {
  params: {
    id: string;
  };
}

export default async function DoctorPatientDetailPage(props: DoctorPatientDetailPageProps) {
  const params = await props.params;
  const { id } = params;

  await connectDB();

  const patient = await User.findById(id, '-password -resetToken').lean<IUser>();

  if (!patient) {
    return <p className="p-8 text-center text-gray-600">Paciente no encontrado</p>;
  }

  const serializedPatient = {
    ...patient,
    _id: patient._id.toString(),
  };

  const currentUser = await getCurrentUser();
  const specialty = currentUser?.specialty;

  return (
    <div className="h-screen overflow-hidden pb-40">
      <DoctorPatientDetail patient={serializedPatient} specialty={specialty} />
    </div>
  );
}
