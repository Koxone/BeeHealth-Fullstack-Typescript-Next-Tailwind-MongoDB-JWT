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
export const CONTROL_PESO_IDS = [
  2, 3, 4, 5, 6, 10, 11, 13, 14, 15, 16, 17, 18, 20, 21, 19, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91,
  92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 116, 117,
  111, 112, 113, 114, 115, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131,
  132, 136, 133, 134, 135, 137, 138, 139, 140, 141, 142, 143, 144, 145, 148, 149, 152, 153,
];

// Dental Section
export const ODONTOLOGIA_IDS = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 25, 26, 27, 28, 29, 22,
  23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 45, 47, 43, 44, 46, 58, 59, 60, 61,
  62, 63, 65, 66, 67, 68, 69, 70, 71, 64, 72, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94,
  95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
  115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133,
  134, 135, 136,
];
// 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 155, 156, 157, 158, 159, 160

// Stetic Section
export const ESTETICO_IDS = [
  2, 3, 4, 5, 6, 10, 11, 13, 14, 15, 16, 17, 18, 20, 21, 19, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91,
  92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 116, 117,
  111, 112, 113, 114, 115, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131,
  132, 136, 133, 134, 135, 137, 138, 139, 140, 141, 142, 143, 144, 145, 148, 149, 152, 153,
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
