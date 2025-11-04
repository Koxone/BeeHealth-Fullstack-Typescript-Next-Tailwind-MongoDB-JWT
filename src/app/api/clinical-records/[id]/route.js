import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ClinicalRecord from '@/models/ClinicalRecord';
import mongoose from 'mongoose';

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// @route    GET /api/clinical-records/:id
// @desc     Get a patient Clinical Record by his ID
// @access   Private
export async function GET(req, { params }) {
  try {
    // Conexión
    await connectDB();

    // Params
    const { id } = await params;

    // Query string
    const { searchParams } = new URL(req.url);
    const latest = searchParams.get('latest') === 'true';
    const version = searchParams.get('version') || undefined;
    const specialty = searchParams.get('specialty') || undefined;

    // Paginación simple
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '20', 10), 1), 100);
    const skip = (page - 1) * limit;

    // Filtro base
    const filter = { patient: id };
    if (version) filter.version = version;
    if (specialty) filter.specialty = specialty;

    // Latest corto
    if (latest) {
      const doc = await ClinicalRecord.findOne(filter)
        .sort({ createdAt: -1 })
        .populate('patient', 'fullName email')
        .populate('doctor', 'fullName email')
        .lean();

      return NextResponse.json({ data: doc, meta: { latest: true, filter } });
    }

    // Listado con paginación
    const [items, total] = await Promise.all([
      ClinicalRecord.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('patient', 'fullName email')
        .populate('doctor', 'fullName email')
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
    // Conexión
    await connectDB();

    // Params
    const { id } = params;
    if (!isValidId(id)) {
      return NextResponse.json({ error: 'Paciente id inválido' }, { status: 400 });
    }

    // Body
    const { doctor = null, specialty, version, answers } = await req.json();

    // Validación mínima
    if (!specialty || !version || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    // Crear
    const record = await ClinicalRecord.create({
      patient: id,
      doctor,
      specialty,
      version,
      answers,
    });

    // Respuesta
    return NextResponse.json(record, { status: 201 });
  } catch (err) {
    console.error('Error POST clinical-records/[id]:', err);
    return NextResponse.json({ error: 'Error al crear clinical record' }, { status: 500 });
  }
}
