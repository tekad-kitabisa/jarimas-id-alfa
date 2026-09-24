"use client"

import * as React from "react"
import Link from "next/link"
import {
  HeartPulse,
  GraduationCap,
  Users,
  Building2,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  UserPlus,
  Loader2,
  ShieldCheck,
  Building,
  Check,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { KOTA_TEGAL_DATA } from "@/lib/constants/tegal-data"
import { getGroupsPageData, joinGroupWithRole } from "@/app/actions/groups"

export default function GroupsPage() {
  const [loading, setLoading] = React.useState(true)
  const [userProfile, setUserProfile] = React.useState<any>(null)
  const [joinedGroups, setJoinedGroups] = React.useState<any[]>([])
  const [stats, setStats] = React.useState({ posyandu: 0, paud: 0, rtrw: 0 })
  const [allCommunities, setAllCommunities] = React.useState<any[]>([])

  // State Filter Terintegrasi untuk Formulir Posyandu
  const [selectedKec, setSelectedKec] = React.useState<string>("Tegal Barat")
  const [selectedKel, setSelectedKel] = React.useState<string>("Pekauman")
  const [selectedPosyanduId, setSelectedPosyanduId] = React.useState<string>("")
  const [loadingJoin, setLoadingJoin] = React.useState(false)

  // State Form PAUD-PNF
  const [paudKecamatan, setPaudKecamatan] = React.useState<string>("Tegal Barat")
  const [paudKelurahan, setPaudKelurahan] = React.useState<string>("Pekauman")
  const [selectedPaudId, setSelectedPaudId] = React.useState<string>("")
  const [paudSubmitting, setPaudSubmitting] = React.useState(false)

  // Fetch initial 4-tier data on mount
  React.useEffect(() => {
    async function initData() {
      setLoading(true)
      const res = await getGroupsPageData()
      setUserProfile(res.userProfile)
      setJoinedGroups(res.joinedGroups || [])
      setStats(res.stats || { posyandu: 0, paud: 0, rtrw: 0 })
      setAllCommunities(res.allCommunities || [])

      // Set default form values to user's domisili if available
      if (res.userProfile?.kecamatan_name) {
        setSelectedKec(res.userProfile.kecamatan_name)
        setPaudKecamatan(res.userProfile.kecamatan_name)
      }
      if (res.userProfile?.kelurahan_name) {
        setSelectedKel(res.userProfile.kelurahan_name)
        setPaudKelurahan(res.userProfile.kelurahan_name)
      }
      setLoading(false)
    }
    initData()
  }, [])

  // Kelurahan list per kecamatan for Posyandu
  const posyanduKelurahanList = React.useMemo(() => {
    const found = KOTA_TEGAL_DATA.find((k) => k.kecamatan === selectedKec)
    return found ? found.kelurahan : []
  }, [selectedKec])

  // Kelurahan list per kecamatan for PAUD
  const paudKelurahanList = React.useMemo(() => {
    const found = KOTA_TEGAL_DATA.find((k) => k.kecamatan === paudKecamatan)
    return found ? found.kelurahan : []
  }, [paudKecamatan])

  // Filter otomatis daftar Posyandu berdasarkan kelurahan yang dipilih
  const availablePosyandu = React.useMemo(() => {
    if (!selectedKel) return []
    const filtered = allCommunities.filter((c) => {
      const isPosyandu = (c.type || c.community_type || "").toUpperCase() === "POSYANDU"
      const isMatchKelurahan =
        (c.kelurahan_name || "").toLowerCase().trim() === selectedKel.toLowerCase().trim()
      return isPosyandu && isMatchKelurahan
    })

    console.log("[DEBUG_POSYANDU_FILTER]", {
      selectedKel,
      totalDitemukan: filtered.length,
      daftarNama: filtered.map((f) => f.name),
    })

    return filtered
  }, [selectedKel, allCommunities])

  // Objek Posyandu terpilih untuk menjamin teks nama selalu muncul tanpa UUID
  const selectedPosyanduObj = React.useMemo(() => {
    return allCommunities.find((c) => String(c.id) === String(selectedPosyanduId))
  }, [selectedPosyanduId, allCommunities])

  // Auto-select first available Posyandu if not selected
  React.useEffect(() => {
    if (availablePosyandu.length > 0) {
      if (!availablePosyandu.some((p) => p.id === selectedPosyanduId)) {
        setSelectedPosyanduId(availablePosyandu[0].id)
      }
    } else {
      setSelectedPosyanduId("")
    }
  }, [availablePosyandu, selectedPosyanduId])

  // Available PAUD/RA/SKB/PKBM filtered by kelurahan
  const availablePaudList = React.useMemo(() => {
    if (!paudKelurahan) return []
    const filtered = allCommunities.filter((c) => {
      const type = (c.type || "").toUpperCase()
      const commType = (c.community_type || "").toUpperCase()
      const catLabel = (c.category_label || "").toUpperCase()
      const isPaud =
        type === "PAUD" ||
        type === "RA" ||
        type === "SKB" ||
        type === "PKBM" ||
        commType === "PAUD" ||
        commType === "PNF" ||
        catLabel.includes("PAUD") ||
        catLabel.includes("RA") ||
        catLabel.includes("SKB") ||
        catLabel.includes("PKBM")

      const isMatchKelurahan =
        (c.kelurahan_name || "").toLowerCase().trim() === paudKelurahan.toLowerCase().trim()
      return isPaud && isMatchKelurahan
    })

    console.log("[DEBUG_PAUD_FILTER]", {
      paudKelurahan,
      totalDitemukan: filtered.length,
      daftarNama: filtered.map((f) => f.name),
    })

    return filtered
  }, [paudKelurahan, allCommunities])

  // Objek PAUD terpilih untuk menjamin teks nama selalu muncul tanpa UUID
  const selectedPaudObj = React.useMemo(() => {
    return allCommunities.find((c) => String(c.id) === String(selectedPaudId))
  }, [selectedPaudId, allCommunities])

  // Auto-select first available PAUD if not selected
  React.useEffect(() => {
    if (availablePaudList.length > 0) {
      if (!availablePaudList.some((p) => p.id === selectedPaudId)) {
        setSelectedPaudId(availablePaudList[0].id)
      }
    } else {
      setSelectedPaudId("")
    }
  }, [availablePaudList, selectedPaudId])

  // Handle Posyandu Join Submit
  async function handleJoinPosyandu() {
    if (!selectedPosyanduId) return
    setLoadingJoin(true)
    await joinGroupWithRole(selectedPosyanduId, "PENGUNJUNG")
    setLoadingJoin(false)
  }

  // Handle PAUD Join Submit
  const handleJoinPaud = async () => {
    if (!selectedPaudId) return
    setPaudSubmitting(true)
    await joinGroupWithRole(selectedPaudId, "WARGA_PAUD")
  }

  // Visual helper for joined group icons
  const getGroupIconInfo = (type?: string) => {
    const upper = (type || "").toUpperCase()
    if (upper === "POSYANDU") {
      return {
        icon: HeartPulse,
        color: "text-rose-600 bg-rose-500/10 border-rose-300 dark:border-rose-800",
        label: "Layanan Posyandu",
      }
    }
    if (upper === "PAUD" || upper === "RA" || upper === "SKB" || upper === "PKBM" || upper === "PNF") {
      return {
        icon: GraduationCap,
        color: "text-emerald-600 bg-emerald-500/10 border-emerald-300 dark:border-emerald-800",
        label: "Satuan PAUD-PNF",
      }
    }
    return {
      icon: Building2,
      color: "text-purple-600 bg-purple-500/10 border-purple-300 dark:border-purple-800",
      label: "Grup RT/RW",
    }
  }

  return (
    <div className="container mx-auto p-3 sm:p-5 md:p-6 space-y-6 max-w-7xl">
      {/* ========================================================================= */}
      {/* TINGKAT 1: Banner Header Atas (Kartu Panjang)                             */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/15 via-primary/5 to-indigo-950/20 border border-border/80 p-6 md:p-8 shadow-xs">
        <div className="relative z-10 space-y-2.5 max-w-4xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30 text-xs px-2.5 py-0.5 font-semibold flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ekosistem Komunitas Resmi</span>
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground/80" />
              <span>Kota Tegal</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Grup dan Komunitas Warga Kota Tegal
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Ekosistem pelayanan dan integrasi digital komunitas warga berjenjang di Kota Tegal. Terhubung langsung dengan forum koordinasi lingkungan RT/RW, pemantauan kesehatan terpadu Posyandu balita & lansia, serta jaringan satuan pendidikan PAUD, RA, dan lembaga pendidikan non-formal (PKBM & SKB).
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TINGKAT 2: Baris Kartu Counter (3 Kartu Ringkasan Statistik)               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Kartu 1: Posyandu */}
        <Card className="border-border/80 shadow-xs hover:border-rose-400/40 transition-all bg-card overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground block">
                  Layanan Posyandu
                </span>
                <p className="text-2xl font-black text-foreground tracking-tight">
                  {stats.posyandu || 0}
                  <span className="text-xs font-medium text-muted-foreground ml-1.5">Warga</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-600 border border-rose-300 dark:border-rose-800 flex items-center justify-center shrink-0">
                <HeartPulse className="h-6 w-6" />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border/40 leading-snug">
              Pemantauan tumbuh kembang balita, pencegahan stunting & cek kesehatan lansia.
            </p>
          </CardContent>
        </Card>

        {/* Kartu 2: PAUD-PNF */}
        <Card className="border-border/80 shadow-xs hover:border-emerald-400/40 transition-all bg-card overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground block">
                  Satuan PAUD-PNF
                </span>
                <p className="text-2xl font-black text-foreground tracking-tight">
                  {stats.paud || 0}
                  <span className="text-xs font-medium text-muted-foreground ml-1.5">Warga</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center shrink-0">
                <GraduationCap className="h-6 w-6" />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border/40 leading-snug">
              KB, RA, SKB & PKBM pembelajaran anak usia dini & kesetaraan non-formal.
            </p>
          </CardContent>
        </Card>

        {/* Kartu 3: Komunitas Warga RT/RW */}
        <Card className="border-border/80 shadow-xs hover:border-purple-400/40 transition-all bg-card overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground block">
                  Komunitas Warga RT/RW
                </span>
                <p className="text-2xl font-black text-foreground tracking-tight">
                  {stats.rtrw || 0}
                  <span className="text-xs font-medium text-muted-foreground ml-1.5">Warga</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-600 border border-purple-300 dark:border-purple-800 flex items-center justify-center shrink-0">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border/40 leading-snug">
              Forum musyawarah lingkungan, ronda malam, iuran, dan info resmi pengurus RT.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ========================================================================= */}
      {/* TINGKAT 3: Banner Kartu "Komunitas Warga Yang Telah Diikuti" (Panjang)     */}
      {/* ========================================================================= */}
      <Card className="border-border/80 shadow-xs bg-card overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="space-y-1">
              <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2 text-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Komunitas Warga Yang Telah Diikuti</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Daftar komunitas resmi tempat Anda terdaftar sebagai anggota aktif (termasuk grup lingkungan RT/RW domisili yang otomatis terhubung).
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-1">
              {joinedGroups.length} Komunitas Terdaftar
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          {loading ? (
            <div className="py-8 text-center space-y-2">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
              <p className="text-xs text-muted-foreground">Memuat daftar komunitas terdaftar...</p>
            </div>
          ) : joinedGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {joinedGroups.map((group) => {
                const iconInfo = getGroupIconInfo(group.type || group.community_type)
                const IconComponent = iconInfo.icon

                return (
                  <div
                    key={group.id}
                    className="rounded-xl border border-border/80 bg-background/90 p-4 flex flex-col justify-between hover:border-primary/40 hover:shadow-xs transition-all space-y-3"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className={`p-2.5 rounded-xl border ${iconInfo.color} shrink-0`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-emerald-500/10 text-emerald-600 border-emerald-300 dark:border-emerald-800 text-[10px] font-semibold px-2 py-0.5 flex items-center gap-1"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          <span>{group.my_role || "Anggota"}</span>
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-foreground line-clamp-1">
                          {group.name}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                          {group.description || "Forum komunitas resmi warga di Kota Tegal."}
                        </p>
                      </div>

                      {group.kelurahan_name && (
                        <div className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                          <MapPin className="h-3 w-3 text-muted-foreground/80 shrink-0" />
                          <span className="truncate">
                            Kel. {group.kelurahan_name}
                            {group.kecamatan_name ? `, Kec. ${group.kecamatan_name}` : ""}
                          </span>
                        </div>
                      )}
                    </div>

                    <Link href={`/groups/${group.id}`} className="w-full pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full h-8 text-xs font-semibold gap-1.5 border-border/80 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                      >
                        <span>Buka Halaman Grup</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-6 border border-dashed rounded-xl bg-muted/10 p-6 space-y-2">
              <Users className="h-8 w-8 mx-auto text-muted-foreground/60" />
              <p className="text-xs font-semibold text-foreground">
                Belum ada komunitas yang diikuti
              </p>
              <p className="text-[11px] text-muted-foreground max-w-md mx-auto">
                Silakan pilih dan bergabung ke Posyandu atau Satuan PAUD-PNF pada formulir di bawah ini.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ========================================================================= */}
      {/* TINGKAT 4: Grid 2 Kolom Formulir Interaktif Bergabung Komunitas Baru      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ----------------------------------------------------------------------- */}
        {/* Formulir Kiri: Pilihan Grup Posyandu                                    */}
        {/* ----------------------------------------------------------------------- */}
        <Card className="border-border/80 shadow-xs hover:border-rose-400/40 transition-all flex flex-col justify-between overflow-hidden bg-card">
          <div>
            <CardHeader className="p-5 pb-4 border-b border-border/40 bg-rose-500/[0.03]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-300 dark:border-rose-800">
                  <HeartPulse className="h-6 w-6" />
                </div>
                <div className="space-y-0.5">
                  <CardTitle className="text-base font-bold text-foreground">
                    Formulir Pilihan Grup Posyandu
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Pilih dan daftarkan diri Anda ke layanan posyandu balita & kesehatan terpadu terdekat.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
              {/* Dropdown 1: Kecamatan */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-rose-600" />
                  <span>Kecamatan di Kota Tegal</span>
                </label>
                <Select
                  value={selectedKec}
                  onValueChange={(val) => {
                    const nextKec = val || "Tegal Barat"
                    setSelectedKec(nextKec)
                    const found = KOTA_TEGAL_DATA.find((k) => k.kecamatan === nextKec)
                    if (found && found.kelurahan.length > 0) {
                      setSelectedKel(found.kelurahan[0])
                    }
                  }}
                >
                  <SelectTrigger className="h-9 text-xs bg-background">
                    <SelectValue placeholder="Pilih Kecamatan" />
                  </SelectTrigger>
                  <SelectContent>
                    {KOTA_TEGAL_DATA.map((k) => (
                      <SelectItem key={k.kecamatan} value={k.kecamatan} className="text-xs">
                        Kecamatan {k.kecamatan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dropdown 2: Kelurahan */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-rose-600" />
                  <span>Kelurahan</span>
                </label>
                <Select
                  value={selectedKel}
                  onValueChange={(val) => setSelectedKel(val || "")}
                >
                  <SelectTrigger className="h-9 text-xs bg-background">
                    <SelectValue placeholder="Pilih Kelurahan" />
                  </SelectTrigger>
                  <SelectContent>
                    {posyanduKelurahanList.map((kel) => (
                      <SelectItem key={kel} value={kel} className="text-xs">
                        Kelurahan {kel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dropdown 3: Pilihan Nama Posyandu */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <HeartPulse className="h-3.5 w-3.5 text-rose-600" />
                  <span>Nama Posyandu Terintegrasi</span>
                </label>
                <Select
                  value={selectedPosyanduId}
                  onValueChange={(val) => setSelectedPosyanduId(val || "")}
                >
                  <SelectTrigger className="h-9 text-xs bg-background">
                    <span className="truncate">
                      {selectedPosyanduObj ? selectedPosyanduObj.name : "Pilih Nama Posyandu"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {availablePosyandu.length === 0 ? (
                      <div className="p-2 text-xs text-muted-foreground text-center">
                        Pilih Kelurahan yang memiliki daftar Posyandu
                      </div>
                    ) : (
                      availablePosyandu.map((posyandu) => (
                        <SelectItem
                          key={posyandu.id}
                          value={String(posyandu.id)}
                          className="text-xs"
                        >
                          {posyandu.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Info Box Peran Otomatis */}
              <div className="rounded-xl bg-rose-500/5 border border-rose-300/40 dark:border-rose-900/40 p-3 text-[11px] text-muted-foreground space-y-1">
                <p className="font-semibold text-rose-700 dark:text-rose-400">
                  ℹ️ Hak Akses & Peran:
                </p>
                <p>
                  Dengan bergabung ke posyandu ini, Anda akan otomatis terdaftar dengan peran <strong>PENGUNJUNG</strong> untuk memantau agenda penimbangan balita dan konsultasi kesehatan.
                </p>
              </div>
            </CardContent>
          </div>

          <CardFooter className="p-5 pt-3 border-t bg-muted/20">
            <Button
              onClick={handleJoinPosyandu}
              disabled={!selectedPosyanduId || selectedPosyanduId === "none" || loadingJoin}
              className="w-full h-9 text-xs font-semibold gap-1.5 bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
            >
              {loadingJoin ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Memproses Pendaftaran...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  <span>Bergabung ke Posyandu</span>
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* ----------------------------------------------------------------------- */}
        {/* Formulir Kanan: Pilihan Grup Satuan PAUD-PNF                           */}
        {/* ----------------------------------------------------------------------- */}
        <Card className="border-border/80 shadow-xs hover:border-emerald-400/40 transition-all flex flex-col justify-between overflow-hidden bg-card">
          <div>
            <CardHeader className="p-5 pb-4 border-b border-border/40 bg-emerald-500/[0.03]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-300 dark:border-emerald-800">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="space-y-0.5">
                  <CardTitle className="text-base font-bold text-foreground">
                    Formulir Pilihan Grup Satuan PAUD-PNF
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Pilih lembaga PAUD, RA, PKBM, atau SKB resmi di lingkungan wilayah Anda.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
              {/* Dropdown 1: Kecamatan */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Kecamatan di Kota Tegal</span>
                </label>
                <Select
                  value={paudKecamatan}
                  onValueChange={(val) => {
                    const nextKec = val || "Tegal Barat"
                    setPaudKecamatan(nextKec)
                    const found = KOTA_TEGAL_DATA.find((k) => k.kecamatan === nextKec)
                    if (found && found.kelurahan.length > 0) {
                      setPaudKelurahan(found.kelurahan[0])
                    }
                  }}
                >
                  <SelectTrigger className="h-9 text-xs bg-background">
                    <SelectValue placeholder="Pilih Kecamatan" />
                  </SelectTrigger>
                  <SelectContent>
                    {KOTA_TEGAL_DATA.map((k) => (
                      <SelectItem key={k.kecamatan} value={k.kecamatan} className="text-xs">
                        Kecamatan {k.kecamatan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dropdown 2: Kelurahan */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Kelurahan</span>
                </label>
                <Select
                  value={paudKelurahan}
                  onValueChange={(val) => setPaudKelurahan(val || "")}
                >
                  <SelectTrigger className="h-9 text-xs bg-background">
                    <SelectValue placeholder="Pilih Kelurahan" />
                  </SelectTrigger>
                  <SelectContent>
                    {paudKelurahanList.map((kel) => (
                      <SelectItem key={kel} value={kel} className="text-xs">
                        Kelurahan {kel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dropdown 3: Pilihan Nama PAUD / RA / SKB / PKBM */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Satuan PAUD / RA / SKB / PKBM</span>
                </label>
                <Select
                  value={selectedPaudId}
                  onValueChange={(val) => setSelectedPaudId(val || "")}
                >
                  <SelectTrigger className="h-9 text-xs bg-background">
                    <span className="truncate">
                      {selectedPaudObj ? selectedPaudObj.name : "Pilih Satuan PAUD-PNF"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {availablePaudList.length === 0 ? (
                      <div className="p-2 text-xs text-muted-foreground text-center">
                        Pilih Kelurahan yang memiliki daftar Satuan PAUD-PNF
                      </div>
                    ) : (
                      availablePaudList.map((paud) => (
                        <SelectItem
                          key={paud.id}
                          value={String(paud.id)}
                          className="text-xs"
                        >
                          {paud.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Info Box Peran Otomatis */}
              <div className="rounded-xl bg-emerald-500/5 border border-emerald-300/40 dark:border-emerald-900/40 p-3 text-[11px] text-muted-foreground space-y-1">
                <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                  ℹ️ Hak Akses & Peran:
                </p>
                <p>
                  Dengan bergabung ke satuan ini, Anda akan otomatis terdaftar dengan peran <strong>WARGA_PAUD</strong> untuk memperoleh akses informasi kegiatan belajar dan komunikasi sekolah.
                </p>
              </div>
            </CardContent>
          </div>

          <CardFooter className="p-5 pt-3 border-t bg-muted/20">
            <Button
              onClick={handleJoinPaud}
              disabled={!selectedPaudId || selectedPaudId === "none" || paudSubmitting}
              className="w-full h-9 text-xs font-semibold gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
            >
              {paudSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Memproses Pendaftaran...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  <span>Bergabung ke Satuan PAUD</span>
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
