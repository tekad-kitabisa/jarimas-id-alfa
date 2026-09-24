-- ==============================================================================
-- SEED DATA KOMUNITAS RESMI KOTA TEGAL (POSYANDU, PAUD, RA, PKBM, SKB, RT/RW)
-- Jalankan skrip ini di Supabase SQL Editor
-- ==============================================================================

-- A. Pastikan struktur kolom tabel communities lengkap
ALTER TABLE public.communities
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS type TEXT,
  ADD COLUMN IF NOT EXISTS community_type TEXT,
  ADD COLUMN IF NOT EXISTS kecamatan_name TEXT,
  ADD COLUMN IF NOT EXISTS kelurahan_name TEXT,
  ADD COLUMN IF NOT EXISTS rw TEXT,
  ADD COLUMN IF NOT EXISTS rt TEXT;

ALTER TABLE public.communities ALTER COLUMN community_type TYPE TEXT USING community_type::text;

-- B. Masukkan Data Riil Posyandu & Lembaga Pendidikan Kota Tegal Berdasarkan Kelurahan
INSERT INTO public.communities (id, name, description, type, community_type, kecamatan_name, kelurahan_name)
VALUES
  -- ============================================================================
  -- 1. POSYANDU RESMI KOTA TEGAL
  -- ============================================================================

  -- TEGAL BARAT
  -- Pekauman
  (gen_random_uuid(), 'Posyandu Tunas', 'Layanan Posyandu Balita & Kesehatan Kelurahan Pekauman', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Pekauman'),
  (gen_random_uuid(), 'Posyandu Duku', 'Layanan Posyandu Balita & Kesehatan Kelurahan Pekauman', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Pekauman'),
  (gen_random_uuid(), 'Posyandu Garuda Pekauman', 'Layanan Posyandu Balita & Kesehatan Kelurahan Pekauman', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Pekauman'),
  (gen_random_uuid(), 'Posyandu Belimbing', 'Layanan Posyandu Balita & Kesehatan Kelurahan Pekauman', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Pekauman'),
  (gen_random_uuid(), 'Posyandu Jalak', 'Layanan Posyandu Balita & Kesehatan Kelurahan Pekauman', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Pekauman'),
  (gen_random_uuid(), 'Posyandu Nanas', 'Layanan Posyandu Balita & Kesehatan Kelurahan Pekauman', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Pekauman'),
  (gen_random_uuid(), 'Posyandu Delima Pekauman', 'Layanan Posyandu Balita & Kesehatan Kelurahan Pekauman', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Pekauman'),

  -- Pesurungan Kidul
  (gen_random_uuid(), 'Posyandu Melati 1', 'Layanan Posyandu Balita Kelurahan Pesurungan Kidul', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Pesurungan Kidul'),
  (gen_random_uuid(), 'Posyandu Melati 2', 'Layanan Posyandu Balita Kelurahan Pesurungan Kidul', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Pesurungan Kidul'),
  (gen_random_uuid(), 'Posyandu Melati 3', 'Layanan Posyandu Balita Kelurahan Pesurungan Kidul', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Pesurungan Kidul'),

  -- Kemandungan
  (gen_random_uuid(), 'Posyandu Cempaka Kemandungan', 'Layanan Posyandu Balita Kelurahan Kemandungan', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Kemandungan'),
  (gen_random_uuid(), 'Posyandu Melati Kemandungan', 'Layanan Posyandu Balita Kelurahan Kemandungan', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Kemandungan'),
  (gen_random_uuid(), 'Posyandu Seruni Kemandungan', 'Layanan Posyandu Balita Kelurahan Kemandungan', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Kemandungan'),

  -- Debong Lor
  (gen_random_uuid(), 'Posyandu Dahlia Debong Lor', 'Layanan Posyandu Balita Kelurahan Debong Lor', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Debong Lor'),
  (gen_random_uuid(), 'Posyandu Anggrek Debong Lor', 'Layanan Posyandu Balita Kelurahan Debong Lor', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Debong Lor'),

  -- Kraton
  (gen_random_uuid(), 'Posyandu Mawar Kraton', 'Layanan Posyandu Balita Kelurahan Kraton', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Kraton'),
  (gen_random_uuid(), 'Posyandu Kenanga Kraton', 'Layanan Posyandu Balita Kelurahan Kraton', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Kraton'),

  -- Tegalsari
  (gen_random_uuid(), 'Posyandu Bahari Tegalsari', 'Layanan Posyandu Balita Kelurahan Tegalsari', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Tegalsari'),
  (gen_random_uuid(), 'Posyandu Mina Tegalsari', 'Layanan Posyandu Balita Kelurahan Tegalsari', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Tegalsari'),

  -- Muarareja
  (gen_random_uuid(), 'Posyandu Pantai Muarareja', 'Layanan Posyandu Balita Kelurahan Muarareja', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Muarareja'),
  (gen_random_uuid(), 'Posyandu Karang Muarareja', 'Layanan Posyandu Balita Kelurahan Muarareja', 'POSYANDU', 'POSYANDU', 'Tegal Barat', 'Muarareja'),

  -- TEGAL SELATAN
  -- Randugunting
  (gen_random_uuid(), 'Posyandu Ketilang', 'Layanan Posyandu Balita Kelurahan Randugunting', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Randugunting'),
  (gen_random_uuid(), 'Posyandu Nuri', 'Layanan Posyandu Balita Kelurahan Randugunting', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Randugunting'),
  (gen_random_uuid(), 'Posyandu Gelatik', 'Layanan Posyandu Balita Kelurahan Randugunting', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Randugunting'),
  (gen_random_uuid(), 'Posyandu Rajawali', 'Layanan Posyandu Balita Kelurahan Randugunting', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Randugunting'),
  (gen_random_uuid(), 'Posyandu Garuda Randugunting', 'Layanan Posyandu Balita Kelurahan Randugunting', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Randugunting'),
  (gen_random_uuid(), 'Posyandu Meliwis', 'Layanan Posyandu Balita Kelurahan Randugunting', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Randugunting'),

  -- Kalinyamat Wetan
  (gen_random_uuid(), 'Posyandu Melati Kalinyamat Wetan', 'Layanan Posyandu Balita Kelurahan Kalinyamat Wetan', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Kalinyamat Wetan'),

  -- Bandung
  (gen_random_uuid(), 'Posyandu Mawar Bandung', 'Layanan Posyandu Balita Kelurahan Bandung', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Bandung'),

  -- Debong Kidul
  (gen_random_uuid(), 'Posyandu Cempaka Debong Kidul', 'Layanan Posyandu Balita Kelurahan Debong Kidul', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Debong Kidul'),

  -- Tunon
  (gen_random_uuid(), 'Posyandu Dahlia Tunon', 'Layanan Posyandu Balita Kelurahan Tunon', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Tunon'),

  -- Keturen
  (gen_random_uuid(), 'Posyandu Flamboyan Keturen', 'Layanan Posyandu Balita Kelurahan Keturen', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Keturen'),

  -- Debong Kulon
  (gen_random_uuid(), 'Posyandu Melati Debong Kulon', 'Layanan Posyandu Balita Kelurahan Debong Kulon', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Debong Kulon'),

  -- Debong Tengah
  (gen_random_uuid(), 'Posyandu Anggrek Debong Tengah', 'Layanan Posyandu Balita Kelurahan Debong Tengah', 'POSYANDU', 'POSYANDU', 'Tegal Selatan', 'Debong Tengah'),

  -- TEGAL TIMUR
  -- Kejambon
  (gen_random_uuid(), 'Posyandu Kamboja 1', 'Layanan Posyandu Balita Kelurahan Kejambon', 'POSYANDU', 'POSYANDU', 'Tegal Timur', 'Kejambon'),
  (gen_random_uuid(), 'Posyandu Kamboja 2', 'Layanan Posyandu Balita Kelurahan Kejambon', 'POSYANDU', 'POSYANDU', 'Tegal Timur', 'Kejambon'),

  -- Slerok
  (gen_random_uuid(), 'Posyandu Aster Slerok', 'Layanan Posyandu Balita Kelurahan Slerok', 'POSYANDU', 'POSYANDU', 'Tegal Timur', 'Slerok'),
  (gen_random_uuid(), 'Posyandu Melati Slerok', 'Layanan Posyandu Balita Kelurahan Slerok', 'POSYANDU', 'POSYANDU', 'Tegal Timur', 'Slerok'),

  -- Panggung
  (gen_random_uuid(), 'Posyandu Teratai Panggung', 'Layanan Posyandu Balita Kelurahan Panggung', 'POSYANDU', 'POSYANDU', 'Tegal Timur', 'Panggung'),
  (gen_random_uuid(), 'Posyandu Anggrek Panggung', 'Layanan Posyandu Balita Kelurahan Panggung', 'POSYANDU', 'POSYANDU', 'Tegal Timur', 'Panggung'),

  -- Mangkukusuman
  (gen_random_uuid(), 'Posyandu Bougenville Mangkukusuman', 'Layanan Posyandu Balita Kelurahan Mangkukusuman', 'POSYANDU', 'POSYANDU', 'Tegal Timur', 'Mangkukusuman'),
  (gen_random_uuid(), 'Posyandu Melati Mangkukusuman', 'Layanan Posyandu Balita Kelurahan Mangkukusuman', 'POSYANDU', 'POSYANDU', 'Tegal Timur', 'Mangkukusuman'),

  -- Mintaragen
  (gen_random_uuid(), 'Posyandu Flamboyan Mintaragen', 'Layanan Posyandu Balita Kelurahan Mintaragen', 'POSYANDU', 'POSYANDU', 'Tegal Timur', 'Mintaragen'),
  (gen_random_uuid(), 'Posyandu Cempaka Mintaragen', 'Layanan Posyandu Balita Kelurahan Mintaragen', 'POSYANDU', 'POSYANDU', 'Tegal Timur', 'Mintaragen'),

  -- MARGADANA
  -- Margadana
  (gen_random_uuid(), 'Posyandu Kenanga Margadana', 'Layanan Posyandu Balita Kelurahan Margadana', 'POSYANDU', 'POSYANDU', 'Margadana', 'Margadana'),
  (gen_random_uuid(), 'Posyandu Mawar Margadana', 'Layanan Posyandu Balita Kelurahan Margadana', 'POSYANDU', 'POSYANDU', 'Margadana', 'Margadana'),

  -- Kaligangsa
  (gen_random_uuid(), 'Posyandu Melati Kaligangsa', 'Layanan Posyandu Balita Kelurahan Kaligangsa', 'POSYANDU', 'POSYANDU', 'Margadana', 'Kaligangsa'),

  -- Krandon
  (gen_random_uuid(), 'Posyandu Anggrek Krandon', 'Layanan Posyandu Balita Kelurahan Krandon', 'POSYANDU', 'POSYANDU', 'Margadana', 'Krandon'),

  -- Cabawan
  (gen_random_uuid(), 'Posyandu Cempaka Cabawan', 'Layanan Posyandu Balita Kelurahan Cabawan', 'POSYANDU', 'POSYANDU', 'Margadana', 'Cabawan'),

  -- Kalinyamat Kulon
  (gen_random_uuid(), 'Posyandu Dahlia Kalinyamat Kulon', 'Layanan Posyandu Balita Kelurahan Kalinyamat Kulon', 'POSYANDU', 'POSYANDU', 'Margadana', 'Kalinyamat Kulon'),

  -- Sumurpanggang
  (gen_random_uuid(), 'Posyandu Teratai Sumurpanggang', 'Layanan Posyandu Balita Kelurahan Sumurpanggang', 'POSYANDU', 'POSYANDU', 'Margadana', 'Sumurpanggang'),

  -- Pesurungan Lor
  (gen_random_uuid(), 'Posyandu Flamboyan Pesurungan Lor', 'Layanan Posyandu Balita Kelurahan Pesurungan Lor', 'POSYANDU', 'POSYANDU', 'Margadana', 'Pesurungan Lor'),

  -- ============================================================================
  -- 2. SATUAN PAUD, RA, PKBM, DAN SKB RESMI KOTA TEGAL
  -- ============================================================================

  (gen_random_uuid(), 'KB Al-Irsyad Pekauman', 'Kelompok Bermain Islam Al-Irsyad Kelurahan Pekauman', 'PAUD', 'PAUD', 'Tegal Barat', 'Pekauman'),
  (gen_random_uuid(), 'KB Bias Assalam Randugunting', 'Kelompok Bermain Bina Anak Sholeh Randugunting', 'PAUD', 'PAUD', 'Tegal Selatan', 'Randugunting'),
  (gen_random_uuid(), 'RA Usamah 2 Mintaragen', 'Raudhatul Athfal Usamah 2 Kelurahan Mintaragen', 'RA', 'PAUD', 'Tegal Timur', 'Mintaragen'),
  (gen_random_uuid(), 'RA At Taqwa Pekauman', 'Raudhatul Athfal At Taqwa Kelurahan Pekauman', 'RA', 'PAUD', 'Tegal Barat', 'Pekauman'),
  (gen_random_uuid(), 'TK Aisyiyah Bustanul Athfal Pekauman', 'Taman Kanak-Kanak ABA Kelurahan Pekauman', 'PAUD', 'PAUD', 'Tegal Barat', 'Pekauman'),
  (gen_random_uuid(), 'TK Pertiwi Randugunting', 'Taman Kanak-Kanak Pertiwi Kelurahan Randugunting', 'PAUD', 'PAUD', 'Tegal Selatan', 'Randugunting'),
  (gen_random_uuid(), 'TK Pembina Mintaragen', 'TK Negeri Pembina Kecamatan Tegal Timur', 'PAUD', 'PAUD', 'Tegal Timur', 'Mintaragen'),
  (gen_random_uuid(), 'UPTD SPNF SKB Kota Tegal', 'Sanggar Kegiatan Belajar Non-Formal Kota Tegal di Kraton', 'SKB', 'PNF', 'Tegal Barat', 'Kraton'),
  (gen_random_uuid(), 'PKBM Sakila Kerti Panggung', 'Pusat Kegiatan Belajar Masyarakat Sakila Kerti Terminal Tegal', 'PKBM', 'PNF', 'Tegal Timur', 'Panggung'),
  (gen_random_uuid(), 'TK Muslimat NU Kejambon', 'Taman Kanak-Kanak Muslimat NU Kejambon', 'PAUD', 'PAUD', 'Tegal Timur', 'Kejambon'),
  (gen_random_uuid(), 'KB Tunas Bangsa Margadana', 'Kelompok Bermain Tunas Bangsa Margadana', 'PAUD', 'PAUD', 'Margadana', 'Margadana')
ON CONFLICT DO NOTHING;
