import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FeedPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kabar Warga & Komunitas</h1>
          <p className="text-xs text-muted-foreground">
            Lini masa pengumuman terverifikasi dan aktivitas di wilayah Anda.
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          Wilayah: Kelurahan Pekauman / RT 02
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">Selamat Datang di JARIMAS-ID!</CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground">
          Sistem ekosistem digital komunitas warga telah berhasil dikonfigurasi. Gunakan tombol{" "}
          <strong className="text-foreground">Mode</strong> di bagian pojok kanan atas untuk
          mensimulasikan perpindahan peran (Penduduk, Ketua RT, Kader Posyandu, atau Operator PAUD).
        </CardContent>
      </Card>
    </div>
  )
}
