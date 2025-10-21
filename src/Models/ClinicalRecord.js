import mongoose from 'mongoose';

const ClinicalRecordSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedMedic: { type: mongoose.Schema.Types.ObjectId, ref: 'Medic' },

    edad: { type: Number, required: true },
    genero: { type: String, enum: ['masculino', 'femenino'], required: true },
    altura: { type: Number, required: true },
    pesoActual: { type: Number, required: true },

    pesoObjetivo: { type: Number, required: true },
    actividadFisica: {
      type: String,
      enum: ['sedentario', 'ligero', 'moderado', 'intenso'],
      required: true,
    },
    horasSueno: { type: Number, required: true },
    consumoAgua: { type: Number, required: true },
    enfermedadesCronicas: { type: String },
    medicamentosActuales: { type: String },
    alergias: { type: String },
    habitosAlimenticios: { type: String, required: true },
    cirugiasPrevias: { type: String },
    motivoConsulta: { type: String, required: true },

    indiceMasaCorporal: { type: Number },
    fechaRegistro: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.ClinicalRecord ||
  mongoose.model('ClinicalRecord', ClinicalRecordSchema);
