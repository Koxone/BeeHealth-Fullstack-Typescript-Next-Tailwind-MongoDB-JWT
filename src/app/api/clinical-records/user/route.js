import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ClinicalRecord from '@/Models/ClinicalRecord';

// @route    POST /api/clinical-records/user
// @desc     Obtener todos los historiales clínicos de un paciente específico
// @access   Privado (puedes dejarlo público de momento)
export async function POST(req) {
  try {
    await connectDB();

    const { patientId } = await req.json();

    if (!patientId) {
      return NextResponse.json({ error: 'El ID del paciente es requerido' }, { status: 400 });
    }

    const records = await ClinicalRecord.find({ patientId }).sort({ fechaRegistro: -1 });

    if (!records || records.length === 0) {
      return NextResponse.json(
        { message: 'No se encontraron historiales clínicos para este paciente' },
        { status: 404 }
      );
    }

    return NextResponse.json({ records }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener historiales clínicos:', error);
    return NextResponse.json(
      { error: 'Error al obtener los historiales clínicos del paciente' },
      { status: 500 }
    );
  }
}
