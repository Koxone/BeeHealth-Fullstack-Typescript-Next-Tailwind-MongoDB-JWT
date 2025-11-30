import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ClinicalRecord } from '@/models/records/ClinicalRecord';
import { Question } from '@/models/records/Question';
import { Answer } from '@/models/records/Answer';
import mongoose from 'mongoose';
import User from '@/models/User';

// @route    PATCH /api/clinicalRecords/:id/edit
// @desc     Edit clinical record by ID
// @access   Private
export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
    }

    const { recordDate } = await req.json();

    if (!recordDate) {
      return NextResponse.json({ error: 'Nueva fecha es requerido' }, { status: 400 });
    }

    // Force update to recordDate
    const updatedRecord = await ClinicalRecord.findByIdAndUpdate(
      id,
      { $set: { recordDate: new Date(recordDate + 'T00:00:00.000Z') } },
      { new: true }
    ).lean();

    return NextResponse.json({ data: updatedRecord }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
