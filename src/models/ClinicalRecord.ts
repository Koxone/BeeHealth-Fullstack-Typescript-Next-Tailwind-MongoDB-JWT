import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface
export interface IClinicalRecord extends Document {
  patient: mongoose.Types.ObjectId;
  doctor?: mongoose.Types.ObjectId;
  specialty: 'weight' | 'dental' | 'stetic';
  version: 'short' | 'full';
  answers: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

const AnswerSchema = new mongoose.Schema({
  qId: { type: Number, required: true },
  value: { type: mongoose.Schema.Types.Mixed },
});

const ClinicalRecordSchema = new Schema<IClinicalRecord>({
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'User' },

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

  answers: { type: Schema.Types.Mixed, default: {} },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const models = mongoose.models ?? {};

export const ClinicalRecord: Model<IClinicalRecord> =
  (models.ClinicalRecord as Model<IClinicalRecord>) ||
  mongoose.model<IClinicalRecord>('ClinicalRecord', ClinicalRecordSchema);

export default ClinicalRecord;
