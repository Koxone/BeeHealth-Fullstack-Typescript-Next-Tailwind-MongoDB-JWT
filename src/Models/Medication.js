import mongoose from 'mongoose';

/* Medication inventory and audit */
const MedicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    stock: { type: Number, required: true, default: 0 },
    minimum: { type: Number, required: true, default: 5 },
    cost: { type: Number, required: true },
    price: { type: Number, required: true },
    supplier: { type: String },
    purchaseDate: { type: String },
    registeredAt: { type: String, default: () => new Date().toISOString() },

    createdBy: { type: String },
    updatedBy: { type: String },
    updatedAt: { type: String },
    notes: { type: String },
    status: {
      type: String,
      enum: ['active', 'out_of_stock', 'expired', 'under_review'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Medication || mongoose.model('Medication', MedicationSchema);
