
-- Database website MAN 2 Kudus
-- Jalankan file ini melalui Supabase Dashboard > SQL Editor.
-- Jangan pernah menaruh service_role key di kode frontend.

create extension if not exists pgcrypto;

-- 1. Daftar admin yang diizinkan mengelola website
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

-- Memeriksa apakah pengguna yang login merupakan admin
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- 2. Konten berita dan prestasi
create table if not exists public.cms_contents (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('berita', 'prestasi')),
  category text not null check (
    category in ('Berita', 'Prestasi', 'Riset & Teknologi', 'Inspirasi')
  ),
  title text not null,
  slug text not null unique,
  summary text not null default '',
  body text not null default '',
  image_url text not null default '',
  source_url text not null default '',
  content_date date not null default current_date,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint cms_type_category_match check (
    (content_type = 'berita' and category = 'Berita') or
    (content_type = 'prestasi' and category in (
      'Prestasi', 'Riset & Teknologi', 'Inspirasi'
    ))
  )
);

-- 3. Data guru dan tenaga kependidikan
create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null check (
    role in ('Guru', 'Tenaga Kependidikan')
  ),
  subject text not null default '',
  description text not null default '',
  photo_url text not null default '',
  source_url text not null default '',
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. Ekstrakurikuler dan organisasi murid
create table if not exists public.extracurriculars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kind text not null check (
    kind in ('Ekstrakurikuler', 'Organisasi Murid')
  ),
  description text not null default '',
  image_url text not null default '',
  source_url text not null default '',
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Memastikan constraint kategori sesuai dengan semua pilihan CMS
alter table public.cms_contents
  drop constraint if exists cms_contents_category_check;

alter table public.cms_contents
  add constraint cms_contents_category_check
  check (category in (
    'Berita', 'Prestasi', 'Riset & Teknologi', 'Inspirasi'
  ));

alter table public.cms_contents
  drop constraint if exists cms_type_category_match;

alter table public.cms_contents
  add constraint cms_type_category_match check (
    (content_type = 'berita' and category = 'Berita') or
    (content_type = 'prestasi' and category in (
      'Prestasi', 'Riset & Teknologi', 'Inspirasi'
    ))
  );

create unique index if not exists cms_contents_slug_uidx
  on public.cms_contents (slug);

-- 5. Data awal ekstrakurikuler dan organisasi murid
-- Data ini bisa diedit oleh admin setelah login.
insert into public.extracurriculars
  (name, kind, description, image_url, source_url, order_index, is_published)
select seed.name, seed.kind, seed.description, seed.image_url,
       seed.source_url, seed.order_index, true
