"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ekstrakurikulerAwal } from "../data/ekstrakurikuler";
import {
  getSupabase,
  supabaseConfigured,
} from "../lib/supabase";

const tabs = [
  "Semua",
  "Ekstrakurikuler",
  "Organisasi Murid",
];

function ActivityCard({ item }) {
  const image = item.image_url || "/images/sekolah.jpg";

  return (
    <article className="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/5">
      <div className="relative h-48 overflow-hidden bg-stone-100">
        <img
          src={image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-900 shadow-sm">
          {item.kind}
        </span>
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold text-emerald-950">
          {item.name}
        </h2>

        <p className="mt-3 text-sm leading-7 text-stone-600">
          {item.description}
        </p>

        {item.source_url && (
          <a
            href={item.source_url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-emerald-800 hover:underline"
          >
            Lihat sumber resmi ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function PublicExtracurriculars() {
  const [items, setItems] = useState(ekstrakurikulerAwal);
  const [activeTab, setActiveTab] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [cmsActive, setCmsActive] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadItems() {
      const supabase = getSupabase();

      if (!supabase) {
        if (active) setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("extracurriculars")
        .select("*")
        .eq("is_published", true)
        .order("order_index", { ascending: true })
        .order("name", { ascending: true });

      if (!active) return;

      if (!error && data) {
        setItems(data);
        setCmsActive(true);
      }

      setLoading(false);
    }

    loadItems();

    return () => {
      active = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    if (activeTab === "Semua") return items;

    return items.filter((item) => item.kind === activeTab);
  }, [items, activeTab]);

  return (
    <>
      <section className="bg-[#f4f5ed]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
            Pengembangan Minat dan Bakat
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-5xl">
            Ekstrakurikuler & organisasi murid.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
            Ruang bagi murid MAN 2 Kudus untuk mengembangkan kreativitas,
            keterampilan, kepemimpinan, kerja sama, serta potensi di
            bidang akademik dan nonakademik.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://web.man2kudus.sch.id/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Situs resmi MAN 2 Kudus ↗
            </a>

            <Link
              href="/about#keunggulan"
              className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 hover:border-emerald-800 hover:text-emerald-900"
            >
              Lihat keunggulan madrasah
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              Kegiatan Murid
            </p>

            <h2 className="mt-2 text-2xl font-bold text-emerald-950 sm:text-3xl">
              Kenali kegiatannya.
            </h2>

            <p className="mt-3 text-sm leading-7 text-stone-600">
              Daftar ini memakai publikasi dan dokumen madrasah sebagai
              referensi. Beberapa kegiatan mengacu pada Renstra
              2020–2024, sehingga status aktif terbarunya perlu
              dikonfirmasi ke madrasah.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2"
            aria-label="Filter kegiatan"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  activeTab === tab
                    ? "bg-emerald-900 text-white"
                    : "border border-stone-200 bg-white text-stone-700 hover:border-emerald-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <p className="mt-8 text-sm text-stone-500">
            Memuat kegiatan…
          </p>
        )}

        {filteredItems.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <ActivityCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-stone-300 p-8 text-sm text-stone-500">
            Belum ada kegiatan pada kategori ini.
          </div>
        )}

        {!supabaseConfigured && (
          <p className="mt-5 text-xs text-stone-400">
            Daftar awal berdasarkan publikasi/dokumen resmi. Setelah
            CMS dikonfigurasi, data yang dikelola admin dapat
            menggantikan daftar ini.
          </p>
        )}

        {cmsActive && (
          <p className="mt-5 text-xs text-stone-400">
            Daftar ini dimuat dari data CMS yang ditayangkan admin.
          </p>
        )}
      </section>
    </>
  );
}