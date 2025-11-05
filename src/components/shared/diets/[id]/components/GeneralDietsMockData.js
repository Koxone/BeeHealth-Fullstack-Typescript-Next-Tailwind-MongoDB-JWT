export const diet = {
  id: 'mediterraneo',
  nombre: 'Plan Mediterráneo',
  duracion: '30 días',
  pacientesAsignados: 12,
  descripcion:
    'Dieta balanceada rica en vegetales, frutas, pescado y aceite de oliva. Este plan está diseñado para ayudar a los pacientes a alcanzar sus objetivos de peso de manera saludable y sostenible.',
  plan: [
    {
      titulo: 'Desayuno',
      hora: '8:00 AM',
      items: ['1 taza de avena con frutas', '1 yogurt natural', 'Té verde o café sin azúcar'],
    },
    {
      titulo: 'Almuerzo',
      hora: '1:00 PM',
      items: [
        'Ensalada verde con aceite de oliva',
        '150g de pescado a la plancha',
        '1 porción de arroz integral',
        'Agua natural',
      ],
    },
    {
      titulo: 'Cena',
      hora: '7:00 PM',
      items: [
        'Sopa de verduras',
        'Pechuga de pollo a la plancha',
        'Ensalada mixta',
        'Infusión de hierbas',
      ],
    },
  ],
  notas:
    'Recuerda mantener una hidratación adecuada (2 litros de agua al día). Evita alimentos procesados y azúcares refinados. Complementa con 30 minutos de ejercicio moderado diario.',
  pacientes: ['Juan Pérez', 'María López', 'Carlos Ruiz', 'Ana Martínez'],
};