from (values
  (
    'Teater Sate Madu',
    'Ekstrakurikuler',
    'Sanggar teater MAN 2 Kudus yang mengembangkan seni peran, produksi pertunjukan, dan kerja sama. Pada Oktober 2026 Teater Sate Madu tampil dalam Festival Teater Pelajar XVI.',
    'https://web.man2kudus.sch.id/wp-content/uploads/2026/10/TEATER-MANDAKU-2026-800x445.jpg',
    'https://web.man2kudus.sch.id/2026/10/16/teater-sate-madu-man-2-kudus-tampilkan-penunggu-waktu-dalam-festival-teater-pelajar-xvi-tahun-2026/',
    1
  ),
  (
    'Robotik',
    'Ekstrakurikuler',
    'Kegiatan minat bidang teknologi dan rekayasa. Robotik disebut dalam dokumen Renstra MAN 2 Kudus 2020–2024; status aktif terbaru perlu dikonfirmasi ke madrasah.',
    '',
    'https://web.man2kudus.sch.id/wp-content/uploads/2021/03/01-RENSTRA-MAN-2-Kudus-2020-2024-OKE.pdf',
    2
  ),
  (
    'Jurnalistik',
    'Ekstrakurikuler',
    'Pengembangan keterampilan menulis, peliputan, penyuntingan, dan penyampaian informasi. Jurnalistik disebut dalam dokumen Renstra MAN 2 Kudus 2020–2024.',
    '',
    'https://web.man2kudus.sch.id/wp-content/uploads/2021/03/01-RENSTRA-MAN-2-Kudus-2020-2024-OKE.pdf',
    3
  ),
  (
    'Pramuka / Dewan Ambalan',
    'Ekstrakurikuler',
    'Kegiatan kepanduan dan pembinaan karakter. Dewan Ambalan juga disebut dalam publikasi organisasi murid periode 2026/2027.',
    'https://web.man2kudus.sch.id/wp-content/uploads/2026/09/Pesta-Demokrasi-2026-MAN-2-Kudus-800x445.jpg',
    'https://web.man2kudus.sch.id/2026/09/17/man-2-kudus-gelar-pemilihan-ketua-osis-mpk-irmush-dan-dewan-ambalan-periode-kepengurusan-2026-2027/',
    4
  ),
  (
    'Palang Merah Remaja (PMR)',
    'Ekstrakurikuler',
    'Kegiatan pengembangan kepedulian sosial dan keterampilan pertolongan pertama. PMR disebut dalam dokumen Renstra MAN 2 Kudus 2020–2024.',
    '',
    'https://web.man2kudus.sch.id/wp-content/uploads/2021/03/01-RENSTRA-MAN-2-Kudus-2020-2024-OKE.pdf',
    5
  ),
  (
    'English Club dan English Debate',
    'Ekstrakurikuler',
    'Pengembangan kemampuan bahasa Inggris, komunikasi, diskusi, dan debat. Kegiatan ini disebut dalam dokumen Renstra MAN 2 Kudus 2020–2024.',
    '',
    'https://web.man2kudus.sch.id/wp-content/uploads/2021/03/01-RENSTRA-MAN-2-Kudus-2020-2024-OKE.pdf',
    6
  ),
  (
    'OSIS',
    'Organisasi Murid',
    'Organisasi murid yang menjadi wadah pembelajaran kepemimpinan, perencanaan program, koordinasi kegiatan, dan tanggung jawab.',
    'https://web.man2kudus.sch.id/wp-content/uploads/2026/09/Pesta-Demokrasi-2026-MAN-2-Kudus-800x445.jpg',
    'https://web.man2kudus.sch.id/2026/09/17/man-2-kudus-gelar-pemilihan-ketua-osis-mpk-irmush-dan-dewan-ambalan-periode-kepengurusan-2026-2027/',
    1
  ),
  (
    'MPK',
    'Organisasi Murid',
    'Organisasi perwakilan murid yang disebut dalam publikasi pemilihan organisasi murid periode 2026/2027.',
    'https://web.man2kudus.sch.id/wp-content/uploads/2026/09/Pesta-Demokrasi-2026-MAN-2-Kudus-800x445.jpg',
    'https://web.man2kudus.sch.id/2026/09/17/man-2-kudus-gelar-pemilihan-ketua-osis-mpk-irmush-dan-dewan-ambalan-periode-kepengurusan-2026-2027/',
    2
  ),
  (
    'IRMUSH',
    'Organisasi Murid',
    'Organisasi murid yang disebut dalam publikasi pemilihan ketua organisasi murid periode 2026/2027.',
    'https://web.man2kudus.sch.id/wp-content/uploads/2026/09/Pesta-Demokrasi-2026-MAN-2-Kudus-800x445.jpg',
    'https://web.man2kudus.sch.id/2026/09/17/man-2-kudus-gelar-pemilihan-ketua-osis-mpk-irmush-dan-dewan-ambalan-periode-kepengurusan-2026-2027/',
    3
  ),
  (
    'Dewan Ambalan',
    'Organisasi Murid',
    'Organisasi kepanduan murid yang terlibat dalam rangkaian pemilihan organisasi murid periode 2026/2027.',
    'https://web.man2kudus.sch.id/wp-content/uploads/2026/09/Pesta-Demokrasi-2026-MAN-2-Kudus-800x445.jpg',
    'https://web.man2kudus.sch.id/2026/09/17/man-2-kudus-gelar-pemilihan-ketua-osis-mpk-irmush-dan-dewan-ambalan-periode-kepengurusan-2026-2027/',
    4
  )
) as seed(name, kind, description, image_url, source_url, order_index)
where not exists (
  select 1
  from public.extracurriculars existing
  where lower(existing.name) = lower(seed.name)
    and existing.kind = seed.kind
);

