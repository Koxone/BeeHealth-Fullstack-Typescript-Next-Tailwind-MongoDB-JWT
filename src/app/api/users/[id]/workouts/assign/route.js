import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Workout from '@/models/Workout';
import User from '@/models/User';

// @route    PATCH /api/users/:id/workouts/assign
// @desc     Assign workout to patient
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

    // Get workoutId and assignedAt from request body
    const { workoutId, assignedAt } = await req.json();

    if (!workoutId) {
      return NextResponse.json({ error: 'Workout ID is required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(workoutId)) {
      return NextResponse.json({ error: 'Invalid workout ID format' }, { status: 400 });
    }

    // Validate that user exists
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Validate that workout exists
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    // Check if workout is already assigned
    const alreadyAssigned = user.workouts.some((w) => w.workout.toString() === workoutId);
    if (alreadyAssigned) {
      return NextResponse.json({ error: 'Workout already assigned to this user' }, { status: 400 });
    }

    // Add workout to array
    user.workouts.push({
      workout: new mongoose.Types.ObjectId(workoutId),
      isActive: true,
      assignedAt: assignedAt ? new Date(assignedAt) : new Date(),
    });

    await user.save();

    // Populate workouts
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
      { message: 'Workout assigned successfully', user: safeUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error assigning workout' }, { status: 500 });
  }
}
