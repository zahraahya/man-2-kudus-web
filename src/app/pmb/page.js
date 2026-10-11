import Link from "next/link";
import SectionTitle from "../../components/SectionTitle";

const jalur = [
  {
    id: "pmbr",
    kode: "PMBR",
    nama: "Penerimaan Murid Baru Reguler",
    deskripsi:
      "Informasi penerimaan murid baru jalur reguler, termasuk pengumuman, brosur, dan hasil seleksi.",
    langkah: [
      "Informasi dan brosur penerimaan",
      "Data pendaftar",
      "Hasil seleksi",
    ],
  },
  {
    id: "pmbu",
    kode: "PMBU",
    nama: "Penerimaan Murid Baru Unggul",
    deskripsi:
      "Informasi penerimaan murid baru melalui jalur program unggul MAN 2 Kudus.",
    langkah: [
      "Informasi dan brosur penerimaan",
      "Informasi jalur prestasi dan tes",
      "Hasil seleksi",
    ],
  },
];

export const metadata = {
  title: "Penerimaan Murid Baru | MAN 2 Kudus",
  description:
    "Informasi penerimaan murid baru MAN 2 Kudus melalui PMBR dan PMBU.",
};

export default function PMBPage() {
  return (
    <>
      <section className="bg-[#f4f5ed]">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Informasi Akademik
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
            Penerimaan Murid Baru.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Informasi penerimaan murid baru MAN 2 Kudus melalui
            jalur reguler dan program unggul.
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
        <SectionTitle
          label="Jalur Penerimaan"
          title="Pilih informasi yang ingin dilihat."
          description="Kedua jalur berikut ditampilkan sesuai kategori penerimaan MAN 2 Kudus."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {jalur.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
            >
              <p className="text-xs font-bold tracking-[0.18em] text-emerald-800">
                {item.kode}
              </p>

              <h2 className="mt-3 text-2xl font-bold text-emerald-950">
                {item.nama}
              </h2>

              <p className="mt-3 text-sm leading-7 text-stone-600">
                {item.deskripsi}
              </p>

              <div className="mt-6 border-t border-stone-200 pt-5">
                <p className="text-sm font-bold text-emerald-950">
                  Informasi penerimaan
                </p>

                <ul className="mt-3 space-y-3">
                  {item.langkah.map((langkah, index) => (
                    <li
                      key={langkah}
                      className="flex gap-3 text-sm leading-6 text-stone-600"
                    >
                      <span className="font-semibold text-emerald-800">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {langkah}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs leading-6 text-stone-500">
          Informasi jadwal, persyaratan, dan hasil seleksi perlu
          disesuaikan dengan pengumuman penerimaan yang berlaku.
        </p>
      </section>
    </>
  );
}