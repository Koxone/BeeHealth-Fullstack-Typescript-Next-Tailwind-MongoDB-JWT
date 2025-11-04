// src/app/api/clinical-records/[id]/route.js
import { NextResponse } from 'next/server';
import ClinicalRecord from '@/models/ClinicalRecord';
import { connectDB } from '@/lib/mongodb';

export async function GET(_req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    // Find one
    const doc = await ClinicalRecord.findById(id)
      .populate('patient', '_id fullName email role')
      .populate('doctor', '_id fullName email role');

    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json({ ok: true, item: doc }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    // Load
    const doc = await ClinicalRecord.findById(id);
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Allowed simple fields
    const {
      status,
      visitDate,
      location,
      updatedBy,
      answers,
      attachmentsAdd,
      attachmentsRemoveUrls,
    } = body || {};

    // Update meta
    if (typeof status === 'string') doc.status = status;
    if (visitDate) doc.visitDate = new Date(visitDate);
    if (typeof location === 'string') doc.location = location;
    if (updatedBy) doc.updatedBy = updatedBy;

    // Upsert answers
    if (Array.isArray(answers) && answers.length) {
      const normalized = answers.map((a) => ({
        qId: a.qId,
        key: a.key,
        label: a.label,
        type: a.type,
        value: a.value ?? null,
        options: Array.isArray(a.options) ? a.options : undefined,
        notes: typeof a.notes === 'string' ? a.notes : '',
      }));
      doc.upsertAnswers(normalized);

      // Recompute vitals
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

      doc.vitals.bp = getStr(42);
      doc.vitals.hr = getNum(43);
      doc.vitals.rr = getNum(44);
      doc.vitals.temp = getStr(45);
      doc.vitals.spo2 = getStr(46);
      doc.vitals.bmi = getStr(47);
      doc.vitals.weightKg = getNum(48) ?? getNum(10) ?? doc.vitals.weightKg ?? null;
      doc.vitals.heightCm = getNum(49) ?? getNum(9) ?? doc.vitals.heightCm ?? null;
    }

    // Attachments add
    if (Array.isArray(attachmentsAdd) && attachmentsAdd.length) {
      for (const a of attachmentsAdd) {
        if (a?.url) {
          doc.attachments.push({
            url: a.url,
            title: a.title || '',
            mime: a.mime || '',
          });
        }
      }
    }

    // Attachments remove by URL
    if (Array.isArray(attachmentsRemoveUrls) && attachmentsRemoveUrls.length) {
      doc.attachments = doc.attachments.filter((a) => !attachmentsRemoveUrls.includes(a.url));
    }

    // Save
    await doc.save();

    // Return populated
    const saved = await ClinicalRecord.findById(doc._id)
      .populate('patient', '_id fullName email role')
      .populate('doctor', '_id fullName email role');

    return NextResponse.json({ ok: true, item: saved }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
