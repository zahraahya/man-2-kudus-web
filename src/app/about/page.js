import Link from "next/link";
import TiltImage from "../../components/TiltImage";

const misi = [
  "Menumbuhkan penghayatan dan pengamalan nilai-nilai Islam dalam kehidupan sehari-hari serta membiasakan perilaku akhlakul karimah.",
  "Mewujudkan madrasah yang unggul dalam prestasi.",
  "Mengembangkan potensi peserta didik dalam ilmu pengetahuan, teknologi, dan keterampilan melalui pembelajaran yang bermakna, profesional, dan inovatif.",
  "Membekali peserta didik agar adaptif, toleran, dan siap menghadapi tantangan zaman.",
  "Membiasakan perilaku peduli lingkungan dan menjaga alam semesta sebagai ciptaan Allah.",
];

const programAkademik = [
  {
    nama: "International Achiever Class Science Boarding",
    kategori: "Program Akademik",
    deskripsi:
      "Program akademik dengan penguatan sains, bahasa asing, pembelajaran berbasis riset, dan wawasan global.",
  },
  {
    nama: "BCS Sains Boarding",
    kategori: "BCS",
    deskripsi:
      "Pengembangan potensi akademik bidang sains melalui pembinaan dan sistem boarding.",
  },
  {
    nama: "BCS Sains Non Boarding",
    kategori: "BCS",
    deskripsi:
      "Pengembangan kemampuan akademik bidang sains dengan sistem nonboarding.",
  },
  {
    nama: "BCS Tahfidz Sains Boarding",
    kategori: "BCS",
    deskripsi:
      "Pembinaan tahfidz Al-Qur'an yang dipadukan dengan pengembangan akademik bidang sains.",
  },
  {
    nama: "BCS Tahfidz Sosial Boarding",
    kategori: "BCS",
    deskripsi:
      "Pembinaan tahfidz Al-Qur'an dan pengembangan akademik bidang sosial.",
  },
  {
    nama: "BCS Sosial Non Boarding",
    kategori: "BCS",
    deskripsi:
      "Pengembangan potensi akademik bidang sosial dengan sistem nonboarding.",
  },
];

const keunggulan = [
  {
    nomor: "01",
    nama: "Riset dan Inovasi",
    deskripsi:
      "Pembelajaran riset mendorong peserta didik mengembangkan kemampuan berpikir kritis, melakukan penelitian, dan menghasilkan karya inovatif.",
  },
  {
    nomor: "02",
    nama: "Olimpiade",
    deskripsi:
      "Pembinaan peserta didik sesuai bidang minat dan kemampuan akademik untuk mengikuti kompetisi di berbagai tingkatan.",
  },
  {
    nomor: "03",
    nama: "SUKMAPETI",
    deskripsi:
      "Sukses Masuk Perguruan Tinggi melalui pengenalan dunia kampus, pendampingan akademik, persiapan seleksi, dan program beasiswa.",
  },
  {
    nomor: "04",
    nama: "Pengembangan Teknologi",
    deskripsi:
      "Penguatan keterampilan teknologi, kreativitas, dan kemampuan menghasilkan solusi melalui pembelajaran dan kegiatan inovasi.",
  },
];

const civitas = [
  {
    nomor: "01",
    nama: "Kepala Madrasah",
    deskripsi:
      "Kepemimpinan dan pengelolaan penyelenggaraan pendidikan di MAN 2 Kudus.",
  },
  {
    nomor: "02",
    nama: "Wakil Kepala Madrasah",
    deskripsi:
      "Koordinasi pelaksanaan program dan bidang kerja dalam pengelolaan madrasah.",
  },
  {
    nomor: "03",
    nama: "Kepala Tata Usaha",
    deskripsi:
      "Pengelolaan administrasi dan ketatausahaan madrasah.",
  },
  {
    nomor: "04",
    nama: "Guru",
    deskripsi:
      "Pelaksanaan pembelajaran, pendampingan, dan pengembangan potensi peserta didik.",
  },
  {
    nomor: "05",
    nama: "Tenaga Kependidikan",
    deskripsi:
      "Dukungan administrasi dan layanan operasional untuk menunjang kegiatan pendidikan.",
  },
  {
    nomor: "06",
    nama: "Data Peserta Didik",
    deskripsi:
      "Informasi peserta didik sebagai bagian dari penyelenggaraan pendidikan di MAN 2 Kudus.",
  },
];

