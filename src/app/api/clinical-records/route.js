import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ClinicalRecord from '@/Models/ClinicalRecord';
import User from '@/Models/User';

// @route    POST /api/clinical-records
// @desc     Crear historial clínico de un paciente
// @access   Privado (pero puedes dejarlo público de momento)
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      edad,
      genero,
      altura,
      pesoActual,
      pesoObjetivo,
      actividadFisica,
      horasSueno,
      consumoAgua,
      enfermedadesCronicas,
      medicamentosActuales,
      alergias,
      habitosAlimenticios,
      cirugiasPrevias,
      motivoConsulta,
      tipoConsulta,
      fechaRegistro,
      patientId,
    } = body;

    // Validaciones básicas
    if (
      !edad ||
      !genero ||
      !altura ||
      !pesoActual ||
      !pesoObjetivo ||
      !habitosAlimenticios ||
      !motivoConsulta
    ) {
      return NextResponse.json({ error: 'Campos obligatorios faltantes' }, { status: 400 });
    }

    // Crear nuevo registro
    const record = await ClinicalRecord.create({
      patientId,
      edad,
      genero,
      altura,
      pesoActual,
      pesoObjetivo,
      actividadFisica,
      horasSueno,
      consumoAgua,
      enfermedadesCronicas,
      medicamentosActuales,
      alergias,
      habitosAlimenticios,
      cirugiasPrevias,
      motivoConsulta,
      tipoConsulta,
      fechaRegistro,
      indiceMasaCorporal: pesoActual && altura ? pesoActual / Math.pow(altura / 100, 2) : null,
    });

    return NextResponse.json(
      { message: 'Historial clínico guardado exitosamente', record },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear el historial clínico:', error);
    return NextResponse.json({ error: 'Error al guardar el historial clínico' }, { status: 500 });
  }
}
