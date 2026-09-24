import * as React from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileText,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Building2,
  Compass,
  CheckCircle2,
  ChevronRight,
  Shield,
} from "lucide-react"
import { ThemeToggle } from "@/components/landing/theme-toggle"
import { RoleShowcase } from "@/components/landing/role-showcase"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

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
            <ThemeToggle />
            {user ? (
              <Link href="/dashboard">
                <Button size="sm" className="text-xs h-8.5 font-medium">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
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
              </>
            )}
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
          <Link href={user ? "/dashboard" : "/register"} className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-sm font-medium">
              {user ? "Lihat Dashboard" : "Mari Bergabung"}
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
      <RoleShowcase />

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
          <Link href={user ? "/dashboard" : "/register"} className="shrink-0 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto text-sm font-medium">
              {user ? "Lihat Dashboard" : "Buat Akun Sekarang"}
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
            <Link href={user ? "/dashboard" : "/register"} className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-sm font-medium">
                {user ? "Lihat Dashboard" : "Mari Bergabung"}
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
