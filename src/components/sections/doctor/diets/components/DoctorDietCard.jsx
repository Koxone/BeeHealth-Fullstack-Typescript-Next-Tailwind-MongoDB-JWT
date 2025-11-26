import DietCardActions from '@/components/shared/diets/components/DietCardActions';

export default function DoctorDietCard({ diet }) {
  return (
    <div className="group border-beehealth-green-primary-light group hover:border-beehealth-blue-primary-solid bg-beehealth-body-main rounded-xl border-2 p-4 shadow-sm transition-all duration-200 hover:shadow-lg md:p-6">
      {/* Diet Image */}
      <div className="relative mb-4 flex h-32 w-full scale-90 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-green-100 to-blue-100 transition-transform duration-250 group-hover:scale-100">
        <img src={diet?.images?.[0]} alt={diet?.name} />
      </div>

      {/* Diet Name */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
        {diet?.name}
      </h3>

      {/* Doctor Diet Stats */}
      <div className="mb-4 space-y-2 text-sm">
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Asignado a:</span> {diet?.patients?.length}{' '}
          Pacientes
        </p>
        <p className="text-gray-600">
          <span className="font-medium text-gray-800">Categoria:</span> {diet?.category}
        </p>
      </div>

      {/* Doctor Actions */}
      <DietCardActions id={diet?._id} />
    </div>
  );
}
