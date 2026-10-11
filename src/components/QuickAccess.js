import Link from "next/link";

const akses = [
  {
    nomor: "01",
    nama: "Publikasi",
    keterangan: "Berita dan informasi madrasah",
    href: "/berita",
  },
  {
    nomor: "02",
    nama: "Zona Integritas",
    keterangan: "Budaya kerja dan integritas",
    href: "/zona-integritas",
  },
  {
    nomor: "03",
    nama: "PMB",
    keterangan: "Penerimaan murid baru",
    href: "/pmb",
  },
  {
    nomor: "04",
    nama: "BSDA",
    keterangan: "Boarding School Darul Adzkiya'",
    href: "/bsda",
  },
];

export default function QuickAccess() {
  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 sm:grid-cols-4 lg:px-8">
        {akses.map((item, index) => (
          <Link
            key={item.nama}
            href={item.href}
            className={`flex min-h-24 items-center justify-between gap-3 px-3 py-5 transition-colors hover:bg-emerald-50 sm:px-4 lg:px-5 ${
              index % 2 === 0 ? "border-r border-stone-200" : ""
            } ${index < 3 ? "sm:border-r sm:border-stone-200" : ""}`}
          >
            <div>
              <p className="text-[10px] font-bold tracking-widest text-emerald-700">
                {item.nomor}
              </p>

              <h2 className="mt-1 text-sm font-bold text-emerald-950 sm:text-base">
                {item.nama}
              </h2>

              <p className="mt-1 text-xs leading-5 text-stone-500">
                {item.keterangan}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="shrink-0 text-sm text-emerald-800"
            >
              ↗
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}