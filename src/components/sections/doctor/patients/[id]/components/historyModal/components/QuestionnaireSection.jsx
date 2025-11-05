'use client';

/* parts */
import QuestionCard from './QuestionCard';

/* questionnaire */
export default function QuestionnaireSection({ isReadOnly, icons }) {
  const { ClipboardList } = icons;

  return (
    <div className="space-y-6">
      {/* title */}
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <ClipboardList className="h-5 w-5 text-blue-600" />
        Cuestionario Médico Completo
      </h3>

      {/* 1 */}
      <QuestionCard
        label="1. ¿Se encuentra bajo tratamiento médico actualmente?"
        isReadOnly={isReadOnly}
      >
        {/* Radios */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p1"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p1"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        {/* Extra */}
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">¿Cuál?</label>
          <input
            type="text"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Especifique el tratamiento..."
          />
        </div>
      </QuestionCard>

      {/* 2 */}
      <QuestionCard label="2. ¿Está tomando algún medicamento?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p2"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p2"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">¿Cuál?</label>
          <input
            type="text"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Especifique el medicamento..."
          />
        </div>
      </QuestionCard>

      {/* 3 */}
      <QuestionCard label="3. ¿Es alérgico a algún medicamento?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p3"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p3"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">¿A cuál?</label>
          <input
            type="text"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Especifique la alergia..."
          />
        </div>
      </QuestionCard>

      {/* 4 */}
      <QuestionCard label="4. ¿Ha sido hospitalizado quirúrgicamente?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p4"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p4"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">¿Por qué motivo?</label>
          <input
            type="text"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Especifique el motivo..."
          />
        </div>
      </QuestionCard>

      {/* 5 */}
      <QuestionCard label="5. ¿Ha tenido hemorragias?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p5"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p5"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
      </QuestionCard>

      {/* 6 */}
      <QuestionCard label="6. ¿Ha tenido problemas de cicatrización?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p6"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p6"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
      </QuestionCard>

      {/* 7 padecimientos */}
      <QuestionCard label="7. Padece o ha padecido:" isReadOnly={isReadOnly}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {[
            ['p7_hipertension', 'Hipertensión'],
            ['p7_diabetes', 'Diabetes'],
            ['p7_cardiacos', 'Problemas Cardiacos'],
            ['p7_hepatitis', 'Hepatitis'],
            ['p7_vih', 'VIH/SIDA'],
            ['p7_gastritis', 'Gastritis'],
            ['p7_epilepsia', 'Epilepsia'],
            ['p7_asma', 'Asma'],
            ['p7_cancer', 'Cáncer'],
          ].map(([name, label]) => (
            <label key={name} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={name}
                disabled={isReadOnly}
                className="h-4 w-4 rounded text-blue-600"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">
            Otro (especifique):
          </label>
          <input
            type="text"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Otro padecimiento..."
          />
        </div>
      </QuestionCard>

      {/* 8 embarazo */}
      <QuestionCard label="8. ¿Está embarazada?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p8"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p8"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">
            Meses de gestación:
          </label>
          <input
            type="number"
            min="0"
            max="9"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Número de meses..."
          />
        </div>
      </QuestionCard>

      {/* 9 fuma */}
      <QuestionCard label="9. ¿Fuma?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p9"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p9"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">
            ¿Cuántos cigarrillos al día?
          </label>
          <input
            type="number"
            min="0"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Cantidad..."
          />
        </div>
      </QuestionCard>

      {/* 10 alcohol */}
      <QuestionCard label="10. ¿Ingiere bebidas alcohólicas?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p10"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p10"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">
            ¿Con qué frecuencia?
          </label>
          <input
            type="text"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Ej: Una vez por semana..."
          />
        </div>
      </QuestionCard>

      {/* 11 drogas */}
      <QuestionCard label="11. ¿Ha consumido o consume drogas?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p11"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p11"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">¿Cuál?</label>
          <input
            type="text"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Tipo de droga..."
          />
        </div>
      </QuestionCard>

      {/* 12 cepillado */}
      <QuestionCard
        label="12. ¿Cuántas veces al día se cepilla los dientes?"
        isReadOnly={isReadOnly}
      >
        <div className="flex flex-wrap gap-3">
          {[
            ['1', '1 vez'],
            ['2', '2 veces'],
            ['3', '3 veces'],
            ['ninguna', 'Ninguna'],
          ].map(([value, label]) => (
            <label key={value} className="flex items-center gap-2">
              <input
                type="radio"
                name="p12"
                value={value}
                disabled={isReadOnly}
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </QuestionCard>

      {/* 13 hilo dental */}
      <QuestionCard label="13. ¿Utiliza hilo dental?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p13"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p13"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
      </QuestionCard>

      {/* 14 sangrado encías */}
      <QuestionCard label="14. ¿Le sangran las encías al cepillarse?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p14"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p14"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
      </QuestionCard>

      {/* 15 dientes perdidos */}
      <QuestionCard label="15. ¿Ha perdido algún diente?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p15"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p15"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">¿Cuántos?</label>
          <input
            type="number"
            min="0"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Número de dientes..."
          />
        </div>
      </QuestionCard>

      {/* 16 trat dental */}
      <QuestionCard
        label="16. ¿Ha recibido tratamiento dental anteriormente?"
        isReadOnly={isReadOnly}
      >
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p16"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p16"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">
            ¿Qué tipo de tratamiento?
          </label>
          <input
            type="text"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Tipo de tratamiento..."
          />
        </div>
      </QuestionCard>

      {/* 17 prótesis/lentes */}
      <QuestionCard label="17. ¿Usa prótesis o lentes de contacto?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p17"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p17"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
      </QuestionCard>

      {/* 18 anestesia */}
      <QuestionCard
        label="18. ¿Presentó alguna reacción adversa a la anestesia?"
        isReadOnly={isReadOnly}
      >
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p18"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p18"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">¿Cuál?</label>
          <input
            type="text"
            disabled={isReadOnly}
            className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Tipo de reacción..."
          />
        </div>
      </QuestionCard>

      {/* 19 dolor dental */}
      <QuestionCard label="19. ¿Le duele algún diente?" isReadOnly={isReadOnly}>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p19"
              value="si"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">Sí</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="p19"
              value="no"
              disabled={isReadOnly}
              className="h-4 w-4 text-blue-600"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-gray-600">
            Ubicación del dolor:
          </label>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
            {[
              ['p19_arriba', 'Arriba'],
              ['p19_abajo', 'Abajo'],
              ['p19_izquierda', 'Izquierda'],
              ['p19_derecha', 'Derecha'],
              ['p19_varios', 'Varios'],
            ].map(([name, label]) => (
              <label key={name} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={name}
                  disabled={isReadOnly}
                  className="h-4 w-4 rounded text-blue-600"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </QuestionCard>

      {/* 20 con qué duele */}
      <QuestionnaireGroup
        label="20. ¿Con qué le duele?"
        options={[
          ['p20_frio', 'Frío'],
          ['p20_calor', 'Calor'],
          ['p20_presion', 'Presión'],
          ['p20_morder', 'Al morder'],
        ]}
        isReadOnly={isReadOnly}
      />

      {/* 21 adicional */}
      <QuestionCard
        label="21. ¿Tiene algo importante que agregar a este cuestionario y que no se le haya preguntado anteriormente?"
        isReadOnly={isReadOnly}
      >
        <textarea
          rows="4"
          disabled={isReadOnly}
          className="w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          placeholder="Ingrese información adicional relevante..."
        />
      </QuestionCard>
    </div>
  );
}

/* compact group for checkboxes */
function QuestionnaireGroup({ label, options, isReadOnly }) {
  return (
    <QuestionCard label={label} isReadOnly={isReadOnly}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {options.map(([name, text]) => (
          <label key={name} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={name}
              disabled={isReadOnly}
              className="h-4 w-4 rounded text-blue-600"
            />
            <span className="text-sm text-gray-700">{text}</span>
          </label>
        ))}
      </div>
    </QuestionCard>
  );
}
