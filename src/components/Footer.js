const sosial = [
  {
    nama: "Facebook",
    url: "https://www.facebook.com/p/MAN-2-Kudus-Mendunia-61564613352914/",
  },
  {
    nama: "Instagram",
    url: "https://www.instagram.com/man2kudusofficial/",
  },
  {
    nama: "YouTube",
    url: "https://www.youtube.com/@MAN2Kudus",
  },
];

function SocialIcon({ nama }) {
  if (nama === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" />
      </svg>
    );
  }

  if (nama === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.7" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M23.2 7a3 3 0 0 0-2.1-2.1C19.2 4.4 12 4.4 12 4.4s-7.2 0-9.1.5A3 3 0 0 0 .8 7 31 31 0 0 0 .3 12a31 31 0 0 0 .5 5 3 3 0 0 0 2.1 2.1c1.9.5 9.1.5 9.1.5s7.2 0 9.1-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5 31 31 0 0 0-.5-5ZM9.6 15.7V8.3l6.3 3.7-6.3 3.7Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 sm:grid-cols-2 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Logo MAN 2 Kudus"
              className="h-11 w-11 object-contain"
            />

            <div>
              <h2 className="font-bold">MAN 2 Kudus</h2>
              <p className="mt-1 text-xs text-emerald-200/70">
                Madrasah Akademik Berbasis Riset
              </p>
            </div>
          </div>

          <p className="mt-4 max-w-md text-sm leading-7 text-emerald-100/75">
            Terwujudnya peserta didik yang berakhlak islami, unggul
            dalam prestasi, terampil dalam teknologi, berwawasan
            global, dan peduli lingkungan.
          </p>
        </div>

        <div className="sm:justify-self-end">
          <h2 className="font-bold">Informasi Kontak</h2>

          <address className="mt-3 space-y-1.5 text-sm leading-6 text-emerald-100/75 not-italic">
            <p>Prambatan Kidul, Kaliwungu, Kudus 59331</p>
            <p>Telepon: (0291) 431184</p>
            <p>manduakudus@gmail.com</p>
            <p>puskom@man2kudus.sch.id</p>
          </address>

          <h2 className="mt-5 font-bold">Media Sosial</h2>

          <div className="mt-3 flex gap-3">
            {sosial.map((item) => (
              <a
                key={item.nama}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={item.nama}
                aria-label={`Buka ${item.nama} MAN 2 Kudus`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-emerald-100 transition-colors hover:bg-white hover:text-emerald-950"
              >
                <SocialIcon nama={item.nama} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-emerald-100/60">
        Copyright © 2026 MAN 2 Kudus. All rights reserved.
      </div>
    </footer>
  );
}