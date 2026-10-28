"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getSupabase,
  supabaseConfigured,
} from "../../../lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const supabase = getSupabase();

      if (!supabase) {
        if (active) setChecking(false);
        return;
      }

      const { data } = await supabase.auth.getSession();

      if (active && data?.session) {
        router.replace("/admin");
      }

      if (active) setChecking(false);
    }

    checkSession();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const supabase = getSupabase();

    if (!supabase) {
      setErrorMessage(
        "Koneksi Supabase belum diatur. Isi .env.local terlebih dahulu."
      );
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(
        "Login gagal. Periksa email dan kata sandi, serta pastikan akun telah dibuat di Supabase."
      );
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-[#f4f5ed] px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-9">
        <Link href="/" className="inline-flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Logo MAN 2 Kudus"
            className="h-11 w-11 object-contain"
          />

          <span className="text-sm font-extrabold tracking-wide text-emerald-950">
            MAN 2 KUDUS
          </span>
        </Link>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
          Area Terbatas
        </p>

        <h1 className="mt-2 text-3xl font-bold text-emerald-950">
          Login admin.
        </h1>

        <p className="mt-3 text-sm leading-7 text-stone-600">
          Masuk untuk mengelola berita, prestasi, data GTK, serta
          ekstrakurikuler dan organisasi murid.
        </p>

        {!supabaseConfigured && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Supabase belum dikonfigurasi. Buat file{" "}
            <code>.env.local</code> dari{" "}
            <code>.env.local.example</code>, lalu jalankan SQL schema.
          </div>
        )}

        {errorMessage && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-800"
          >
            {errorMessage}
          </p>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-stone-700">
              Email admin
            </span>

            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              placeholder="admin@contoh.id"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-stone-700">
              Kata sandi
            </span>

            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              placeholder="Masukkan kata sandi"
            />
          </label>

          <button
            type="submit"
            disabled={loading || checking || !supabaseConfigured}
            className="w-full rounded-full bg-emerald-900 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Memeriksa akun…" : "Masuk ke dashboard"}
          </button>
        </form>

        <div className="mt-6 border-t border-stone-100 pt-5 text-xs leading-6 text-stone-500">
          Akun admin dibuat oleh pengelola melalui Supabase
          Authentication. Halaman ini tidak menyediakan pendaftaran
          publik.

          <p className="mt-3">
            <Link
              href="/"
              className="font-semibold text-emerald-800 hover:underline"
            >
              ← Kembali ke website
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}