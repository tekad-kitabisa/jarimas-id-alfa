"use client"

import * as React from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
  Check,
  Building2,
  Lock,
  Compass,
  Layers,
  Flame,
  Zap,
  Star,
  CheckCircle,
} from "lucide-react"

export default function NeoBrutalistLandingPage() {
  const [activeRole, setActiveRole] = React.useState<"PENDUDUK" | "KETUA_RT" | "POSYANDU" | "PAUD">("PENDUDUK")

  const roleDetails = {
    PENDUDUK: {
      title: "Penduduk / Warga RT 02",
      badge: "Warga Publik",
      bgClass: "bg-white",
      desc: "Urus surat pengantar RT/RW secara online tanpa antre, bagikan kabar lingkungan bebas hoaks, dan jual-beli produk di pasar tetangga.",
      features: [
        "Pengajuan Surat Pengantar RT/RW Digital",
        "Akses Kabar Warga Tervalidasi Pengurus",
        "Jual & Beli Produk Lokal di Jarimas Market",
        "Informasi Jadwal Posyandu & Kegiatan Lingkungan",
      ],
    },
    KETUA_RT: {
      title: "Ketua RT & Pengurus RW",
      badge: "Pengurus Wilayah",
      bgClass: "bg-blue-400",
      desc: "Verifikasi dan terbitkan surat pengantar warga dalam 1-klik, pantau sensus kependudukan real-time, dan kelola kas lingkungan transparan.",
      features: [
        "Persetujuan Surat Pengantar Instan (1-Klik)",
        "Database Master Kependudukan & KK Terpusat",
        "Siaran Pengumuman Resmi & Notifikasi Darurat",
        "Rekapitulasi Iuran & Kas Warga Transparan",
      ],
    },
    POSYANDU: {
      title: "Kader Posyandu Melati",
      badge: "Kesehatan Balita",
      bgClass: "bg-pink-400",
      desc: "Pencatatan digital tumbuh kembang balita, buku KMS/KIA otomatis, dan jadwal imunisasi yang terhubung langsung ke data keluarga warga.",
      features: [
        "Pencatatan Penimbangan & Pengukuran Balita",
        "Grafik KMS Digital & Deteksi Dini Stunting",
        "Pengingat Otomatis Jadwal Imunisasi Berkala",
        "Laporan Statistik Kesehatan Ibu & Balita",
      ],
    },
    PAUD: {
      title: "Pengelola PAUD Tunas Bangsa",
      badge: "Pendidikan Komunitas",
      bgClass: "bg-lime-400",
      desc: "Buku penghubung digital antara guru dan orang tua, pantau perkembangan anak usia dini, dan koordinasi kegiatan belajar komunitas.",
      features: [
        "Buku Penghubung Guru & Orang Tua Digital",
        "Rekap Kehadiran & Jurnal Aktivitas Anak",
        "Pengumuman & Agenda Pembelajaran PAUD",
        "Integrasi Data Anak Usia Dini Lingkungan",
      ],
    },
  }

  return (
    <div className="min-h-screen bg-amber-400 text-black selection:bg-black selection:text-amber-400 font-sans">
      {/* Top Brutalist Navbar */}
      <div className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6">
        <header className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000000] rounded-2xl px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-black text-amber-400 h-10 w-10 rounded-xl border-2 border-black flex items-center justify-center font-black text-base shadow-[2px_2px_0px_0px_#000000] group-hover:rotate-6 transition-transform">
              JM
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl tracking-tighter leading-none">
                JARIMAS<span className="bg-amber-400 px-1 ml-0.5 border border-black rounded">.ID</span>
              </span>
              <span className="text-[10px] font-black tracking-wider uppercase text-black/70">
                Ekosistem Warga
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/feed"
              className="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider text-black hover:bg-amber-300 border-2 border-transparent hover:border-black transition-all flex items-center gap-1.5"
            >
              <Compass className="h-4 w-4" />
              Feed Warga
            </Link>
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-300 border-2 border-black rounded-xl text-xs font-black">
              <Building2 className="h-3.5 w-3.5" />
              Kel. Pekauman / RT 02
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-black uppercase tracking-wider"
              >
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="blue"
                size="sm"
                className="text-xs font-black uppercase tracking-wider"
              >
                Daftar Warga
              </Button>
            </Link>
          </div>
        </header>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-20 space-y-12">
        {/* ========================================================= */}
        {/* HERO SECTION (Super Bold Typography & High Energy)        */}
        {/* ========================================================= */}
        <section className="text-center space-y-6 pt-6 sm:pt-10">
          {/* Sticker Badge */}
          <div className="inline-block transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000000] text-xs sm:text-sm font-black uppercase tracking-wider">
              <Flame className="h-4 w-4 text-rose-500 fill-rose-500" />
              <span>Platform Komunitas Warga & Pelayanan Publik No. 1</span>
              <Sparkles className="h-4 w-4 text-amber-500 fill-amber-500" />
            </div>
          </div>

          {/* Massive Headline */}
          <h1 className="font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-black leading-[0.95] max-w-5xl mx-auto uppercase">
            Harmoni Digital <br />
            <span className="bg-white px-3 py-1 border-4 border-black shadow-[6px_6px_0px_0px_#000000] inline-block mt-2">
              Warga Indonesia
            </span>
          </h1>

          {/* Punchy Subtitle */}
          <p className="text-base sm:text-lg md:text-xl font-bold text-black max-w-2xl mx-auto leading-normal pt-2">
            Hubungkan warga tetangga, pengurus RT/RW, posyandu, dan pendidik PAUD dalam satu sistem yang serba cepat, terbuka, dan 100% tervalidasi.
          </p>

          {/* Primary CTA Buttons with Tactile Press Feedback */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto gap-3 text-base sm:text-lg uppercase tracking-wider"
              >
                <Zap className="h-5 w-5 fill-amber-400 text-amber-400" />
                Daftar Sebagai Warga
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="blue"
                size="lg"
                className="w-full sm:w-auto gap-2 text-base sm:text-lg uppercase tracking-wider"
              >
                Masuk ke Portal
              </Button>
            </Link>
          </div>

          {/* Floating Sticker Chips */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
            <Badge variant="secondary" className="text-xs px-3 py-1 font-black">
              ✓ 100% DATA TERVERIFIKASI
            </Badge>
            <Badge variant="blue" className="text-xs px-3 py-1 font-black">
              ✓ MULTI-ROLE RT, RW & POSYANDU
            </Badge>
            <Badge variant="pink" className="text-xs px-3 py-1 font-black">
              ✓ PASAR WARGA UMKM
            </Badge>
            <Badge variant="lime" className="text-xs px-3 py-1 font-black">
              ✓ PRIVASI ROW LEVEL SECURITY
            </Badge>
          </div>
        </section>

        {/* ========================================================= */}
        {/* NEO-BRUTALIST FEATURE GRID (6 High-Contrast Cards)       */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-4 border-black pb-4">
            <div>
              <Badge variant="default" className="text-xs font-black mb-2">
                FITUR LENGKAP
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                Katalog Layanan Komunitas
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-bold text-black/80 max-w-md">
              Dirancang untuk mengatasi birokrasi berbelit, kabar hoaks, dan memajukan perekonomian warga lingkungan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Administrasi RT/RW */}
            <Card className="bg-white hover:bg-neutral-50 flex flex-col justify-between">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-blue-400 border-3 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center text-black mb-2 font-black">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle>Administrasi RT/RW Digital</CardTitle>
                <CardDescription>
                  Pengurusan surat pengantar, perizinan lingkungan, dan pendataan sensus warga tanpa perlu antre di rumah pengurus.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    Surat pengantar digital instan
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    Pencatatan kas dan iuran RT terbuka
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Badge variant="blue" className="text-[10px]">Layanan Mandiri</Badge>
              </CardFooter>
            </Card>

            {/* Card 2: Kabar Warga */}
            <Card className="bg-blue-400 hover:bg-blue-300 flex flex-col justify-between">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-white border-3 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center text-black mb-2 font-black">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Kabar Warga Bebas Hoaks</CardTitle>
                <CardDescription className="text-black">
                  Lini masa sosial terpercaya. Berita gotong royong, agenda resmi, hingga pengumuman duka divalidasi langsung oleh pengurus.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2 text-xs font-bold text-black">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-black shrink-0" />
                    Validasi pengurus RT/RW resmi
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-black shrink-0" />
                    Forum rembuk & diskusi warga aktif
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-black/20">
                <Badge variant="secondary" className="text-[10px]">Terverifikasi</Badge>
              </CardFooter>
            </Card>

            {/* Card 3: Jarimas Market */}
            <Card className="bg-pink-400 hover:bg-pink-300 flex flex-col justify-between">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-amber-300 border-3 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center text-black mb-2 font-black">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <CardTitle>Jarimas Market (Pasar Warga)</CardTitle>
                <CardDescription className="text-black">
                  Pasar komunitas tetangga untuk memberdayakan UMKM warga. Jual beli kuliner, barang kebutuhan harian, dan jasa lokal.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2 text-xs font-bold text-black">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-black shrink-0" />
                    Etalase produk tetangga tanpa perantara
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-black shrink-0" />
                    Pengiriman kilat antar-rumah dekat
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-black/20">
                <Badge variant="yellow" className="text-[10px]">Ekonomi Warga</Badge>
              </CardFooter>
            </Card>

            {/* Card 4: Posyandu Digital */}
            <Card className="bg-lime-400 hover:bg-lime-300 flex flex-col justify-between">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-white border-3 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center text-black mb-2 font-black">
                  <HeartPulse className="h-6 w-6" />
                </div>
                <CardTitle>Posyandu & KIA Digital</CardTitle>
                <CardDescription className="text-black">
                  Buku KIA/KMS digital. Rekam tumbuh kembang balita, jadwal imunisasi, dan pemantauan gizi terpadu dengan data kependudukan.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2 text-xs font-bold text-black">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-black shrink-0" />
                    Grafik pemantauan stunting otomatis
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-black shrink-0" />
                    Notifikasi jadwal imunisasi berkala
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-black/20">
                <Badge variant="secondary" className="text-[10px]">Kesehatan Balita</Badge>
              </CardFooter>
            </Card>

            {/* Card 5: PAUD Komunitas */}
            <Card className="bg-white hover:bg-neutral-50 flex flex-col justify-between">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-pink-400 border-3 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center text-black mb-2 font-black">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <CardTitle>Pendidikan PAUD & PNF</CardTitle>
                <CardDescription>
                  Buku penghubung orang tua murid digital. Pantau agenda pembelajaran anak usia dini dan pengumuman sekolah langsung.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    Buku penghubung guru & orang tua
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    Portofolio & capaian tumbuh kembang anak
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Badge variant="pink" className="text-[10px]">Pendidikan Dini</Badge>
              </CardFooter>
            </Card>

            {/* Card 6: Keamanan & Multi-Role */}
            <Card className="bg-white hover:bg-neutral-50 flex flex-col justify-between">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-lime-400 border-3 border-black shadow-[3px_3px_0px_0px_#000000] flex items-center justify-center text-black mb-2 font-black">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <CardTitle>Keamanan RLS & Multi-Role</CardTitle>
                <CardDescription>
                  Satu akun dapat berganti peran secara fleksibel. Didukung enkripsi Supabase Row Level Security yang melindungi data warga.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    Switch Role instan dari navigation bar
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                    Enkripsi data & RLS terverifikasi
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Badge variant="lime" className="text-[10px]">Supabase RLS</Badge>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTERACTIVE MULTI-ROLE SIMULATOR (Brutalist Style)        */}
        {/* ========================================================= */}
        <section className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000000] rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="yellow" className="text-xs font-black">
              SIMULASI MULTI-ROLE INTERAKTIF
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              1 Akun untuk Seluruh Peran di Lingkungan
            </h2>
            <p className="text-xs sm:text-sm font-bold text-black/80">
              Klik tab peran di bawah ini untuk melihat bagaimana hak akses dan antarmuka beradaptasi secara dinamis:
            </p>
          </div>

          {/* Role Tab Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(["PENDUDUK", "KETUA_RT", "POSYANDU", "PAUD"] as const).map((roleKey) => (
              <button
                key={roleKey}
                onClick={() => setActiveRole(roleKey)}
                className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider border-3 border-black shadow-[3px_3px_0px_0px_#000000] transition-all cursor-pointer ${
                  activeRole === roleKey
                    ? "bg-black text-amber-400 translate-x-[2px] translate-y-[2px] shadow-none"
                    : "bg-amber-300 text-black hover:bg-amber-200"
                }`}
              >
                {roleKey === "PENDUDUK" ? "Warga" : roleKey === "KETUA_RT" ? "Ketua RT" : roleKey === "POSYANDU" ? "Posyandu" : "PAUD"}
              </button>
            ))}
          </div>

          {/* Active Role Content Card */}
          <div className={`p-6 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_#000000] ${roleDetails[activeRole].bgClass} space-y-5 transition-all`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-3 border-black pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                    {roleDetails[activeRole].title}
                  </h3>
                  <Badge variant="default" className="text-[10px]">
                    {roleDetails[activeRole].badge}
                  </Badge>
                </div>
                <p className="mt-1 text-xs sm:text-sm font-bold text-black">
                  {roleDetails[activeRole].desc}
                </p>
              </div>
              <Link href="/register">
                <Button variant="default" size="sm" className="shrink-0 uppercase text-xs">
                  Coba Peran Ini
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider">
                Kewenangan & Fitur yang Terbuka:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roleDetails[activeRole].features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border-3 border-black shadow-[2px_2px_0px_0px_#000000] rounded-xl flex items-center gap-3 text-xs font-bold text-black"
                  >
                    <div className="h-5 w-5 rounded-md bg-black text-white flex items-center justify-center font-black text-xs shrink-0">
                      ✓
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CALL TO ACTION BANNER (Neo-Brutalist Big Punch)           */}
        {/* ========================================================= */}
        <section className="bg-blue-400 border-4 border-black shadow-[8px_8px_0px_0px_#000000] rounded-3xl p-8 sm:p-14 text-center space-y-6">
          <div className="inline-block transform rotate-1">
            <Badge variant="yellow" className="text-xs font-black px-4 py-1">
              🚀 GABUNG SEKARANG JUGA
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none max-w-4xl mx-auto">
            Wujudkan Lingkungan RT/RW yang Mandiri & Guyub!
          </h2>

          <p className="text-sm sm:text-base md:text-lg font-bold text-black max-w-xl mx-auto">
            Daftarkan diri Anda hari ini. Nikmati kemudahan administrasi lingkungan dan saling terhubung dengan warga tetangga secara resmi.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto px-10 text-base sm:text-lg uppercase tracking-wider"
              >
                Daftar Akun Warga Baru
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 text-base sm:text-lg uppercase tracking-wider"
              >
                Masuk Akun
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Brutalist Footer */}
      <footer className="border-t-4 border-black bg-white py-8 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-black text-amber-400 h-7 w-7 rounded-lg border-2 border-black flex items-center justify-center font-black text-xs">
              JM
            </div>
            <span className="font-black text-base tracking-tight">JARIMAS.ID</span>
            <span className="text-xs font-bold text-black/70">
              | Jaringan Informasi Masyarakat Indonesia
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-wider">
            <Link href="/feed" className="hover:underline">
              Feed Warga
            </Link>
            <Link href="/login" className="hover:underline">
              Masuk
            </Link>
            <Link href="/register" className="hover:underline">
              Daftar
            </Link>
          </div>

          <div className="text-xs font-bold text-black/70">
            © {new Date().getFullYear()} JARIMAS.ID. Seluruh Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  )
}
