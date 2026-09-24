"use client"

import * as React from "react"
import Link from "next/link"
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { register } from "@/app/actions/auth"
import { KOTA_TEGAL_DATA } from "@/lib/constants/tegal-data"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isKotaTegal, setIsKotaTegal] = React.useState("true")
  const [selectedKecamatan, setSelectedKecamatan] = React.useState("Tegal Barat")
  const [selectedKelurahan, setSelectedKelurahan] = React.useState("Pekauman")
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  // Kelurahan yang tersedia berdasarkan kecamatan yang dipilih
  const availableKelurahan = React.useMemo(() => {
    const found = KOTA_TEGAL_DATA.find((item) => item.kecamatan === selectedKecamatan)
    return found ? found.kelurahan : []
  }, [selectedKecamatan])

  // Reset kelurahan ketika kecamatan berubah
  const handleKecamatanChange = (kecamatan: string | null) => {
    if (!kecamatan) return
    setSelectedKecamatan(kecamatan)
    const found = KOTA_TEGAL_DATA.find((item) => item.kecamatan === kecamatan)
    if (found && found.kelurahan.length > 0) {
      setSelectedKelurahan(found.kelurahan[0])
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    formData.set("isKotaTegal", isKotaTegal)
    if (isKotaTegal === "true") {
      formData.set("kecamatanName", selectedKecamatan)
      formData.set("kelurahanName", selectedKelurahan)
    }

    try {
      const result = await register(formData)
      if (result?.error) {
        setError(result.error)
      }
    } catch {
      // Handled by Next.js navigation redirect
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row bg-background text-foreground overflow-x-hidden">
      {/* ================= PANEL KIRI: BRANDING & BENEFIT (DESKTOP) ================= */}
      <div className="lg:w-5/12 bg-primary/5 border-b lg:border-b-0 lg:border-r border-primary/10 p-6 lg:p-12 flex flex-col justify-between">
        <div>
          {/* Logo & Judul */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary text-primary-foreground h-11 w-11 rounded-xl flex items-center justify-center font-black text-xl shadow-xs">
              JM
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight block">JARIMAS-ID</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold block">
                Kota Tegal
              </span>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground leading-snug">
              Registrasi Akun Komunitas Warga & Pelayanan Publik
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Bergabunglah dalam ekosistem digital terpadu untuk mengakses layanan lingkungan RT/RW,
              UMKM lokal, dan Posyandu.
            </p>
          </div>

          {/* Poin Keunggulan (Khusus Layanan Desktop) */}
          <div className="hidden lg:flex flex-col space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/60 border border-primary/10 shadow-2xs">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold">Identitas Warga Terverifikasi</div>
                <div className="text-[11px] text-muted-foreground">
                  Terhubung langsung dengan struktur pengurus RT/RW domisili Anda.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/60 border border-primary/10 shadow-2xs">
              <ShoppingBag className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold">Akses Lapak UMKM Warga</div>
                <div className="text-[11px] text-muted-foreground">
                  Pasarkan dan cari produk lokal sekitar dengan kontak WhatsApp langsung.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/60 border border-primary/10 shadow-2xs">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold">Layanan Posyandu & PAUD</div>
                <div className="text-[11px] text-muted-foreground">
                  Pantau tumbuh kembang balita dan informasi pendidikan anak usia dini.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block text-[11px] text-muted-foreground pt-6 border-t border-primary/10">
          © 2026 JARIMAS-ID Kota Tegal. Seluruh Hak Cipta Dilindungi.
        </div>
      </div>

      {/* ================= PANEL KANAN: FORMULIR REGISTRASI ================= */}
      <div className="lg:w-7/12 flex items-center justify-center p-4 lg:p-8 lg:overflow-y-auto">
        <div className="w-full max-w-xl">
          <Card className="border-primary/10 shadow-md">
            <CardHeader className="pb-3 text-center sm:text-left">
              <CardTitle className="text-lg font-bold tracking-tight">
                Buat Akun Warga Baru
              </CardTitle>
              <CardDescription className="text-xs">
                Lengkapi data diri dan alamat domisili Anda di bawah ini
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-3 text-xs">
                {error && (
                  <div className="p-2.5 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
                    {error}
                  </div>
                )}

                {/* Grid 2 Kolom: Nama & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="fullName" className="text-xs">
                      Nama Lengkap
                    </Label>
                    <div className="relative">
                      <User className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Nama sesuai KTP"
                        className="pl-8 h-9 text-xs"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-xs">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="nama@email.com"
                        className="pl-8 h-9 text-xs"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Grid 2 Kolom: WhatsApp & Kata Sandi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="phoneNumber" className="text-xs">
                      No. WhatsApp / HP
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="08123456789"
                        className="pl-8 h-9 text-xs"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-xs">
                      Kata Sandi
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-8 pr-9 h-9 text-xs"
                        required
                        minLength={6}
                        disabled={loading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-2.5 hover:bg-transparent text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Pilihan Domisili */}
                <div className="space-y-1.5 pt-1">
                  <Label className="text-xs font-semibold">Status Domisili Warga</Label>
                  <RadioGroup
                    defaultValue="true"
                    value={isKotaTegal}
                    onValueChange={setIsKotaTegal}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="tegal" />
                      <Label htmlFor="tegal" className="text-xs font-normal cursor-pointer">
                        Warga Kota Tegal
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="luar" />
                      <Label htmlFor="luar" className="text-xs font-normal cursor-pointer">
                        Luar Kota Tegal
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Detail Wilayah Domisili Kota Tegal */}
                {isKotaTegal === "true" && (
                  <div className="p-3 bg-muted/40 rounded-lg border space-y-2.5 animate-in fade-in-50 duration-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="kecamatan" className="text-[11px]">
                          Kecamatan
                        </Label>
                        <Select
                          value={selectedKecamatan}
                          onValueChange={handleKecamatanChange}
                          disabled={loading}
                        >
                          <SelectTrigger className="h-8 text-xs bg-background">
                            <SelectValue placeholder="Pilih Kecamatan" />
                          </SelectTrigger>
                          <SelectContent>
                            {KOTA_TEGAL_DATA.map((item) => (
                              <SelectItem
                                key={item.kecamatan}
                                value={item.kecamatan}
                                className="text-xs"
                              >
                                {item.kecamatan}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="kelurahan" className="text-[11px]">
                          Kelurahan
                        </Label>
                        <Select
                          value={selectedKelurahan}
                          onValueChange={(val) => setSelectedKelurahan(val || "")}
                          disabled={loading}
                        >
                          <SelectTrigger className="h-8 text-xs bg-background">
                            <SelectValue placeholder="Pilih Kelurahan" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableKelurahan.map((kel) => (
                              <SelectItem key={kel} value={kel} className="text-xs">
                                {kel}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor="rw" className="text-[11px]">
                          RW
                        </Label>
                        <Input
                          id="rw"
                          name="rw"
                          placeholder="Contoh: 03"
                          className="h-8 text-xs bg-background"
                          required
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="rt" className="text-[11px]">
                          RT
                        </Label>
                        <Input
                          id="rt"
                          name="rt"
                          placeholder="Contoh: 02"
                          className="h-8 text-xs bg-background"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-2 pt-2 pb-4">
                <Button
                  type="submit"
                  className="w-full font-semibold h-9 text-xs"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                      Mendaftarkan Akun...
                    </>
                  ) : (
                    "Daftar Akun Warga"
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Sudah memiliki akun?{" "}
                  <Link href="/login" className="text-primary font-semibold hover:underline">
                    Masuk di Sini
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
