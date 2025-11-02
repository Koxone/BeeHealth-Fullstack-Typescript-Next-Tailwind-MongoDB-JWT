import template from '@/data/clinicalRecordTemplate.json';

export function indexByQId() {
  const map = new Map();
  const sections = Array.isArray(template?.sections) ? template.sections : [];
  for (const sec of sections) {
    const fields = Array.isArray(sec.fields) ? sec.fields : [];
    for (const f of fields) {
      if (typeof f?.qId !== 'number') continue;
      map.set(f.qId, { ...f, __section: sec.title || 'Sección' });
    }
  }
  return map;
}

// Weight Control Section
export const CONTROL_PESO_IDS = [2, 5, 6, 7, 8, 9, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

// Dental Section
export const ODONTOLOGIA_IDS = [
  // Información básica
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  // Información general
  19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42,
  43, 44, 45, 46, 47,
  // Información clínica: Odontología
  58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
  // Antecedentes heredofamiliares
  82, 83, 84, 85, 86, 87,
  // Antecedentes personales patológicos
  88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109,
  110, 111, 112, 113, 114, 115, 116, 117,
  // Antecedentes no patológicos
  118, 119, 120, 121, 122, 123, 124, 125,
  // Inmunizaciones
  126, 127, 128, 129, 130, 131, 132,
  // Hábitos
  133, 134, 135, 136,
];

// Stetic Section
export const ESTETICO_IDS = [
  73, 74, 75, 76, 77, 78, 79, 80, 81, 161, 162, 163, 164, 165, 166, 167, 168,
];

/* Option packs for fallback yes/no */
export const YES_NO = [
  { value: 'Sí', label: 'Sí' },
  { value: 'No', label: 'No' },
];

/* Map JSON field.type -> UI kind */
export function normalizeField(jsonField) {
  /* Minimal normalization */
  let kind = jsonField.type;
  if (kind === 'text' || kind === 'number') kind = 'input';
  if (kind === 'checkbox') kind = 'radio';
  return { ...jsonField, kind };
}
