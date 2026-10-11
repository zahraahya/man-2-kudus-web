
import Link from "next/link";

export default function BeritaCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5">
      <Link
        href={`/berita/${item.id}`}
        className="block overflow-hidden bg-stone-100"
        aria-label={`Baca berita ${item.judul}`}
      >
        <img
          src={item.gambar}
          alt={item.judul}
          loading="lazy"
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-900">
            {item.kategori}
          </span>

          <span>{item.tanggal}</span>
        </div>

        <h2 className="mt-4 text-lg font-bold leading-snug text-stone-900 transition group-hover:text-emerald-900">
          <Link href={`/berita/${item.id}`}>
            {item.judul}
          </Link>
        </h2>

        <p className="mt-3 text-sm leading-7 text-stone-600">
          {item.ringkasan}
        </p>

        <Link
          href={`/berita/${item.id}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition hover:text-emerald-600"
        >
          Baca selengkapnya ↗
        </Link>
      </div>
    </article>
  );
}
