import Link from "next/link";

export const metadata = {
  title: "Boarding School Darul Adzkiya' | MAN 2 Kudus",
  description:
    "Profil Boarding School Darul Adzkiya' MAN 2 Kudus.",
};

const kegiatan = [
  {
    nomor: "01",
    judul: "Pembinaan Akademik",
    deskripsi:
      "Pendampingan belajar untuk mendukung pengembangan kemampuan akademik peserta didik.",
  },
  {
    nomor: "02",
    judul: "Pembinaan Keagamaan",
    deskripsi:
      "Pembiasaan ibadah dan pengembangan akhlak dalam kegiatan sehari-hari.",
  },
  {
    nomor: "03",
    judul: "Tahfidz Al-Qur'an",
    deskripsi:
      "Pembinaan hafalan Al-Qur'an sebagai bagian dari kegiatan santri tahfidz.",
  },
];

export default function BSDAPage() {
  return (
    <>
      <section className="bg-[#f4f5ed]">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Program Boarding
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-5xl">
            Boarding School Darul Adzkiya'.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
            Informasi program boarding MAN 2 Kudus dan kegiatan
            pembinaan santri.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:gap-12 lg:px-8 lg:py-14">
        <div className="overflow-hidden rounded-2xl bg-stone-100">
          <img
            src="/images/bsda.JPG"
            alt="Boarding School Darul Adzkiya' MAN 2 Kudus"
            className="h-72 w-full object-cover sm:h-[400px]"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            BSDA
          </p>

          <h2 className="mt-3 text-2xl font-bold leading-tight text-emerald-950 sm:text-3xl">
            Lingkungan pembinaan dan pengembangan peserta didik.
          </h2>

          <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
            Boarding School Darul Adzkiya' merupakan bagian dari
            program pembinaan MAN 2 Kudus. Kegiatan boarding
            mencakup pembinaan keagamaan, pendampingan belajar,
            serta pengembangan karakter santri.
          </p>

          <Link
            href="/about#keunggulan"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Lihat keunggulan madrasah ↗
          </Link>
        </div>
      </section>

      <section className="border-y border-stone-100 bg-[#f7f7f2]">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Kegiatan Pembinaan
          </p>

          <h2 className="mt-3 text-2xl font-bold text-emerald-950 sm:text-3xl">
            Kegiatan santri BSDA.
          </h2>

          <div className="mt-5 divide-y divide-stone-200">
            {kegiatan.map((item) => (
              <article
                key={item.nomor}
                className="flex gap-4 py-5"
              >
                <span className="pt-0.5 text-sm font-bold text-emerald-800">
                  {item.nomor}
                </span>

                <div>
                  <h3 className="font-bold text-stone-900">
                    {item.judul}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    {item.deskripsi}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-emerald-950">
              Informasi madrasah
            </h2>

            <p className="mt-2 text-sm leading-7 text-stone-600">
              Kenali program akademik dan keunggulan MAN 2 Kudus.
            </p>
          </div>

          <Link
            href="/berita"
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-600"
          >
            Berita madrasah ↗
          </Link>
        </div>
      </section>
    </>
  );
}