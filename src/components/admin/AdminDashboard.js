
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase, supabaseConfigured } from "../../lib/supabase";
import { buatSlug } from "../../lib/cms";

const sections = [
  { id: "konten", label: "Berita & Prestasi", table: "cms_contents" },
  { id: "guru", label: "Guru & GTK", table: "teachers" },
  { id: "ekstra", label: "Ekstrakurikuler", table: "extracurriculars" },
];

function tanggalHariIni() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formKosong(section) {
  if (section === "guru") {
    return {
      name: "",
      role: "Guru",
      subject: "",
      description: "",
      photo_url: "",
      source_url: "",
      order_index: 0,
      is_published: true,
    };
  }

  if (section === "ekstra") {
    return {
      name: "",
      kind: "Ekstrakurikuler",
      description: "",
      image_url: "",
      source_url: "",
      order_index: 0,
      is_published: true,
    };
  }

  return {
    content_type: "berita",
    category: "Berita",
    title: "",
    slug: "",
    summary: "",
    body: "",
    image_url: "",
    source_url: "",
    content_date: "",
    is_published: false,
  };
}

function formDariRow(section, row) {
  if (section === "guru") {
    return {
      name: row.name || "",
      role: row.role || "Guru",
      subject: row.subject || "",
      description: row.description || "",
      photo_url: row.photo_url || "",
      source_url: row.source_url || "",
      order_index: row.order_index ?? 0,
      is_published: Boolean(row.is_published),
    };
  }

  if (section === "ekstra") {
    return {
      name: row.name || "",
      kind: row.kind || "Ekstrakurikuler",
      description: row.description || "",
      image_url: row.image_url || "",
      source_url: row.source_url || "",
      order_index: row.order_index ?? 0,
      is_published: Boolean(row.is_published),
    };
  }

  return {
    content_type: row.content_type || "berita",
    category: row.category || "Berita",
    title: row.title || "",
    slug: row.slug || "",
    summary: row.summary || "",
    body: row.body || "",
    image_url: row.image_url || "",
    source_url: row.source_url || "",
    content_date: row.content_date || "",
    is_published: Boolean(row.is_published),
  };
}

