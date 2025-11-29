import mongoose, { Schema, Document, Types } from 'mongoose';
import AnswerSchema, { IAnswer } from './Answer';

export interface IClinicalRecord extends Document {
  patient: Types.ObjectId;
  specialty: 'weight' | 'dental' | 'stetic';
  version: 'short' | 'full';
  answers: IAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

const ClinicalRecordSchema: Schema<IClinicalRecord> = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    specialty: { type: String, enum: ['weight', 'dental', 'stetic'], required: true },
    version: { type: String, enum: ['short', 'full'], required: true },
    answers: [AnswerSchema],
  },
  { timestamps: true }
);

export const ClinicalRecord =
  mongoose.models.ClinicalRecord || 
  mongoose.model<IClinicalRecord>('ClinicalRecord', ClinicalRecordSchema);
