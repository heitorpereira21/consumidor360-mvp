export default function ResultCard({ text }: { text: string }) {
  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-2">
        Orientação inicial
      </h3>

      <p className="text-gray-800 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
