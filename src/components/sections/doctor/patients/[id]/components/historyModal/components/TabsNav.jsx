'use client';

/* Tabs navigation */
export default function TabsNav({ activeTab, setActiveTab }) {
  return (
    <div className="relative overflow-hidden bg-linear-to-r from-blue-500 to-cyan-500 px-6 py-6">
      {/* Decorative halo */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

      {/* Tabs */}
      <div className="relative flex gap-2">
        {/* Basic info tab */}
        <button
          type="button"
          onClick={() => setActiveTab('basico')}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeTab === 'basico'
              ? 'bg-white text-blue-600 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Información Básica
        </button>

        {/* Full history tab */}
        <button
          type="button"
          onClick={() => setActiveTab('completo')}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
            activeTab === 'completo'
              ? 'bg-white text-blue-600 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          Historial Completo
        </button>
      </div>
    </div>
  );
}
