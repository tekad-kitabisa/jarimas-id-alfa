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
  Building2,
  Lock,
  Compass,
  CheckCircle2,
  Sun,
  Moon,
  ChevronRight,
  Shield,
  Layers,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function MinimalistLandingPage() {
  const { theme, setTheme } = useTheme()
  const [selectedRole, setSelectedRole] = React.useState<"PENDUDUK" | "KETUA_RT" | "POSYANDU" | "PAUD">("PENDUDUK")

  const roles = {
    PENDUDUK: {
      title: "Warga & Penduduk",
      badge: "Akses Publik",
      desc: "Layanan surat pengantar RT/RW digital, pemantauan pengumuman lingkungan resmi bebas hoaks, serta pasar jual-beli antar-warga tetangga.",
      features: [
        "Pengajuan surat pengantar RT/RW online",
        "Akses linimasa kabar warga tervalidasi",
        "Jual beli produk lokal di Jarimas Market",
        "Jadwal kegiatan posyandu dan kerja bakti",
      ],
    },
    KETUA_RT: {
      title: "Ketua RT / Pengurus RW",
      badge: "Tata Kelola Wilayah",
      desc: "Verifikasi surat pengantar warga dalam hitungan detik, pantau sensus data kependudukan real-time, dan siarkan pengumuman wilayah terpadu.",
      features: [
        "Persetujuan surat pengantar instan",
        "Master data kependudukan wilayah terpusat",
        "Siaran notifikasi darurat & agenda resmi",
        "Pencatatan kas dan iuran RT terbuka",
      ],
    },
    POSYANDU: {
      title: "Kader Posyandu",
      badge: "Kesehatan Komunitas",
      desc: "Rekam digital tumbuh kembang anak, buku KIA otomatis, jadwal imunisasi, dan pemantauan status gizi ibu-anak yang terhubung ke data kependudukan.",
      features: [
        "Pencatatan penimbangan & pengukuran balita",
        "Grafik KMS digital & deteksi dini stunting",
        "Pengingat otomatis jadwal imunisasi berkala",
        "Laporan kesehatan berkala tingkat lingkungan",
      ],
    },
    PAUD: {
      title: "Pengelola PAUD-PNF",
      badge: "Pendidikan Dini",
      desc: "Buku penghubung orang tua murid digital, pantau agenda pembelajaran anak usia dini, dan koordinasi pendidikan berbasis komunitas lingkungan.",
      features: [
        "Buku penghubung guru dan orang tua murid",
        "Rekap kehadiran & portofolio kegiatan anak",
        "Agenda pembelajaran PAUD terstruktur",
        "Integrasi data pendidikan anak lingkungan",
      ],
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-600 selection:text-white font-sans antialiased">
      {/* Minimalist Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-indigo-600 text-white h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs shadow-xs">
              JM
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-base tracking-tight text-foreground">
                JARIMAS<span className="text-indigo-600">.ID</span>
              </span>
              <span className="text-[10px] text-muted-foreground border-l border-border pl-1.5 font-medium hidden sm:inline-block">
                Ekosistem Warga
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
            <a href="#fitur" className="hover:text-foreground transition-colors">
              Fitur Utama
            </a>
            <a href="#multi-role" className="hover:text-foreground transition-colors">
              Multi-Role Sistem
            </a>
            <a href="#keamanan" className="hover:text-foreground transition-colors">
              Keamanan Data
            </a>
            <Link href="/feed" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Compass className="h-3.5 w-3.5 text-indigo-600" />
              Linimasa Feed
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8.5 w-8.5 rounded-lg text-muted-foreground hover:text-foreground"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs h-8.5">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="text-xs h-8.5 font-medium">
                Daftar Warga
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Centered Hero Section */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Centered Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/80 bg-muted/40 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
          <span>Platform Pelayanan Publik & Komunitas Warga Terpadu</span>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
        </div>

        {/* Crisp Centered Heading */}
        <h1 className="font-semibold text-3xl sm:text-5xl md:text-6xl tracking-tight text-foreground leading-[1.15]">
          Tata Kelola Lingkungan Warga yang Lebih Cerdas dan Terbuka
        </h1>

        {/* High-Contrast Gray Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-normal leading-relaxed">
          Hubungkan warga tetangga, pengurus RT/RW, kader Posyandu, dan pendidik PAUD dalam satu platform modern yang aman, transparan, dan terverifikasi.
        </p>

        {/* Call to Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/register" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-sm font-medium">
              Mulai Sebagai Warga
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm">
              Masuk ke Portal
            </Button>
          </Link>
        </div>

        {/* Area Badge & Verification Indicator */}
        <div className="pt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Data Kependudukan Terverifikasi
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            Wilayah Aktif: Kel. Pekauman / RT 02
          </span>
        </div>
      </section>

      {/* Metrics & Proof Strip */}
      <section className="border-y border-border/50 bg-muted/20 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">100%</div>
            <div className="text-xs text-muted-foreground">Data Terverifikasi</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">4 Mode</div>
            <div className="text-xs text-muted-foreground">Multi-Role Terpadu</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">&lt; 5 Menit</div>
            <div className="text-xs text-muted-foreground">Pengurusan Surat RT</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">24 / 7</div>
            <div className="text-xs text-muted-foreground">Akses Layanan Warga</div>
          </div>
        </div>
      </section>

      {/* Core Feature Grid */}
      <section id="fitur" className="py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Layanan Komunitas Terintegrasi
          </h2>
          <p className="text-sm text-muted-foreground">
            Seluruh kebutuhan administratif, sosial, kesehatan keluarga, dan ekonomi lingkungan dalam satu antarmuka yang bersih.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Feature 1: Administrasi RT/RW */}
          <Card>
            <CardHeader>
              <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-1">
                <FileText className="h-4.5 w-4.5" />
              </div>
              <CardTitle>Administrasi RT/RW Digital</CardTitle>
              <CardDescription>
                Pengajuan surat pengantar secara mandiri, persetujuan online, dan pencatatan kas iuran lingkungan yang transparan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Penerbitan surat pengantar instan
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Rekapitulasi iuran kas lingkungan terbuka
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 2: Kabar Warga */}
          <Card>
            <CardHeader>
              <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-1">
                <Users className="h-4.5 w-4.5" />
              </div>
              <CardTitle>Kabar Warga Tervalidasi</CardTitle>
              <CardDescription>
                Linimasa sosial resmi lingkungan bebas kabar bohong. Pengumuman gotong royong dan informasi duka tervalidasi pengurus.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Validasi informasi oleh pengurus RT
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Forum diskusi dan rembuk warga
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 3: Jarimas Market */}
          <Card>
            <CardHeader>
              <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-1">
                <ShoppingBag className="h-4.5 w-4.5" />
              </div>
              <CardTitle>Jarimas Market (Pasar Warga)</CardTitle>
              <CardDescription>
                Pemberdayaan UMKM lokal dan etalase produk warga tetangga. Jual beli kebutuhan pokok dan kuliner di lingkungan terdekat.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Etalase produk UMKM warga sekitar
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Transaksi mandiri tanpa potongan biaya
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 4: Posyandu Digital */}
          <Card>
            <CardHeader>
              <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-1">
                <HeartPulse className="h-4.5 w-4.5" />
              </div>
              <CardTitle>Posyandu & KIA Digital</CardTitle>
              <CardDescription>
                Buku KIA dan rekam tumbuh kembang balita digital. Pemantauan status gizi dan jadwal imunisasi yang rapi terstruktur.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Grafik penimbangan & pencegahan stunting
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Pengingat jadwal imunisasi berkala
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 5: PAUD-PNF */}
          <Card>
            <CardHeader>
              <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-1">
                <GraduationCap className="h-4.5 w-4.5" />
              </div>
              <CardTitle>Pendidikan PAUD & PNF</CardTitle>
              <CardDescription>
                Buku penghubung antara guru dan orang tua murid secara digital untuk memantau capaian belajar anak usia dini di lingkungan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Buku penghubung orang tua & guru digital
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Dokumentasi perkembangan anak terpadu
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 6: Hak Akses & Keamanan */}
          <Card>
            <CardHeader>
              <div className="h-9 w-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-1">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <CardTitle>Multi-Role & Privasi Terjamin</CardTitle>
              <CardDescription>
                Fleksibilitas beralih peran (Penduduk, RT, Posyandu, PAUD) dalam satu akun dengan perlindungan Row Level Security (RLS).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Perpindahan peran instan dari menu akun
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Enkripsi data kependudukan Supabase
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Interactive Multi-Role Showcase */}
      <section id="multi-role" className="py-16 md:py-20 border-t border-border/50 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Satu Akun, Multi-Peran Komunitas
            </h2>
            <p className="text-sm text-muted-foreground">
              Warga yang bertugas sebagai pengurus dapat beralih peran secara instan tanpa perlu membuat akun terpisah.
            </p>
          </div>

          {/* Role Segmented Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(["PENDUDUK", "KETUA_RT", "POSYANDU", "PAUD"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedRole(key)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                  selectedRole === key
                    ? "bg-background border-border text-foreground shadow-xs"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {key === "PENDUDUK" ? "Warga / Penduduk" : key === "KETUA_RT" ? "Ketua RT / RW" : key === "POSYANDU" ? "Kader Posyandu" : "Pendidik PAUD"}
              </button>
            ))}
          </div>

          {/* Active Role Card Preview */}
          <Card className="max-w-3xl mx-auto bg-card">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{roles[selectedRole].title}</CardTitle>
                  <Badge variant="indigo" className="text-[10px]">
                    {roles[selectedRole].badge}
                  </Badge>
                </div>
                <CardDescription className="mt-1">
                  {roles[selectedRole].desc}
                </CardDescription>
              </div>
              <Link href="/register">
                <Button size="sm" className="text-xs shrink-0">
                  Daftar Mode Ini
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xs font-medium text-foreground mb-2">Kewenangan Khusus:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {roles[selectedRole].features.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-md bg-muted/40 border border-border/50 flex items-center gap-2.5 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security & RLS Section */}
      <section id="keamanan" className="py-16 md:py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-lg border border-border/60 bg-card shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
              <Shield className="h-3.5 w-3.5" />
              Privasi & Keamanan Data
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              Perlindungan Data Kependudukan Terintegrasi
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
              Dilengkapi enkripsi Supabase Row Level Security (RLS) dan kebijakan privasi yang ketat. Seluruh riwayat surat dan data keluarga hanya dapat diakses oleh pihak berwenang sesuai domisili RT/RW resmi.
            </p>
          </div>
          <Link href="/register" className="shrink-0 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-sm font-medium">
              Buat Akun Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Minimalist Centered CTA */}
      <section className="py-16 border-t border-border/50 text-center bg-muted/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Wujudkan Lingkungan Warga yang Mandiri dan Terhubung
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Daftarkan diri Anda hari ini dan nikmati kemudahan pelayanan komunitas di lingkungan Anda.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-sm">
                Daftar Akun Warga
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm">
                Masuk ke Akun
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Minimalist Clean Footer */}
      <footer className="border-t border-border/50 py-8 text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 text-white h-5 w-5 rounded flex items-center justify-center font-bold text-[10px]">
              JM
            </div>
            <span className="font-semibold text-foreground">JARIMAS.ID</span>
            <span>— Jaringan Informasi Masyarakat Indonesia</span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link href="/feed" className="hover:text-foreground transition-colors">
              Linimasa Feed
            </Link>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Masuk
            </Link>
            <Link href="/register" className="hover:text-foreground transition-colors">
              Daftar
            </Link>
          </div>

          <div className="text-[11px] text-muted-foreground/80">
            © {new Date().getFullYear()} JARIMAS.ID. Seluruh hak cipta dilindungi.
          </div>
        </div>
      </footer>
    </div>
  )
}
