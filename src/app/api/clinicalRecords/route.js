import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Question } from '@/models/records/Question';
import { Answer } from '@/models/records/Answer';
import { ClinicalRecord } from '@/models/records/ClinicalRecord';
import { getAuthUser } from '@/lib/auth/getAuthUser';
import User from '@/models/User';

// @route    POST /api/clinicalRecords
// @desc     Create a new Clinical Record
// @access   Private
export async function POST(req) {
  try {
    await connectDB();

    // Read body
    const { patientId, specialty, version, answers } = await req.json();

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
    });

    await newRecord.save();

    // Update hasRecord to true for the patient
    await User.findByIdAndUpdate(finalPatientId, { hasRecord: true });

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
