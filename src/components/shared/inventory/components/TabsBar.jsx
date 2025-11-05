'use client';

/* tabs */
export default function TabsBar({ activeTab, setActiveTab, icons }) {
  const items = [
    { id: 'medicamentos', label: 'Medicamentos', Icon: icons.Pill },
    { id: 'recetas', label: 'Recetas', Icon: icons.FileText },
    { id: 'suministros', label: 'Suministros', Icon: icons.Syringe },
  ];
  return (
    <div className="flex items-center gap-2 border-b border-gray-200 p-2">
      {items.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              active
                ? 'border border-blue-200 bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon className={`h-4 w-4 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
