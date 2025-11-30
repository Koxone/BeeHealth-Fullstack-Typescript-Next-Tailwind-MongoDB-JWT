import { useState } from 'react';
import { Pencil } from 'lucide-react';

export default function EditRecordDateButton({ onSelect }) {
  const [open, setOpen] = useState(false);

  // Today in MX timezone
  const today = new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/Mexico_City',
  });

  return (
    <div className="relative flex items-center justify-center">
      <button
        title="Editar fecha de consulta"
        onClick={() => setOpen(!open)}
        className="text-beehealth-blue-primary-solid bg-beehealth-blue-primary-solid hover:bg-beehealth-blue-primary-solid-hover mt-2 flex items-center justify-center rounded-sm border px-2 py-1 text-xs font-semibold"
      >
        <Pencil className="h-4 w-4 text-white" />
      </button>

      {open && (
        <div className="bg-beehealth-blue-primary-solid absolute bottom-full left-7 z-50 mb-2 -translate-x-1/2 rounded-md border p-2 shadow-lg">
          <input
            type="date"
            defaultValue={today}
            className="rounded border px-2 py-1 text-sm"
            onChange={(e) => {
              const value = e.target.value;
              onSelect(value);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
