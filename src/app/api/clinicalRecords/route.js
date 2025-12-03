import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Question } from '@/models/records/Question';
import { Answer } from '@/models/records/Answer';
import { ClinicalRecord } from '@/models/records/ClinicalRecord';
import { WeightLog } from '@/models/records/WeightLog';
import User from '@/models/User';
import Workout from '@/models/Workout';
import Diet from '@/models/Diet';

// Custom Hooks
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    POST /api/clinicalRecords
// @desc     Create a new Clinical Record
// @access   Private
export async function POST(req) {
  try {
    await connectDB();

    // Read body
    const { patientId, dietId, workoutId, specialty, version, answers, recordDate } =
      await req.json();

    let finalPatientId = patientId;
    let finalVersion = version;

    // If patientId and version not provided, assume patient creating first full record
    if (!patientId && !version) {
      const auth = await getAuthUser(req);
      if (!auth.ok) {
        return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });
      }

      finalPatientId = auth.userId;
      finalVersion = 'full';
    }

    // Validate patientId for short version (doctor creating record)
    if (finalVersion === 'short' && !finalPatientId) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'patientId is required for short version',
            reason: 'Doctor must specify patient ID',
          },
        },
        { status: 400 }
      );
    }

    // Validate answers and prepare Answer objects
    const answerDocs = [];
    for (const ans of answers || []) {
      const question = await Question.findById(ans.questionId);
      if (!question) continue;
      answerDocs.push({
        question: question._id,
        value: ans.value ?? null,
      });
    }

    // Not sure if this works, verify later
    if (finalVersion === 'full') {
      const existingFullRecord = await ClinicalRecord.findOne({
        patient: finalPatientId,
        version: 'full',
        specialty,
      });

      if (existingFullRecord) {
        finalVersion = 'short';
      }
    }

    // Create ClinicalRecord
    const newRecord = new ClinicalRecord({
      patient: finalPatientId,
      specialty,
      version: finalVersion,
      answers: answerDocs,
      diets: dietId ? [dietId] : [],
      workouts: workoutId ? [workoutId] : [],
      recordDate: new Date(),
    });
    await newRecord.save();

    // Update hasRecord to true for the patient
    await User.findByIdAndUpdate(finalPatientId, { hasRecord: true });

    /* ================= Workout Section ================= */
    if (workoutId && patientId) {
      const workout = await Workout.findById(workoutId);

      if (workout) {
        const alreadyAssigned = workout.patients.some((p) => p.patient.toString() === patientId);

        if (alreadyAssigned) {
          return NextResponse.json(
            {
              ok: false,
              message: 'El paciente ya está asignado a este ejercicio',
            },
            { status: 400 }
          );
        }

        workout.patients.push({
          patient: patientId,
          isActive: true,
          assignedAt: new Date(),
        });

        await workout.save();
      }
    }

    /* ================= WeightLog Section ================= */
    const logs = await WeightLog.find({ patient: finalPatientId }).sort({ createdAt: 1 });

    if (logs.length === 0) {
      const weight =
        answers.find(
          (a) =>
            a.questionId === '692a02539ba6da2362d98aad' ||
            a.questionId === '692a02539ba6da2362d98aac'
        )?.value || null;

      const newWeightLog = new WeightLog({
        patient: finalPatientId,
        clinicalRecord: newRecord._id,
        originalWeight: weight,
        currentWeight: weight,
        differenceFromPrevious: 0,
        differenceFromOriginal: 0,
      });

      await newWeightLog.save();
      return NextResponse.json({
        ok: true,
        clinicalRecord: newRecord,
      });
    } else {
      const firstLog = logs[0];
      const previousLog = logs[logs.length - 1];

      const currentWeight =
        answers.find((a) => a.questionId === '692a02539ba6da2362d98aac')?.value || null;

      const differenceFromPrevious = currentWeight - previousLog.currentWeight;
      const differenceFromOriginal = currentWeight - firstLog.originalWeight;

      const newWeightLog = new WeightLog({
        patient: finalPatientId,
        clinicalRecord: newRecord._id,
        originalWeight: firstLog.originalWeight,
        currentWeight: currentWeight,
        differenceFromPrevious: differenceFromPrevious,
        differenceFromOriginal: differenceFromOriginal,
      });

      await newWeightLog.save();
    }

    return NextResponse.json({
      ok: true,
      clinicalRecord: newRecord,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'An unexpected error occurred',
          reason: error.message,
        },
      },
      { status: 500 }
    );
  }
}
