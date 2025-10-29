// models/ClinicalHistory.js

import mongoose from 'mongoose';

const ClinicalHistorySchema = new mongoose.Schema(
  {
    /* --- Relaciones --- */
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PatientProfile',
      index: true,
      required: false,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DoctorProfile',
      index: true,
      required: false,
    },

    /* --- Información básica (común a todas las especialidades) --- */
    informacionBasica: {
      fecha: { type: Date, default: Date.now },
      nombreCompleto: { type: String, trim: true },
      fechaNacimiento: { type: String },
      lugarNacimiento: { type: String },
      edad: { type: Number },
      genero: { type: String },
      alturaCm: { type: Number },
      pesoActualKg: { type: Number },
      tallaCm: { type: Number },
      ocupacion: { type: String },
      estadoCivil: { type: String },
      rfc: { type: String },
      correo: { type: String, lowercase: true, trim: true },
      domicilio: { type: String },
      telefonoCelular: { type: String },
      telefonoFijo: { type: String },
      contactoEmergencia: { type: String },
      telefonoEmergencia: { type: String },
    },

    /* --- Información general --- */
    informacionGeneral: {
      motivoConsulta: { type: String },
      alergiasConocidas: { type: String },
      medicamentosActuales: { type: String },
      buenEstadoSalud: { type: String },
      bajoTratamiento: { type: String },
      tomandoMedicamentos: { type: String },
      alergicoMedicamentos: { type: String },
      operadoHospitalizado: { type: String },
      hemorragias: { type: String },
      problemasCicatrizacion: { type: String },
      otrasEnfermedades: { type: String },
      enfermedades: {
        diabetes: { type: Boolean, default: false },
        hipertension: { type: Boolean, default: false },
        hepatitis: { type: Boolean, default: false },
        vih: { type: Boolean, default: false },
        cancer: { type: Boolean, default: false },
        asma: { type: Boolean, default: false },
        epilepsia: { type: Boolean, default: false },
        gastritis: { type: Boolean, default: false },
        ansiedadDepresion: { type: Boolean, default: false },
        otras: { type: String },
      },
      consumoAlcohol: { type: String },
      consumoTabaco: { type: String },
      consumoDrogas: { type: String },
      embarazo: { type: String },
      lactancia: { type: String },
      anticonceptivos: { type: String },
      medicamentosPotencia: { type: String },
      hijos: { type: String },
    },

    /* --- Información clínica específica --- */
    informacionClinica: {
      /* Control de peso */
      controlPeso: {
        pesoObjetivo: { type: Number },
        actividadFisica: { type: String },
        horasSueno: { type: Number },
        consumoAgua: { type: Number },
        enfermedadesCronicas: { type: String },
        medicamentosActuales: { type: String },
        alergiasAlimentarias: { type: String },
        tipoAlimentacion: { type: String },
        cirugiasPrevias: { type: String },
        motivoConsultaPeso: { type: String },
      },

      /* Odontología */
      odontologia: {
        motivoConsultaOdonto: { type: String },
        primeraVisita: { type: String },
        visitaAnteriorAgradable: { type: String },
        fluor: { type: String },
        extraccionDientes: { type: String },
        sangradoPostExtraccion: { type: String },
        tratamientosPrevios: { type: String },
        perdidaDientes: { type: String },
        sangradoEncias: { type: String },
        cepilladoDiario: { type: String },
        enjuagueBucal: { type: String },
        hiloDental: { type: String },
        usaCepillo: { type: String },
        dolorDental: { type: String },
        tipoDolor: { type: String },
      },

      /* Estética */
      estetica: {
        motivoTratamiento: { type: String },
        cirugiasPrevias: { type: String },
        reaccionesAnestesia: { type: String },
        enfermedadesInterfieren: { type: String },
        condicionPiel: { type: String },
        zonaInteres: { type: String },
        tratamientosPrevios: { type: String },
        expectativas: { type: String },
        alergiasQuimicos: { type: String },
      },
    },

    /* --- Antecedentes --- */
    antecedentes: {
      heredofamiliares: {
        diabetes: { type: Boolean, default: false },
        epilepsia: { type: Boolean, default: false },
        hepatitis: { type: Boolean, default: false },
        hipertension: { type: Boolean, default: false },
        malformaciones: { type: Boolean, default: false },
        artritis: { type: Boolean, default: false },
      },
      personalesPatologicos: {
        cardiopatias: { type: Boolean, default: false },
        enfermedadesMentales: { type: Boolean, default: false },
        neoplasias: { type: Boolean, default: false },
        enfermedadesRenales: { type: Boolean, default: false },
        varicela: { type: Boolean, default: false },
        sarampion: { type: Boolean, default: false },
        neuralgia: { type: Boolean, default: false },
        viasBiliares: { type: Boolean, default: false },
        asma: { type: Boolean, default: false },
        enfermedadesRespiratorias: { type: Boolean, default: false },
        hepatitis: { type: Boolean, default: false },
        digestivo: { type: Boolean, default: false },
        hipotiroidismo: { type: Boolean, default: false },
        migraña: { type: Boolean, default: false },
        epilepsia: { type: Boolean, default: false },
        ansiedadDepresion: { type: Boolean, default: false },
        hipertension: { type: Boolean, default: false },
        diabetes: { type: Boolean, default: false },
        cancer: { type: Boolean, default: false },
        vih: { type: Boolean, default: false },
        ets: { type: Boolean, default: false },
        piel: { type: Boolean, default: false },
        fracturas: { type: Boolean, default: false },
        hospitalizaciones: { type: String },
        cirugias: { type: String },
        alteracionesHormonales: { type: String },
        hijos: { type: String },
        anticonceptivos: { type: String },
        embarazo: { type: String },
        lactancia: { type: String },
      },
      noPatologicos: {
        tipoAlimentacion: { type: String },
        comidasDia: { type: String },
        intolerancias: { type: String },
        alimentosNoConsume: { type: String },
        lavadoManos: { type: String },
        usoCepillo: { type: String },
        usoEnjuague: { type: String },
        usoHilo: { type: String },
      },
      inmunizaciones: {
        poliomielitis: { type: Boolean, default: false },
        tuberculosis: { type: Boolean, default: false },
        dtp: { type: Boolean, default: false },
        tripleViral: { type: Boolean, default: false },
        sarampion: { type: Boolean, default: false },
        hepatitisB: { type: Boolean, default: false },
        otras: { type: String },
      },
      habitos: {
        alcohol: { type: String },
        tabaco: { type: String },
        drogas: { type: String },
        deportes: { type: String },
      },
    },

    /* --- Exploración física --- */
    exploracionFisica: {
      cabeza: { type: String },
      cuello: { type: String },
      torax: { type: String },
      abdomen: { type: String },
      extremidades: { type: String },
    },

    /* --- Signos vitales --- */
    signosVitales: {
      tensionArterial: { type: String },
      frecuenciaCardiaca: { type: String },
      frecuenciaRespiratoria: { type: String },
      temperatura: { type: String },
      saturacionOxigeno: { type: String },
      imc: { type: String },
      peso: { type: Number },
      talla: { type: Number },
    },

    /* --- Campos clínicos del médico --- */
    camposMedico: {
      datosClinicos: {
        fechaRegistro: { type: Date },
        medicoResponsable: { type: String },
        diagnosticoPreliminar: { type: String },
        tratamientoSugerido: { type: String },
        notas: { type: String },
      },
      odontologia: {
        cavidadBucal: { type: String },
        cuelloEstructuras: { type: String },
        diagnosticoDental: { type: String },
        planTratamientoDental: { type: String },
        materialesUsados: { type: String },
        recomendacionesPaciente: { type: String },
      },
      estetica: {
        diagnosticoFacial: { type: String },
        condicionPiel: { type: String },
        zonasTratadas: { type: String },
        productoTecnica: { type: String },
        fechaTratamiento: { type: Date },
        evolucion: { type: String },
        complicaciones: { type: String },
        recomendacionesPost: { type: String },
      },
      seguimiento: {
        diagnosticoDefinitivo: { type: String },
        tratamientoPrescrito: { type: String },
        medicamentosIndicados: { type: String },
        observacionesEvolucion: { type: String },
        recomendacionesFinales: { type: String },
        fechaRevisionSiguiente: { type: Date },
        firmaMedico: { type: String },
      },
    },

    /* --- Observaciones y complementos --- */
    complementos: {
      pasatiempos: { type: String },
      comoSeEntero: { type: String },
      adultoResponsable: { type: String },
      recomendadoPor: { type: String },
      observacionesPersonales: { type: String },
      comentarioLibre: { type: String },
    },
  },
  { timestamps: true }
);

/* --- Índices adicionales --- */
ClinicalHistorySchema.index({ 'informacionBasica.nombreCompleto': 1 });
ClinicalHistorySchema.index({ 'informacionGeneral.motivoConsulta': 1 });

export default mongoose.models.ClinicalHistory ||
  mongoose.model('ClinicalHistory', ClinicalHistorySchema);
