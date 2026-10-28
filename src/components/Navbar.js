
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

const menuProfil = [
  { label: "Tentang Kami", href: "/about#tentang-kami" },
  { label: "Keunggulan", href: "/about#keunggulan" },
  { label: "Civitas Akademika", href: "/civitas-akademika" },
  {
    label: "Ekstrakurikuler & Organisasi Murid",
    href: "/ekstrakurikuler",
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
  { label: "Login Admin", href: "/admin/login" },
];

function MenuLink({ item, pathname, onClick }) {
  const active =
    item.href !== "/" &&
    !item.href.includes("#") &&
    pathname.startsWith(item.href);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`block rounded-lg px-3 py-2.5 text-sm transition ${
        active
          ? "bg-emerald-50 font-semibold text-emerald-950"
          : "text-stone-700 hover:bg-emerald-50 hover:text-emerald-950"
      }`}
    >
      {item.label}
    </Link>
  );
}

function Dropdown({ title, items, pathname }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="rounded-full px-3 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-100 hover:text-emerald-900"
      >
        {title} <span className="ml-1">{open ? "⌃" : "⌄"}</span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute left-0 top-full z-50 mt-2 w-64 rounded-xl border border-stone-200 bg-white p-2 shadow-xl">
            {items.map((item) => (
              <MenuLink
                key={item.href}
                item={item}
                pathname={pathname}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function NavbarContent() {
  const pathname = usePathname() || "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProfilOpen, setMobileProfilOpen] = useState(false);
  const [mobileAksesOpen, setMobileAksesOpen] = useState(false);

  function closeMobile() {
    setMobileOpen(false);
    setMobileProfilOpen(false);
    setMobileAksesOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#fffefa]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
        <Link
          href="/"
          onClick={closeMobile}
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
          <Link
            href="/"
            className={`rounded-full px-3 py-2.5 text-sm font-semibold ${
              pathname === "/"
                ? "bg-emerald-50 text-emerald-900"
                : "text-stone-600 hover:bg-stone-100 hover:text-emerald-900"
            }`}
          >
            Home
          </Link>

          <Dropdown
            title="Profil"
            items={menuProfil}
            pathname={pathname}
          />

          <Link
            href="/berita"
            className={`rounded-full px-3 py-2.5 text-sm font-semibold ${
              pathname.startsWith("/berita")
                ? "bg-emerald-50 text-emerald-900"
                : "text-stone-600 hover:bg-stone-100 hover:text-emerald-900"
            }`}
          >
            Berita
          </Link>

          <Dropdown
            title="Akses"
            items={menuAkses}
            pathname={pathname}
          />
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="rounded-lg border border-stone-200 px-3 py-2 text-xl text-emerald-950 lg:hidden"
        >
          {mobileOpen ? "×" : "☰"}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-stone-200 bg-[#fffefa] px-5 py-3 lg:hidden">
          <Link
            href="/"
            onClick={closeMobile}
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-100"
          >
            Home
          </Link>

          <button
            type="button"
            onClick={() => setMobileProfilOpen((value) => !value)}
            aria-expanded={mobileProfilOpen}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-stone-700 hover:bg-stone-100"
          >
            Profil <span>{mobileProfilOpen ? "−" : "+"}</span>
          </button>

          {mobileProfilOpen && (
            <div className="ml-3 border-l border-emerald-200 pl-2">
              {menuProfil.map((item) => (
                <MenuLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onClick={closeMobile}
                />
              ))}
            </div>
          )}

          <Link
            href="/berita"
            onClick={closeMobile}
            className="block rounded-xl px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-100"
          >
            Berita
          </Link>

          <button
            type="button"
            onClick={() => setMobileAksesOpen((value) => !value)}
            aria-expanded={mobileAksesOpen}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-stone-700 hover:bg-stone-100"
          >
            Akses <span>{mobileAksesOpen ? "−" : "+"}</span>
          </button>

          {mobileAksesOpen && (
            <div className="ml-3 border-l border-emerald-200 pl-2">
              {menuAkses.map((item) => (
                <MenuLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onClick={closeMobile}
                />
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
            <span
              aria-hidden="true"
              className="text-lg text-stone-400"
            >
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

export default function Navbar() {
  return (
    <Suspense
      fallback={
        <div
          className="h-[72px]"
          aria-hidden="true"
        />
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
