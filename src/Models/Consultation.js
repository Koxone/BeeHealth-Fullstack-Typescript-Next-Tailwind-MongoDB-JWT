import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema(
  {
    clinicalRecordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClinicalRecord',
      required: true,
    },
    date: { type: Date, default: Date.now },
    medicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medic', required: true },

    weight: Number,
    bmi: Number,
    bodyFat: Number,
    muscleMass: Number,
    waistCircumference: Number,
    bloodPressure: { systolic: Number, diastolic: Number },
    heartRate: Number,

    progressNotes: String,
    progressImages: [String],

    treatmentsApplied: [String],
    medicationsUpdated: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);
