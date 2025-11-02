import { connectDB } from '@/lib/mongodb';
import ClinicalRecord from '@/models/ClinicalRecord';

export async function GET(req, context) {
  try {
    const { id } = await context.params; // ← ahora sí lo obtiene correctamente

    if (!id) {
      return new Response(
        JSON.stringify({ ok: false, error: 'No se proporcionó el id del usuario' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await connectDB();

    const records = await ClinicalRecord.find({ patient: id }).sort({ createdAt: -1 }).lean();

    const cleaned = records.map((r) => ({
      ...r,
      answersByQId:
        r.answersByQId && typeof r.answersByQId === 'object' && !Array.isArray(r.answersByQId)
          ? r.answersByQId
          : {},
    }));

    return new Response(
      JSON.stringify({
        ok: true,
        total: cleaned.length,
        records: cleaned,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
