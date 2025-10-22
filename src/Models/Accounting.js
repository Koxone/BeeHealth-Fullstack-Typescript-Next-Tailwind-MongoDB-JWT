import mongoose from 'mongoose';

/* Accounting records for consultations, medications, and expenses */
const AccountingSchema = new mongoose.Schema(
  {
    period: { type: String, required: true, unique: true }, // YYYY-MM
    createdAt: { type: String, default: () => new Date().toISOString() },
    updatedAt: { type: String },
    status: { type: String, enum: ['active', 'closed', 'archived'], default: 'active' },

    consultations: [
      {
        id: String,
        date: String,
        patient: String,
        type: String,
        amount: Number,
        paid: Boolean,
        paymentMethod: String,
        notes: String,
      },
    ],

    medications: [
      {
        id: String,
        name: String,
        type: { type: String, enum: ['purchase', 'sale'] },
        quantity: Number,
        unitPrice: Number,
        total: Number,
        supplier: String,
        date: String,
        notes: String,
      },
    ],

    expenses: [
      {
        id: String,
        concept: String,
        amount: Number,
        category: String,
        date: String,
        notes: String,
      },
    ],

    totals: {
      incomeConsultations: { type: Number, default: 0 },
      incomeMedications: { type: Number, default: 0 },
      expensesTotal: { type: Number, default: 0 },
      netBalance: { type: Number, default: 0 },
    },

    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Accounting || mongoose.model('Accounting', AccountingSchema);
