'use client';

import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import useSound from 'use-sound';

export default function RegisterVisitButton({ onClick }) {
  const [isChecked, setIsChecked] = useState(false);

  // Load your sound from public/
  const [play] = useSound('/ping.mp3', { volume: 0.6 });

  const handleClick = async () => {
    play(); 
    setIsChecked(true);
    if (onClick) onClick();

    setTimeout(() => setIsChecked(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#1bad69] px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-[#3d584c] active:scale-95 sm:w-auto"
    >
      {/* Normal state */}
      <span
        className={`flex items-center gap-2 transition-all duration-300 ${
          isChecked ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <Plus className="h-4 w-4" />
        Registrar Visita
      </span>

      {/* Check animation */}
      <span
        className={`absolute flex items-center justify-center transition-all duration-300 ${
          isChecked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <Check className="animate-ping-once h-5 w-5 text-white" />
      </span>
    </button>
  );
}
