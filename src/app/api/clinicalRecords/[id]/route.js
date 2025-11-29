import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ClinicalRecord from '@/models/ClinicalRecord';
import mongoose from 'mongoose';
import User from '@/models/User';
import { Question } from '@/models/records/Question';
import { Answer } from '@/models/records/Answer';

// @route    GET /api/clinical-records/:id
// @desc     Get all Clinical Records for a patient
// @access   Private
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid or missing patient ID' }, { status: 400 });
    }

    const records = await ClinicalRecord.find({ patient: id })
      .sort({ createdAt: -1 })
      .populate('patient', 'fullName email phone avatar')
      .populate('doctor', 'fullName email phone avatar')
      // Correct populate for subdocument array
      .populate({
        path: 'answers.question',
        model: 'Question',
        select: 'questionId text specialty version type options isMetric',
      })
      .lean();

    // If no records found, return empty array
    return NextResponse.json({ data: records || [] });
  } catch (err) {
    console.error('Error GET clinical-records/[id]:', err);
    return NextResponse.json({ error: 'Error fetching clinical records' }, { status: 500 });
  }
}