function SectionHeading({ label, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
        {label}
      </p>

      <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

export const metadata = {
  title: "Profil | MAN 2 Kudus",
  description:
    "Tentang Kami, sejarah, visi dan misi, program akademik, keunggulan, serta civitas akademik MAN 2 Kudus.",
};

export default function AboutPage() {
  return (
    <>
      {/* TENTANG KAMI */}
      <section
        id="tentang-kami"
        className="scroll-mt-36 bg-[#f4f5ed]"
      >
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
            Profil Madrasah
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-5xl">
            Tentang MAN 2 Kudus.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 sm:text-base sm:leading-8">
            Madrasah Aliyah Negeri 2 Kudus berlokasi di Prambatan
            Kidul, Kecamatan Kaliwungu, Kabupaten Kudus. Pendidikan
            di MAN 2 Kudus berlandaskan nilai-nilai Islam dengan
            pengembangan prestasi, penguasaan teknologi, wawasan
            global, dan kepedulian terhadap lingkungan.
          </p>
        </div>
      </section>

      {/* IDENTITAS DAN FOTO MADRASAH */}
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-2 md:items-center lg:gap-12 lg:px-8 lg:py-14">
        <div>
          <TiltImage
            src="/images/sekolah.jpg"
            alt="Lingkungan MAN 2 Kudus"
            className="h-64 w-full object-cover sm:h-80"
          />

          <p className="mt-3 text-xs text-stone-500">
            Lingkungan MAN 2 Kudus.
          </p>
        </div>

        <div>
          <SectionHeading
            label="Identitas Madrasah"
            title="Madrasah Aliyah Negeri 2 Kudus."
            description="Informasi umum mengenai identitas dan lokasi madrasah."
          />

          <dl className="mt-6 divide-y divide-stone-200 border-y border-stone-200">
            <div className="grid grid-cols-[90px_1fr] gap-4 py-4 text-sm">
              <dt className="font-semibold text-stone-900">Alamat</dt>
              <dd className="leading-6 text-stone-600">
                Prambatan Kidul, Kaliwungu, Kudus 59331
              </dd>
            </div>

            <div className="grid grid-cols-[90px_1fr] gap-4 py-4 text-sm">
              <dt className="font-semibold text-stone-900">Telepon</dt>
              <dd className="text-stone-600">(0291) 431184</dd>
            </div>

            <div className="grid grid-cols-[90px_1fr] gap-4 py-4 text-sm">
              <dt className="font-semibold text-stone-900">Email</dt>
              <dd className="break-words leading-6 text-stone-600">
                manduakudus@gmail.com
                <br />
                puskom@man2kudus.sch.id
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* SEJARAH */}
      <section className="border-y border-stone-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-7 px-5 py-12 md:grid-cols-[0.7fr_1.3fr] lg:gap-12 lg:px-8 lg:py-14">
          <SectionHeading
            label="Sejarah"
            title="Perjalanan MAN 2 Kudus."
            description="Sejarah madrasah dari awal pendirian hingga menjadi MAN 2 Kudus."
          />

          <div className="space-y-4 text-sm leading-7 text-stone-600 sm:text-base">
            <p>
              Sejarah MAN 2 Kudus bermula dari pendirian SGAI
              (Sekolah Guru Agama Islam) pada 1 September 1950.
              Pada 1951, nama SGAI diubah menjadi PGAP berdasarkan
              Keputusan Menteri Agama Nomor 7 Tahun 1951.
            </p>

            <p>
              Pada 31 Desember 1964, PGAN Kudus disempurnakan dari
              PGAN empat tahun menjadi PGAN enam tahun. Pada 1978,
              PGAN enam tahun dibagi menjadi MTs Negeri Kudus untuk
              kelas I–III dan PGAN untuk kelas IV–VI.
            </p>

            <p>
              Pada 1 Juli 1992, PGAN Kudus beralih fungsi menjadi
              MAN 2 Kudus berdasarkan KMA Nomor 41 Tahun 1992.
              Perubahan ini menjadi bagian penting dari perjalanan
              pendidikan madrasah.
            </p>
          </div>
        </div>
      </section>

      {/* VISI DAN MISI */}
      <section className="scroll-mt-36 bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
            Visi MAN 2 Kudus
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-bold leading-relaxed sm:text-4xl">
            Terwujudnya peserta didik yang berakhlak islami, unggul
            dalam prestasi, terampil dalam teknologi, berwawasan
            global, dan peduli lingkungan.
          </h2>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
        <SectionHeading
          label="Misi"
          title="Langkah mewujudkan visi."
          description="Misi MAN 2 Kudus menjadi dasar pembinaan karakter dan penyelenggaraan pendidikan."
        />

        <ol className="mt-6 grid gap-x-10 md:grid-cols-2">
          {misi.map((item, index) => (
            <li
              key={item}
              className="flex gap-4 border-b border-stone-200 py-4"
            >
              <span className="shrink-0 text-sm font-bold tabular-nums text-emerald-800">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="text-sm leading-7 text-stone-700">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* KEUNGGULAN */}
      <section
        id="keunggulan"
        className="scroll-mt-36 border-y border-stone-100 bg-[#f7f7f2]"
      >
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <SectionHeading
            label="Keunggulan"
            title="Program akademik dan keunggulan madrasah."
            description="Pengembangan kemampuan akademik, riset, inovasi, dan persiapan pendidikan lanjutan."
          />

          <div className="mt-8">
            <h3 className="text-xl font-bold text-emerald-950">
              Program Akademik
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {programAkademik.map((item) => (
                <article
                  key={item.nama}
                  className="rounded-xl border border-stone-200 bg-white p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">
                    {item.kategori}
                  </p>

                  <h4 className="mt-3 font-bold leading-6 text-emerald-950">
                    {item.nama}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {item.deskripsi}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-stone-200 pt-8">
            <h3 className="text-xl font-bold text-emerald-950">
              Keunggulan Madrasah
            </h3>

            <div className="mt-4 grid gap-x-10 md:grid-cols-2">
              {keunggulan.map((item) => (
                <article
                  key={item.nomor}
                  className="flex gap-4 border-b border-stone-200 py-5"
                >
                  <span className="pt-0.5 text-sm font-bold text-emerald-800">
                    {item.nomor}
                  </span>

                  <div>
                    <h4 className="font-bold text-stone-900">
                      {item.nama}
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-stone-600">
                      {item.deskripsi}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CIVITAS AKADEMIK */}
      <section
        id="civitas-akademik"
        className="scroll-mt-36 bg-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-14">
          <SectionHeading
            label="Civitas Akademik"
            title="Unsur penyelenggara pendidikan."
            description="Civitas akademik MAN 2 Kudus terdiri atas pimpinan madrasah, guru, tenaga kependidikan, dan peserta didik."
          />

          <div className="mt-7 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {civitas.map((item) => (
              <article
                key={item.nomor}
                className="border-b border-stone-200 py-5"
              >
                <p className="text-xs font-bold tracking-widest text-emerald-800">
                  {item.nomor}
                </p>

                <h3 className="mt-2 font-bold text-emerald-950">
                  {item.nama}
                </h3>

                <p className="mt-2 text-sm leading-7 text-stone-600">
                  {item.deskripsi}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f5ed]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-8 sm:flex-row sm:items-center lg:px-8">
          <div>
            <h2 className="text-xl font-bold text-emerald-950">
              Berita MAN 2 Kudus
            </h2>

            <p className="mt-1 text-sm text-stone-600">
              Ikuti kabar kegiatan, prestasi, dan perkembangan madrasah.
            </p>
          </div>

          <Link
            href="/berita"
            className="inline-flex w-fit rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Lihat berita ↗
          </Link>
        </div>
      </section>
    </>
  );
}