import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWeightLog extends Document {
  patient: Types.ObjectId;
  clinicalRecord: Types.ObjectId;
  previousWeight: number;
  currentWeight: number;
  weightDifference: number;
  createdAt: Date;
  updatedAt: Date;
}

const WeightLogSchema: Schema<IWeightLog> = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    clinicalRecord: { type: Schema.Types.ObjectId, ref: 'ClinicalRecord', required: true },
    previousWeight: { type: Number, required: true },
    currentWeight: { type: Number, required: true },
    weightDifference: { type: Number, required: true },
  },
  { timestamps: true }
);

WeightLogSchema.index({ patient: 1, createdAt: -1 });

WeightLogSchema.pre('save', function (next) {
  this.weightDifference = this.currentWeight - this.previousWeight;
  next();
});

export default WeightLogSchema;
export const WeightLog =
  mongoose.models.WeightLog || mongoose.model<IWeightLog>('WeightLog', WeightLogSchema);
