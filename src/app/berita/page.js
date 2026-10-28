import SectionTitle from "../../components/SectionTitle";
import CmsNewsArchive from "../../components/CmsNewsArchive";
import { berita } from "../../data/berita";

export const metadata = {
  title: "Berita | MAN 2 Kudus",
  description:
    "Informasi kegiatan madrasah, prestasi peserta didik, program pendidikan, riset, dan teknologi.",
};

export default function BeritaPage() {
  return (
    <>
      <section className="bg-[#f4f5ed]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
            Publikasi
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-5xl">
            Berita MAN 2 Kudus.
          </h1>

          <p className="mt-5 max-w-2xl leading-8 text-stone-600">
            Informasi kegiatan madrasah, prestasi peserta didik,
            program pendidikan, riset, dan teknologi.
          </p>

          <p className="mt-7 text-sm font-semibold text-emerald-900">
            Arsip berita dan prestasi madrasah
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <SectionTitle
          label="Arsip Publikasi"
          title="Temukan berita yang kamu cari."
          description="Gunakan kata kunci untuk mencari artikel berdasarkan judul, kategori, atau isi ringkasan."
        />

        <div className="mt-9">
          <CmsNewsArchive staticItems={berita} />
        </div>
      </section>
    </>
  );
}