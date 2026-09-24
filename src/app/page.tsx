import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Users, HeartPulse, GraduationCap, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header Navbar Beranda (Tanpa Menu Feed) */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground h-9 w-9 rounded-xl flex items-center justify-center font-black text-base">
              JM
            </div>
            <span className="font-bold text-lg tracking-tight">JARIMAS-ID</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs font-semibold">
                Masuk Akun
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

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-16 md:py-24 px-4 text-center bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto max-w-4xl space-y-6">
            <Badge
              variant="outline"
              className="px-3 py-1 text-xs border-primary/20 bg-primary/5 text-primary font-semibold"
            >
              Ekosistem Digital Kota Tegal
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Portal Komunitas Warga & Pelayanan Publik Terpadu
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Menghubungkan warga, pengurus RT/RW, pelaku UMKM lokal, kader Posyandu, hingga satuan PAUD dalam satu platform digital yang terverifikasi dan berjenjang.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2 font-semibold">
                  Bergabung Sekarang <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full font-semibold">
                  Masuk ke Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Grid Fitur Utama (4 Kartu) */}
        <section className="py-12 px-4 container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight">Layanan & Fitur Unggulan</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Solusi digital terintegrasi untuk kebutuhan warga sehari-hari
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Kartu 1: Marketplace */}
            <Card className="border-primary/10 hover:border-primary/30 transition-all shadow-xs flex flex-col justify-between">
              <CardHeader>
                <ShoppingBag className="h-8 w-8 text-blue-500 mb-2" />
                <CardTitle className="text-base font-bold">Jarimas Market</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                Pemasaran produk & jasa UMKM lokal warga secara langsung dengan dukungan kontak WhatsApp terverifikasi.
              </CardContent>
            </Card>

            {/* Kartu 2: Komunitas RT/RW */}
            <Card className="border-primary/10 hover:border-primary/30 transition-all shadow-xs flex flex-col justify-between">
              <CardHeader>
                <Users className="h-8 w-8 text-purple-500 mb-2" />
                <CardTitle className="text-base font-bold">Grup Komunitas RT/RW</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                Ruang komunikasi dan pengumuman resmi lingkungan yang terhubung langsung dengan pengurus wilayah.
              </CardContent>
            </Card>

            {/* Kartu 3: Layanan Posyandu */}
            <Card className="border-primary/10 hover:border-primary/30 transition-all shadow-xs flex flex-col justify-between">
              <CardHeader>
                <HeartPulse className="h-8 w-8 text-rose-500 mb-2" />
                <CardTitle className="text-base font-bold">Layanan Posyandu</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                Pemantauan kesehatan ibu & anak, pencatatan tumbuh kembang balita, serta jadwal kegiatan Posyandu lokal.
              </CardContent>
            </Card>

            {/* Kartu 4: Satuan PAUD-PNF */}
            <Card className="border-primary/10 hover:border-primary/30 transition-all shadow-xs flex flex-col justify-between">
              <CardHeader>
                <GraduationCap className="h-8 w-8 text-emerald-500 mb-2" />
                <CardTitle className="text-base font-bold">Satuan PAUD-PNF</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground leading-relaxed">
                Integrasi data partisipasi pendidikan anak usia dini dan jaringan layanan pembelajaran di lingkungan sekitar.
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground bg-muted/20">
        <p>© 2026 JARIMAS-ID Kota Tegal. Seluruh Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  )
}
