"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BeritaCard from "./BeritaCard";
import CompactNewsSection from "./CompactNewsSection";
import {
  getSupabase,
  supabaseConfigured,
} from "../lib/supabase";
import { mapKonten } from "../lib/cms";

export default function CmsHomeNews({ staticItems }) {
  const [items, setItems] = useState(staticItems);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadCms() {
      const supabase = getSupabase();

      if (!supabase) {
        if (active) setLoaded(true);
        return;
      }

      const { data, error } = await supabase
        .from("cms_contents")
        .select("*")
        .eq("is_published", true)
        .order("content_date", { ascending: false });

      if (active && !error && data) {
        setItems(data.map(mapKonten));
      }

      if (active) setLoaded(true);
    }

    loadCms();

    return () => {
      active = false;
    };
  }, [staticItems]);

  const beritaTerbaru = items
    .filter(
      (item) =>
        item.id !== "juara-msq-mtq-xxix" &&
        item.kategori === "Berita"
    )
    .slice(0, 3);

  const beritaRiset = items
    .filter((item) => item.kategori === "Riset & Teknologi")
    .slice(0, 3);

  const beritaInspirasi = items
    .filter((item) => item.kategori === "Inspirasi")
    .slice(0, 3);

  const prestasiUmum = items
    .filter((item) => item.kategori === "Prestasi")
    .slice(0, 3);

  return (
    <>
      <section
        id="publikasi"
        className="scroll-mt-36 border-y border-stone-100 bg-[#f7f7f2]"
      >
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                Publikasi
              </p>

              <h2 className="mt-2 text-2xl font-bold text-emerald-950 sm:text-3xl">
                Berita terbaru.
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                Informasi prestasi, kegiatan, dan perkembangan pendidikan
                di lingkungan MAN 2 Kudus.
              </p>
            </div>

            <Link
              href="/berita"
              className="shrink-0 text-sm font-bold text-emerald-800 hover:text-emerald-600"
            >
              Semua berita ↗
            </Link>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {beritaTerbaru.map((item) => (
              <BeritaCard key={item.id} item={item} />
            ))}
          </div>

          {beritaTerbaru.length === 0 && (
            <p className="mt-5 text-sm text-stone-500">
              Belum ada berita yang ditayangkan.
            </p>
          )}

          {!supabaseConfigured && (
            <p className="mt-4 text-xs text-stone-400">
              Konten dikelola secara statis sampai koneksi CMS
              dikonfigurasi.
            </p>
          )}

          {loaded && supabaseConfigured && (
            <p className="mt-4 text-xs text-stone-400">
              Publikasi diperbarui dari CMS saat halaman dibuka.
            </p>
          )}
        </div>
      </section>

      <section className="border-y border-stone-100 bg-[#f7f7f2]">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div id="riset-teknologi" className="scroll-mt-36">
              <CompactNewsSection
                label="Riset & Teknologi"
                title="Riset dan inovasi."
                description="Penelitian, pengembangan teknologi, dan prestasi murid."
                items={beritaRiset}
              />
            </div>

            <div id="inspirasi" className="scroll-mt-36">
              <CompactNewsSection
                label="Inspirasi"
                title="Kisah yang menginspirasi."
                description="Kisah murid dan warga madrasah dalam berkarya dan meraih prestasi."
                items={beritaInspirasi}
              />
            </div>
          </div>

          {prestasiUmum.length > 0 && (
            <div className="mt-10 border-t border-stone-200 pt-8">
              <div className="mb-5 max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                  Prestasi
                </p>

                <h2 className="mt-2 text-2xl font-bold text-emerald-950">
                  Capaian madrasah.
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {prestasiUmum.map((item) => (
                  <BeritaCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}