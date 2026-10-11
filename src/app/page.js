import Link from "next/link";
import { berita } from "../data/berita";
import BeritaCard from "../components/BeritaCard";
import SectionTitle from "../components/SectionTitle";
import LayananCards from "../components/LayananCards";
import QuickAccess from "../components/QuickAccess";
import CompactNewsSection from "../components/CompactNewsSection";

const beritaUtama = berita.find(
  (item) => item.id === "juara-msq-mtq-xxix"
);

const beritaTerbaru = berita
  .filter(
    (item) =>
      item.id !== "juara-msq-mtq-xxix" &&
      item.kategori !== "Riset & Teknologi" &&
      item.kategori !== "Inspirasi"
  )
  .slice(0, 3);

const beritaRiset = berita
  .filter((item) => item.kategori === "Riset & Teknologi")
  .slice(0, 3);

const beritaInspirasi = berita
  .filter((item) => item.kategori === "Inspirasi")
  .slice(0, 3);

export default function Home() {
  return (
    <>
      {/* BERITA UTAMA */}
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

                <span className="text-stone-500">
                  {beritaUtama.tanggal}
                </span>
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
                Prestasi Madrasah
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-4xl">
                {beritaUtama.judul}
              </h1>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                {beritaUtama.ringkasan}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/berita/${beritaUtama.id}`}
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
              href={`/berita/${beritaUtama.id}`}
              className="relative min-h-[280px] overflow-hidden bg-stone-200 md:min-h-[390px]"
              aria-label={`Baca berita ${beritaUtama.judul}`}
            >
              <img
                src={beritaUtama.gambar}
                alt={beritaUtama.judul}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/85 to-transparent p-6 pt-20 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                  MTQ XXIX Jawa Tengah
                </p>

                <p className="mt-2 text-xl font-bold">
                  Juara Harapan 1 Cabang MSQ
                </p>

                <p className="mt-1 text-sm text-white/80">
                  Kudus · 2022
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* AKSES CEPAT INTERNAL */}
      <QuickAccess />

      {/* PROFIL MADRASAH */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
        <div className="grid items-center gap-7 md:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <img
            src="/images/sekolah.jpg"
            alt="Lingkungan MAN 2 Kudus"
            loading="lazy"
            className="h-64 w-full rounded-2xl object-cover sm:h-80"
          />

          <div>
            <SectionTitle
              label="Profil Madrasah"
              title="MAN 2 Kudus"
              description="Madrasah Akademik Berbasis Riset."
            />

            <p className="mt-4 text-sm leading-7 text-stone-600">
              MAN 2 Kudus berlokasi di Prambatan Kidul, Kecamatan
              Kaliwungu, Kabupaten Kudus. Madrasah mengembangkan
              pendidikan yang berlandaskan nilai-nilai Islam, dengan
              perhatian pada prestasi, penguasaan teknologi, wawasan
              global, dan kepedulian terhadap lingkungan.
            </p>

            <Link
              href="/about"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-600"
            >
              Profil selengkapnya ↗
            </Link>
          </div>
        </div>
      </section>

      {/* PUBLIKASI LOKAL */}
      <section id="publikasi" className="scroll-mt-36 border-y border-stone-100 bg-[#f7f7f2]">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionTitle
              label="Publikasi"
              title="Berita terbaru."
              description="Informasi prestasi, kegiatan, dan perkembangan pendidikan di lingkungan MAN 2 Kudus."
            />

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
        </div>
      </section>

      {/* LIMA LAYANAN DIGITAL */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
        <SectionTitle
          label="e-Layanan"
          title="Layanan digital MAN 2 Kudus."
          description="Akses sistem akademik, kepegawaian, repositori, dan layanan digital madrasah."
        />

        <div className="mt-7">
          <LayananCards />
        </div>

        <div className="mt-5 border-t border-stone-200 pt-4">
          <Link
            href="/layanan"
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-600"
          >
            Informasi Layanan Publik ↗
          </Link>
        </div>
      </section>

      {/* RISET DAN INSPIRASI */}
      <section className="border-y border-stone-100 bg-[#f7f7f2]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-14">
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
      </section>

      {/* ZONA INTEGRITAS: GAMBAR LOKAL, TIDAK BISA DIKLIK */}
      <section id="zona-integritas" className="scroll-mt-36 mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Zona Integritas
          </p>

          <h2 className="mt-2 text-xl font-bold text-emerald-950 sm:text-2xl">
            Memasuki Zona Integritas MAN 2 Kudus
          </h2>
        </div>

        <img
          src="/images/wbk.jpeg"
          alt="Memasuki Zona Integritas MAN 2 Kudus"
          loading="lazy"
          className="block h-auto w-full"
        />
      </section>

      {/* VIDEO DAN PETA */}
      <section className="bg-[#f7f7f2]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1.3fr_0.7fr] lg:gap-10 lg:px-8 lg:py-14">
          <div>
            <SectionTitle
              label="Sekilas Profil"
              title="Mengenal MAN 2 Kudus."
              description="Video profil madrasah melalui kanal YouTube."
            />

            <div className="mt-5 aspect-video overflow-hidden rounded-xl bg-stone-200">
              <iframe
                src="https://www.youtube.com/embed/axFZN4NZ4Cc?rel=0"
                title="Sekilas Profil MAN 2 Kudus"
                className="h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <SectionTitle
              label="Lokasi"
              title="Temukan kami."
              description="Prambatan Kidul, Kaliwungu, Kudus."
            />

            <div className="mt-5 overflow-hidden rounded-xl border border-stone-200 bg-white">
              <iframe
                title="Peta lokasi MAN 2 Kudus"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.725194201364!2d110.82055661459206!3d-6.803247395082815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70c4b0f0db7943%3A0xff63bdb2e315ec93!2sMA%2BNegeri%2B2%2BKudus!5e0!3m2!1sid!2sid!4v1609239535911!5m2!1sid!2sid"
                className="h-64 w-full sm:h-72"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=MA+Negeri+2+Kudus"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-bold text-emerald-800 hover:text-emerald-600"
            >
              Buka petunjuk arah ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}