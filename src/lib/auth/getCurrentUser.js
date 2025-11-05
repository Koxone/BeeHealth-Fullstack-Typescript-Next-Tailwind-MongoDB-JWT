import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export const runtime = 'nodejs';

export async function getCurrentUser() {
  // Connect to DB
  await connectDB();

  // Read cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('refreshToken')?.value;

  if (!token) return null;

  try {
    // Decode JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return null;

    // Return clean user object
    return {
      id: user._id.toString(),
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
      specialty: user.specialty,
    };
  } catch (err) {
    console.error('getCurrentUser error:', err);
    return null;
  }
}
