export default function PatientMotivationalBanner({ message, ctaLabel, onCta }) {
  return (
    <div className="rounded-xl bg-linear-to-r from-blue-500 to-blue-600 p-4 text-white shadow-sm md:p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-white/20 p-3" aria-hidden />
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold">Sigue así</h3>
          <p className="mb-3 text-sm text-blue-50">
            Tu meta es 10 kg. Mantén el enfoque y sigue avanzando.
          </p>
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 active:scale-95">
            Ver mi progreso
          </button>
        </div>
      </div>
    </div>
  );
}
