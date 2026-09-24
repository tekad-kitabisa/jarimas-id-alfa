import { Metadata } from "next"
import Link from "next/link"
import { getDashboardStats } from "@/app/actions/dashboard"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FileText,
  CheckCircle2,
  Clock,
  ShoppingBag,
  Users,
  ShieldCheck,
  Building2,
  HeartHandshake,
  GraduationCap,
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  AlertTriangle,
} from "lucide-react"
import { APP_ROLES, AppRole } from "@/lib/constants/roles"

export const metadata: Metadata = {
  title: "Dashboard Rekapitulasi | JARIMAS-ID",
  description:
    "Rekapitulasi aktivitas ekosistem warga, verifikasi status kabar warga, lapak UMKM aktif, dan layanan komunitas terpadu Kota Tegal.",
}

export default async function DashboardPage() {
  const result = await getDashboardStats()
  const profile = result?.profile
  const stats = result?.stats || {
    verifiedPosts: 0,
    pendingPosts: 0,
    activeMarket: 0,
    totalCommunities: 0,
  }

  const role = (profile?.active_role as AppRole) || "PENDUDUK"
  const roleConfig = APP_ROLES[role] || APP_ROLES.PENDUDUK

  // Dynamic titles and descriptions per role
  const isSuperAdmin = role === "SUPER_ADMIN" || role === "ADMIN_OPD"
  const isLeader = role === "KETUA_RT" || role === "KETUA_RW"

  const kpiConfig = {
    card1: {
      title: isSuperAdmin
        ? "Total Kabar Terverifikasi"
        : isLeader
        ? "Kabar Warga Terverifikasi"
        : "Kabar Saya Terverifikasi",
      desc: isSuperAdmin
        ? "Agregat seluruh Kota Tegal"
        : isLeader
        ? `Wilayah Kel. ${profile?.kelurahan_name || "Tegal"}`
        : "Telah tayang di linimasa publik",
    },
    card2: {
      title: isSuperAdmin
        ? "Total Antrean Verifikasi"
        : role === "KETUA_RT"
        ? "Antrean Verifikasi RT"
        : isLeader
        ? "Antrean Verifikasi RW"
        : "Kabar Saya Pending",
      desc: isSuperAdmin
        ? "Menunggu persetujuan RT/RW"
        : isLeader
        ? "Perlu tindakan verifikasi segera"
        : "Menunggu verifikasi pengurus RT",
    },
    card3: {
      title: isSuperAdmin
        ? "Total Lapak UMKM Aktif"
        : isLeader
        ? "Lapak Warga Aktif"
        : "Lapak Saya Aktif",
      desc: isSuperAdmin
        ? "Katalog pasar digital se-kota"
        : isLeader
        ? "Produk & jasa UMKM lingkungan"
        : "Produk/jasa Anda di pasar warga",
    },
    card4: {
      title: isSuperAdmin
        ? "Total Komunitas Resmi"
        : isLeader
        ? "Komunitas Terkelola"
        : "Komunitas Diikuti",
      desc: isSuperAdmin
        ? "RT, RW, Posyandu, PAUD, OPD"
        : isLeader
        ? "Grup binaan di wilayah Anda"
        : "Forum RT/RW, Posyandu, & PAUD",
    },
  }

  return (
    <div className="space-y-6 py-2">
      {/* Header Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-background p-6 rounded-2xl border border-border/80 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20 text-[11px] px-2.5 py-0.5 font-semibold"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              {isSuperAdmin
                ? "Pusat Otoritas Kota Tegal"
                : isLeader
                ? "Panel Pengurus Lingkungan"
                : "Portal Warga Komunitas"}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {profile?.is_kota_tegal
                ? `Kel. ${profile?.kelurahan_name || "Tegal"}${
                    profile?.rw ? `, RW ${profile.rw}` : ""
                  }${profile?.rt ? `, RT ${profile.rt}` : ""}`
                : "Warga Luar Kota"}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard Ekosistem JARIMAS-ID
          </h1>
          <p className="text-xs text-muted-foreground">
            Selamat datang kembali,{" "}
            <span className="font-semibold text-foreground">
              {profile?.full_name || "Warga"}
            </span>{" "}
            ({profile?.kelurahan_name ? `Kel. ${profile.kelurahan_name}` : "Kota Tegal"})
          </p>
        </div>

        <Badge
          variant="outline"
          className={`w-fit gap-1.5 px-3 py-1.5 text-xs font-semibold ${roleConfig.badgeColor}`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Peran Aktif: {roleConfig.label}</span>
        </Badge>
      </div>

      {/* Banner Khusus Tindakan Pengurus RT/RW jika Ada Antrean Verifikasi */}
      {isLeader && stats.pendingPosts > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-foreground">
                Perhatian {role === "KETUA_RT" ? "Ketua RT" : "Ketua RW"}: Terdapat{" "}
                {stats.pendingPosts} Kabar Warga Menunggu Verifikasi!
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Warga di wilayah Anda telah mengirimkan status/pengumuman baru. Silakan periksa
                dan berikan verifikasi agar status dapat terdistribusi ke seluruh ekosistem.
              </p>
            </div>
          </div>
          <Link href="/groups">
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shrink-0"
            >
              Periksa Sekarang
            </Button>
          </Link>
        </div>
      )}

      {/* Ringkasan Kartu KPI (4 Kolom) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kabar Terverifikasi */}
        <Card className="border-border/80 shadow-xs hover:border-emerald-500/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {kpiConfig.card1.title}
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground font-mono">
              {stats.verifiedPosts}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-medium">Aktif</span> • {kpiConfig.card1.desc}
            </p>
          </CardContent>
        </Card>

        {/* Menunggu Verifikasi */}
        <Card className="border-border/80 shadow-xs hover:border-amber-500/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {kpiConfig.card2.title}
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground font-mono">
              {stats.pendingPosts}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {kpiConfig.card2.desc}
            </p>
          </CardContent>
        </Card>

        {/* Lapak UMKM Aktif */}
        <Card className="border-border/80 shadow-xs hover:border-blue-500/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {kpiConfig.card3.title}
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground font-mono">
              {stats.activeMarket}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {kpiConfig.card3.desc}
            </p>
          </CardContent>
        </Card>

        {/* Komunitas Terdaftar */}
        <Card className="border-border/80 shadow-xs hover:border-purple-500/40 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {kpiConfig.card4.title}
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground font-mono">
              {stats.totalCommunities}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {kpiConfig.card4.desc}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grid Menu Cepat & Status Rekapitulasi Berjenjang */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel Rekapitulasi Berjenjang (2 Kolom) */}
        <Card className="lg:col-span-2 border-border/80 shadow-xs">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <span>Status Rekapitulasi Pelayanan & Aktivitas</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Sistem merekap seluruh aktivitas kependudukan dan pelayanan publik terpadu di wilayah{" "}
              <strong className="text-foreground">
                {profile?.kelurahan_name ? `Kel. ${profile.kelurahan_name}` : "Kota Tegal"}
              </strong>
              .
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 text-xs text-muted-foreground">
            {/* 4 Pilar Layanan Ekosistem */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <Building2 className="h-4 w-4 text-emerald-600" />
                  <span>Forum Lingkungan RT / RW</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Koordinasi keamanan ronda malam, kerja bakti, iuran warga, dan verifikasi
                  identitas kependudukan.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <HeartHandshake className="h-4 w-4 text-rose-600" />
                  <span>Layanan Posyandu Terintegrasi</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Pemantauan tumbuh kembang balita, pencegahan stunting terpadu, dan pos pembinaan
                  lansia sehat.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <GraduationCap className="h-4 w-4 text-amber-600" />
                  <span>Pendidikan PAUD-PNF</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Pusat stimulasi anak usia dini, kelompok bermain inklusif, dan forum parenting
                  keluarga.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-border/70 bg-card space-y-1.5">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <ShoppingBag className="h-4 w-4 text-blue-600" />
                  <span>Lapak UMKM & Program SPM</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Pasar digital produk lokal, kuliner khas Tegal, jasa warga, dan fasilitas
                  pelatihan SPM gratis.
                </p>
              </div>
            </div>

            {/* Catatan Sistem Box */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Catatan Sistem & Tata Kelola:</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-[11px] leading-relaxed">
                <li>
                  Status kabar warga memerlukan verifikasi Pengurus RT sebelum disebarkan secara
                  luas ke ekosistem.
                </li>
                <li>
                  Data Posyandu dan PAUD-PNF terhubung secara otomatis dengan jaringan layanan
                  wilayah.
                </li>
                <li>
                  Seluruh transaksi jual-beli pada Lapak Warga dilakukan secara langsung antar warga
                  demi kenyamanan bersama.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Panel Aksi & Pintasan Cepat (1 Kolom) */}
        <div className="space-y-4">
          <Card className="border-border/80 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Pintasan Modul Utama</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <Link href="/groups" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-between text-xs h-10 border-border/80 hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>Grup Komunitas Wilayah</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </Link>

              <Link href="/marketplace" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-between text-xs h-10 border-border/80 hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-blue-600" />
                    <span>Lapak Jarimas Market</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </Link>

              {isSuperAdmin && (
                <Link href="/admin" className="block">
                  <Button
                    variant="outline"
                    className="w-full justify-between text-xs h-10 border-purple-300 dark:border-purple-800 bg-purple-500/5 hover:bg-purple-500/10 text-purple-700 dark:text-purple-300"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-purple-600" />
                      <span>Pusat Otoritas & RBAC</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-purple-600" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Profil Singkat Warga */}
          <Card className="border-border/80 shadow-xs bg-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-foreground">
                Informasi Wilayah Domisili
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Kelurahan:</span>
                <span className="font-semibold text-foreground">
                  {profile?.kelurahan_name || "Kota Tegal"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Kecamatan:</span>
                <span className="font-semibold text-foreground">
                  {profile?.kecamatan_name || "Tegal Barat"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/40">
                <span className="text-muted-foreground">Rukun Warga / Tetangga:</span>
                <span className="font-semibold text-foreground">
                  {profile?.rw ? `RW ${profile.rw}` : "-"} / {profile?.rt ? `RT ${profile.rt}` : "-"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Status Verifikasi:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Warga Terdata
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
