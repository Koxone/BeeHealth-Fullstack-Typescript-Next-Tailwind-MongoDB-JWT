import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ClinicalRecord from '@/models/ClinicalRecord';
import mongoose from 'mongoose';

// @route    GET /api/clinical-records/:id
// @desc     Get a patient Clinical Record by his ID
// @access   Private
export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const { searchParams } = new URL(req.url);
    const latest = searchParams.get('latest') === 'true';
    const version = searchParams.get('version') || undefined;
    const specialty = searchParams.get('specialty') || undefined;

    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20', 10), 1), 100);
    const skip = (page - 1) * limit;

    const filter = { patient: id };
    if (version) filter.version = version;
    if (specialty) filter.specialty = specialty;

    if (latest) {
      const doc = await ClinicalRecord.findOne(filter)
        .sort({ createdAt: -1 })
        .populate('patient', 'fullName email phone')
        .populate('doctor', 'fullName email phone')
        .lean();

      return NextResponse.json({ data: doc, meta: { latest: true, filter } });
    }

    const [items, total] = await Promise.all([
      ClinicalRecord.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('patient', 'fullName email phone')
        .populate('doctor', 'fullName email phone')
        .lean(),
      ClinicalRecord.countDocuments(filter),
    ]);

    return NextResponse.json({
      data: items,
      meta: {
        patient: id,
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        filter,
      },
    });
  } catch (err) {
    console.error('Error GET clinical-records/[id]:', err);
    return NextResponse.json({ error: 'Error al obtener clinical records' }, { status: 500 });
  }
}

// @route    POST /api/clinical-records/:id
// @desc     Create Clinical Record for a patient
// @access   Private
export async function POST(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const { doctor = null, specialty, version, answers } = await req.json();

    if (!specialty || !version || !answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const record = await ClinicalRecord.create({
      patient: id,
      doctor,
      specialty,
      version,
      answers,
    });

    return NextResponse.json(record, { status: 201 });
  } catch (err) {
    console.error('Error POST clinical-records/[id]:', err);
    return NextResponse.json({ error: 'Error al crear clinical record' }, { status: 500 });
  }
}