function judulRow(section, row) {
  if (section === "konten") {
    return {
      title: row.title || "",
      subtitle: `${row.category || ""} · ${row.content_date || "Tanpa tanggal"}`,
    };
  }

  if (section === "guru") {
    return {
      title: row.name || "",
      subtitle: `${row.role || ""}${row.subject ? ` · ${row.subject}` : ""}`,
    };
  }

  return {
    title: row.name || "",
    subtitle: row.kind || "",
  };
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-stone-700">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100";

export default function AdminDashboard() {
  const router = useRouter();

  const [authReady, setAuthReady] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [activeSection, setActiveSection] = useState("konten");
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(() => formKosong("konten"));
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [loadingRows, setLoadingRows] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [search, setSearch] = useState("");

  const current =
    sections.find((section) => section.id === activeSection) || sections[0];

  // Periksa sesi login dan hak administrator.
  useEffect(() => {
    let active = true;

    async function checkAccess() {
      const supabase = getSupabase();

      if (!supabase) {
        if (active) {
          setMessage(
            "Supabase belum dikonfigurasi. Isi .env.local dan jalankan schema.sql."
          );
          setMessageType("error");
          setAuthReady(true);
        }
        return;
      }

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      const session = sessionData?.session;

      if (sessionError || !session) {
        router.replace("/admin/login");
        return;
      }

      const { data: admin, error } = await supabase
        .from("admin_users")
        .select("user_id, email")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!active) return;

      setAuthReady(true);

      if (error || !admin) {
        setAuthorized(false);
        setUserEmail(session.user.email || "");
        setMessage(
          "Akun berhasil login, tetapi belum terdaftar sebagai admin. Tambahkan UUID akun ini ke tabel admin_users di Supabase."
        );
        setMessageType("error");
        return;
      }

      setAuthorized(true);
      setUserEmail(admin.email || session.user.email || "Admin");
    }

    checkAccess();

    return () => {
      active = false;
    };
  }, [router]);

  // Ambil data dari tabel yang sedang dipilih.
  const loadRows = useCallback(async () => {
    if (!authorized) return;

    const supabase = getSupabase();
    if (!supabase) return;

    setLoadingRows(true);

    try {
      const { data, error } = await supabase
        .from(current.table)
        .select("*")
        .order(
          current.table === "cms_contents" ? "content_date" : "created_at",
          { ascending: false }
        );

      if (error) throw error;

      setRows(data || []);
      setMessage("");
    } catch (error) {
      setMessage(`Gagal memuat data: ${error.message}`);
      setMessageType("error");
    } finally {
      setLoadingRows(false);
    }
  }, [authorized, current.table]);

  useEffect(() => {
    if (authorized) loadRows();
  }, [authorized, loadRows]);

  // Siapkan formulir ketika berpindah menu.
  useEffect(() => {
    const formBaru = formKosong(activeSection);

    if (activeSection === "konten") {
      formBaru.content_date = tanggalHariIni();
    }

    setForm(formBaru);
    setEditingId(null);
    setImageFile(null);
    setSearch("");
  }, [activeSection]);

  const visibleRows = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return rows;

    return rows.filter((row) =>
      JSON.stringify(row).toLowerCase().includes(keyword)
    );
  }, [rows, search]);

  function ubahField(field, value) {
    setForm((previous) => {
      const next = { ...previous, [field]: value };

      if (activeSection === "konten" && field === "category") {
        next.content_type = value === "Berita" ? "berita" : "prestasi";
      }

      if (
        activeSection === "konten" &&
        field === "title" &&
        !editingId
      ) {
        next.slug = buatSlug(value);
      }

      return next;
    });
  }

  function mulaiEdit(row) {
    setEditingId(row.id);
    setForm(formDariRow(activeSection, row));
    setImageFile(null);
    setMessage("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function batalEdit() {
    setEditingId(null);

    const formBaru = formKosong(activeSection);

    if (activeSection === "konten") {
      formBaru.content_date = tanggalHariIni();
    }

    setForm(formBaru);
    setImageFile(null);
    setMessage("");
  }

  // Unggah gambar ke Supabase Storage.
  async function unggahFoto(supabase) {
    if (!imageFile) return null;

    if (!imageFile.type.startsWith("image/")) {
      throw new Error("File yang dipilih harus berupa gambar.");
    }

    const safeName = imageFile.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]+/g, "-");

    const path = `${activeSection}/${Date.now()}-${safeName}`;

    const { error } = await supabase.storage
      .from("cms-images")
      .upload(path, imageFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: imageFile.type,
      });

    if (error) {
      throw new Error(`Foto gagal diunggah: ${error.message}`);
    }

    const { data } = supabase.storage
      .from("cms-images")
      .getPublicUrl(path);

    return data.publicUrl;
  }

  // Tambah data baru atau perbarui data.
  async function simpanData(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const supabase = getSupabase();

      if (!supabase) {
        throw new Error("Supabase belum dikonfigurasi.");
      }

      const payload = {
        ...form,
        updated_at: new Date().toISOString(),
      };

      const uploadedUrl = await unggahFoto(supabase);

      if (uploadedUrl) {
        if (activeSection === "guru") {
          payload.photo_url = uploadedUrl;
        } else {
          payload.image_url = uploadedUrl;
        }
      }

      if (activeSection === "konten") {
        payload.content_type =
          payload.category === "Berita" ? "berita" : "prestasi";
        payload.slug = payload.slug || buatSlug(payload.title);

        if (!payload.title.trim()) {
          throw new Error("Judul wajib diisi.");
        }
        if (!payload.summary.trim()) {
          throw new Error("Ringkasan wajib diisi.");
        }
        if (!payload.slug) {
          throw new Error("Judul belum menghasilkan slug yang valid.");
        }
        if (!payload.content_date) {
          throw new Error("Tanggal publikasi wajib diisi.");
        }
      } else if (activeSection === "guru") {
        if (!payload.name.trim()) {
          throw new Error("Nama wajib diisi.");
        }
      } else {
        if (!payload.name.trim()) {
          throw new Error("Nama kegiatan wajib diisi.");
        }
        if (!payload.description.trim()) {
          throw new Error("Deskripsi kegiatan wajib diisi.");
        }
      }

      const result = editingId
        ? await supabase
            .from(current.table)
            .update(payload)
            .eq("id", editingId)
        : await supabase.from(current.table).insert(payload);

      if (result.error) throw new Error(result.error.message);

      setMessage(
        editingId
          ? "Data berhasil diperbarui."
          : "Data baru berhasil ditambahkan."
      );
      setMessageType("success");
      setEditingId(null);

      const formBaru = formKosong(activeSection);
      if (activeSection === "konten") {
        formBaru.content_date = tanggalHariIni();
      }

      setForm(formBaru);
      setImageFile(null);
      await loadRows();
    } catch (error) {
      setMessage(
        error.message || "Terjadi kesalahan saat menyimpan data."
      );
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  // Hapus data setelah konfirmasi.
  async function hapusData(row) {
    const rowLabel =
      activeSection === "konten" ? row.title : row.name;

    const yakin = window.confirm(
      `Hapus "${rowLabel}"? Tindakan ini tidak dapat dibatalkan.`
    );

    if (!yakin) return;

    const supabase = getSupabase();
    if (!supabase) return;

    const { error } = await supabase
      .from(current.table)
      .delete()
      .eq("id", row.id);

    if (error) {
      setMessage(`Data gagal dihapus: ${error.message}`);
      setMessageType("error");
      return;
    }

    setMessage("Data berhasil dihapus.");
    setMessageType("success");

    if (editingId === row.id) {
      batalEdit();
    }

    await loadRows();
  }

  async function logout() {
    const supabase = getSupabase();

    if (supabase) {
      await supabase.auth.signOut();
    }

    router.replace("/admin/login");
    router.refresh();
  }

  if (!supabaseConfigured) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20">
        <h1 className="text-2xl font-bold text-emerald-950">
          CMS belum dikonfigurasi
        </h1>
        <p className="mt-3 text-sm leading-7 text-stone-600">
          Isi variabel Supabase pada .env.local, jalankan schema.sql,
          lalu restart server Next.js.
        </p>
      </div>
    );
  }

  if (!authReady) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-24 text-sm text-stone-500">
        Memeriksa akses admin…
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h1 className="text-2xl font-bold text-emerald-950">
            Dashboard belum bisa dibuka
          </h1>
          <p className="mt-3 text-sm leading-7 text-stone-700">
            {message || "Akun tidak memiliki hak administrator."}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin/login"
              className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Kembali ke login
            </Link>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700"
            >
              Buka Supabase ↗
            </a>
          </div>

          {userEmail && (
            <p className="mt-4 text-xs text-stone-500">
              Akun terdeteksi: {userEmail}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] bg-[#f7f7f2]">
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-6 sm:flex-row sm:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-800">
              Content Management System
            </p>
            <h1 className="mt-2 text-3xl font-bold text-emerald-950">
              Dashboard Admin
            </h1>
            <p className="mt-2 text-sm text-stone-600">
              Login sebagai {userEmail}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:border-emerald-700"
            >
              Lihat website ↗
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-full bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-7 px-5 py-8 lg:grid-cols-[230px_minmax(0,1fr)] lg:px-8 lg:py-10">
        <aside className="space-y-2">
          <p className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.15em] text-stone-400">
            Kelola konten
          </p>

          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSection(section.id)}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeSection === section.id
                  ? "bg-emerald-900 text-white"
                  : "bg-white text-stone-700 hover:bg-emerald-50 hover:text-emerald-950"
              }`}
            >
              {section.label}
              {activeSection === section.id && <span>›</span>}
            </button>
          ))}

          <div className="mt-6 rounded-xl border border-stone-200 bg-white p-4 text-xs leading-6 text-stone-500">
            <p className="font-bold text-emerald-950">Catatan</p>
            Draft hanya terlihat oleh admin. Pilih opsi tayang agar
            konten muncul di website publik.
          </div>
        </aside>

        <div className="min-w-0 space-y-7">
          {message && (
            <div
              role="status"
              className={`rounded-xl border px-4 py-3 text-sm ${
                messageType === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                  : messageType === "error"
                    ? "border-red-200 bg-red-50 text-red-800"
                    : "border-stone-200 bg-white text-stone-700"
              }`}
            >
              {message}
            </div>
          )}

          <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-xl font-bold text-emerald-950">
                  {editingId ? "Edit data" : "Tambah data baru"}
                </h2>
                <p className="mt-1 text-sm leading-6 text-stone-600">
                  {activeSection === "konten"
                    ? "Kelola berita, prestasi, Riset & Teknologi, dan Inspirasi."
                    : activeSection === "guru"
                      ? "Kelola profil Guru dan Tenaga Kependidikan."
                      : "Kelola ekstrakurikuler dan organisasi murid."}
                </p>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={batalEdit}
                  className="text-sm font-semibold text-stone-600 hover:text-emerald-900"
                >
                  Batalkan edit
                </button>
              )}
            </div>

            <form onSubmit={simpanData} className="grid gap-5 sm:grid-cols-2">
              {activeSection === "konten" && (
                <>
                  <Field label="Judul *" className="sm:col-span-2">
                    <input
                      required
                      value={form.title ?? ""}
                      onChange={(event) =>
                        ubahField("title", event.target.value)
                      }
                      className={inputClass}
                      placeholder="Masukkan judul berita atau prestasi"
                    />
                  </Field>

                  <Field label="Kategori *">
                    <select
                      value={form.category ?? "Berita"}
                      onChange={(event) =>
                        ubahField("category", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option>Berita</option>
                      <option>Prestasi</option>
                      <option>Riset & Teknologi</option>
                      <option>Inspirasi</option>
                    </select>
                  </Field>

                  <Field label="Tanggal publikasi *">
                    <input
                      type="date"
                      required
                      value={form.content_date ?? ""}
                      onChange={(event) =>
                        ubahField("content_date", event.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Ringkasan *" className="sm:col-span-2">
                    <textarea
                      required
                      rows={3}
                      value={form.summary ?? ""}
                      onChange={(event) =>
                        ubahField("summary", event.target.value)
                      }
                      className={inputClass}
                      placeholder="Ringkasan untuk kartu berita"
                    />
                  </Field>

                  <Field label="Isi lengkap" className="sm:col-span-2">
                    <textarea
                      rows={6}
                      value={form.body ?? ""}
                      onChange={(event) =>
                        ubahField("body", event.target.value)
                      }
                      className={inputClass}
                      placeholder="Isi artikel lengkap. Baris baru akan dipertahankan."
                    />
                  </Field>

                  <Field label="URL gambar (opsional)" className="sm:col-span-2">
                    <input
                      type="url"
                      value={form.image_url ?? ""}
                      onChange={(event) =>
                        ubahField("image_url", event.target.value)
                      }
                      className={inputClass}
                      placeholder="https://.../foto-berita.jpg"
                    />
                  </Field>

                  <Field label="Unggah gambar (opsional)" className="sm:col-span-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setImageFile(event.target.files?.[0] || null)
                      }
                      className="block w-full text-sm text-stone-600"
                    />
                    {imageFile && (
                      <span className="mt-1 block text-xs text-stone-500">
                        File dipilih: {imageFile.name}
                      </span>
                    )}
                  </Field>

                  <Field label="Tautan sumber resmi (opsional)" className="sm:col-span-2">
                    <input
                      type="url"
                      value={form.source_url ?? ""}
                      onChange={(event) =>
                        ubahField("source_url", event.target.value)
                      }
                      className={inputClass}
                      placeholder="https://web.man2kudus.sch.id/..."
                    />
                  </Field>

                  <Field label="Slug URL">
                    <input
                      value={form.slug ?? ""}
                      onChange={(event) =>
                        ubahField("slug", event.target.value)
                      }
                      disabled={Boolean(editingId)}
                      className={`${inputClass} disabled:bg-stone-50 disabled:text-stone-400`}
                      placeholder="otomatis-dari-judul"
                    />
                  </Field>
                </>
              )}

              {activeSection === "guru" && (
                <>
                  <Field label="Nama lengkap *" className="sm:col-span-2">
                    <input
                      required
                      value={form.name ?? ""}
                      onChange={(event) =>
                        ubahField("name", event.target.value)
                      }
                      className={inputClass}
                      placeholder="Nama guru atau tenaga kependidikan"
                    />
                  </Field>

                  <Field label="Jenis GTK *">
                    <select
                      value={form.role ?? "Guru"}
                      onChange={(event) =>
                        ubahField("role", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option>Guru</option>
                      <option>Tenaga Kependidikan</option>
                    </select>
                  </Field>

                  <Field label="Mata pelajaran / jabatan">
                    <input
                      value={form.subject ?? ""}
                      onChange={(event) =>
                        ubahField("subject", event.target.value)
                      }
                      className={inputClass}
                      placeholder="Contoh: Matematika / Tata Usaha"
                    />
                  </Field>

                  <Field label="Profil singkat" className="sm:col-span-2">
                    <textarea
                      rows={3}
                      value={form.description ?? ""}
                      onChange={(event) =>
                        ubahField("description", event.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>

                  <Field label="URL foto (opsional)" className="sm:col-span-2">
                    <input
                      type="url"
                      value={form.photo_url ?? ""}
                      onChange={(event) =>
                        ubahField("photo_url", event.target.value)
                      }
                      className={inputClass}
                      placeholder="https://.../foto-guru.jpg"
                    />
                  </Field>

                  <Field label="Unggah foto (opsional)" className="sm:col-span-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setImageFile(event.target.files?.[0] || null)
                      }
                      className="block w-full text-sm text-stone-600"
                    />
                  </Field>

                  <Field label="Sumber resmi (opsional)" className="sm:col-span-2">
                    <input
                      type="url"
                      value={form.source_url ?? ""}
                      onChange={(event) =>
                        ubahField("source_url", event.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>
                </>
              )}

              {activeSection === "ekstra" && (
                <>
                  <Field label="Nama kegiatan / organisasi *" className="sm:col-span-2">
                    <input
                      required
                      value={form.name ?? ""}
                      onChange={(event) =>
                        ubahField("name", event.target.value)
                      }
                      className={inputClass}
                      placeholder="Misalnya: Teater Sate Madu"
                    />
                  </Field>

                  <Field label="Jenis *">
                    <select
                      value={form.kind ?? "Ekstrakurikuler"}
                      onChange={(event) =>
                        ubahField("kind", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option>Ekstrakurikuler</option>
                      <option>Organisasi Murid</option>
                    </select>
                  </Field>

                  <Field label="Deskripsi *" className="sm:col-span-2">
                    <textarea
                      required
                      rows={4}
                      value={form.description ?? ""}
                      onChange={(event) =>
                        ubahField("description", event.target.value)
                      }
                      className={inputClass}
                      placeholder="Jelaskan kegiatan atau organisasi"
                    />
                  </Field>

                  <Field label="URL gambar (opsional)" className="sm:col-span-2">
                    <input
                      type="url"
                      value={form.image_url ?? ""}
                      onChange={(event) =>
                        ubahField("image_url", event.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Unggah gambar (opsional)" className="sm:col-span-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        setImageFile(event.target.files?.[0] || null)
                      }
                      className="block w-full text-sm text-stone-600"
                    />
                  </Field>

                  <Field label="Sumber resmi (opsional)" className="sm:col-span-2">
                    <input
                      type="url"
                      value={form.source_url ?? ""}
                      onChange={(event) =>
                        ubahField("source_url", event.target.value)
                      }
                      className={inputClass}
                    />
                  </Field>
                </>
              )}

              {activeSection !== "konten" && (
                <Field label="Urutan tampil">
                  <input
                    type="number"
                    value={form.order_index ?? 0}
                    onChange={(event) =>
                      ubahField("order_index", Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </Field>
              )}

              <label className="flex items-center gap-3 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={Boolean(form.is_published)}
                  onChange={(event) =>
                    ubahField("is_published", event.target.checked)
                  }
                  className="h-4 w-4 accent-emerald-800"
                />
                <span className="text-sm font-semibold text-stone-700">
                  Tayangkan di website publik
                </span>
              </label>

              <div className="flex flex-wrap gap-3 sm:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
                >
                  {saving
                    ? "Menyimpan…"
                    : editingId
                      ? "Simpan perubahan"
                      : "Tambah data"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={batalEdit}
                    className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50"
                  >
                    Batalkan
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-xl font-bold text-emerald-950">
                  Data tersimpan
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                  {rows.length} data · klik Edit untuk mengubahnya.
                </p>
              </div>

              <input
                value={search ?? ""}
                onChange={(event) => setSearch(event.target.value)}
                className={`${inputClass} sm:max-w-xs`}
                placeholder="Cari data…"
                aria-label="Cari data dashboard"
              />
            </div>

            {loadingRows ? (
              <p className="mt-6 text-sm text-stone-500">
                Memuat data…
              </p>
            ) : visibleRows.length > 0 ? (
              <div className="mt-5 divide-y divide-stone-100">
                {visibleRows.map((row) => {
                  const summary = judulRow(activeSection, row);

                  return (
                    <article
                      key={row.id}
                      className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-emerald-950">
                            {summary.title}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                              row.is_published
                                ? "bg-emerald-50 text-emerald-800"
                                : "bg-stone-100 text-stone-500"
                            }`}
                          >
                            {row.is_published ? "Tayang" : "Draft"}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-stone-500">
                          {summary.subtitle}
                        </p>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => mulaiEdit(row)}
                          className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => hapusData(row)}
                          className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-stone-300 px-5 py-12 text-center">
                <p className="font-semibold text-emerald-950">
                  Belum ada data.
                </p>
                <p className="mt-2 text-sm text-stone-500">
                  Gunakan formulir di atas untuk menambahkan data pertama.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
