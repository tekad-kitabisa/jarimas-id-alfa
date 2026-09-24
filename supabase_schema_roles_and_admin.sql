-- ==============================================================================
-- JARIMAS.ID - SKEMA DATABASE MULTI-ROLE & SUPER ADMIN INFRASTRUCTURE
-- Jalankan skrip ini di SQL Editor Supabase Dashboard Anda.
-- ==============================================================================

-- 1. Pastikan ekstensi UUID aktif
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Pastikan tabel user_profiles memiliki kolom profil & wilayah lengkap
ALTER TABLE IF EXISTS public.user_profiles 
ADD COLUMN IF NOT EXISTS active_role TEXT DEFAULT 'PENDUDUK',
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS is_kota_tegal BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS provinsi_name TEXT DEFAULT 'Jawa Tengah',
ADD COLUMN IF NOT EXISTS kabupaten_name TEXT DEFAULT 'Kota Tegal',
ADD COLUMN IF NOT EXISTS kecamatan_name TEXT,
ADD COLUMN IF NOT EXISTS kelurahan_name TEXT,
ADD COLUMN IF NOT EXISTS rw TEXT,
ADD COLUMN IF NOT EXISTS rt TEXT;

-- 3. Buat / Perbarui tabel user_roles untuk menampung Multi-Role Pengguna
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    community_id UUID REFERENCES public.communities(id) ON DELETE SET NULL,
    role_name TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Buat indeks untuk performa query relasi peran
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_name ON public.user_roles(role_name);
CREATE INDEX IF NOT EXISTS idx_user_roles_community_id ON public.user_roles(community_id);

-- 4. Fungsi Helper untuk Cek Apakah Pengguna Adalah Super Admin
CREATE OR REPLACE FUNCTION public.is_super_admin(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_profiles 
    WHERE id = check_user_id AND active_role = 'SUPER_ADMIN'
  ) OR EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = check_user_id AND role_name = 'SUPER_ADMIN'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Konfigurasi Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Kebijakan RLS untuk user_profiles:
-- a) Semua orang yang login dapat membaca profil dasar warga
DROP POLICY IF EXISTS "Semua warga terotentikasi dapat melihat user_profiles" ON public.user_profiles;
CREATE POLICY "Semua warga terotentikasi dapat melihat user_profiles"
ON public.user_profiles FOR SELECT
TO authenticated
USING (true);

-- b) Pengguna dapat memperbarui profil mereka sendiri
DROP POLICY IF EXISTS "Pengguna dapat mengedit profil sendiri" ON public.user_profiles;
CREATE POLICY "Pengguna dapat mengedit profil sendiri"
ON public.user_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- c) Super Admin dapat mengedit dan memperbarui semua profil
DROP POLICY IF EXISTS "Super Admin dapat mengubah semua profil" ON public.user_profiles;
CREATE POLICY "Super Admin dapat mengubah semua profil"
ON public.user_profiles FOR ALL
TO authenticated
USING (public.is_super_admin(auth.uid()));

-- Kebijakan RLS untuk user_roles:
-- a) Pengguna dapat melihat daftar peran milik mereka sendiri atau peran publik
DROP POLICY IF EXISTS "Pengguna dapat melihat peran sendiri dan publik" ON public.user_roles;
CREATE POLICY "Pengguna dapat melihat peran sendiri dan publik"
ON public.user_roles FOR SELECT
TO authenticated
USING (true);

-- b) Pengguna dapat mendaftar/bergabung ke komunitas sendiri (insert role sendiri)
DROP POLICY IF EXISTS "Pengguna dapat mendaftar ke komunitas sendiri" ON public.user_roles;
CREATE POLICY "Pengguna dapat mendaftar ke komunitas sendiri"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- c) Pengguna dapat keluar dari komunitas sendiri (delete role sendiri)
DROP POLICY IF EXISTS "Pengguna dapat menghapus peran komunitas sendiri" ON public.user_roles;
CREATE POLICY "Pengguna dapat menghapus peran komunitas sendiri"
ON public.user_roles FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- d) Super Admin dapat menambah, mengubah, dan menghapus semua peran pengguna lain
DROP POLICY IF EXISTS "Super Admin memiliki akses penuh ke user_roles" ON public.user_roles;
CREATE POLICY "Super Admin memiliki akses penuh ke user_roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.is_super_admin(auth.uid()))
WITH CHECK (public.is_super_admin(auth.uid()));

-- 6. Trigger Otomatis Pembuatan Profil saat Registrasi Akun Baru
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert ke user_profiles dengan seluruh metadata wilayah
  INSERT INTO public.user_profiles (
    id,
    full_name,
    phone_number,
    is_kota_tegal,
    provinsi_name,
    kabupaten_name,
    kecamatan_name,
    kelurahan_name,
    rw,
    rt,
    active_role,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Warga Baru'),
    NEW.raw_user_meta_data->>'phone_number',
    COALESCE((NEW.raw_user_meta_data->>'is_kota_tegal')::boolean, TRUE),
    COALESCE(NEW.raw_user_meta_data->>'provinsi_name', 'Jawa Tengah'),
    COALESCE(NEW.raw_user_meta_data->>'kabupaten_name', 'Kota Tegal'),
    NEW.raw_user_meta_data->>'kecamatan_name',
    NEW.raw_user_meta_data->>'kelurahan_name',
    NEW.raw_user_meta_data->>'rw',
    NEW.raw_user_meta_data->>'rt',
    COALESCE(NEW.raw_user_meta_data->>'initial_role', 'PENDUDUK'),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone_number = EXCLUDED.phone_number,
    is_kota_tegal = EXCLUDED.is_kota_tegal,
    provinsi_name = EXCLUDED.provinsi_name,
    kabupaten_name = EXCLUDED.kabupaten_name,
    kecamatan_name = EXCLUDED.kecamatan_name,
    kelurahan_name = EXCLUDED.kelurahan_name,
    rw = EXCLUDED.rw,
    rt = EXCLUDED.rt,
    updated_at = NOW();

  -- Insert default role PENDUDUK ke user_roles
  INSERT INTO public.user_roles (
    user_id,
    role_name,
    is_verified
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'initial_role', 'PENDUDUK'),
    TRUE
  )
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Pasang trigger pada tabel auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==============================================================================
-- 7. CONTOH / CARA MENJADIKAN AKUN TERTENTU SEBAGAI SUPER ADMIN PERTAMA
-- Jalankan blok berikut untuk email target Anda:
-- ==============================================================================

-- Tetapkan peran aktif menjadi SUPER_ADMIN pada user_profiles
UPDATE public.user_profiles
SET active_role = 'SUPER_ADMIN'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'kreasi.hambali@gmail.com'
);

-- Berikan entri SUPER_ADMIN pada tabel user_roles
INSERT INTO public.user_roles (user_id, role_name, is_verified)
SELECT id, 'SUPER_ADMIN', TRUE
FROM auth.users
WHERE email = 'kreasi.hambali@gmail.com'
ON CONFLICT DO NOTHING;

-- Verifikasi hasil:
-- SELECT p.id, u.email, p.full_name, p.active_role 
-- FROM public.user_profiles p 
-- JOIN auth.users u ON p.id = u.id 
-- WHERE u.email = 'kreasi.hambali@gmail.com';
