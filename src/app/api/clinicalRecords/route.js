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

// @route    GET /api/clinicalRecords
// @desc     Get all Clinical Records with optional filters
// @access   Private
export async function GET(req) {
  try {
    await connectDB();

    // Build filters from query string
    const { searchParams } = new URL(req.url);

    const filters = {};
    const patient = searchParams.get('patient');
    const doctor = searchParams.get('doctor');
    const specialty = searchParams.get('specialty');
    const version = searchParams.get('version');

    if (patient) filters.patient = patient;
    if (doctor) filters.doctor = doctor;
    if (specialty) filters.specialty = specialty;
    if (version) filters.version = version;

    // Query clinical records
    const records = await ClinicalRecord.find(filters)
      .sort({ createdAt: -1 })
      .populate('patient', 'fullName email phone avatar')
      .populate({
        path: 'answers.question',
        model: 'Question',
        select: 'questionId text specialty version type options isMetric',
      })
      .lean();

    return NextResponse.json({ success: true, data: records }, { status: 200 });
  } catch (error) {
    console.error('Error fetching clinical records:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

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
    //#region
    const logs = await WeightLog.find({ patient: finalPatientId }).sort({ createdAt: 1 });

    // Identify FULL or SHORT Weight answer
    const isFullWeight = answers.some((a) => a.questionId === '692a02539ba6da2362d98aad');
    const isShortWeight = answers.some((a) => a.questionId === '692a02539ba6da2362d98aac');

    // Identify FULL or SHORT Size answer
    const isFullSize = answers.some((a) => a.questionId === '692a02539ba6da2362d98aaf');
    const isShortSize = answers.some((a) => a.questionId === '692a02539ba6da2362d98aae');

    // Current weight from this consultation
    const currentWeight =
      answers.find(
        (a) =>
          a.questionId === '692a02539ba6da2362d98aad' || a.questionId === '692a02539ba6da2362d98aac'
      )?.value || null;

    // Current size from this consultation
    const currentSize =
      answers.find(
        (a) =>
          a.questionId === '692a02539ba6da2362d98aaf' || a.questionId === '692a02539ba6da2362d98aae'
      )?.value || null;

    // First time weight log
    if (logs.length === 0) {
      let originalWeight = currentWeight;
      let originalSize = currentSize;

      // If this record is SHORT, get original weight from FIRST clinicalRecord
      if (isShortWeight) {
        const firstRecord = await ClinicalRecord.findOne({ patient: finalPatientId }).sort({
          createdAt: 1,
        });

        if (firstRecord) {
          const firstWeightAnswer = firstRecord.answers.find(
            (ans) =>
              ans.question.toString() === '692a02539ba6da2362d98aad' || // FULL ID
              ans.question.toString() === '692a02539ba6da2362d98aac' // SHORT ID
          );

          if (firstWeightAnswer) {
            originalWeight = firstWeightAnswer.value;
          }
        }
      }

      // If this record is SHORT, get original size from FIRST clinicalRecord
      if (isShortSize) {
        const firstRecord = await ClinicalRecord.findOne({ patient: finalPatientId }).sort({
          createdAt: 1,
        });

        if (firstRecord) {
          const firstSizeAnswer = firstRecord.answers.find(
            (ans) =>
              ans.question.toString() === '692a02539ba6da2362d98aaf' || // FULL Size ID
              ans.question.toString() === '692a02539ba6da2362d98aae' // SHORT Size ID
          );

          if (firstSizeAnswer) {
            originalSize = firstSizeAnswer.value;
          }
        }
      }

      const newWeightLog = new WeightLog({
        patient: finalPatientId,
        clinicalRecord: newRecord._id,
        originalWeight: originalWeight,
        currentWeight: currentWeight,
        differenceFromPrevious: 0,
        differenceFromOriginal: 0,

        originalSize: originalSize,
        currentSize: currentSize,
        differenceSizeFromPrevious: 0,
        differenceSizeFromOriginal: 0,
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

      const currentSize =
        answers.find(
          (a) =>
            a.questionId === '692a02539ba6da2362d98aaf' ||
            a.questionId === '692a02539ba6da2362d98aae'
        )?.value || null;

      const differenceSizeFromPrevious = currentSize - previousLog.currentSize;
      const differenceSizeFromOriginal = currentSize - firstLog.originalSize;

      const differenceFromPrevious = currentWeight - previousLog.currentWeight;
      const differenceFromOriginal = currentWeight - firstLog.originalWeight;

      const newWeightLog = new WeightLog({
        patient: finalPatientId,
        clinicalRecord: newRecord._id,
        originalWeight: firstLog.originalWeight,
        currentWeight: currentWeight,
        differenceFromPrevious: differenceFromPrevious,
        differenceFromOriginal: differenceFromOriginal,

        originalSize: firstLog.originalSize,
        currentSize: currentSize,
        differenceSizeFromPrevious: differenceSizeFromPrevious,
        differenceSizeFromOriginal: differenceSizeFromOriginal,
      });

      await newWeightLog.save();
    }
    //#endregion

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
