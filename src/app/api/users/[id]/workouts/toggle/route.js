import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Workout from '@/models/Workout';
import User from '@/models/User';

// @route    PATCH /api/users/:id/workouts/toggle
// @desc     Toggle workout active status
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

    // Get workoutId and isActive from request body
    const { workoutId, isActive } = await req.json();

    if (!workoutId) {
      return NextResponse.json({ error: 'Workout ID is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      return NextResponse.json({ error: 'Invalid workout ID format' }, { status: 400 });
    }

    if (typeof isActive !== 'boolean') {
      return NextResponse.json({ error: 'isActive must be a boolean' }, { status: 400 });
    }

    // Validate that user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find workout in array
    const workoutAssignment = user.workouts.find((w) => w.workout.toString() === workoutId);
    if (!workoutAssignment) {
      return NextResponse.json({ error: 'Workout not assigned to this user' }, { status: 404 });
    }

    // Update status
    workoutAssignment.isActive = isActive;
    if (!isActive && !workoutAssignment.finishedAt) {
      workoutAssignment.finishedAt = new Date();
    }
    // Clear finishedAt if reactivating
    if (isActive && workoutAssignment.finishedAt) {
      workoutAssignment.finishedAt = undefined;
    }

    await user.save();

    const populatedUser = await User.findById(id).populate('workouts.workout');

    const safeUser = {
      id: populatedUser._id,
      fullName: populatedUser.fullName,
      email: populatedUser.email,
      phone: populatedUser.phone,
      avatar: populatedUser.avatar,
      role: populatedUser.role,
      specialty: populatedUser.specialty,
      workouts: populatedUser.workouts,
      updatedAt: populatedUser.updatedAt,
    };

    return NextResponse.json(
      { message: 'Workout status updated successfully', user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating workout status' }, { status: 500 });
  }
}
