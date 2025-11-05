'use client';

/* Tabs navigation */
export default function TabsNav({ activeTab, setActiveTab }) {
  const tabs = [
    'Datos',
    'General',
    'Presupuestos',
    'Cotización',
    'Caja',
    'Facturas',
    'Productos',
    'Antecedentes',
    'Ortodoncia',
    'Imágenes',
    'Receta',
    'Laboratorios',
    'Citas',
  ];

  return (
    <div className="flex w-full flex-wrap items-center justify-start rounded-md border border-gray-200 bg-gray-50 p-1">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-medium transition ${
            index !== tabs.length - 1 ? 'border-r border-gray-200' : ''
          } ${
            activeTab === tab
              ? 'bg-white text-gray-900 shadow-sm'
              : 'bg-gray-50 text-blue-600 hover:bg-white'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
