
export default function LokasiMadrasah() {
  return (
    <section className="bg-[#f4f5ed]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
              Lokasi
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-4xl">
              Temukan MAN 2 Kudus.
            </h2>

            <p className="mt-4 leading-7 text-stone-600">
              Kunjungi MAN 2 Kudus yang berlokasi di Prambatan Kidul,
              Kecamatan Kaliwungu, Kabupaten Kudus, Jawa Tengah.
            </p>

            <div className="mt-7 rounded-2xl border border-emerald-900/10 bg-white p-5">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-900">
                  ⌖
                </span>

                <div>
                  <h3 className="font-bold text-emerald-950">
                    Alamat Madrasah
                  </h3>

                  <address className="mt-2 text-sm leading-7 text-stone-600 not-italic">
                    MAN 2 Kudus
                    <br />
                    Prambatan Kidul, Kaliwungu
                    <br />
                    Kabupaten Kudus, Jawa Tengah 59331
                  </address>
                </div>
              </div>

              <div className="mt-5 border-t border-stone-100 pt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">
                  Petunjuk arah
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Untuk rute dari arah Demak, situs resmi memberikan
                  petunjuk melalui Hypermart Kudus, kemudian ke kiri.
                  Tetap gunakan navigasi peta untuk menyesuaikan rute
                  dengan posisi dan kondisi perjalanan.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=MA+Negeri+2+Kudus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Buka Google Maps ↗
              </a>

              <a
                href="https://web.man2kudus.sch.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-900/20 bg-white px-6 py-3.5 text-sm font-semibold text-emerald-950 transition hover:border-emerald-800"
              >
                Website resmi
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white p-2 shadow-lg shadow-emerald-950/5">
            <iframe
              title="Peta lokasi MAN 2 Kudus"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.725194201364!2d110.82055661459206!3d-6.803247395082815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70c4b0f0db7943%3A0xff63bdb2e315ec93!2sMA%2BNegeri%2B2%2BKudus!5e0!3m2!1sid!2sid!4v1609239535911!5m2!1sid!2sid"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="min-h-[320px] w-full rounded-2xl sm:min-h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
