import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Diet from '@/models/Diet';
import User from '@/models/User';

// @route    PATCH /api/users/:id/diets/toggle
// @desc     Toggle diet active status
// @access   Private
export async function PATCH(req, { params }) {
  try {
    // Connect to DB
    await connectDB();

    // Get User ID from params
    const { id } = await params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid user ID format' }, { status: 400 });
    }

    // Get dietId and isActive from request body
    const { dietId, isActive } = await req.json();

    if (!dietId) {
      return NextResponse.json({ error: 'Diet ID is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(dietId)) {
      return NextResponse.json({ error: 'Invalid diet ID format' }, { status: 400 });
    }

    if (typeof isActive !== 'boolean') {
      return NextResponse.json({ error: 'isActive must be a boolean' }, { status: 400 });
    }

    // Validate that user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find diet in array
    const dietAssignment = user.diets.find((d) => d.diet.toString() === dietId);
    if (!dietAssignment) {
      return NextResponse.json({ error: 'Diet not assigned to this user' }, { status: 404 });
    }

    // Update status
    dietAssignment.isActive = isActive;
    if (!isActive && !dietAssignment.finishedAt) {
      dietAssignment.finishedAt = new Date();
    }
    // Clear finishedAt if reactivating
    if (isActive && dietAssignment.finishedAt) {
      dietAssignment.finishedAt = undefined;
    }

    await user.save();

    const populatedUser = await User.findById(id).populate('diets.diet');

    const safeUser = {
      id: populatedUser._id,
      fullName: populatedUser.fullName,
      email: populatedUser.email,
      phone: populatedUser.phone,
      avatar: populatedUser.avatar,
      role: populatedUser.role,
      specialty: populatedUser.specialty,
      diets: populatedUser.diets,
      updatedAt: populatedUser.updatedAt,
    };

    return NextResponse.json(
      { message: 'Diet status updated successfully', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating diet status' }, { status: 500 });
  }
}
