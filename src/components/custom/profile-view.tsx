"use client"

import * as React from "react"
import Link from "next/link"
import {
  User,
  Phone,
  MapPin,
  Shield,
  Building,
  Building2,
  HeartHandshake,
  GraduationCap,
  Users,
  ShieldCheck,
  CheckCircle2,
  Save,
  Loader2,
  Mail,
  LogOut,
  Sparkles,
  Calendar,
  AlertCircle,
  Clock,
  IdCard,
  ShieldAlert,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfile } from "@/app/actions/profile"
import { logout } from "@/app/actions/auth"
import { UserProfileData, UserRoleItem } from "@/lib/types/profile"

interface ProfileViewProps {
  initialProfile: UserProfileData | null
  initialRoles: UserRoleItem[]
}

export function ProfileView({ initialProfile, initialRoles }: ProfileViewProps) {
  const [fullName, setFullName] = React.useState(initialProfile?.full_name || "")
  const [phoneNumber, setPhoneNumber] = React.useState(initialProfile?.phone_number || "")
  const [isPending, startTransition] = React.useTransition()
  const [feedback, setFeedback] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)

    const formData = new FormData()
    formData.append("fullName", fullName.trim())
    formData.append("phoneNumber", phoneNumber.trim())

    startTransition(async () => {
      const res = await updateProfile(formData)
      if (res.error) {
        setFeedback({ type: "error", text: res.error })
      } else {
        setFeedback({ type: "success", text: "Perubahan profil berhasil disimpan!" })
        setTimeout(() => setFeedback(null), 3000)
      }
    })
  }

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return {
          label: "Super Admin",
          badgeColor: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
          icon: ShieldAlert,
        }
      case "KETUA_RW":
        return {
          label: "Ketua RW",
          badgeColor: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800",
          icon: Building2,
        }
      case "KETUA_RT":
      case "PENGURUS_RT":
        return {
          label: "Pengurus RT",
          badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
          icon: Building2,
        }
      case "KADER_POSYANDU":
        return {
          label: "Kader Posyandu",
          badgeColor: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
          icon: HeartHandshake,
        }
      case "ADMIN_PAUD":
      case "OPERATOR_PAUD":
        return {
          label: "Operator PAUD",
          badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
          icon: GraduationCap,
        }
      case "ADMIN_OPD":
        return {
          label: "Admin OPD",
          badgeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
          icon: Users,
        }
      case "PENDUDUK":
      default:
        return {
          label: "Penduduk / Warga",
          badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800",
          icon: User,
        }
    }
  }

  const initials = (initialProfile?.full_name || "Warga")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Profile Hero Card */}
      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs">
        <div className="h-32 sm:h-40 w-full bg-gradient-to-r from-primary/80 via-primary/60 to-indigo-900/80 relative p-6 flex items-end">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        </div>

        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14">
            <div className="flex items-end gap-4">
              <Avatar className="h-24 w-24 rounded-2xl border-4 border-card shadow-md bg-muted">
                <AvatarImage src={initialProfile?.avatar_url || ""} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-black">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {initialProfile?.full_name || "-"}
                  </h1>
                  <Badge variant="outline" className="text-xs px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 border-emerald-300 dark:border-emerald-800 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>Warga Terverifikasi</span>
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground/80" />
                    <span>
                      {initialProfile?.kelurahan_name ? `Kel. ${initialProfile.kelurahan_name}` : "-"}
                      {initialProfile?.kecamatan_name ? `, Kec. ${initialProfile.kecamatan_name}` : ""}
                    </span>
                  </span>
                  <span>•</span>
                  <span>
                    RW {initialProfile?.rw || "-"} / RT {initialProfile?.rt || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Actions: Admin Panel & Logout */}
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1.5 border-purple-300/60 bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 dark:text-purple-300 dark:border-purple-800 font-semibold"
                >
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Pusat Otoritas Admin</span>
                </Button>
              </Link>
              <form action={logout}>
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Keluar Akun</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Form Edit & Wilayah & Multi-Roles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Edit Profil */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/80 shadow-xs">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span>Pengaturan Identitas & Kontak Warga</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Perbarui nama lengkap dan nomor kontak Anda agar memudahkan koordinasi dengan pengurus RT/RW dan komunitas.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleUpdate} className="space-y-4">
                {/* Nama Lengkap */}
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="text-xs font-semibold text-foreground">
                    Nama Lengkap
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      name="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Masukkan nama lengkap sesuai KTP"
                      className="pl-9 text-xs h-9"
                      required
                    />
                  </div>
                </div>

                {/* Nomor Telepon / WhatsApp */}
                <div className="space-y-1.5">
                  <Label htmlFor="phoneNumber" className="text-xs font-semibold text-foreground">
                    Nomor WhatsApp / Telepon
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="081234567890"
                      className="pl-9 text-xs h-9"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Nomor ini akan digunakan saat warga lain menghubungi lapak atau keperluan darurat RT.
                  </p>
                </div>

                {/* Email Akun (Read-only) */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                    Alamat Email Akun
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      value={initialProfile?.email || "-"}
                      disabled
                      className="pl-9 text-xs h-9 bg-muted/50 cursor-not-allowed opacity-80"
                    />
                  </div>
                </div>

                {feedback && (
                  <div
                    className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                      feedback.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
                        : "bg-destructive/10 text-destructive border border-destructive/20"
                    }`}
                  >
                    {feedback.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    )}
                    <span>{feedback.text}</span>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isPending}
                    className="text-xs gap-1.5 px-5 font-semibold"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        <span>Simpan Perubahan</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Daftar Peran Komunitas Aktif (Multi-Role) */}
          <Card className="border-border/80 shadow-xs">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Daftar Peran Komunitas Aktif (Multi-Role)</span>
                </CardTitle>
                <Badge variant="secondary" className="text-xs font-semibold px-2">
                  {initialRoles.length} Peran
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Peran komunitas yang Anda pegang di lingkungan wilayah Kota Tegal.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              {initialRoles.length > 0 ? (
                initialRoles.map((roleItem) => {
                  const roleStyle = getRoleBadgeStyle(roleItem.role_name)
                  const RoleIcon = roleStyle.icon

                  return (
                    <div
                      key={roleItem.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-card hover:bg-muted/30 transition-colors gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <RoleIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-foreground">
                            {roleItem.community?.name || "Komunitas Lingkungan"}
                          </p>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Terdaftar sejak {new Date(roleItem.created_at || Date.now()).toLocaleDateString("id-ID", { month: "short", year: "numeric" })}</span>
                          </span>
                        </div>
                      </div>

                      <Badge variant="outline" className={`text-[11px] font-medium px-2.5 py-0.5 ${roleStyle.badgeColor}`}>
                        {roleItem.role_name}
                      </Badge>
                    </div>
                  )
                })
              ) : (
                <div className="text-center p-6 bg-muted/20 rounded-xl border border-dashed text-xs text-muted-foreground">
                  Belum ada peran khusus. Anda terdaftar sebagai Warga Penduduk.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Domisili Wilayah & Keanggotaan */}
        <div className="space-y-6">
          {/* Domisili Wilayah Kota Tegal */}
          <Card className="border-border/80 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Building className="h-4 w-4 text-primary" />
                <span>Detail Domisili Wilayah</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-1">
                <div className="flex items-center gap-1.5 text-primary font-semibold text-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Status Kependudukan</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {initialProfile?.is_kota_tegal !== false
                    ? "Warga Terdaftar Domisili Kota Tegal"
                    : "Warga Luar Kota Tegal"}
                </p>
              </div>

              <div className="space-y-2 pt-1 divide-y divide-border/40">
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Kecamatan:</span>
                  <span className="font-semibold text-foreground">{initialProfile?.kecamatan_name || "-"}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Kelurahan:</span>
                  <span className="font-semibold text-foreground">{initialProfile?.kelurahan_name || "-"}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Rukun Warga (RW):</span>
                  <span className="font-semibold text-foreground">{initialProfile?.rw ? `RW ${initialProfile.rw}` : "-"}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">Rukun Tetangga (RT):</span>
                  <span className="font-semibold text-foreground">{initialProfile?.rt ? `RT ${initialProfile.rt}` : "-"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keamanan & Kebijakan Data */}
          <Card className="border-border/80 shadow-xs bg-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Perlindungan Data Warga</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-[11px] text-muted-foreground">
              <p>
                • Data identitas kependudukan Anda aman dan tidak disebarluaskan untuk kepentingan komersial pihak ketiga.
              </p>
              <p>
                • Perubahan alamat wilayah RT/RW memerlukan konfirmasi sinkronisasi dari Ketua RT setempat.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
