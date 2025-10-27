import mongoose from 'mongoose';

const ClinicHistorySchema = new mongoose.Schema(
  {
    // Referencia al paciente
    pacienteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paciente',
      required: true,
      index: true,
    },

    // Referencia al médico (opcional)
    medicoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    // ==========================================
    // TAB 1: INFORMACIÓN BÁSICA
    // ==========================================
    fecha: { type: Date, required: true },
    peso: { type: Number, required: true, min: 0 },
    imc: { type: Number, required: true, min: 0 },

    // Signos Vitales
    presionArterial: { type: String, trim: true },
    glucosa: { type: String, trim: true },
    colesterol: { type: String, trim: true },

    // Diagnóstico y Tratamiento
    diagnostico: { type: String, trim: true },
    tratamiento: { type: String, trim: true },
    notas: { type: String, trim: true },

    // ==========================================
    // TAB 2: HISTORIAL COMPLETO
    // ==========================================

    // Pregunta 1: Tratamiento médico
    p1_tratamientoMedico: { type: Boolean, default: null },
    p1_cual: { type: String, trim: true },

    // Pregunta 2: Medicamentos
    p2_medicamento: { type: Boolean, default: null },
    p2_cual: { type: String, trim: true },

    // Pregunta 3: Alergias
    p3_alergiaMedicamento: { type: Boolean, default: null },
    p3_cual: { type: String, trim: true },

    // Pregunta 4: Hospitalización
    p4_hospitalizadoQuirurgicamente: { type: Boolean, default: null },
    p4_motivo: { type: String, trim: true },

    // Pregunta 5: Hemorragias
    p5_hemorragias: { type: Boolean, default: null },

    // Pregunta 6: Cicatrización
    p6_problemasCicatrizacion: { type: Boolean, default: null },

    // Pregunta 7: Padecimientos
    p7_padecimientos: {
      hipertension: { type: Boolean, default: false },
      diabetes: { type: Boolean, default: false },
      cardiacos: { type: Boolean, default: false },
      hepatitis: { type: Boolean, default: false },
      vih: { type: Boolean, default: false },
      gastritis: { type: Boolean, default: false },
      epilepsia: { type: Boolean, default: false },
      asma: { type: Boolean, default: false },
      cancer: { type: Boolean, default: false },
      otro: { type: String, trim: true },
    },

    // Pregunta 8: Embarazo
    p8_embarazada: { type: Boolean, default: null },
    p8_mesesGestacion: { type: Number, min: 0, max: 9 },

    // Pregunta 9: Tabaco
    p9_fuma: { type: Boolean, default: null },
    p9_cigarrillosDia: { type: Number, min: 0 },

    // Pregunta 10: Alcohol
    p10_bebidasAlcoholicas: { type: Boolean, default: null },
    p10_frecuencia: { type: String, trim: true },

    // Pregunta 11: Drogas
    p11_drogas: { type: Boolean, default: null },
    p11_cual: { type: String, trim: true },

    // Pregunta 12: Cepillado
    p12_cepilladoDiario: {
      type: String,
      enum: ['1', '2', '3', 'ninguna'],
      default: null,
    },

    // Pregunta 13: Hilo dental
    p13_hiloDental: { type: Boolean, default: null },

    // Pregunta 14: Sangrado encías
    p14_sangradoEncias: { type: Boolean, default: null },

    // Pregunta 15: Pérdida dientes
    p15_perdidaDientes: { type: Boolean, default: null },
    p15_cuantos: { type: Number, min: 0 },

    // Pregunta 16: Tratamiento dental anterior
    p16_tratamientoDentalAnterior: { type: Boolean, default: null },
    p16_tipoTratamiento: { type: String, trim: true },

    // Pregunta 17: Prótesis/Lentes
    p17_protesisLentes: { type: Boolean, default: null },

    // Pregunta 18: Reacción anestesia
    p18_reaccionAnestesia: { type: Boolean, default: null },
    p18_cual: { type: String, trim: true },

    // Pregunta 19: Dolor dental
    p19_dolorDental: { type: Boolean, default: null },
    p19_ubicacion: {
      arriba: { type: Boolean, default: false },
      abajo: { type: Boolean, default: false },
      izquierda: { type: Boolean, default: false },
      derecha: { type: Boolean, default: false },
      varios: { type: Boolean, default: false },
    },

    // Pregunta 20: Causante del dolor
    p20_causanteDolor: {
      frio: { type: Boolean, default: false },
      calor: { type: Boolean, default: false },
      presion: { type: Boolean, default: false },
      morder: { type: Boolean, default: false },
    },

    // Pregunta 21: Información adicional
    p21_informacionAdicional: { type: String, trim: true },

    // Metadata
    activo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Índices
ClinicHistorySchema.index({ pacienteId: 1, fecha: -1 });
ClinicHistorySchema.index({ createdAt: -1 });
ClinicHistorySchema.index({ medicoId: 1, pacienteId: 1 });

export default mongoose.models.HistorialClinico ||
  mongoose.model('HistorialClinico', ClinicHistorySchema);
