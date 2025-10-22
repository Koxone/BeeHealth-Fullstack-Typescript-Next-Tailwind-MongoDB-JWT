'use client';

/* header */
export default function HeaderBar({ icons }) {
  const { CalendarIcon } = icons;
  return (
    <div className="-mx-4 -mt-4 mb-6 bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 pt-6 pb-8 md:rounded-2xl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 p-3 shadow-lg">
            <CalendarIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Mi Calendario
            </h1>
            <p className="text-base text-gray-600 md:text-lg">
              Visualiza y gestiona tus citas médicas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