-- 6. Index untuk membantu pencarian dan pengurutan data
create index if not exists cms_contents_published_date_idx
  on public.cms_contents (is_published, content_date desc);

create index if not exists teachers_role_order_idx
  on public.teachers (role, order_index);

create index if not exists extracurriculars_kind_order_idx
  on public.extracurriculars (kind, order_index);

-- 7. Aktifkan Row Level Security (RLS)
alter table public.admin_users enable row level security;
alter table public.cms_contents enable row level security;
alter table public.teachers enable row level security;
alter table public.extracurriculars enable row level security;

-- Hak akses dasar; kebijakan RLS tetap membatasi akses per baris
grant select on public.admin_users to authenticated;

grant select on public.cms_contents, public.teachers,
  public.extracurriculars to anon, authenticated;

grant insert, update, delete on public.cms_contents,
  public.teachers, public.extracurriculars to authenticated;

-- 8. Admin hanya dapat membaca identitas admin miliknya sendiri
drop policy if exists "Admin dapat membaca identitas admin sendiri"
  on public.admin_users;

create policy "Admin dapat membaca identitas admin sendiri"
  on public.admin_users
  for select to authenticated
  using (user_id = auth.uid());

-- 9. Kebijakan konten berita dan prestasi
drop policy if exists "Publik membaca konten tayang"
  on public.cms_contents;

create policy "Publik membaca konten tayang"
  on public.cms_contents
  for select to anon, authenticated
  using (is_published = true or public.is_admin());

drop policy if exists "Admin mengelola konten"
  on public.cms_contents;

create policy "Admin mengelola konten"
  on public.cms_contents
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- 10. Kebijakan data guru dan tenaga kependidikan
drop policy if exists "Publik membaca GTK tayang"
  on public.teachers;

create policy "Publik membaca GTK tayang"
  on public.teachers
  for select to anon, authenticated
  using (is_published = true or public.is_admin());

drop policy if exists "Admin mengelola GTK"
  on public.teachers;

create policy "Admin mengelola GTK"
  on public.teachers
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- 11. Kebijakan ekstrakurikuler dan organisasi murid
drop policy if exists "Publik membaca kegiatan tayang"
  on public.extracurriculars;

create policy "Publik membaca kegiatan tayang"
  on public.extracurriculars
  for select to anon, authenticated
  using (is_published = true or public.is_admin());

drop policy if exists "Admin mengelola kegiatan"
  on public.extracurriculars;

create policy "Admin mengelola kegiatan"
  on public.extracurriculars
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- 12. Storage untuk foto yang diunggah melalui dashboard admin
insert into storage.buckets (id, name, public)
values ('cms-images', 'cms-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Publik melihat gambar CMS"
  on storage.objects;

create policy "Publik melihat gambar CMS"
  on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'cms-images');

drop policy if exists "Admin unggah gambar CMS"
  on storage.objects;

create policy "Admin unggah gambar CMS"
  on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'cms-images' and public.is_admin()
  );

drop policy if exists "Admin mengubah gambar CMS"
  on storage.objects;

create policy "Admin mengubah gambar CMS"
  on storage.objects
  for update to authenticated
  using (bucket_id = 'cms-images' and public.is_admin())
  with check (bucket_id = 'cms-images' and public.is_admin());

drop policy if exists "Admin menghapus gambar CMS"
  on storage.objects;

create policy "Admin menghapus gambar CMS"
  on storage.objects
  for delete to authenticated
  using (bucket_id = 'cms-images' and public.is_admin());
