import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import DoctorPatientCard from './DoctorPatientCard';
import ClientPatientsList from './ClientPatientsList';

export const runtime = 'nodejs';

export default async function DoctorPatientsList({ currentUser, role }) {
  await connectDB();

  let query: Record<string, any> = { role: 'patient', isActive: true };
  if (currentUser.role === 'doctor') query.specialty = currentUser.specialty;

  const patients = await User.find(query, '-password -resetToken').sort({ createdAt: -1 }).lean();

  const serializedPatients = patients.map((p) => ({
    ...p,
    _id: p._id.toString(),
    lastVisit: p.lastVisit ?? null,
  }));

  return <ClientPatientsList patients={serializedPatients} currentUser={currentUser} role={role} />;
}
