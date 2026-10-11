export default function SectionTitle({
  label,
  title,
  description,
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
        {label}
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 leading-7 text-stone-600">
          {description}
        </p>
      )}
    </div>
  );
}