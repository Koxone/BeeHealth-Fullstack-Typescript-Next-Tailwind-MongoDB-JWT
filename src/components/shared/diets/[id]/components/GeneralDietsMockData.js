export const diet = {
  id: 'mediterranean',
  name: 'Plan Mediterráneo Premium',
  duration: '30 días',
  assignedPatients: 12,
  description:
    'Un programa nutricional clínicamente estructurado inspirado en la dieta mediterránea tradicional. Este plan combina una selección precisa de alimentos ricos en antioxidantes, grasas saludables y proteínas de alta calidad, orientado a optimizar tu composición corporal, mejorar la salud metabólica y promover una pérdida de peso sostenible bajo supervisión médica.',
  plan: [
    {
      title: 'Desayuno',
      time: '8:00 AM',
      items: [
        'Avena integral cocida con frutas frescas de temporada',
        'Yogurt natural sin azúcar con semillas de chía',
        'Infusión antioxidante (té verde o café orgánico sin endulzantes)',
      ],
    },
    {
      title: 'Almuerzo',
      time: '1:00 PM',
      items: [
        'Ensalada mediterránea con aceite de oliva extra virgen',
        '150g de pescado blanco o salmón a la plancha',
        'Porción medida de arroz integral o quinoa',
        'Agua mineral o con infusión de pepino y menta',
      ],
    },
    {
      title: 'Cena',
      time: '7:00 PM',
      items: [
        'Sopa ligera de verduras con especias naturales',
        'Pechuga de pollo orgánico o tofu marinado a la plancha',
        'Ensalada mixta con aderezo de aceite de oliva y limón',
        'Infusión relajante de hierbas (manzanilla o lavanda)',
      ],
    },
  ],
  notes:
    'Este plan fue diseñado por la Dra. Martínez para pacientes que buscan resultados clínicamente controlados sin comprometer el bienestar general. Se recomienda mantener una hidratación óptima (mínimo 2 litros diarios), evitar alimentos ultraprocesados y azúcares añadidos, y acompañar la dieta con 30 minutos diarios de actividad física moderada. Las pautas pueden ajustarse según evolución y requerimientos metabólicos individuales.',
  patients: ['Juan Pérez', 'María López', 'Carlos Ruiz', 'Ana Martínez'],
};
