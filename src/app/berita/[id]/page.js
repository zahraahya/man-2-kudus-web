import Link from "next/link";
import { notFound } from "next/navigation";
import { berita } from "../../../data/berita";

export function generateStaticParams() {
  return berita.map((item) => ({
    id: item.id,
  }));
}

export default async function DetailBerita({ params }) {
  const { id } = await params;

  const item = berita.find(
    (beritaItem) => beritaItem.id === id
  );

  if (!item) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
      <Link
        href="/berita"
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-600"
      >
        ← Kembali ke berita
      </Link>

      <header className="mt-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900">
            {item.kategori}
          </span>

          <span className="text-sm text-stone-500">
            {item.tanggal}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-5xl">
          {item.judul}
        </h1>

        <p className="mt-4 text-sm text-stone-500">
          Publikasi MAN 2 Kudus
        </p>
      </header>

      <figure className="mt-7 overflow-hidden rounded-2xl bg-stone-100">
        <img
          src={item.gambar}
          alt={item.judul}
          className="max-h-[540px] w-full object-cover"
        />
      </figure>

      <div className="mx-auto mt-8 max-w-3xl">
        <p className="border-l-4 border-emerald-700 pl-5 text-lg font-medium leading-8 text-stone-700">
          {item.ringkasan}
        </p>

        <div className="mt-6 whitespace-pre-line text-base leading-8 text-stone-700">
          {item.isi}
        </div>

        <div className="mt-9 border-t border-stone-200 pt-6">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            ← Kembali ke semua berita
          </Link>
        </div>
      </div>
    </article>
  );
}