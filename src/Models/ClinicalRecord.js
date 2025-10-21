import mongoose from 'mongoose';

const ClinicalRecordSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    assignedMedic: { type: mongoose.Schema.Types.ObjectId, ref: 'Medic', required: true },

    age: Number,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    height: Number,
    initialWeight: Number,
    initialBMI: Number,
    goals: String,
    medicalConditions: [String],
    medications: [String],
    allergies: [String],
    surgeries: [String],

    aestheticTreatments: [String],
    notes: String,
    lastVisit: Date,
    nextAppointment: Date,
  },
  { timestamps: true }
);

export default mongoose.models.ClinicalRecord ||
  mongoose.model('ClinicalRecord', ClinicalRecordSchema);
