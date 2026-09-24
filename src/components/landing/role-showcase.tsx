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
import { CheckCircle2 } from "lucide-react"

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

export function RoleShowcase() {
  const [selectedRole, setSelectedRole] = React.useState<"PENDUDUK" | "KETUA_RT" | "POSYANDU" | "PAUD">("PENDUDUK")

  return (
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
  )
}
