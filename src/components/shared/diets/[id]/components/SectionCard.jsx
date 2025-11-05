export default function SectionCard({ title, children }) {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">{title}</h2>
      {children}
    </div>
  );
}
