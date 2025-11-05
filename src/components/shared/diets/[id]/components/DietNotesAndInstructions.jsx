export default function DietNotesAndInstructions({ text }) {
  return (
    <div className="rounded border-l-4 border-blue-500 bg-blue-50 p-4">
      <p className="text-gray-700">{text}</p>
    </div>
  );
}
