import mongoose from 'mongoose';

const PatientProfileSchema = new mongoose.Schema(
  {
    nombreCompleto: { type: String, required: true, index: true },
    correo: { type: String, index: true },
    telefono: { type: String },
    fechaNacimiento: { type: String },
    genero: { type: String },
    doctorAsignado: { type: mongoose.Schema.Types.ObjectId, ref: 'DoctorProfile', index: true },
    historialesClinicos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ClinicalHistory' }],
    ultimaConsulta: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.PatientProfile ||
  mongoose.model('PatientProfile', PatientProfileSchema);
