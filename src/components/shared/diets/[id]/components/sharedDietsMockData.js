export const diets = [
  {
    id: 'mediterranean',
    name: 'Plan Mediterráneo Premium',
    duration: '30 días',
    doctor: 'Arturo Lemus',
    assignedDate: '01 Oct 2025',
    assignedPatients: 12,
    description:
      'Un programa nutricional clínicamente estructurado inspirado en la dieta mediterránea tradicional. Combina alimentos ricos en antioxidantes, grasas saludables y proteínas de alta calidad para mejorar la salud metabólica y promover una pérdida de peso sostenible bajo supervisión médica.',
    plan: [
      {
        title: 'Desayuno',
        time: '8:00 AM',
        items: [
          'Avena integral con frutas frescas de temporada',
          'Yogurt natural con semillas de chía',
          'Té verde o café orgánico sin azúcar',
        ],
      },
      {
        title: 'Almuerzo',
        time: '1:00 PM',
        items: [
          'Ensalada mediterránea con aceite de oliva extra virgen',
          '150g de salmón o pescado blanco a la plancha',
          'Porción de arroz integral o quinoa',
          'Agua mineral con menta y pepino',
        ],
      },
      {
        title: 'Cena',
        time: '7:00 PM',
        items: [
          'Sopa ligera de verduras',
          'Pechuga de pollo orgánico o tofu marinado',
          'Ensalada mixta con aderezo de limón',
          'Infusión de manzanilla o lavanda',
        ],
      },
    ],
    notes:
      'Mantén una hidratación adecuada (2 litros diarios) y evita azúcares refinados. Complementa con 30 minutos de ejercicio moderado diario.',
    patients: ['Juan Pérez', 'María López', 'Carlos Ruiz', 'Ana Martínez'],
  },
  {
    id: 'keto',
    name: 'Plan Keto Balance',
    duration: '21 días',
    doctor: 'Laura Martínez',
    assignedDate: '10 Oct 2025',
    assignedPatients: 9,
    description:
      'Un protocolo cetogénico supervisado que reduce la ingesta de carbohidratos y favorece la quema de grasa corporal, manteniendo niveles estables de energía y un metabolismo eficiente.',
    plan: [
      {
        title: 'Desayuno',
        time: '8:30 AM',
        items: [
          'Huevos revueltos con aguacate',
          'Café negro o té sin azúcar',
          'Puñado de almendras',
        ],
      },
      {
        title: 'Almuerzo',
        time: '1:30 PM',
        items: [
          'Ensalada de espinacas con aceite de oliva y queso feta',
          'Pechuga de pollo al horno',
          'Agua con rodajas de limón',
        ],
      },
      {
        title: 'Cena',
        time: '7:30 PM',
        items: ['Filete de salmón con espárragos al vapor', 'Infusión digestiva'],
      },
    ],
    notes:
      'Evita frutas de alto índice glucémico. Revisa tu progreso semanal con el médico para ajustar grasas y proteínas según tu respuesta metabólica.',
    patients: ['Rosa Aguilar', 'Luis Torres', 'Beatriz Díaz'],
  },
  {
    id: 'detox',
    name: 'Plan Detox Antioxidante',
    duration: '10 días',
    doctor: 'Dr. Samuel Ortega',
    assignedDate: '15 Oct 2025',
    assignedPatients: 18,
    description:
      'Un plan de depuración metabólica que favorece la eliminación de toxinas, mejora la digestión y restablece la energía celular mediante alimentos naturales y líquidos funcionales.',
    plan: [
      {
        title: 'Desayuno',
        time: '7:30 AM',
        items: ['Jugo verde con espinaca, pepino y manzana', 'Pan integral con aguacate'],
      },
      {
        title: 'Almuerzo',
        time: '12:30 PM',
        items: ['Sopa de calabaza con cúrcuma', 'Tazón de quinoa con verduras al vapor'],
      },
      {
        title: 'Cena',
        time: '6:30 PM',
        items: ['Crema de apio', 'Té de jengibre con limón'],
      },
    ],
    notes:
      'Evita cafeína y alimentos procesados. Prioriza frutas frescas y verduras de hoja verde durante todo el plan.',
    patients: ['Andrea Jiménez', 'Carlos Mendoza'],
  },
  {
    id: 'highprotein',
    name: 'Plan Proteico Avanzado',
    duration: '45 días',
    doctor: 'Dra. Fernanda Ríos',
    assignedDate: '20 Oct 2025',
    assignedPatients: 14,
    description:
      'Diseñado para estimular el desarrollo muscular y la recuperación post-entrenamiento. Incluye proteínas magras de alta biodisponibilidad y carbohidratos complejos en proporción controlada.',
    plan: [
      {
        title: 'Desayuno',
        time: '7:00 AM',
        items: [
          'Batido proteico con leche vegetal y plátano',
          'Tostadas integrales con mantequilla de almendra',
        ],
      },
      {
        title: 'Almuerzo',
        time: '1:00 PM',
        items: ['Pechuga de pollo con camote al horno', 'Brócoli al vapor'],
      },
      {
        title: 'Cena',
        time: '8:00 PM',
        items: ['Claras de huevo con espinacas', 'Yogurt griego sin azúcar'],
      },
    ],
    notes:
      'Ideal para acompañar rutinas de fuerza. Ajustar porciones según masa magra y objetivos físicos.',
    patients: ['David Luna', 'Martina González'],
  },
  {
    id: 'lowcarb',
    name: 'Plan Low Carb Premium',
    duration: '28 días',
    doctor: 'Dr. Ignacio Herrera',
    assignedDate: '22 Oct 2025',
    assignedPatients: 10,
    description:
      'Programa de reducción de carbohidratos con control clínico, diseñado para disminuir picos de glucosa y favorecer la oxidación de grasa corporal.',
    plan: [
      {
        title: 'Desayuno',
        time: '8:00 AM',
        items: ['Huevos con espinacas', 'Café negro', 'Frutos secos'],
      },
      {
        title: 'Almuerzo',
        time: '1:00 PM',
        items: ['Ensalada de pollo con aguacate', 'Agua natural'],
      },
      {
        title: 'Cena',
        time: '7:00 PM',
        items: ['Pescado con brócoli', 'Infusión de hierbas'],
      },
    ],
    notes: 'Recomendado para control de glucosa y reducción de grasa abdominal.',
    patients: ['Marcos Varela', 'Lucía Ramírez'],
  },
  {
    id: 'vegan',
    name: 'Plan Vegano Integral',
    duration: '30 días',
    doctor: 'Dra. Rebeca Álvarez',
    assignedDate: '25 Oct 2025',
    assignedPatients: 11,
    description:
      'Plan 100% vegetal con enfoque en balance nutricional, garantizando un adecuado aporte proteico y de micronutrientes esenciales.',
    plan: [
      {
        title: 'Desayuno',
        time: '9:00 AM',
        items: ['Smoothie de frutas y espinaca', 'Pan integral con hummus'],
      },
      {
        title: 'Almuerzo',
        time: '2:00 PM',
        items: ['Bowl de garbanzos con vegetales', 'Agua de coco'],
      },
      {
        title: 'Cena',
        time: '8:00 PM',
        items: ['Tofu con verduras al wok', 'Infusión de jengibre'],
      },
    ],
    notes:
      'Asegura el consumo diario de legumbres y semillas. Complementa con B12 y omega-3 vegetal.',
    patients: ['Adriana Flores', 'Pedro Campos'],
  },
  {
    id: 'glutenfree',
    name: 'Plan Libre de Gluten Clínico',
    duration: '30 días',
    doctor: 'Dr. Javier Núñez',
    assignedDate: '28 Oct 2025',
    assignedPatients: 8,
    description:
      'Diseñado para pacientes con sensibilidad al gluten o enfermedad celíaca. Basado en alimentos naturales sin harinas refinadas.',
    plan: [
      {
        title: 'Desayuno',
        time: '7:30 AM',
        items: ['Pan sin gluten con aguacate', 'Té de hierbas'],
      },
      {
        title: 'Almuerzo',
        time: '1:00 PM',
        items: ['Pollo a la plancha', 'Arroz y ensalada'],
      },
      {
        title: 'Cena',
        time: '7:30 PM',
        items: ['Sopa de lentejas', 'Yogurt natural'],
      },
    ],
    notes:
      'Evita todo tipo de productos con trigo, cebada o centeno. Prioriza alimentos frescos y sin procesar.',
    patients: ['Laura Vega', 'Roberto Molina'],
  },
  {
    id: 'cardio',
    name: 'Plan Salud Cardiovascular',
    duration: '40 días',
    doctor: 'Dra. Patricia Lozano',
    assignedDate: '30 Oct 2025',
    assignedPatients: 15,
    description:
      'Enfocado en reducir colesterol LDL y mejorar la función arterial mediante una dieta rica en fibra, antioxidantes y ácidos grasos omega-3.',
    plan: [
      {
        title: 'Desayuno',
        time: '8:00 AM',
        items: ['Avena con nueces', 'Té verde'],
      },
      {
        title: 'Almuerzo',
        time: '1:00 PM',
        items: ['Pescado azul con vegetales', 'Agua con limón'],
      },
      {
        title: 'Cena',
        time: '7:00 PM',
        items: ['Ensalada con aguacate', 'Infusión de manzanilla'],
      },
    ],
    notes: 'Limita el consumo de grasas saturadas. Aumenta la ingesta de frutos secos y legumbres.',
    patients: ['Héctor Ruiz', 'Elena Gómez'],
  },
  {
    id: 'paleo',
    name: 'Plan Paleo Nutricional',
    duration: '30 días',
    doctor: 'Dr. Ricardo Vargas',
    assignedDate: '01 Nov 2025',
    assignedPatients: 13,
    description:
      'Inspirado en la alimentación ancestral, prioriza proteínas animales, vegetales frescos y frutas bajas en azúcar para mejorar la energía y la función digestiva.',
    plan: [
      {
        title: 'Desayuno',
        time: '9:00 AM',
        items: ['Huevos con verduras', 'Frutas frescas'],
      },
      {
        title: 'Almuerzo',
        time: '2:00 PM',
        items: ['Carne magra a la plancha', 'Verduras al vapor'],
      },
      {
        title: 'Cena',
        time: '8:00 PM',
        items: ['Pescado con espinacas', 'Té herbal'],
      },
    ],
    notes: 'Evita granos, legumbres y azúcares procesados. Ideal para control de inflamación.',
    patients: ['Iván Morales', 'Daniela Cruz'],
  },
  {
    id: 'antiinflammatory',
    name: 'Plan Antiinflamatorio Clínico',
    duration: '35 días',
    doctor: 'Dra. Elisa Romero',
    assignedDate: '03 Nov 2025',
    assignedPatients: 10,
    description:
      'Basado en alimentos con propiedades antiinflamatorias naturales como cúrcuma, jengibre, frutos rojos y pescado azul. Ideal para pacientes con dolor articular o fatiga crónica.',
    plan: [
      {
        title: 'Desayuno',
        time: '8:30 AM',
        items: ['Smoothie de frutos rojos', 'Tostadas integrales con aguacate'],
      },
      {
        title: 'Almuerzo',
        time: '1:30 PM',
        items: ['Salmón al horno', 'Ensalada de espinaca y nueces'],
      },
      {
        title: 'Cena',
        time: '7:30 PM',
        items: ['Crema de zanahoria', 'Infusión de cúrcuma'],
      },
    ],
    notes:
      'Evita carnes procesadas, azúcares y aceites refinados. Aumenta el consumo de omega-3 y antioxidantes.',
    patients: ['Nora León', 'Pablo Castillo'],
  },
  {
    id: 'mind',
    name: 'Plan MIND Cognitivo',
    duration: '50 días',
    doctor: 'Dr. Álvaro Esquivel',
    assignedDate: '05 Nov 2025',
    assignedPatients: 7,
    description:
      'Desarrollado para potenciar la salud cerebral y prevenir el deterioro cognitivo mediante el equilibrio entre la dieta DASH y la mediterránea, priorizando alimentos neuroprotectores.',
    plan: [
      {
        title: 'Desayuno',
        time: '7:30 AM',
        items: ['Avena con arándanos', 'Café sin azúcar'],
      },
      {
        title: 'Almuerzo',
        time: '12:30 PM',
        items: ['Pollo a la parrilla con brócoli', 'Agua mineral'],
      },
      {
        title: 'Cena',
        time: '6:30 PM',
        items: ['Sopa de verduras verdes', 'Té de hierbas'],
      },
    ],
    notes:
      'Ideal para adultos mayores o pacientes con antecedentes familiares de deterioro cognitivo. Prioriza frutas rojas, pescado y aceite de oliva.',
    patients: ['Felipe García', 'Sofía Ortiz'],
  },
];
