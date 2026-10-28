import Link from "next/link";
import { berita } from "../data/berita";
import SectionTitle from "../components/SectionTitle";
import QuickAccess from "../components/QuickAccess";
import CmsHomeNews from "../components/CmsHomeNews";
import CmsFeaturedHero from "../components/CmsFeaturedHero";

const beritaUtama = berita.find(
  (item) => item.id === "juara-msq-mtq-xxix"
);

export default function Home() {
  return (
    <>
      {/* BERITA UTAMA */}
      <CmsFeaturedHero fallbackItem={beritaUtama} />

      {/* AKSES CEPAT */}
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

      {/* BERITA, PRESTASI, RISET, DAN INSPIRASI */}
      <CmsHomeNews staticItems={berita} />

      {/* ZONA INTEGRITAS */}
      <section
        id="zona-integritas"
        className="scroll-mt-36 mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12"
      >
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

      {/* VIDEO DAN LOKASI MADRASAH */}
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