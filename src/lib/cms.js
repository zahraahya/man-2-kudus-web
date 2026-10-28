export function formatTanggal(value) {
  if (!value) return "Tanggal belum diatur";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function mapKonten(row) {
  return {
    id: row.slug || row.id,
    cmsId: row.id,
    slug: row.slug || row.id,
    judul: row.title,
    tanggal: formatTanggal(row.content_date),
    kategori: row.category,
    gambar: row.image_url || "/images/sekolah.jpg",
    ringkasan:
      row.summary || "Baca informasi selengkapnya dari MAN 2 Kudus.",
    isi: row.body || row.summary || "Konten ini belum memiliki isi lengkap.",
    sumber: row.source_url || "",
    isCms: true,
  };
}

export function buatSlug(teks) {
  return teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

export function formatTanggalSingkat(value) {
  if (!value) return "";
  return formatTanggal(value);
}