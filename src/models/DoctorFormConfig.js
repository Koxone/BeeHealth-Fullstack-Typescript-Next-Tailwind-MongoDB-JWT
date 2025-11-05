import mongoose from 'mongoose';

const DoctorFormConfigSchema = new mongoose.Schema(
  {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'DoctorProfile', required: true },
    especialidad: {
      type: String,
      enum: ['controlPeso', 'odontologia', 'estetica'],
      required: true,
    },
    visiblePaciente: { type: [String], default: [] },
    visibleMedico: { type: [String], default: [] },
    vistaRapida: { type: [String], default: [] },
    ordenSecciones: { type: [String], default: [] },
  },
  { timestamps: true }
);

DoctorFormConfigSchema.index({ doctorId: 1, especialidad: 1 }, { unique: true });

export default mongoose.models.DoctorFormConfig ||
  mongoose.model('DoctorFormConfig', DoctorFormConfigSchema);
