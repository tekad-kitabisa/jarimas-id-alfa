-- ==============================================================================
-- SKRIP PEMBERSIHAN DATA UJI COBA JARIMAS-ID
-- Jalankan skrip ini di SQL Editor Supabase jika ingin mereset data uji coba.
-- Perhatian: Skrip ini menghapus status, lapak, dan penugasan peran non-Super Admin
-- ==============================================================================

-- 1. Hapus postingan kabar warga uji coba
DELETE FROM public.posts;

-- 2. Hapus barang/jasa di marketplace uji coba
DELETE FROM public.marketplace_items;

-- 3. Hapus penugasan peran tambahan (pertahankan pendaftaran dasar dan Super Admin)
DELETE FROM public.user_roles WHERE role_name != 'SUPER_ADMIN';

-- 4. Reset active_role akun warga non-Super Admin ke PENDUDUK
UPDATE public.user_profiles
SET active_role = 'PENDUDUK'
WHERE active_role != 'SUPER_ADMIN';
