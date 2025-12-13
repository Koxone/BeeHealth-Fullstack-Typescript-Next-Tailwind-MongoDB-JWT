import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Diet from '@/models/Diet';
import User from '@/models/User';
import PatientTimeline, { IPatientTimeline } from '@/models/records/PatientTimeline';
import { IUser } from '@/models/User';
import { getAuthUser } from '@/lib/auth/getAuthUser';

interface TimelineCreateRequest {
  eventType: IPatientTimeline['eventType'];
  diet?: string;
  workout?: string;
  clinicalRecord?: string;
  snapshot?: IPatientTimeline['snapshot'];
  startDate?: Date;
  dietId?: string;
}

// @route    POST /api/patients/:id/timeline/create
// @desc     Create timeline event
// @access   Private
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Connect to DB
    await connectDB();

    // Auth user
    const authUser = await getAuthUser(req);
    if (!authUser) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User is not authenticated',
            reason: 'Valid authentication credentials were not provided',
          },
        },
        { status: 401 }
      );
    }

    // Get Patient ID from params
    const { id } = await params;

    // Get event data from request body
    const { eventType, diet, workout, clinicalRecord, snapshot, startDate, dietId } =
      (await req.json()) as TimelineCreateRequest;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'INVALID_ID',
            message: 'Invalid patient ID format',
            reason: 'The provided patient ID is not a valid MongoDB ObjectId',
          },
        },
        { status: 400 }
      );
    }

    if (!eventType) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'MISSING_EVENT_TYPE',
            message: 'Event type is required',
            reason: 'The eventType field is missing in the request body',
          },
        },
        { status: 400 }
      );
    }

    const patient = (await User.findById(id)) as IUser | null;
    if (!patient) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'PATIENT_NOT_FOUND',
            message: 'Patient not found',
            reason: 'No patient exists with the provided ID',
          },
        },
        { status: 404 }
      );
    }

    // Create timeline event
    const event = await PatientTimeline.create({
      patient: id,
      doctor: authUser._id,
      eventType,
      diet,
      workout,
      clinicalRecord,
      snapshot,
      startDate,
      compliance: { status: 'pending' },
    });

    // Handle diet-related events
    if (eventType === 'diet_assigned' && dietId && mongoose.Types.ObjectId.isValid(dietId)) {
      // Verify diet exists
      const dietExists = await Diet.findById(dietId);
      if (!dietExists) {
        return NextResponse.json(
          {
            ok: false,
            error: {
              code: 'DIET_NOT_FOUND',
              message: 'Diet not found',
              reason: 'No diet exists with the provided ID',
            },
          },
          { status: 404 }
        );
      }

      // Check if already assigned
      const alreadyAssigned = patient.diets.some((d) => d.diet.toString() === dietId);
      if (!alreadyAssigned) {
        await User.findByIdAndUpdate(
          id,
          {
            $push: {
              diets: {
                diet: new mongoose.Types.ObjectId(dietId),
                isActive: true,
                assignedAt: new Date(),
              },
            },
          },
          { new: true }
        );
      }
    }

    if (eventType === 'diet_completed' && dietId && mongoose.Types.ObjectId.isValid(dietId)) {
      await User.findByIdAndUpdate(
        id,
        {
          $set: {
            'diets.$[elem].isActive': false,
            'diets.$[elem].finishedAt': new Date(),
          },
        },
        {
          arrayFilters: [{ 'elem.diet': new mongoose.Types.ObjectId(dietId) }],
          new: true,
        }
      );
    }

    if (eventType === 'diet_removed' && dietId && mongoose.Types.ObjectId.isValid(dietId)) {
      await User.findByIdAndUpdate(
        id,
        {
          $pull: {
            diets: { diet: new mongoose.Types.ObjectId(dietId) },
          },
        },
        { new: true }
      );
    }

    // Populate and return event
    const populatedEvent = await PatientTimeline.findById(event._id)
      .populate('patient', 'fullName email')
      .populate('doctor', 'fullName email')
      .populate('diet', 'name category')
      .populate('workout', 'name category')
      .populate('clinicalRecord');

    return NextResponse.json(
      { ok: true, message: 'Timeline event created', event: populatedEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Error creating timeline event',
          reason: 'An unexpected error occurred on the server',
        },
      },
      { status: 500 }
    );
  }
}
