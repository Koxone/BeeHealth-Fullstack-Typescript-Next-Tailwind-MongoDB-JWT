import mongoose from 'mongoose';

const AssignedDietSchema = new mongoose.Schema(
  {
    dietId: { type: mongoose.Schema.Types.ObjectId, ref: 'Diet', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    medicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medic', required: true },

    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    notes: { type: String },
    isActive: { type: Boolean, default: true },

    initialWeight: { type: Number },
    finalWeight: { type: Number },
    adherenceLevel: { type: String, enum: ['low', 'medium', 'high'] },
    feedback: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.AssignedDiet || mongoose.model('AssignedDiet', AssignedDietSchema);
