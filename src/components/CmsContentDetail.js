"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "../lib/supabase";
import { mapKonten } from "../lib/cms";

export default function CmsContentDetail({
  id,
  fallbackItem = null,
}) {
  const [item, setItem] = useState(fallbackItem);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      const supabase = getSupabase();

      if (!supabase) {
        if (active) {
          setLoading(false);
          setNotFound(!fallbackItem);
        }

        return;
      }

      const isUuid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          id
        );

      const column = isUuid ? "id" : "slug";

      const result = await supabase
        .from("cms_contents")
        .select("*")
        .eq(column, id)
        .eq("is_published", true)
        .maybeSingle();

      if (!active) return;

      if (result.data) {
        setItem(mapKonten(result.data));
      } else if (!fallbackItem) {
        setNotFound(true);
      }

      setLoading(false);
    }

    load();

    return () => {
      active = false;
    };
  }, [id, fallbackItem]);

  if (loading && !item) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-20 text-sm text-stone-500">
        Memuat artikel…
      </div>
    );
  }

  if (notFound || !item) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold text-emerald-950">
          Artikel tidak ditemukan
        </h1>

        <p className="mt-3 text-sm text-stone-600">
          Artikel mungkin belum ditayangkan atau alamatnya tidak tepat.
        </p>

        <Link
          href="/berita"
          className="mt-6 inline-flex rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Kembali ke berita
        </Link>
      </div>
    );
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

      {item.gambar && (
        <figure className="mt-7 overflow-hidden rounded-2xl bg-stone-100">
          <img
            src={item.gambar}
            alt={item.judul}
            className="max-h-[540px] w-full object-cover"
          />
        </figure>
      )}

      <div className="mx-auto mt-8 max-w-3xl">
        <p className="border-l-4 border-emerald-700 pl-5 text-lg font-medium leading-8 text-stone-700">
          {item.ringkasan}
        </p>

        <div className="mt-6 whitespace-pre-line text-base leading-8 text-stone-700">
          {item.isi}
        </div>

        {item.sumber && (
          <a
            href={item.sumber}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex text-sm font-semibold text-emerald-800 hover:underline"
          >
            Baca sumber resmi ↗
          </a>
        )}

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