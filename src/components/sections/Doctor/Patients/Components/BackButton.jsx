'use client';

/* back button */
export default function BackButton({ onClick, icon }) {
  const { ArrowLeft } = icon;
  return (
    <button
      onClick={onClick}
      className="group flex w-fit items-center gap-2 rounded-lg px-4 py-2 text-gray-600 transition hover:text-gray-900 active:scale-95"
    >
      <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
      <span className="font-medium">Volver a Pacientes</span>
    </button>
  );
}
