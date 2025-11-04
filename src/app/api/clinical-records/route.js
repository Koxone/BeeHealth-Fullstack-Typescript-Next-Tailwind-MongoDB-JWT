import { NextResponse } from 'next/server';

import ClinicalRecord from '@/models/ClinicalRecord';
import User from '@/models/User';
import { connectDB } from '@/lib/mongodb';

const SPECIALTIES = ['weight', 'dental', 'stetic'];

export async function GET(req) {
  try {
    await connectDB();

    // Parse query
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId');
    const doctorId = searchParams.get('doctorId');
    const specialty = searchParams.get('specialty');
    const status = searchParams.get('status');
    const from = searchParams.get('from'); // ISO date
    const to = searchParams.get('to'); // ISO date
    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') || 20)));
    const select = searchParams.get('select') || '';
    const sort = searchParams.get('sort') || '-createdAt';

    // Build filter
    const filter = {};
    if (patientId) filter.patient = patientId;
    if (doctorId) filter.doctor = doctorId;
    if (specialty && SPECIALTIES.includes(specialty)) filter.specialty = specialty;
    if (status) filter.status = status;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    // Query
    const [items, total] = await Promise.all([
      ClinicalRecord.find(filter)
        .select(select)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('patient', '_id fullName email role')
        .populate('doctor', '_id fullName email role')
        .lean(),
      ClinicalRecord.countDocuments(filter),
    ]);

    return NextResponse.json(
      {
        ok: true,
        page,
        limit,
        total,
        items,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Short: Basic shape
    const { patientId, doctorId, specialty, answers = [], visitDate, location } = body || {};

    // Short: Validate basics
    if (!patientId || !doctorId) {
      return NextResponse.json({ error: 'patientId and doctorId required' }, { status: 400 });
    }
    if (!SPECIALTIES.includes(specialty)) {
      return NextResponse.json({ error: 'Invalid specialty' }, { status: 400 });
    }

    // Short: Ensure users exist
    const [patient, doctor] = await Promise.all([
      User.findById(patientId).select('_id role'),
      User.findById(doctorId).select('_id role'),
    ]);
    if (!patient) return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    if (!doctor) return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });

    // Short: Normalize answers
    const normalized = (answers || []).map((a) => ({
      qId: a.qId,
      key: a.key,
      label: a.label,
      type: a.type,
      value: a.value ?? null,
      options: Array.isArray(a.options) ? a.options : undefined,
      notes: typeof a.notes === 'string' ? a.notes : '',
    }));

    // Short: Create
    const created = await ClinicalRecord.createFromPayload({
      patientId,
      doctorId,
      specialty,
      answers: normalized,
      visitDate,
      location,
      createdBy: doctorId,
    });

    return NextResponse.json({ ok: true, recordId: created._id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
