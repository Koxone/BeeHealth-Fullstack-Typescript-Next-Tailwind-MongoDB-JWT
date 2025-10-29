import mongoose from 'mongoose';

const DoctorProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    nombre: { type: String, required: true },
    especialidad: {
      type: String,
      enum: ['controlPeso', 'odontologia', 'estetica'],
      required: true,
      index: true,
    },
    cedulaProfesional: { type: String },
    clinica: { type: String },
    configuracionFormulario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DoctorFormConfig',
    },
    configuracionesPrevias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DoctorFormConfig' }],
    idiomaPreferido: { type: String, default: 'es' },
    fechaRegistro: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.DoctorProfile ||
  mongoose.model('DoctorProfile', DoctorProfileSchema);
