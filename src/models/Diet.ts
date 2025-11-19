import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';

export interface IDiet {
  doctor: mongoose.Types.ObjectId | IUser;
  patients: (mongoose.Types.ObjectId | IUser)[];
  name: string;
  category?: string;
  recommendations?: string;
  benefits?: string;
  ingredients?: string[];
  instructions?: string;
  description?: string;
  isActive?: boolean;
  suggestions?: string;
  images?: string[];
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const DietSchema = new Schema<IDiet>(
  {
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    patients: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    name: { type: String, trim: true, required: true },
    category: { type: String, trim: true },
    recommendations: { type: String, trim: true },
    benefits: { type: String, trim: true },
    ingredients: [{ type: String, trim: true }],
    instructions: { type: String, trim: true },
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    suggestions: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

const models = mongoose.models ?? {};
export const Diet: Model<IDiet> = models.Diet || mongoose.model<IDiet>('Diet', DietSchema);

export default Diet;
