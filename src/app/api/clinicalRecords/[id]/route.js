import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ClinicalRecord } from '@/models/records/ClinicalRecord';
import { getAuthUser } from '@/lib/auth/getAuthUser';

// @route    GET /api/clinicalRecords/:id
// @desc     Get Clinical Records by PatientID
// @access   Private
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'id is required',
            reason: 'Doctor must specify patient ID',
          },
        },
        { status: 400 }
      );
    }

    const records = await ClinicalRecord.find({ patient: id });

    return NextResponse.json({ ok: true, records }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Something went wrong',
          details: error.message,
        },
      },
      { status: 500 }
    );
  }
}
