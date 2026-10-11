
"use client";

import { useEffect, useMemo, useState } from "react";
import BeritaCard from "./BeritaCard";

export default function SearchableNews({ items }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
  }, []);

  const hasil = useMemo(() => {
    const kata = query.trim().toLowerCase();

    if (!kata) return items;

    return items.filter((item) => {
      const teks = [
        item.judul,
        item.kategori,
        item.ringkasan,
        item.isi,
      ]
        .join(" ")
        .toLowerCase();

      return teks.includes(kata);
    });
  }, [items, query]);

  return (
    <div>
      <form
        action="/berita"
        method="GET"
        className="mb-8 flex gap-3"
      >
        <input
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Contoh: riset, Adiwiyata, atau Bre Arka"
          aria-label="Cari artikel berita"
          className="min-w-0 flex-1 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />

        <button
          type="submit"
          className="rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Cari
        </button>
      </form>

      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-stone-500">
          Menampilkan{" "}
          <span className="font-bold text-emerald-900">{hasil.length}</span>{" "}
          dari {items.length} berita
        </p>

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              window.history.replaceState(null, "", "/berita");
            }}
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-600"
          >
            Hapus pencarian
          </button>
        )}
      </div>

      {hasil.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hasil.map((item) => (
            <BeritaCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
          <p className="text-lg font-bold text-emerald-950">
            Berita tidak ditemukan
          </p>
          <p className="mt-2 text-sm leading-7 text-stone-600">
            Coba kata kunci lain, misalnya prestasi, riset, atau teknologi.
          </p>
        </div>
      )}
    </div>
  );
}
