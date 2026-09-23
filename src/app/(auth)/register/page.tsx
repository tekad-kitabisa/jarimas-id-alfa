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
  User,
  CreditCard,
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
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    formData.set("isKotaTegal", isKotaTegal ? "true" : "false")

    try {
      const result = await signup(formData)
      if (result?.error) {
        setError(result.error)
      }
    } catch {
      // If redirect throws Next.js NEXT_REDIRECT, it will handle it automatically
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20 py-8">
      <div className="w-full max-w-xl space-y-6">
        {/* Logo & Branding */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-primary text-primary-foreground h-12 w-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-primary/20">
            JM
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            JARIMAS<span className="text-primary">.ID</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            Registrasi Akun Komunitas Warga & Pelayanan Publik
          </p>
        </div>

        <Card className="border-border/60 shadow-lg shadow-black/5">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-bold">Daftar Akun Warga Baru</CardTitle>
            <CardDescription className="text-xs">
              Lengkapi data kependudukan Anda untuk akses ke layanan RT/RW dan informasi komunitas
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

              {/* Data Utama */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-xs font-semibold">
                    Nama Lengkap (Sesuai KTP)
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

                <div className="space-y-2">
                  <Label htmlFor="nik" className="text-xs font-semibold">
                    Nomor Induk Kependudukan (NIK)
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="nik"
                      name="nik"
                      placeholder="16 digit NIK"
                      maxLength={16}
                      required
                      className="pl-9 h-10 text-xs"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

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
              <div className="rounded-xl border p-4 bg-muted/30 space-y-3">
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
                        ? "Pendaftaran terintegrasi dengan administrasi RT/RW Kota Tegal"
                        : "Akun umum untuk warga atau pendatang di luar wilayah administratif Tegal"}
                    </p>
                  </div>
                  <Switch
                    id="tegal-toggle"
                    checked={isKotaTegal}
                    onCheckedChange={setIsKotaTegal}
                    disabled={isLoading}
                  />
                </div>

                {/* Bagian Wilayah Kota Tegal (Hanya tampil jika Warga Kota Tegal aktif) */}
                {isKotaTegal ? (
                  <div className="pt-3 border-t border-border/60 space-y-3 animate-in fade-in-50 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="kecamatanName" className="text-[11px] font-semibold">
                          Kecamatan
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                          <Input
                            id="kecamatanName"
                            name="kecamatanName"
                            placeholder="cth. Tegal Barat"
                            required={isKotaTegal}
                            className="pl-9 h-9 text-xs"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="kelurahanName" className="text-[11px] font-semibold">
                          Kelurahan
                        </Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                          <Input
                            id="kelurahanName"
                            name="kelurahanName"
                            placeholder="cth. Pekauman"
                            required={isKotaTegal}
                            className="pl-9 h-9 text-xs"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="rw" className="text-[11px] font-semibold">
                          Nomor RW
                        </Label>
                        <div className="relative">
                          <Home className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                          <Input
                            id="rw"
                            name="rw"
                            placeholder="cth. 03"
                            required={isKotaTegal}
                            className="pl-9 h-9 text-xs"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="rt" className="text-[11px] font-semibold">
                          Nomor RT
                        </Label>
                        <div className="relative">
                          <Home className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                          <Input
                            id="rt"
                            name="rt"
                            placeholder="cth. 02"
                            required={isKotaTegal}
                            className="pl-9 h-9 text-xs"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-lg bg-muted/50 border text-[11px] text-muted-foreground flex items-center gap-2">
                    <Globe2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>
                      Anda mendaftar sebagai warga umum. Fitur administrasi RT/RW lokal dapat diaktifkan kemudian melalui pengaturan profil.
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
                    Mendaftarkan Akun...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Daftar Akun Warga
                  </>
                )}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                Sudah memiliki akun?{" "}
                <Link
                  href="/login"
                  className="text-primary font-semibold hover:underline"
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
