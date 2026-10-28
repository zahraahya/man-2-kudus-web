
"use client";

import { useEffect, useState } from "react";
import { getSupabase, supabaseConfigured } from "../lib/supabase";

const dokumenGtk = {
  Guru: {
    title: "Data Guru MAN 2 Kudus",
    description:
      "Dokumen guru yang ditautkan langsung dari halaman resmi MAN 2 Kudus. Berkas yang tersedia berjudul tahun ajaran 2025/2026; cek situs resmi untuk pembaruan terbaru.",
    preview:
      "https://drive.google.com/file/d/1O0ufRymNlCc-bzN8zckk3vwhSSrgrGIb/preview",
    source: "https://web.man2kudus.sch.id/guru/",
  },
  "Tenaga Kependidikan": {
    title: "Data Tenaga Kependidikan MAN 2 Kudus",
    description:
      "Dokumen tenaga kependidikan yang ditautkan langsung dari halaman resmi MAN 2 Kudus. Berkas yang tersedia berjudul tahun ajaran 2025/2026; cek situs resmi untuk pembaruan terbaru.",
    preview:
      "https://drive.google.com/file/d/1dncvNEM6-qQfNpfPkz1TldWiNWTvrVa_/preview",
    source: "https://web.man2kudus.sch.id/tenaga-kependidikan/",
  },
};

export default function TeachersDirectory({ initialTab = "Guru" }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeDoc = dokumenGtk[activeTab];

  useEffect(() => {
    let active = true;

    async function loadProfiles() {
      try {
        const supabase = getSupabase();

        if (!supabase) {
          if (active) setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("teachers")
          .select("*")
          .eq("is_published", true)
          .order("order_index", { ascending: true })
          .order("name", { ascending: true });

        if (active && !error && data) {
          setProfiles(data);
        }

        if (error) {
          console.error("Gagal memuat profil GTK:", error.message);
        }
      } catch (error) {
        console.error("Terjadi kesalahan saat memuat profil GTK:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProfiles();

    return () => {
      active = false;
    };
  }, []);

  const listProfiles = profiles.filter(
    (person) => person.role === activeTab
  );

  return (
    <>
      {/* HEADER */}
      <section className="bg-[#f4f5ed]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
            Civitas Akademik
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-5xl">
            Guru & Tenaga Kependidikan.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
            Kenali tenaga pendidik dan kependidikan yang mendukung kegiatan
            belajar serta layanan di MAN 2 Kudus.
          </p>

          <a
            href="https://web.man2kudus.sch.id/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex text-sm font-semibold text-emerald-800 hover:underline"
          >
            Kunjungi situs resmi MAN 2 Kudus ↗
          </a>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        {/* PILIH KATEGORI */}
        <div
          className="flex flex-wrap gap-3"
          role="tablist"
          aria-label="Pilih data GTK"
        >
          {Object.keys(dokumenGtk).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-emerald-900 text-white"
                  : "border border-stone-200 bg-white text-stone-700 hover:border-emerald-700 hover:text-emerald-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* DOKUMEN RESMI */}
        <div className="mt-7 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              Referensi Resmi
            </p>

            <h2 className="mt-2 text-xl font-bold text-emerald-950">
              {activeDoc.title}
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-7 text-stone-600">
              {activeDoc.description}
            </p>

            <a
              href={activeDoc.source}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-emerald-800 hover:underline"
            >
              Buka halaman resmi ↗
            </a>
          </div>

          <iframe
            title={activeDoc.title}
            src={activeDoc.preview}
            className="h-[500px] w-full bg-stone-100 sm:h-[650px] lg:h-[750px]"
            loading="lazy"
            allow="autoplay"
          />

          <div className="border-t border-stone-200 p-4 text-sm text-stone-500">
            Apabila dokumen tidak tampil, gunakan tautan halaman resmi di atas.
          </div>
        </div>

        {/* PROFIL INDIVIDU */}
        <div className="mt-14">
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              Profil GTK
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-emerald-950 sm:text-3xl">
              {activeTab} MAN 2 Kudus
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
              Kenali profil tenaga pendidik dan kependidikan yang ditampilkan
              melalui data website.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-2xl border border-stone-200 bg-white"
                >
                  <div className="aspect-[3/4] bg-stone-200" />
                  <div className="space-y-3 p-4">
                    <div className="h-3 w-1/3 rounded bg-stone-200" />
                    <div className="h-4 w-4/5 rounded bg-stone-200" />
                    <div className="h-3 w-3/5 rounded bg-stone-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : listProfiles.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {listProfiles.map((person) => (
                <article
                  key={person.id}
                  className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                >
                  {/* FOTO PORTRAIT */}
                  <div className="aspect-[3/4] overflow-hidden bg-emerald-50">
                    {person.photo_url ? (
                      <img
                        src={person.photo_url}
                        alt={`Foto ${person.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-emerald-50 to-emerald-100">
                        <span
                          className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl font-bold text-emerald-900 shadow-sm"
                          aria-hidden="true"
                        >
                          {person.name?.slice(0, 1).toUpperCase() || "?"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* INFORMASI GURU */}
                  <div className="p-3 sm:p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 sm:text-xs">
                      {person.role}
                    </p>

                    <h3 className="mt-2 break-words text-sm font-bold leading-snug text-emerald-950 sm:text-base">
                      {person.name}
                    </h3>

                    {person.subject && (
                      <p className="mt-1.5 text-xs leading-5 text-stone-600 sm:text-sm">
                        {person.subject}
                      </p>
                    )}

                    {person.description && (
                      <p className="mt-3 line-clamp-3 text-xs leading-5 text-stone-600 sm:text-sm">
                        {person.description}
                      </p>
                    )}

                    {person.source_url && (
                      <a
                        href={person.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex text-xs font-semibold text-emerald-800 hover:underline sm:text-sm"
                      >
                        Lihat sumber ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-[#f7f7f2] px-5 py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-900">
                <span aria-hidden="true">♙</span>
              </div>

              <h3 className="mt-4 font-bold text-emerald-950">
                Belum ada profil individu
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-stone-600">
                Profil {activeTab.toLowerCase()} yang dipublikasikan melalui
                dashboard admin akan ditampilkan di bagian ini.
              </p>

              {!supabaseConfigured && (
                <p className="mt-3 text-xs text-stone-500">
                  CMS belum dikonfigurasi.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
