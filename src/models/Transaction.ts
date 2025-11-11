import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITransaction extends Document {
  inventory: mongoose.Types.ObjectId;
  type: 'IN' | 'OUT';
  quantity: number;
  reason?: string;
  patient: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    inventory: { type: Schema.Types.ObjectId, ref: 'Inventory', required: true },
    type: { type: String, enum: ['IN', 'OUT'], required: true },
    quantity: { type: Number, required: true },
    reason: { type: String, trim: true },
    patient: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const models = mongoose.models ?? {};

export const Transaction: Model<ITransaction> =
  (models.Transaction as Model<ITransaction>) ||
  mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
export type { ITransaction };
