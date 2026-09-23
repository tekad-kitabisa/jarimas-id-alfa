"use client"

import * as React from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FileText,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Building2,
  Lock,
  Compass,
  Layers,
  Menu,
  X,
} from "lucide-react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [selectedRole, setSelectedRole] = React.useState<"PENDUDUK" | "KETUA_RT" | "POSYANDU" | "PAUD">("PENDUDUK")

  const rolesData = {
    PENDUDUK: {
      title: "Warga & Penduduk",
      badge: "Akses Publik",
      desc: "Akses informasi kegiatan lingkungan, surat pengantar digital ke RT/RW, forum warga terverifikasi, dan pasar jual-beli antar tetangga.",
      features: ["Surat Pengantar RT/RW Digital", "Lini Masa Kabar Warga Terverifikasi", "Jarimas Market (UMKM Warga)", "Jadwal Posyandu & Kegiatan Lingkungan"],
    },
    KETUA_RT: {
      title: "Ketua RT & Pengurus RW",
      badge: "Tata Kelola Wilayah",
      desc: "Kelola data kependudukan warga secara real-time, validasi pengajuan surat pengantar secara instan, dan siarkan pengumuman darurat resmi.",
      features: ["Persetujuan Surat Pengantar 1-Klik", "Master Data Kependudukan & KK", "Siaran Pengumuman Wilayah Resmi", "Rekapitulasi Iuran & Kas RT/RW"],
    },
    POSYANDU: {
      title: "Kader Posyandu",
      badge: "Kesehatan Warga",
      desc: "Pencatatan rekam tumbuh kembang balita, jadwal imunisasi, dan pemantauan gizi ibu hamil yang terintegrasi langsung dengan data kependudukan warga.",
      features: ["Buku KIA & KMS Digital", "Notifikasi Jadwal Penimbangan & Imunisasi", "Deteksi Dini & Pencegahan Stunting", "Laporan Statistik Kesehatan Balita"],
    },
    PAUD: {
      title: "Pengelola & Guru PAUD",
      badge: "Pendidikan Komunitas",
      desc: "Koordinasi kegiatan belajar mengajar anak usia dini di lingkungan komunitas, rekap absensi, dan komunikasi interaktif dengan orang tua murid.",
      features: ["Buku Penghubung Orang Tua Digital", "Jadwal Pembelajaran & Portofolio Anak", "Pengumuman Kegiatan Belajar PAUD", "Integrasi Data Anak Usia Dini"],
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 via-purple-800 to-pink-700 text-white relative overflow-hidden selection:bg-pink-500 selection:text-white">
      {/* Ambient Lighting Orbs for Deep Glassmorphism Effect */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-pink-500/25 blur-[130px] pointer-events-none" />
      <div className="absolute top-[35%] -right-32 w-[650px] h-[650px] rounded-full bg-indigo-500/30 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 left-[20%] w-[600px] h-[600px] rounded-full bg-purple-500/25 blur-[140px] pointer-events-none" />

      {/* Floating Glassmorphism Header */}
      <div className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6">
        <header className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xl shadow-black/20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-gradient-to-br from-pink-400 to-purple-600 text-white h-9 w-9 rounded-xl flex items-center justify-center font-black text-sm shadow-md shadow-pink-500/30 group-hover:scale-105 transition-transform">
              JM
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight leading-none text-white drop-shadow-sm">
                JARIMAS<span className="text-pink-300 font-normal">.ID</span>
              </span>
              <span className="text-[9px] text-white/70 tracking-wider uppercase font-semibold">
                Ekosistem Warga
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 text-xs font-medium">
            <a
              href="#fitur"
              className="px-3.5 py-1.5 rounded-full text-white/85 hover:text-white hover:bg-white/15 transition-all duration-200"
            >
              Fitur Unggulan
            </a>
            <a
              href="#multi-role"
              className="px-3.5 py-1.5 rounded-full text-white/85 hover:text-white hover:bg-white/15 transition-all duration-200"
            >
              Multi-Role
            </a>
            <a
              href="#keamanan"
              className="px-3.5 py-1.5 rounded-full text-white/85 hover:text-white hover:bg-white/15 transition-all duration-200"
            >
              Keamanan Data
            </a>
            <Link
              href="/feed"
              className="px-3.5 py-1.5 rounded-full text-white/85 hover:text-white hover:bg-white/15 transition-all duration-200 flex items-center gap-1"
            >
              <Compass className="h-3.5 w-3.5 text-pink-300" />
              Jelajahi Feed
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-4 text-xs font-medium"
              >
                Masuk Akun
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="glow"
                size="sm"
                className="rounded-full px-4 text-xs font-semibold"
              >
                Daftar Warga
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2 text-sm font-medium">
              <a
                href="#fitur"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/90 hover:bg-white/10"
              >
                Fitur Unggulan
              </a>
              <a
                href="#multi-role"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/90 hover:bg-white/10"
              >
                Multi-Role Sistem
              </a>
              <a
                href="#keamanan"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-white/90 hover:bg-white/10"
              >
                Keamanan Data
              </a>
              <Link
                href="/feed"
                className="px-3 py-2 rounded-lg text-pink-200 hover:bg-white/10 flex items-center gap-2"
              >
                <Compass className="h-4 w-4" /> Masuk ke Feed Warga
              </Link>
            </div>
            <div className="pt-3 border-t border-white/15 flex flex-col gap-2">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full text-xs">
                  Masuk Akun
                </Button>
              </Link>
              <Link href="/register" className="w-full">
                <Button variant="glow" className="w-full text-xs">
                  Daftar Warga Baru
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Glow Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 shadow-lg shadow-black/10 mb-8 animate-in fade-in-50 duration-700">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <Sparkles className="h-3.5 w-3.5 text-pink-300" />
          <span className="text-xs font-semibold text-white/90 tracking-wide">
            Platform Ekosistem Digital Komunitas Warga & Pelayanan Publik
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto text-white drop-shadow-md">
          Harmoni Digital Komunitas Warga & Pelayanan Publik{" "}
          <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-200 bg-clip-text text-transparent underline decoration-pink-400/40 decoration-wavy decoration-2">
            Indonesia
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm">
          Menghubungkan warga tetangga, pengurus RT/RW, kader Posyandu, hingga pendidik PAUD dalam satu platform modern yang aman, transparan, dan terverifikasi.
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="w-full sm:w-auto">
            <Button
              variant="glow"
              size="lg"
              className="w-full sm:w-auto px-8 gap-2.5 text-sm sm:text-base font-bold shadow-2xl"
            >
              Daftar Sebagai Warga
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-7 gap-2 text-sm sm:text-base font-semibold"
            >
              Masuk ke Portal
              <ChevronRight className="h-4 w-4 opacity-70" />
            </Button>
          </Link>
        </div>

        {/* Quick Highlights Chips */}
        <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
            <span className="text-xs font-semibold text-white/90">Data Warga Terverifikasi</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center gap-2.5">
            <Layers className="h-4 w-4 text-pink-300 shrink-0" />
            <span className="text-xs font-semibold text-white/90">Multi-Role RT, RW & Posyandu</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center gap-2.5">
            <Building2 className="h-4 w-4 text-purple-300 shrink-0" />
            <span className="text-xs font-semibold text-white/90">Terintegrasi Wilayah Lokal</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center gap-2.5">
            <Lock className="h-4 w-4 text-blue-300 shrink-0" />
            <span className="text-xs font-semibold text-white/90">Privasi & Keamanan Tinggi</span>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid (Glass Cards) */}
      <section id="fitur" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="outline" className="text-xs px-3 py-1 mb-3 border-white/30 bg-white/10 text-white">
            Fitur Utama Ekosistem
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Solusi Menyeluruh untuk Lingkungan Warga yang Modern
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Seluruh kebutuhan administratif, sosial, dan ekonomi lingkungan terangkum dalam satu wadah digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Layanan RT/RW */}
          <Card className="hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500/40 to-indigo-600/40 border border-white/20 flex items-center justify-center text-blue-200 mb-2 shadow-inner">
                <FileText className="h-5 w-5" />
              </div>
              <CardTitle>Administrasi RT/RW Digital</CardTitle>
              <CardDescription>
                Pengajuan dan penerbitan surat pengantar, perizinan domisili, dan pendataan sensus warga yang transparan dan bebas birokrasi manual.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-xs text-white/85">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                  Surat pengantar instan bertanda tangan digital
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-300" />
                  Pencatatan kas dan iuran warga transparan
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 2: Kabar Warga */}
          <Card className="hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-pink-500/40 to-purple-600/40 border border-white/20 flex items-center justify-center text-pink-200 mb-2 shadow-inner">
                <Users className="h-5 w-5" />
              </div>
              <CardTitle>Kabar Warga & Komunitas</CardTitle>
              <CardDescription>
                Lini masa sosial lingkungan yang terverifikasi. Pengumuman kegiatan gotong royong, berita duka, atau agenda resmi tanpa hoaks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-xs text-white/85">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-300" />
                  Informasi resmi tervalidasi oleh pengurus wilayah
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-pink-300" />
                  Forum diskusi dan grup minat antar-warga
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 3: Jarimas Market */}
          <Card className="hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500/40 to-orange-600/40 border border-white/20 flex items-center justify-center text-amber-200 mb-2 shadow-inner">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <CardTitle>Jarimas Market (Pasar Warga)</CardTitle>
              <CardDescription>
                Pasar komunitas lokal untuk memberdayakan UMKM tetangga. Beli kebutuhan harian, kuliner, dan jasa langsung dari warga sekitar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-xs text-white/85">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                  Etalase produk UMKM dan jasa warga terdekat
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                  Pengiriman cepat antar-tetangga tanpa ongkir mahal
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 4: Posyandu Digital */}
          <Card className="hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-rose-500/40 to-red-600/40 border border-white/20 flex items-center justify-center text-rose-200 mb-2 shadow-inner">
                <HeartPulse className="h-5 w-5" />
              </div>
              <CardTitle>Posyandu & Kesehatan Ibu-Anak</CardTitle>
              <CardDescription>
                Buku kesehatan ibu dan anak (KIA) digital. Jadwal penimbangan rutin, imunisasi, dan pemantauan gizi terintegrasi data kependudukan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-xs text-white/85">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-rose-300" />
                  Grafik rekam tumbuh kembang balita otomatis
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-rose-300" />
                  Pengingat otomatis jadwal imunisasi berkala
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 5: PAUD-PNF */}
          <Card className="hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-teal-500/40 to-emerald-600/40 border border-white/20 flex items-center justify-center text-teal-200 mb-2 shadow-inner">
                <GraduationCap className="h-5 w-5" />
              </div>
              <CardTitle>Pendidikan PAUD & PNF</CardTitle>
              <CardDescription>
                Kolaborasi cerdas antara pendidik dan orang tua murid usia dini. Portofolio anak, pengumuman sekolah, dan modul pembelajaran keluarga.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-xs text-white/85">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-300" />
                  Buku penghubung orang tua & guru digital
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-300" />
                  Agenda kegiatan dan perkembangan motorik anak
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 6: Sistem Keamanan & Verifikasi */}
          <Card className="hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-violet-500/40 to-purple-600/40 border border-white/20 flex items-center justify-center text-violet-200 mb-2 shadow-inner">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle>Multi-Role & Privasi Terjamin</CardTitle>
              <CardDescription>
                Arsitektur hak akses multi-peran dengan enkripsi data kependudukan. Satu akun dapat berpindah peran sesuai penugasan di masyarakat.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5 text-xs text-white/85">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                  Switch Role instan dari navbar tanpa login ulang
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-300" />
                  Perlindungan data NIK dengan standardisasi keamanan
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Multi-Role Simulator Section */}
      <section id="multi-role" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="outline" className="text-xs px-3 py-1 mb-3 border-white/30 bg-white/10 text-white">
            Simulasi Multi-Role
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Satu Akun Warga, Beragam Peran Komunitas
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Klik tombol peran di bawah untuk melihat bagaimana antarmuka dan hak akses berubah secara dinamis.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(["PENDUDUK", "KETUA_RT", "POSYANDU", "PAUD"] as const).map((roleKey) => (
            <button
              key={roleKey}
              onClick={() => setSelectedRole(roleKey)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedRole === roleKey
                  ? "bg-white text-indigo-950 shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105"
                  : "bg-white/10 backdrop-blur-md text-white/85 hover:bg-white/20 hover:text-white border border-white/15"
              }`}
            >
              {rolesData[roleKey].title}
            </button>
          ))}
        </div>

        {/* Active Role Showcase Glass Card */}
        <Card className="max-w-4xl mx-auto border-white/30 bg-white/15 backdrop-blur-xl shadow-2xl p-2 sm:p-4">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl sm:text-2xl font-black">
                  {rolesData[selectedRole].title}
                </CardTitle>
                <Badge variant="outline" className="border-pink-300 text-pink-200 text-[10px]">
                  {rolesData[selectedRole].badge}
                </Badge>
              </div>
              <CardDescription className="mt-1 text-xs sm:text-sm text-white/90">
                {rolesData[selectedRole].desc}
              </CardDescription>
            </div>
            <Link href="/register">
              <Button variant="glow" size="sm" className="shrink-0 text-xs">
                Coba Mode Ini
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-6">
            <h4 className="text-xs uppercase tracking-wider font-bold text-pink-200 mb-3">
              Fitur & Kewenangan Khusus:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rolesData[selectedRole].features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center gap-3 text-xs font-semibold text-white"
                >
                  <div className="h-5 w-5 rounded-full bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                    ✓
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Security & Data Governance Section */}
      <section id="keamanan" className="py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <Card className="bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 overflow-hidden relative p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-left">
              <Badge variant="outline" className="border-emerald-300 text-emerald-200 bg-emerald-950/40 text-xs">
                Keamanan & Standar Kependudukan
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Perlindungan Data Pribadi Warga Tingkat Tinggi
              </h2>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                Seluruh data identitas kependudukan seperti NIK, Nomor KK, serta rekam medis Posyandu dilindungi dengan enkripsi berbasis Row Level Security (RLS) di Supabase. Hanya pihak berwenang sesuai wilayah RT/RW yang memiliki izin akses resmi.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-white/90 border border-white/15">
                  🛡️ Row Level Security (RLS)
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-white/90 border border-white/15">
                  🔐 Enkripsi SSL & Token Session
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-white/90 border border-white/15">
                  🏛️ Kepatuhan UU Perlindungan Data Pribadi
                </span>
              </div>
            </div>

            {/* Visual Security Badge Display */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/20 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-3">
              <div className="h-16 w-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="h-9 w-9" />
              </div>
              <h3 className="text-base font-bold text-white">Sistem Terverifikasi & Terintegrasi</h3>
              <p className="text-xs text-white/75 max-w-sm">
                Dirancang khusus untuk mendukung digitalisasi tata kelola komunitas di Kota Tegal dan seluruh wilayah Indonesia.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Call To Action Banner */}
      <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-indigo-600/30 backdrop-blur-2xl border border-white/30 shadow-2xl shadow-purple-950/50 space-y-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-pink-400/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-indigo-400/30 blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Wujudkan Lingkungan Warga yang Cerdas & Guyub
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto">
            Bergabunglah sekarang bersama ribuan warga lainnya. Nikmati kemudahan administrasi RT/RW, informasi terpercaya, dan pasar komunitas langsung di genggaman Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                variant="glow"
                size="lg"
                className="w-full sm:w-auto px-9 text-base font-bold shadow-xl"
              >
                Daftarkan Diri Anda Sekarang
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="glass"
                size="lg"
                className="w-full sm:w-auto px-8 text-base font-semibold"
              >
                Masuk Akun Warga
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Minimalist Glass Footer */}
      <footer className="border-t border-white/15 bg-black/20 backdrop-blur-lg py-8 text-center text-xs text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 text-white h-6 w-6 rounded-md flex items-center justify-center text-xs font-black">
              JM
            </div>
            <span className="font-bold text-white">JARIMAS.ID</span>
            <span className="text-white/50">| Jaringan Informasi Masyarakat Indonesia</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/feed" className="hover:text-white transition-colors">
              Feed Warga
            </Link>
            <Link href="/login" className="hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/register" className="hover:text-white transition-colors">
              Register
            </Link>
          </div>

          <div className="text-white/60 text-[11px]">
            © {new Date().getFullYear()} JARIMAS.ID. Seluruh Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  )
}
