
const kelompokLayanan = [
  {
    nomor: "01",
    judul: "Survei Pelayanan",
    pengantar:
      "Evaluasi kualitas pelayanan dan penguatan budaya integritas madrasah.",
    layanan: [
      {
        judul: "Survei Persepsi Kualitas Pelayanan (SPKP)",
        deskripsi:
          "Evaluasi terhadap kualitas pelayanan yang diberikan kepada masyarakat.",
      },
      {
        judul: "Survei Persepsi Anti Korupsi (SPAK)",
        deskripsi:
          "Penilaian terhadap persepsi masyarakat mengenai praktik antikorupsi.",
      },
      {
        judul: "Hasil Survei Pelayanan",
        deskripsi:
          "Informasi mengenai hasil evaluasi pelayanan sebagai bahan perbaikan.",
      },
    ],
  },
  {
    nomor: "02",
    judul: "Informasi dan Standar Pelayanan",
    pengantar:
      "Informasi mengenai prosedur, ketentuan, dan penyelenggaraan pelayanan.",
    layanan: [
      {
        judul: "Standar Pelayanan",
        deskripsi:
          "Informasi mengenai persyaratan, prosedur, dan standar layanan.",
      },
      {
        judul: "Jam Pelayanan",
        deskripsi:
          "Informasi waktu operasional pelayanan kepada masyarakat.",
      },
      {
        judul: "SOP PTSP",
        deskripsi:
          "Standar operasional prosedur Pelayanan Terpadu Satu Pintu.",
      },
      {
        judul: "Jenis Layanan",
        deskripsi:
          "Daftar jenis layanan yang tersedia bagi masyarakat.",
      },
      {
        judul: "Maklumat Pelayanan",
        deskripsi:
          "Pernyataan komitmen penyelenggaraan pelayanan sesuai standar.",
      },
    ],
  },
  {
    nomor: "03",
    judul: "Pengaduan, Kritik, dan Saran",
    pengantar:
      "Saluran penyampaian masukan untuk mendukung peningkatan kualitas pelayanan.",
    layanan: [
      {
        judul: "Pengaduan Masyarakat",
        deskripsi:
          "Media penyampaian pengaduan atas penyelenggaraan pelayanan.",
      },
      {
        judul: "Kritik dan Saran",
        deskripsi:
          "Sarana untuk menyampaikan masukan dan saran perbaikan.",
      },
      {
        judul: "Pelaporan Pelanggaran",
        deskripsi:
          "Informasi mengenai saluran pelaporan dugaan pelanggaran.",
      },
    ],
  },
];

export default function LayananPublik() {
  return (
    <section
      id="layanan-publik"
      className="bg-white py-10 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Judul bagian */}
        <div className="mb-8 border-b border-slate-300 pb-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Informasi dan Pelayanan
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Layanan Publik
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            Informasi mengenai standar pelayanan, survei kepuasan, serta
            mekanisme penyampaian pengaduan dan masukan di MAN 2 Kudus.
          </p>
        </div>

        {/* Tiga kolom kelompok layanan */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {kelompokLayanan.map((kelompok) => (
            <article
              key={kelompok.nomor}
              className="flex h-full flex-col border border-slate-300 bg-white"
            >
              {/* Kepala kotak */}
              <div className="border-t-4 border-emerald-800 bg-slate-50 px-5 py-5">
                <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-emerald-800">
                  KELOMPOK {kelompok.nomor}
                </p>

                <h3 className="text-lg font-bold leading-snug text-slate-900">
                  {kelompok.judul}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {kelompok.pengantar}
                </p>
              </div>

              {/* Daftar layanan */}
              <div className="flex-1">
                {kelompok.layanan.map((layanan, index) => (
                  <div
                    key={layanan.judul}
                    className="border-t border-slate-200 px-5 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 min-w-5 text-xs font-semibold tabular-nums text-emerald-800">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h4 className="text-sm font-semibold leading-5 text-slate-800">
                          {layanan.judul}
                        </h4>

                        <p className="mt-1.5 text-sm leading-6 text-slate-500">
                          {layanan.deskripsi}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
