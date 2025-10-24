import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ClinicalRecord from '@/Models/ClinicalRecord';
import User from '@/Models/User';

// @route    POST /api/clinical-records
// @desc     Crear un Clinical Record
// @access   Privado (puedes dejarlo público de momento)
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
      fechaRegistro,
      patientId,
      talla,
      indiceMasaCorporal,
    } = body;

    // Buscar el último registro del paciente
    const lastRecord = await ClinicalRecord.findOne({ patientId }).sort({ createdAt: -1 });

    // Si hay un registro anterior, usar sus valores por defecto
    const record = await ClinicalRecord.create({
      patientId,
      edad: edad || lastRecord?.edad || 0,
      genero: genero || lastRecord?.genero || 'N/A',
      altura: altura || lastRecord?.altura || 0,
      pesoActual: pesoActual || lastRecord?.pesoActual || 0,
      pesoObjetivo: pesoObjetivo || lastRecord?.pesoObjetivo || 0,
      actividadFisica: actividadFisica || lastRecord?.actividadFisica || 'sedentario',
      horasSueno: horasSueno || lastRecord?.horasSueno || 0,
      consumoAgua: consumoAgua || lastRecord?.consumoAgua || 0,
      enfermedadesCronicas: enfermedadesCronicas || lastRecord?.enfermedadesCronicas || '',
      medicamentosActuales: medicamentosActuales || lastRecord?.medicamentosActuales || '',
      alergias: alergias || lastRecord?.alergias || '',
      habitosAlimenticios: habitosAlimenticios || lastRecord?.habitosAlimenticios || '',
      cirugiasPrevias: cirugiasPrevias || lastRecord?.cirugiasPrevias || '',
      motivoConsulta: motivoConsulta || lastRecord?.motivoConsulta || 'Consulta general',
      fechaRegistro: fechaRegistro || new Date(),
      talla: talla || lastRecord?.talla || 0,
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

// @route    PUT /api/clinical-records
// @desc     Modificar un Clinical Record
// @access   Privado (puedes dejarlo público de momento)
export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { recordId, updates } = body;

    if (!recordId) {
      return NextResponse.json({ error: 'Falta el ID del historial' }, { status: 400 });
    }

    if (updates.fechaRegistro) {
      updates.fechaRegistro = new Date(updates.fechaRegistro);
    }

    const updated = await ClinicalRecord.findByIdAndUpdate(
      recordId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Historial no encontrado' }, { status: 404 });
    }

    return NextResponse.json(
      { message: 'Historial actualizado correctamente', record: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al actualizar historial clínico:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el historial clínico' },
      { status: 500 }
    );
  }
}
