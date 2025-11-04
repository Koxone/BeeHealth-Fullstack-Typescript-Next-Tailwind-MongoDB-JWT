// models/ClinicalRecord.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

/* Enums */
const SPECIALTIES = ['weight', 'dental', 'stetic'];
const RECORD_STATUS = ['draft', 'submitted', 'signed', 'closed'];

/* QIDs unified from your JSON */
// Vital signs and anthropometrics
const QIDS = {
  height: 9, // Altura (cm)
  weight: 10, // Peso actual (kg)
  bp: 42, // Tensión arterial
  hr: 43, // Frecuencia cardiaca
  rr: 44, // Frecuencia respiratoria
  temp: 45, // Temperatura
  spo2: 46, // Saturación de oxígeno
  bmi: 47, // IMC
  weightMeasured: 48, // Peso medido en consulta (kg) - solo en full en weight
  heightMeasured: 49, // Talla medida en consulta (cm) - solo en full en weight
};

/* Subdocument: Answer */
// Minimal structure, front is driven by qId + key
const AnswerSchema = new Schema(
  {
    qId: { type: Number, required: true },
    key: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ['text', 'number', 'date', 'textarea', 'select', 'radio', 'checkbox'],
    },
    value: { type: Schema.Types.Mixed, default: null },
    options: { type: [Schema.Types.Mixed], default: undefined },
    notes: { type: String, default: '' },
  },
  { _id: false }
);

/* Schema: ClinicalRecord */
const ClinicalRecordSchema = new Schema(
  {
    templateName: { type: String, default: 'clinicalRecordTemplate' },
    templateVersion: { type: Number, default: 1 },

    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    specialty: { type: String, required: true, enum: SPECIALTIES, index: true },

    status: { type: String, enum: RECORD_STATUS, default: 'draft', index: true },

    visitDate: { type: Date, default: Date.now },
    location: { type: String, default: '' },

    answers: {
      type: [AnswerSchema],
      default: [],
      validate: {
        validator: function uniqueQids(arr) {
          const seen = new Set();
          for (const a of arr) {
            if (seen.has(a.qId)) return false;
            seen.add(a.qId);
          }
          return true;
        },
        message: 'Duplicated qId inside answers',
      },
    },

    /* Denormalized vitals */
    vitals: {
      bp: { type: String, default: '' }, // qId 42
      hr: { type: Number, default: null }, // qId 43
      rr: { type: Number, default: null }, // qId 44
      temp: { type: String, default: '' }, // qId 45
      spo2: { type: String, default: '' }, // qId 46
      bmi: { type: String, default: '' }, // qId 47
      weightKg: { type: Number, default: null }, // qId 48 fallback 10
      heightCm: { type: Number, default: null }, // qId 49 fallback 9
    },

    createdBy: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    signedAt: { type: Date, default: null },
    closedAt: { type: Date, default: null },

    attachments: [
      {
        url: { type: String, required: true },
        title: { type: String, default: '' },
        mime: { type: String, default: '' },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

/* Indexes */
ClinicalRecordSchema.index({ patient: 1, specialty: 1, createdAt: -1 });
ClinicalRecordSchema.index({ doctor: 1, specialty: 1, createdAt: -1 });

/* Virtuals */
ClinicalRecordSchema.virtual('bmiComputed').get(function () {
  const kg = this.vitals?.weightKg;
  const cm = this.vitals?.heightCm;
  if (!kg || !cm) return null;
  const m = cm / 100;
  const bmi = kg / (m * m);
  return Number.isFinite(bmi) ? Number(bmi.toFixed(2)) : null;
});

/* Methods */
// Upsert single answer
ClinicalRecordSchema.methods.setAnswer = function setAnswer(ans) {
  if (!ans || typeof ans.qId !== 'number') return this;
  const idx = this.answers.findIndex((a) => a.qId === ans.qId);
  if (idx >= 0) {
    this.answers[idx] = { ...(this.answers[idx].toObject?.() ?? this.answers[idx]), ...ans };
  } else {
    this.answers.push(ans);
  }
  return this;
};

// Get answer by qId
ClinicalRecordSchema.methods.getAnswer = function getAnswer(qId) {
  return this.answers.find((a) => a.qId === qId) || null;
};

// Bulk upsert
ClinicalRecordSchema.methods.upsertAnswers = function upsertAnswers(list = []) {
  for (const ans of list) this.setAnswer(ans);
  return this;
};

/* Statics */
// Factory from front payload
ClinicalRecordSchema.statics.createFromPayload = async function createFromPayload({
  patientId,
  doctorId,
  specialty,
  answers = [],
  visitDate,
  location,
  createdBy,
}) {
  const doc = new this({
    patient: patientId,
    doctor: doctorId,
    specialty,
    visitDate: visitDate || new Date(),
    location: location || '',
    createdBy: createdBy || doctorId || patientId,
  });

  doc.upsertAnswers(answers);

  // Helpers
  const getNum = (q) => {
    const a = doc.getAnswer(q);
    const v = a?.value;
    const n = typeof v === 'string' ? Number(v) : v;
    return Number.isFinite(n) ? n : null;
  };
  const getStr = (q) => {
    const a = doc.getAnswer(q);
    return a?.value != null ? String(a.value) : '';
  };

  // Map vitals using unified qIds
  doc.vitals.bp = getStr(QIDS.bp);
  doc.vitals.hr = getNum(QIDS.hr);
  doc.vitals.rr = getNum(QIDS.rr);
  doc.vitals.temp = getStr(QIDS.temp);
  doc.vitals.spo2 = getStr(QIDS.spo2);
  doc.vitals.bmi = getStr(QIDS.bmi);

  // Measured in clinic first, fallback to self-reported
  doc.vitals.weightKg = getNum(QIDS.weightMeasured) ?? getNum(QIDS.weight) ?? null;
  doc.vitals.heightCm = getNum(QIDS.heightMeasured) ?? getNum(QIDS.height) ?? null;

  return doc.save();
};

export default mongoose.models.ClinicalRecord ||
  mongoose.model('ClinicalRecord', ClinicalRecordSchema);
