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
  CheckCircle2,
  Building2,
  Lock,
  Layers,
  TrendingUp,
  Activity,
  BarChart3,
  Sun,
  Moon,
  Compass,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function BentoLandingPage() {
  const { theme, setTheme } = useTheme()
  const [activeRole, setActiveRole] = React.useState<"PENDUDUK" | "KETUA_RT" | "POSYANDU" | "PAUD">("PENDUDUK")

  const roleDetails = {
    PENDUDUK: {
      title: "Warga & Penduduk",
      badge: "Akses Publik",
      desc: "Layanan surat pengantar RT/RW digital, kabar warga terverifikasi, pasar tetangga, dan jadwal kegiatan lingkungan.",
      tagColor: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    },
    KETUA_RT: {
      title: "Ketua RT / Pengurus RW",
      badge: "Tata Kelola Wilayah",
      desc: "Validasi surat pengantar instan, pengelolaan data kependudukan terpadu, dan pengumuman resmi lingkungan.",
      tagColor: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    },
    POSYANDU: {
      title: "Kader Posyandu",
      badge: "Kesehatan Keluarga",
      desc: "Pencatatan tumbuh kembang balita, buku KIA/KMS digital, dan jadwal imunisasi otomatis terhubung ke data warga.",
      tagColor: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    },
    PAUD: {
      title: "Pendidik PAUD-PNF",
      badge: "Pendidikan Komunitas",
      desc: "Buku penghubung orang tua digital, agenda kegiatan belajar, dan pemantauan perkembangan anak usia dini.",
      tagColor: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-primary text-primary-foreground h-9 w-9 rounded-xl flex items-center justify-center font-black text-sm shadow-sm">
              JM
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight leading-none">
                JARIMAS<span className="text-primary font-normal">.ID</span>
              </span>
              <span className="text-[10px] text-muted-foreground tracking-wider uppercase font-semibold">
                Ekosistem Warga
              </span>
            </div>
          </Link>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-medium">
            <Link
              href="/feed"
              className="px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1.5"
            >
              <Compass className="h-3.5 w-3.5 text-primary" />
              Linimasa Kabar Warga
            </Link>
            <Badge variant="outline" className="text-[11px] font-normal gap-1 py-1">
              <Building2 className="h-3 w-3 text-muted-foreground" />
              Wilayah: Kel. Pekauman, Kota Tegal
            </Badge>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-xl"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle Mode Terang/Gelap"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-xs">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="text-xs font-semibold">
                Daftar Warga
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Bento Grid Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10">
        {/* Bento Grid Header Title */}
        <div className="mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            Platform Ekosistem Digital Warga & Pelayanan Publik
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Harmoni Digital Komunitas Warga Indonesia
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            Satu sistem terpadu untuk administrasi RT/RW, kabar warga terverifikasi, layanan Posyandu, PAUD, serta ekonomi mandiri komunitas.
          </p>
        </div>

        {/* Bento Grid Container (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
          {/* ========================================================= */}
          {/* BENTO BOX 1: Hero / Profil Utama (Col Span 2, Row Span 2) */}
          {/* ========================================================= */}
          <Card className="md:col-span-2 md:row-span-2 flex flex-col justify-between bg-gradient-to-br from-card via-card to-primary/[0.03] border-primary/20">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-0.5">
                  Ekosistem Unggulan
                </Badge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live System
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
                Integrasi Layanan Warga yang Cepat, Transparan, dan Tanpa Ribet
              </CardTitle>
              <CardDescription className="text-sm">
                JARIMAS-ID menjembatani interaksi antara warga dan pengurus lingkungan. Dapatkan surat pengantar RT/RW dalam hitungan menit, akses info resmi tanpa hoaks, dan pantau kesehatan keluarga langsung dari smartphone.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-2.5">
                  <FileText className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-foreground">Surat RT/RW Digital</div>
                    <div className="text-[11px] text-muted-foreground">Pengajuan online bebas antrean</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border/60 flex items-start gap-2.5">
                  <Users className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-foreground">Kabar Terverifikasi</div>
                    <div className="text-[11px] text-muted-foreground">Info tervalidasi pengurus RT</div>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto gap-2 font-semibold text-xs h-10">
                    Daftar Akun Warga
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/feed" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto text-xs h-10">
                    Jelajahi Feed
                  </Button>
                </Link>
              </div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Data Aman & Terlindungi
              </div>
            </CardFooter>
          </Card>

          {/* ========================================================= */}
          {/* BENTO BOX 2: Statistik & Pencapaian (Col Span 2)          */}
          {/* ========================================================= */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Pencapaian & Metrik Lingkungan
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">Real-time</Badge>
              </div>
              <CardDescription>
                Efisiensi tata kelola wilayah dan partisipasi warga di platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-center">
                  <div className="text-xl sm:text-2xl font-black text-primary">100%</div>
                  <div className="text-[10px] text-muted-foreground font-medium mt-0.5">
                    Data Terverifikasi
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-center">
                  <div className="text-xl sm:text-2xl font-black text-primary">4 Mode</div>
                  <div className="text-[10px] text-muted-foreground font-medium mt-0.5">
                    Multi-Role Sistem
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-center">
                  <div className="text-xl sm:text-2xl font-black text-primary">15+</div>
                  <div className="text-[10px] text-muted-foreground font-medium mt-0.5">
                    Layanan Publik
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-center">
                  <div className="text-xl sm:text-2xl font-black text-primary">&lt; 5 Menit</div>
                  <div className="text-[10px] text-muted-foreground font-medium mt-0.5">
                    Proses Surat RT
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ========================================================= */}
          {/* BENTO BOX 3: List Layanan Komunitas / Badges (Col Span 2)  */}
          {/* ========================================================= */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  Katalog Layanan Komunitas
                </CardTitle>
                <Badge variant="secondary" className="text-[10px]">Lengkap</Badge>
              </div>
              <CardDescription>
                Modul terintegrasi yang dapat digunakan oleh seluruh elemen warga
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="px-2.5 py-1 text-xs bg-muted/40 gap-1.5 hover:bg-primary/10 transition-colors">
                  <FileText className="h-3 w-3 text-primary" />
                  Surat Pengantar RT/RW Digital
                </Badge>
                <Badge variant="outline" className="px-2.5 py-1 text-xs bg-muted/40 gap-1.5 hover:bg-primary/10 transition-colors">
                  <Users className="h-3 w-3 text-primary" />
                  Kabar Warga Bebas Hoaks
                </Badge>
                <Badge variant="outline" className="px-2.5 py-1 text-xs bg-muted/40 gap-1.5 hover:bg-primary/10 transition-colors">
                  <ShoppingBag className="h-3 w-3 text-primary" />
                  Jarimas Market (UMKM Warga)
                </Badge>
                <Badge variant="outline" className="px-2.5 py-1 text-xs bg-muted/40 gap-1.5 hover:bg-primary/10 transition-colors">
                  <HeartPulse className="h-3 w-3 text-primary" />
                  Posyandu & KIA Digital
                </Badge>
                <Badge variant="outline" className="px-2.5 py-1 text-xs bg-muted/40 gap-1.5 hover:bg-primary/10 transition-colors">
                  <GraduationCap className="h-3 w-3 text-primary" />
                  PAUD & Pendidikan Komunitas
                </Badge>
                <Badge variant="outline" className="px-2.5 py-1 text-xs bg-muted/40 gap-1.5 hover:bg-primary/10 transition-colors">
                  <ShieldCheck className="h-3 w-3 text-primary" />
                  Hak Akses Multi-Role
                </Badge>
                <Badge variant="outline" className="px-2.5 py-1 text-xs bg-muted/40 gap-1.5 hover:bg-primary/10 transition-colors">
                  <Building2 className="h-3 w-3 text-primary" />
                  Administrasi Kas & Iuran RT
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* ========================================================= */}
          {/* BENTO BOX 4: Visualisasi Data Singkat (Col Span 2)        */}
          {/* ========================================================= */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Ringkasan Aktivitas & Partisipasi Warga
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">Statistik Bulanan</Badge>
              </div>
              <CardDescription>
                Tingkat adopsi digital pelayanan masyarakat di lingkungan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {/* Metric 1 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Penerbitan Surat Pengantar Online</span>
                  <span className="text-primary font-bold">96% Efektif</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "96%" }} />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Kehadiran Penimbangan Posyandu Balita</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">88% Rutin</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: "88%" }} />
                </div>
              </div>

              {/* Metric 3 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Partisipasi UMKM & Pasar Komunitas</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">120+ Produk</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: "75%" }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ========================================================= */}
          {/* BENTO BOX 5: Multi-Role Interactive Switcher (Col Span 2)  */}
          {/* ========================================================= */}
          <Card className="md:col-span-2 flex flex-col justify-between">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Simulasi Multi-Role Fleksibel
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">1 Akun Warga</Badge>
              </div>
              <CardDescription>
                Beralih mode peran seketika sesuai penugasan Anda di lingkungan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Role Toggle Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-muted/60 rounded-xl border border-border/50">
                {(["PENDUDUK", "KETUA_RT", "POSYANDU", "PAUD"] as const).map((roleKey) => (
                  <button
                    key={roleKey}
                    onClick={() => setActiveRole(roleKey)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeRole === roleKey
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {roleKey === "PENDUDUK" ? "Warga" : roleKey === "KETUA_RT" ? "Ketua RT" : roleKey === "POSYANDU" ? "Posyandu" : "PAUD"}
                  </button>
                ))}
              </div>

              {/* Active Role Preview Card */}
              <div className="p-3.5 rounded-xl border bg-muted/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">
                    {roleDetails[activeRole].title}
                  </span>
                  <Badge variant="outline" className={`text-[10px] ${roleDetails[activeRole].tagColor}`}>
                    {roleDetails[activeRole].badge}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {roleDetails[activeRole].desc}
                </p>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Link href="/register" className="w-full">
                <Button variant="secondary" className="w-full text-xs font-semibold h-9">
                  Coba Daftar dengan Akun Warga
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Bottom Security Banner */}
        <div className="mt-6 p-4 md:p-5 rounded-2xl bg-card border border-border/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-foreground">
                Privasi & Enkripsi Data Tingkat Tinggi
              </div>
              <div className="text-[11px] sm:text-xs text-muted-foreground">
                Dilengkapi Row Level Security (RLS) Supabase dan kebijakan privasi bebas data identitas sensitif rahasia.
              </div>
            </div>
          </div>
          <Link href="/login" className="shrink-0 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">
              Pelajari Akses Masuk
            </Button>
          </Link>
        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="border-t bg-card py-6 text-center text-xs text-muted-foreground mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground h-5 w-5 rounded-md flex items-center justify-center text-[10px] font-black">
              JM
            </div>
            <span className="font-bold text-foreground">JARIMAS.ID</span>
            <span>| Jaringan Informasi Masyarakat Indonesia</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/feed" className="hover:text-foreground transition-colors">
              Feed Warga
            </Link>
            <Link href="/login" className="hover:text-foreground transition-colors">
              Masuk
            </Link>
            <Link href="/register" className="hover:text-foreground transition-colors">
              Daftar
            </Link>
          </div>

          <div className="text-[11px]">
            © {new Date().getFullYear()} JARIMAS.ID. Seluruh Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  )
}
