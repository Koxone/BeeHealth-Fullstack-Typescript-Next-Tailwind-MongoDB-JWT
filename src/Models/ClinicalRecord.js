import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  qId: { type: Number, required: true },
  value: { type: mongoose.Schema.Types.Mixed },
});

const ClinicalRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  specialty: {
    type: String,
    enum: ['weight', 'dental', 'stetic'],
    required: true,
  },
  version: {
    type: String,
    enum: ['short', 'full'],
    required: true,
  },

  answers: { type: mongoose.Schema.Types.Mixed, default: {} },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.ClinicalRecord ||
  mongoose.model('ClinicalRecord', ClinicalRecordSchema);
