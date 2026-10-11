import Link from "next/link";

export default function CompactNewsSection({
  label,
  title,
  description,
  items,
}) {
  return (
    <section className="min-w-0">
      <div className="border-b border-stone-200 pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
          {label}
        </p>

        <h2 className="mt-2 text-2xl font-bold text-emerald-950">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-stone-600">
          {description}
        </p>
      </div>

      <div className="mt-3 divide-y divide-stone-200">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/berita/${item.id}`}
            className="flex gap-4 py-4"
          >
            <img
              src={item.gambar}
              alt={item.judul}
              loading="lazy"
              className="h-20 w-24 shrink-0 rounded-lg object-cover sm:h-24 sm:w-28"
            />

            <div className="min-w-0">
              <p className="text-[11px] text-stone-500">
                {item.tanggal}
              </p>

              <h3 className="mt-1 line-clamp-3 text-sm font-bold leading-5 text-stone-900 hover:text-emerald-800">
                {item.judul}
              </h3>

              <span className="mt-2 inline-block text-xs font-semibold text-emerald-800">
                Baca selengkapnya ↗
              </span>
            </div>
          </Link>
        ))}
      </div>

      {items.length === 0 && (
        <p className="py-5 text-sm text-stone-500">
          Belum ada artikel pada kategori ini.
        </p>
      )}
    </section>
  );
}