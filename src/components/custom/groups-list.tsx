"use client"

import * as React from "react"
import {
  Users,
  Building2,
  HeartHandshake,
  GraduationCap,
  Search,
  Sparkles,
  PlusCircle,
  MapPin,
  CheckCircle2,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GroupCard } from "@/components/custom/group-card"
import { type Community } from "@/lib/types/groups"

interface GroupsListProps {
  initialCommunities: Community[]
}

export function GroupsList({ initialCommunities }: GroupsListProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [joinedGroupIds, setJoinedGroupIds] = React.useState<string[]>([])

  const handleJoinSuccess = (communityId: string) => {
    setJoinedGroupIds((prev) => [...prev, communityId])
  }

  // Filter logic
  const filteredCommunities = React.useMemo(() => {
    return initialCommunities.filter((comm) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "ALL" ||
        comm.type === selectedCategory ||
        (selectedCategory === "RT_RW" && (comm.type === "RT_RW" || comm.category_label?.includes("RT"))) ||
        (selectedCategory === "POSYANDU" && (comm.type === "POSYANDU" || comm.category_label?.includes("Posyandu"))) ||
        (selectedCategory === "PAUD" && (comm.type === "PAUD" || comm.category_label?.includes("PAUD"))) ||
        (selectedCategory === "OPD" && (comm.type === "OPD" || comm.category_label?.includes("OPD")))

      // Search filter
      const matchesSearch =
        searchQuery.trim() === "" ||
        comm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (comm.location && comm.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (comm.description && comm.description.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [initialCommunities, selectedCategory, searchQuery])

  // Count per category for badge counters
  const categoryCounts = React.useMemo(() => {
    return {
      ALL: initialCommunities.length,
      RT_RW: initialCommunities.filter((c) => c.type === "RT_RW" || c.category_label?.includes("RT")).length,
      POSYANDU: initialCommunities.filter((c) => c.type === "POSYANDU" || c.category_label?.includes("Posyandu")).length,
      PAUD: initialCommunities.filter((c) => c.type === "PAUD" || c.category_label?.includes("PAUD")).length,
      OPD: initialCommunities.filter((c) => c.type === "OPD" || c.category_label?.includes("OPD")).length,
    }
  }, [initialCommunities])

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Info */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-muted/40 border border-border/80 p-6 md:p-8">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs px-2.5 py-0.5 font-semibold">
              <Sparkles className="h-3 w-3 mr-1" />
              Ekosistem Komunitas Jarimas
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              Kota Tegal
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Grup & Komunitas Warga
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Terhubung langsung dengan forum rukun warga (RT/RW), pos layanan kesehatan terpadu (Posyandu), lembaga pendidikan anak (PAUD-PNF), dan pusat informasi kedinasan (OPD) di sekitar Anda.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-background/80 backdrop-blur rounded-xl p-3 border border-border/60 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <Building2 className="h-4 w-4 text-emerald-600" />
              <span>Wilayah RT/RW</span>
            </div>
            <p className="text-lg font-bold text-foreground mt-1">{categoryCounts.RT_RW} Grup</p>
          </div>

          <div className="bg-background/80 backdrop-blur rounded-xl p-3 border border-border/60 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <HeartHandshake className="h-4 w-4 text-rose-600" />
              <span>Posyandu</span>
            </div>
            <p className="text-lg font-bold text-foreground mt-1">{categoryCounts.POSYANDU} Pos</p>
          </div>

          <div className="bg-background/80 backdrop-blur rounded-xl p-3 border border-border/60 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <GraduationCap className="h-4 w-4 text-amber-600" />
              <span>PAUD-PNF</span>
            </div>
            <p className="text-lg font-bold text-foreground mt-1">{categoryCounts.PAUD} Lembaga</p>
          </div>

          <div className="bg-background/80 backdrop-blur rounded-xl p-3 border border-border/60 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <Users className="h-4 w-4 text-blue-600" />
              <span>OPD / Dinas</span>
            </div>
            <p className="text-lg font-bold text-foreground mt-1">{categoryCounts.OPD} Instansi</p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar: Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Tabs
            value={selectedCategory}
            onValueChange={(val) => setSelectedCategory(val || "ALL")}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-muted/80 p-1 rounded-xl h-auto gap-1">
              <TabsTrigger
                value="ALL"
                className="text-xs px-3.5 py-1.5 rounded-lg data-active:bg-background data-active:text-foreground font-medium gap-1.5"
              >
                <span>Semua</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-muted rounded-full text-muted-foreground font-semibold">
                  {categoryCounts.ALL}
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="RT_RW"
                className="text-xs px-3.5 py-1.5 rounded-lg data-active:bg-background data-active:text-foreground font-medium gap-1.5"
              >
                <Building2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Wilayah RT/RW</span>
              </TabsTrigger>

              <TabsTrigger
                value="POSYANDU"
                className="text-xs px-3.5 py-1.5 rounded-lg data-active:bg-background data-active:text-foreground font-medium gap-1.5"
              >
                <HeartHandshake className="h-3.5 w-3.5 text-rose-600" />
                <span>Posyandu</span>
              </TabsTrigger>

              <TabsTrigger
                value="PAUD"
                className="text-xs px-3.5 py-1.5 rounded-lg data-active:bg-background data-active:text-foreground font-medium gap-1.5"
              >
                <GraduationCap className="h-3.5 w-3.5 text-amber-600" />
                <span>PAUD-PNF</span>
              </TabsTrigger>

              <TabsTrigger
                value="OPD"
                className="text-xs px-3.5 py-1.5 rounded-lg data-active:bg-background data-active:text-foreground font-medium gap-1.5"
              >
                <Users className="h-3.5 w-3.5 text-blue-600" />
                <span>OPD/Dinas</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Live Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama grup atau wilayah..."
            className="pl-9 h-9.5 text-xs bg-card border-border/80 rounded-xl"
          />
        </div>
      </div>

      {/* Grid of Community Cards */}
      {filteredCommunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCommunities.map((comm) => (
            <GroupCard
              key={comm.id}
              community={comm}
              isJoined={joinedGroupIds.includes(comm.id)}
              onJoinSuccess={handleJoinSuccess}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Search className="h-6 w-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-semibold text-foreground">Tidak ada grup ditemukan</h3>
            <p className="text-xs text-muted-foreground">
              Tidak ada komunitas yang cocok dengan kata kunci &quot;{searchQuery}&quot; pada kategori terpilih.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("ALL")
            }}
            className="text-xs"
          >
            Reset Filter & Pencarian
          </Button>
        </div>
      )}
    </div>
  )
}
