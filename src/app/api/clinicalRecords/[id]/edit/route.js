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

    const body = await req.json();
    const { answers, recordDate } = body;

    const updateFields = {};

    // Update recordDate if provided
    if (recordDate) {
      updateFields.recordDate = new Date(recordDate + 'T00:00:00.000Z');
    }

    // Update answers if provided
    if (answers && Array.isArray(answers)) {
      updateFields.answers = answers.map((answer) => ({
        question: answer.questionId,
        value: answer.value,
      }));
    }

    // Perform update
    const updatedRecord = await ClinicalRecord.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    )
      .populate('patient', 'name email')
      .populate('answers.question')
      .lean();

    if (!updatedRecord) {
      return NextResponse.json({ error: 'Registro no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ data: updatedRecord }, { status: 200 });
  } catch (error) {
    console.error('Error updating clinical record:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
