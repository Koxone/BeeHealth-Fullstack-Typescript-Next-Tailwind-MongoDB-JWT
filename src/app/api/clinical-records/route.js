import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ClinicalRecord from '@/models/ClinicalRecord';

// @route    POST /api/clinical-records
// @desc     Create Clinical Record
// @access   Private
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Basic Validation
    const { patient, doctor, specialty, version, answers } = body;
    if (!patient || !specialty || !version || !answers) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const record = await ClinicalRecord.create({
      patient,
      doctor,
      specialty,
      version,
      answers,
    });

    return NextResponse.json(record, { status: 201 });
  } catch (err) {
    console.error('Error al guardar el historial clínico:', err);
    return NextResponse.json({ error: 'Error al guardar el historial clínico' }, { status: 500 });
  }
}

// @route    GET /api/clinical-records
// @desc     Create Clinical Record
// @access   Private
export async function GET(req) {
  try {
    // Connect
    await connectDB();

    // Parse query
    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1); /* Paging */
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20', 10), 1), 100);
    const skip = (page - 1) * limit;

    // Filters
    const filter = {}; 
    const patient = searchParams.get('patient');
    const doctor = searchParams.get('doctor');
    const specialty = searchParams.get('specialty');
    const version = searchParams.get('version');
    if (patient) filter.patient = patient;
    if (doctor) filter.doctor = doctor;
    if (specialty) filter.specialty = specialty;
    if (version) filter.version = version;

    // Sort
    const sortParam = searchParams.get('sort') || '-createdAt';
    const sort = {};
    for (const token of sortParam.split(',')) {
      const key = token.replace(/^[-+]/, '');
      const dir = token.startsWith('-') ? -1 : 1;
      if (key) sort[key] = dir;
    }

    // Query
    const [items, total] = await Promise.all([
      ClinicalRecord.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('patient', 'fullName email')
        .populate('doctor', 'fullName email')
        .lean(),
      ClinicalRecord.countDocuments(filter),
    ]);

    // Response
    return NextResponse.json({
      data: items,
      meta: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        sort: sortParam,
        filter,
      },
    });
  } catch (err) {
    console.error('Error al listar clinical records:', err);
    return NextResponse.json({ error: 'Error al listar clinical records' }, { status: 500 });
  }
}
