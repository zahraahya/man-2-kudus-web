"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getSupabase } from "../lib/supabase";
import { mapKonten } from "../lib/cms";

export default function CmsFeaturedHero({ fallbackItem }) {
  const [item, setItem] = useState(fallbackItem);

  useEffect(() => {
    let active = true;

    async function loadFeatured() {
      const supabase = getSupabase();

      if (!supabase) return;

      if (fallbackItem?.id) {
        const featuredResult = await supabase
          .from("cms_contents")
          .select("*")
          .eq("slug", fallbackItem.id)
          .eq("is_published", true)
          .maybeSingle();

        if (featuredResult.data) {
          if (active) {
            setItem(mapKonten(featuredResult.data));
          }

          return;
        }
      }

      const latestResult = await supabase
        .from("cms_contents")
        .select("*")
        .eq("is_published", true)
        .order("content_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (active && latestResult.data) {
        setItem(mapKonten(latestResult.data));
      }
    }

    loadFeatured();

    return () => {
      active = false;
    };
  }, [fallbackItem]);

  if (!item) {
    return (
      <section className="bg-[#f4f5ed]">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <h1 className="text-3xl font-bold text-emerald-950">
            Selamat datang di MAN 2 Kudus
          </h1>
          <p className="mt-3 text-stone-600">
            Madrasah Akademik Berbasis Riset.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f4f5ed]">
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Logo MAN 2 Kudus"
            className="h-11 w-11 object-contain"
          />

          <div>
            <p className="text-sm font-extrabold tracking-wide text-emerald-950">
              MADRASAH ALIYAH NEGERI 2 KUDUS
            </p>
            <p className="mt-1 text-xs text-stone-500">
              Madrasah Akademik Berbasis Riset
            </p>
          </div>
        </div>

        <div className="grid overflow-hidden rounded-2xl bg-white md:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-11">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-emerald-900">
                BERITA UTAMA
              </span>
              <span className="text-stone-500">{item.tanggal}</span>
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              {item.kategori === "Berita"
                ? "Informasi Madrasah"
                : "Prestasi dan Inspirasi"}
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-4xl">
              {item.judul}
            </h1>

            <p className="mt-4 text-sm leading-7 text-stone-600">
              {item.ringkasan}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/berita/${item.id}`}
                className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Baca berita utama ↗
              </Link>

              <Link
                href="/berita"
                className="rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 hover:border-emerald-800 hover:text-emerald-900"
              >
                Semua berita
              </Link>
            </div>
          </div>

          <Link
            href={`/berita/${item.id}`}
            className="relative min-h-[280px] overflow-hidden bg-stone-200 md:min-h-[390px]"
            aria-label={`Baca berita ${item.judul}`}
          >
            <img
              src={item.gambar || "/images/sekolah.jpg"}
              alt={item.judul}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/85 to-transparent p-6 pt-20 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                Publikasi MAN 2 Kudus
              </p>

              <p className="mt-2 text-xl font-bold">{item.judul}</p>
              <p className="mt-1 text-sm text-white/80">
                {item.tanggal}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}