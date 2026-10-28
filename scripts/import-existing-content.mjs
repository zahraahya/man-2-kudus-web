import { createClient } from "@supabase/supabase-js";
import { berita } from "../src/data/berita.js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diisi di .env.local."
  );
  process.exit(1);
}

const supabase = createClient(url, key);

const bulan = {
  januari: "01",
  februari: "02",
  maret: "03",
  april: "04",
  mei: "05",
  juni: "06",
  juli: "07",
  agustus: "08",
  september: "09",
  oktober: "10",
  november: "11",
  desember: "12",
};

function keTanggal(tanggal) {
  const match = String(tanggal)
    .trim()
    .toLowerCase()
    .match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/);

  if (!match || !bulan[match[2]]) {
    return new Date().toISOString().slice(0, 10);
  }

  return `${match[3]}-${bulan[match[2]]}-${match[1].padStart(2, "0")}`;
}

const rows = berita.map((item) => {
  const category = [
    "Berita",
    "Prestasi",
    "Riset & Teknologi",
    "Inspirasi",
  ].includes(item.kategori)
    ? item.kategori
    : "Berita";

  return {
    content_type: category === "Berita" ? "berita" : "prestasi",
    category,
    title: item.judul,
    slug: item.id,
    summary: item.ringkasan || "",
    body: item.isi || "",
    image_url: item.gambar || "",
    source_url: item.sumber || "",
    content_date: keTanggal(item.tanggal),
    is_published: true,
  };
});

const { error } = await supabase
  .from("cms_contents")
  .upsert(rows, {
    onConflict: "slug",
    ignoreDuplicates: true,
  });

if (error) {
  console.error("Impor gagal:", error.message);
  process.exit(1);
}

console.log(`${rows.length} artikel berhasil disinkronkan ke CMS.`);
console.log("Artikel dapat diperiksa melalui Dashboard Admin.");
console.log("Artikel dengan slug yang sudah ada tidak ditimpa.");