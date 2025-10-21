import mongoose from 'mongoose';

const MedicSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    specialty: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    yearsExperience: { type: Number },
    clinicName: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Medic || mongoose.model('Medic', MedicSchema);
