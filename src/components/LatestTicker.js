
import Link from "next/link";

export default function LatestTicker({ items = [] }) {
  if (items.length === 0) return null;

  const daftar = [...items, ...items];

  return (
    <section
      className="border-b border-emerald-900/10 bg-emerald-950 text-white"
      aria-label="Berita terbaru MAN 2 Kudus"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 lg:px-8">
        <span className="shrink-0 py-3 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
          Latest <span aria-hidden="true">/</span>
        </span>

        <div className="ticker-window min-w-0 flex-1">
          <div className="ticker-track">
            {daftar.map((item, index) => (
              <Link
                href={`/berita/${item.id}`}
                key={`${item.id}-${index}`}
                tabIndex={index < items.length ? 0 : -1}
                aria-hidden={index >= items.length}
                className="ticker-item flex items-center gap-3 text-sm text-white/90 transition hover:text-emerald-300"
              >
                <span className="text-emerald-300" aria-hidden="true">
                  ↗
                </span>
                <span className="truncate">{item.judul}</span>
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/berita"
          className="hidden shrink-0 py-3 text-xs font-semibold text-emerald-200 transition hover:text-white sm:block"
        >
          Semua berita
        </Link>
      </div>
    </section>
  );
}
