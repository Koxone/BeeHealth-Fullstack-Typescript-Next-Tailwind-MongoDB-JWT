import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import Workout from '@/models/Workout';

// @route    PATCH /api/workouts/:id/edit
// @desc     Edit a workout
// @access   Private
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const {
      patients,
      name,
      type,
      difficulty,
      duration,
      about,
      instructions,
      benefits,
      cautions,
      images,
      video,
    } = body;

    if (
      !name ||
      !type ||
      !difficulty ||
      !duration ||
      !about ||
      !instructions ||
      !benefits ||
      !cautions ||
      !images ||
      !video
    ) {
      return NextResponse.json(
        {
          error:
            'Name, type, difficulty, duration, about, instructions, benefits, cautions, images and video are required',
        },
        { status: 400 }
      );
    }

    const auth = await getAuthUser(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Get auth user
    const { user } = auth;

    // Validate if ID is a valid MongoDB ObjectId
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({ error: 'Invalid workout ID' }, { status: 400 });
    }

    const workout = await Workout.findById(id);
    if (!workout) {
      return NextResponse.json({ error: 'Workout not found' }, { status: 404 });
    }

    // Update fields
    workout.name = name;
    workout.type = type;
    workout.difficulty = difficulty;
    workout.duration = duration;
    workout.about = about;
    workout.instructions = instructions;
    workout.benefits = benefits;
    workout.cautions = cautions;
    workout.images = images;
    workout.video = video;

    // Update patients array if provided
    if (patients && Array.isArray(patients)) {
      workout.patients = patients;
    }

    // Save workout
    await workout.save();

    return NextResponse.json({ workout }, { status: 200 });
  } catch (error) {
    console.error('Workout edit error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
