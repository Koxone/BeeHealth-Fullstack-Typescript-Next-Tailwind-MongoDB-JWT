'use client';

/* header */
import { Package } from 'lucide-react'; /* icon */
export default function HeaderBar() {
  return (
    <div className="-mx-4 -mt-4 mb-6 bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 px-4 pt-6 pb-8 md:rounded-2xl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-start gap-4">
          <div className="rounded-2xl bg-blue-600 p-3 shadow-lg">
            <Package className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Inventario
            </h1>
            <p className="text-base text-gray-600 md:text-lg">
              Control de medicamentos, recetas y suministros
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
