import Link from "next/link";
import SectionTitle from "../../components/SectionTitle";

export const metadata = {
  title: "Zona Integritas | MAN 2 Kudus",
  description:
    "Informasi Zona Integritas MAN 2 Kudus.",
};

export default function ZonaIntegritasPage() {
  return (
    <>
      <section className="bg-[#f4f5ed]">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Zona Integritas
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
            Memasuki Zona Integritas MAN 2 Kudus.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Komitmen membangun lingkungan kerja yang berintegritas,
            memberikan pelayanan yang baik, serta mendukung tata
            kelola madrasah yang bersih dan akuntabel.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        <img
          src="/images/wbk.jpeg"
          alt="Memasuki Zona Integritas MAN 2 Kudus"
          className="block h-auto w-full"
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
        <SectionTitle
          label="Budaya Kerja"
          title="Integritas dalam pelayanan."
          description="Zona Integritas menjadi bagian dari upaya membangun pelayanan yang transparan, bertanggung jawab, dan berorientasi pada kepentingan masyarakat."
        />

        <div className="mt-6 border-t border-stone-200 pt-5">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-600"
          >
            Lihat Layanan Publik ↗
          </Link>
        </div>
      </section>
    </>
  );
}