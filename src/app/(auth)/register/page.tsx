"use client"

import * as React from "react"
import Link from "next/link"
import { signup } from "@/app/actions/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { KOTA_TEGAL_DATA, RW_RT_OPTIONS } from "@/lib/constants/tegal-data"
import {
  User,
  Mail,
  Lock,
  MapPin,
  Building,
  Home,
  UserPlus,
  Loader2,
  AlertCircle,
  Globe2,
} from "lucide-react"

export default function RegisterPage() {
  const [isKotaTegal, setIsKotaTegal] = React.useState(true)
  const [selectedKecamatan, setSelectedKecamatan] = React.useState<string>("")
  const [selectedKelurahan, setSelectedKelurahan] = React.useState<string>("")
  const [selectedRw, setSelectedRw] = React.useState<string>("")
  const [selectedRt, setSelectedRt] = React.useState<string>("")
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // Ambil daftar kelurahan berdasarkan kecamatan yang sedang dipilih
  const availableKelurahan = React.useMemo(() => {
    if (!selectedKecamatan) return []
    const found = KOTA_TEGAL_DATA.find((item) => item.kecamatan === selectedKecamatan)
    return found ? found.kelurahan : []
  }, [selectedKecamatan])

  // Reset kelurahan jika kecamatan berganti
  function handleKecamatanChange(value: string | null) {
    setSelectedKecamatan(value || "")
    setSelectedKelurahan("")
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    formData.set("isKotaTegal", isKotaTegal ? "true" : "false")

    if (isKotaTegal) {
      if (!selectedKecamatan || !selectedKelurahan || !selectedRw || !selectedRt) {
        setError("Harap lengkapi pilihan Kecamatan, Kelurahan, RW, dan RT.")
        setIsLoading(false)
        return
      }
      formData.set("kecamatanName", selectedKecamatan)
      formData.set("kelurahanName", selectedKelurahan)
      formData.set("rw", selectedRw)
      formData.set("rt", selectedRt)
    }

    try {
      const result = await signup(formData)
      if (result?.error) {
        setError(result.error)
      }
    } catch {
      // Handled by Next.js navigation redirect
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20 py-8">
      <div className="w-full max-w-xl space-y-6">
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-indigo-600 text-white h-12 w-12 rounded-2xl flex items-center justify-center text-xl font-bold shadow-sm">
            JM
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            JARIMAS<span className="text-indigo-600">.ID</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            Registrasi Akun Komunitas Warga & Pelayanan Publik
          </p>
        </div>

        <Card className="border-border/70 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-bold">Daftar Akun Warga Baru</CardTitle>
            <CardDescription className="text-xs">
              Lengkapi informasi akun dan wilayah domisili untuk terhubung dengan layanan RT/RW Anda
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Nama Lengkap */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-xs font-semibold">
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="cth. Ahmad Hambali"
                    required
                    className="pl-9 h-10 text-xs"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email & Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold">
                    Alamat Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="nama@email.com"
                      required
                      className="pl-9 h-10 text-xs"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-semibold">
                    Kata Sandi
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Minimal 6 karakter"
                      required
                      minLength={6}
                      className="pl-9 h-10 text-xs"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Toggle Domisili Warga */}
              <div className="rounded-xl border border-border/70 p-4 bg-muted/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="tegal-toggle" className="text-xs font-bold cursor-pointer">
                        Status Domisili Warga
                      </Label>
                      <Badge
                        variant={isKotaTegal ? "default" : "secondary"}
                        className="text-[10px] px-1.5 py-0"
                      >
                        {isKotaTegal ? "Warga Kota Tegal" : "Luar Kota Tegal"}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {isKotaTegal
                        ? "Pendaftaran terintegrasi dengan administrasi resmi RT/RW di Kota Tegal"
                        : "Akun umum untuk warga di luar wilayah administratif Kota Tegal"}
                    </p>
                  </div>
                  <Switch
                    id="tegal-toggle"
                    checked={isKotaTegal}
                    onCheckedChange={setIsKotaTegal}
                    disabled={isLoading}
                  />
                </div>

                {/* Dropdown Bertingkat Kota Tegal (Kecamatan, Kelurahan, RW, RT) */}
                {isKotaTegal ? (
                  <div className="pt-3 border-t border-border/60 space-y-3 animate-in fade-in-50 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Dropdown Kecamatan */}
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          Kecamatan
                        </Label>
                        <Select
                          value={selectedKecamatan}
                          onValueChange={handleKecamatanChange}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-full h-10 text-xs bg-background">
                            <SelectValue placeholder="Pilih Kecamatan" />
                          </SelectTrigger>
                          <SelectContent>
                            {KOTA_TEGAL_DATA.map((item) => (
                              <SelectItem key={item.kecamatan} value={item.kecamatan} className="text-xs">
                                {item.kecamatan}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Dropdown Kelurahan (Dinamis bergantung Kecamatan) */}
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold flex items-center gap-1.5">
                          <Building className="h-3.5 w-3.5 text-muted-foreground" />
                          Kelurahan
                        </Label>
                        <Select
                          value={selectedKelurahan}
                          onValueChange={(val) => setSelectedKelurahan(val || "")}
                          disabled={!selectedKecamatan || isLoading}
                        >
                          <SelectTrigger className="w-full h-10 text-xs bg-background">
                            <SelectValue
                              placeholder={
                                selectedKecamatan
                                  ? "Pilih Kelurahan"
                                  : "Pilih Kecamatan Dahulu"
                              }
                            />
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

                    {/* Dropdown RW & RT (Opsi 01 - 40) */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold flex items-center gap-1.5">
                          <Home className="h-3.5 w-3.5 text-muted-foreground" />
                          Nomor RW
                        </Label>
                        <Select
                          value={selectedRw}
                          onValueChange={(val) => setSelectedRw(val || "")}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-full h-10 text-xs bg-background">
                            <SelectValue placeholder="Pilih RW" />
                          </SelectTrigger>
                          <SelectContent>
                            {RW_RT_OPTIONS.map((opt) => (
                              <SelectItem key={`rw-${opt}`} value={opt} className="text-xs">
                                RW {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[11px] font-semibold flex items-center gap-1.5">
                          <Home className="h-3.5 w-3.5 text-muted-foreground" />
                          Nomor RT
                        </Label>
                        <Select
                          value={selectedRt}
                          onValueChange={(val) => setSelectedRt(val || "")}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-full h-10 text-xs bg-background">
                            <SelectValue placeholder="Pilih RT" />
                          </SelectTrigger>
                          <SelectContent>
                            {RW_RT_OPTIONS.map((opt) => (
                              <SelectItem key={`rt-${opt}`} value={opt} className="text-xs">
                                RT {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-muted/50 border text-[11px] text-muted-foreground flex items-center gap-2">
                    <Globe2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>
                      Anda mendaftar sebagai warga umum. Fitur administrasi RT/RW Kota Tegal dapat dihubungkan di kemudian hari melalui pengaturan profil.
                    </span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-2">
              <Button
                type="submit"
                className="w-full h-10 font-semibold gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Mendaftarkan Akun Warga...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Daftar Akun Warga
                  </>
                )}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                Sudah memiliki akun warga?{" "}
                <Link
                  href="/login"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Masuk di sini
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
