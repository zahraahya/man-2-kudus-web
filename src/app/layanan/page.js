import Link from "next/link";
import SectionTitle from "../../components/SectionTitle";
import LayananPublik from "../../components/LayananPublik";

export const metadata = {
  title: "Layanan Publik | MAN 2 Kudus",
  description:
    "Informasi survei, standar pelayanan, dan pengaduan MAN 2 Kudus.",
};

export default function LayananPage() {
  return (
    <>
      <section className="bg-[#f4f5ed]">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Pelayanan Publik
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
            Layanan Publik MAN 2 Kudus.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Informasi pelayanan, evaluasi kualitas layanan, dan
            penguatan integritas di lingkungan madrasah.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex text-sm font-semibold text-emerald-800 hover:text-emerald-600"
          >
            ← Kembali ke Home
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <SectionTitle
              label="Informasi"
              title="Standar pelayanan."
              description="Ringkasan informasi untuk membantu masyarakat memahami jenis pelayanan yang tersedia."
            />
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="font-bold text-emerald-950">
              MAN 2 Kudus
            </h2>

            <address className="mt-3 text-sm leading-7 text-stone-600 not-italic">
              Prambatan Kidul, Kecamatan Kaliwungu,
              Kabupaten Kudus, Jawa Tengah 59331.
              <br />
              Telepon: (0291) 431184
              <br />
              Email: manduakudus@gmail.com
            </address>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8 lg:pb-20">
        <LayananPublik />
      </section>
    </>
  );
}