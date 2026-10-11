"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuUtama = [
  { label: "Home", href: "/" },
  { label: "Berita", href: "/berita" },
];

const menuProfil = [
  { label: "Tentang Kami", href: "/about#tentang-kami" },
  { label: "Keunggulan", href: "/about#keunggulan" },
  {
    label: "Civitas Akademik",
    href: "/about#civitas-akademik",
  },
];

const menuAkses = [
  { label: "Publikasi", href: "/berita" },
  { label: "Riset & Teknologi", href: "/#riset-teknologi" },
  { label: "Inspirasi", href: "/#inspirasi" },
  { label: "Zona Integritas", href: "/zona-integritas" },
  { label: "PMB", href: "/pmb" },
  { label: "BSDA", href: "/bsda" },
  { label: "Layanan Publik", href: "/layanan" },
];

function DropdownMenu({ items, onNavigate }) {
  return (
    <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-stone-200 bg-white p-2 shadow-xl">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="block rounded-lg px-3 py-2.5 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-950"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [menuBuka, setMenuBuka] = useState(false);
  const [profilBuka, setProfilBuka] = useState(false);
  const [aksesBuka, setAksesBuka] = useState(false);
  const [profilMobileBuka, setProfilMobileBuka] = useState(false);
  const [aksesMobileBuka, setAksesMobileBuka] = useState(false);

  function tutupMenu() {
    setMenuBuka(false);
    setProfilBuka(false);
    setAksesBuka(false);
    setProfilMobileBuka(false);
    setAksesMobileBuka(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#fffefa]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
        <Link
          href="/"
          onClick={tutupMenu}
          className="flex shrink-0 items-center gap-3"
        >
          <img
            src="/images/logo.png"
            alt="Logo MAN 2 Kudus"
            className="h-10 w-10 object-contain sm:h-11 sm:w-11"
          />

          <div>
            <p className="text-sm font-extrabold tracking-wide text-emerald-950">
              MAN 2 KUDUS
            </p>

            <p className="mt-1 hidden text-[10px] tracking-wide text-stone-500 sm:block">
              Madrasah Akademik Berbasis Riset
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {menuUtama.slice(0, 1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2.5 text-sm font-semibold ${
                pathname === item.href
                  ? "bg-emerald-50 text-emerald-900"
                  : "text-stone-600 hover:bg-stone-100 hover:text-emerald-900"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfilBuka(!profilBuka);
                setAksesBuka(false);
              }}
              aria-expanded={profilBuka}
              className={`rounded-full px-3 py-2.5 text-sm font-semibold ${
                pathname.startsWith("/about") || profilBuka
                  ? "bg-emerald-50 text-emerald-900"
                  : "text-stone-600 hover:bg-stone-100 hover:text-emerald-900"
              }`}
            >
              Profil
              <span className="ml-2" aria-hidden="true">
                {profilBuka ? "⌃" : "⌄"}
              </span>
            </button>

            {profilBuka && (
              <DropdownMenu
                items={menuProfil}
                onNavigate={() => setProfilBuka(false)}
              />
            )}
          </div>

          {menuUtama.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2.5 text-sm font-semibold ${
                pathname.startsWith(item.href)
                  ? "bg-emerald-50 text-emerald-900"
                  : "text-stone-600 hover:bg-stone-100 hover:text-emerald-900"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setAksesBuka(!aksesBuka);
                setProfilBuka(false);
              }}
              aria-expanded={aksesBuka}
              className="rounded-full px-3 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-100 hover:text-emerald-900"
            >
              Akses
              <span className="ml-2" aria-hidden="true">
                {aksesBuka ? "⌃" : "⌄"}
              </span>
            </button>

            {aksesBuka && (
              <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-stone-200 bg-white p-2 shadow-xl">
                {menuAkses.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setAksesBuka(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm text-stone-700 hover:bg-emerald-50 hover:text-emerald-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          aria-label={menuBuka ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuBuka}
          onClick={() => setMenuBuka(!menuBuka)}
          className="rounded-lg border border-stone-200 px-3 py-2 text-xl text-emerald-950 lg:hidden"
        >
          {menuBuka ? "×" : "☰"}
        </button>
      </nav>

      {menuBuka && (
        <div className="border-t border-stone-200 bg-[#fffefa] px-5 py-3 lg:hidden">
          <Link
            href="/"
            onClick={tutupMenu}
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-100"
          >
            Home
          </Link>

          <button
            type="button"
            onClick={() => setProfilMobileBuka(!profilMobileBuka)}
            aria-expanded={profilMobileBuka}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-stone-700 hover:bg-stone-100"
          >
            Profil
            <span aria-hidden="true">
              {profilMobileBuka ? "−" : "+"}
            </span>
          </button>

          {profilMobileBuka && (
            <div className="ml-3 border-l border-emerald-200 pl-2">
              {menuProfil.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={tutupMenu}
                  className="block rounded-lg px-3 py-2.5 text-sm text-stone-700 hover:bg-emerald-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/berita"
            onClick={tutupMenu}
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-100"
          >
            Berita
          </Link>

          <button
            type="button"
            onClick={() => setAksesMobileBuka(!aksesMobileBuka)}
            aria-expanded={aksesMobileBuka}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-stone-700 hover:bg-stone-100"
          >
            Akses
            <span aria-hidden="true">
              {aksesMobileBuka ? "−" : "+"}
            </span>
          </button>

          {aksesMobileBuka && (
            <div className="ml-3 border-l border-emerald-200 pl-2">
              {menuAkses.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={tutupMenu}
                  className="block rounded-lg px-3 py-2.5 text-sm text-stone-700 hover:bg-emerald-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="border-t border-stone-100">
        <div className="mx-auto max-w-7xl px-5 py-2.5 lg:px-8">
          <form
            action="/berita"
            method="GET"
            role="search"
            className="flex w-full max-w-lg items-center gap-2 rounded-full border border-stone-200 bg-white p-1 pl-4 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100"
          >
            <span aria-hidden="true" className="text-lg text-stone-400">
              ⌕
            </span>

            <input
              type="search"
              name="q"
              placeholder="Cari berita, prestasi, atau riset..."
              aria-label="Cari berita"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-stone-400"
            />

            <button
              type="submit"
              className="rounded-full bg-emerald-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-800"
            >
              Cari
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}