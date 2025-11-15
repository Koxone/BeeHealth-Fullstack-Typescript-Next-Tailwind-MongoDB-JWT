import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITransaction extends Document {
  inventory: mongoose.Types.ObjectId;
  movement?: 'IN' | 'OUT';
  reasonType: 'initial' | 'sale' | 'restock' | 'correction' | 'status_change';
  quantity?: number;
  reason?: string;
  performedBy: mongoose.Types.ObjectId;
  patient?: mongoose.Types.ObjectId;

  /* Quantity change fields */
  oldQuantity?: number;
  newQuantity?: number;
  quantityDelta?: number;

  /* Price change fields */
  oldCostPrice?: number;
  newCostPrice?: number;
  oldSalePrice?: number;
  newSalePrice?: number;

  /* Helpers to identify what changed for price */
  priceField?: 'costPrice' | 'salePrice' | 'both';
  priceDelta?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    inventory: { type: Schema.Types.ObjectId, ref: 'Inventory', required: true },
    movement: { type: String, enum: ['IN', 'OUT'], required: false },
    reasonType: {
      type: String,
      enum: ['initial', 'sale', 'restock', 'correction', 'status_change'],
      required: true,
    },
    quantity: { type: Number, required: false },
    reason: { type: String, trim: true },
    performedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    patient: { type: Schema.Types.ObjectId, ref: 'User' },

    /* Price change fields */
    oldCostPrice: { type: Number },
    newCostPrice: { type: Number },
    oldSalePrice: { type: Number },
    newSalePrice: { type: Number },

    /* Quantity change fields */
    oldQuantity: { type: Number },
    newQuantity: { type: Number },
    quantityDelta: { type: Number },

    /* Helpers */
    priceField: { type: String, enum: ['costPrice', 'salePrice', 'both'] },
    priceDelta: { type: Number },
  },
  { timestamps: true }
);

const models = mongoose.models ?? {};

export const Transaction: Model<ITransaction> =
  (models.Transaction as Model<ITransaction>) ||
  mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
export type { ITransaction };
