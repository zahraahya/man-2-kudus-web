import Link from "next/link";

const layanan = [
  {
    nama: "Sistem Akademik",
    deskripsi: "Layanan informasi akademik MAN 2 Kudus.",
    gambar: "/images/layanan/sistem-akademik.png",
    url: "https://siakad.man2kudus.sch.id/",
  },
  {
    nama: "E-KEPO",
    deskripsi: "Layanan kepegawaian dan pengembangan organisasi.",
    gambar: "/images/layanan/ekepo.png",
    url: "https://ekepo.man2kudus.sch.id/",
  },
  {
    nama: "E-Repository",
    deskripsi: "Akses repositori digital madrasah.",
    gambar: "/images/layanan/e-repository.png",
    url: "https://erepository.man2kudus.sch.id/",
  },
  {
    nama: "LENTERA",
    deskripsi: "Informasi layanan digital MAN 2 Kudus.",
    gambar: "/images/layanan/lentera.jpeg",
    url: "https://absensi.man2kudus.sch.id/",
    internal: true,
  },
  {
    nama: "Sahabat MandaKu",
    deskripsi: "Informasi prestasi peserta didik MAN 2 Kudus.",
    gambar: "/images/layanan/sahabat-mandaku.png",
    url: "https://sahabatmandaku.man2kudus.sch.id/",
  },
];

function IsiKartu({ item }) {
  return (
    <>
      <div className="flex h-28 items-center justify-center bg-white p-3 sm:h-32">
        <img
          src={item.gambar}
          alt={item.nama}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="border-t border-stone-100 p-3">
        <h3 className="text-sm font-bold text-emerald-950">
          {item.nama}
        </h3>
        <p className="mt-2 text-xs leading-5 text-stone-600">
          {item.deskripsi}
        </p>
        <span className="mt-3 inline-flex text-xs font-semibold text-emerald-800">
          Buka layanan ↗
        </span>
      </div>
    </>
  );
}

export default function LayananCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
      {layanan.map((item) => {
        const className =
          "overflow-hidden rounded-xl border border-stone-200 bg-white hover:border-emerald-700";

        return item.internal ? (
          <Link
            key={item.nama}
            href={item.url}
            className={className}
          >
            <IsiKartu item={item} />
          </Link>
        ) : (
          <a
            key={item.nama}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            <IsiKartu item={item} />
          </a>
        );
      })}
    </div>
  );
}