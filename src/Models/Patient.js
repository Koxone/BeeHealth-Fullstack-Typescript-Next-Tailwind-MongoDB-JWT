import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    weight: { type: Number },
    height: { type: Number },
    medications: [{ type: String }],
    allergies: [{ type: String }],
    medicalHistory: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Patient || mongoose.model('Patient', PatientSchema);
