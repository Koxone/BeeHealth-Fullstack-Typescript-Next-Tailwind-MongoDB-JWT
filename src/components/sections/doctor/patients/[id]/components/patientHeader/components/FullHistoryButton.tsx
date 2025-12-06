'use client';

export default function FullHistoryButton({ onClickFullHistory }) {
  return (
    <div className="bg-beehealth-green-primary-solid flex h-full flex-col justify-between space-y-2 rounded-lg p-2">
      {/* Title */}
      <p className="text-xs">Historia Clinica Completa</p>

      {/* Content */}
      <button
        onClick={onClickFullHistory}
        className="bg-beehealth-green-secondary-solid hover:bg-beehealth-green-secondary-solid-hover flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition active:scale-95 sm:w-auto"
      >
        Ver historia completa
      </button>
    </div>
  );
}
