"use client"

import * as React from "react"
import Link from "next/link"
import {
  Users,
  CheckCircle2,
  UserPlus,
  ArrowRight,
  Building2,
  HeartPulse,
  GraduationCap,
  ShieldCheck,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { joinCommunity } from "@/app/actions/groups"

interface GroupCardProps {
  group?: {
    id: string
    name: string
    description?: string
    type?: string
    category?: string
    category_label?: string
    member_count?: number
    is_member?: boolean
    is_joined?: boolean
  }
  community?: any
  isJoined?: boolean
  onJoinSuccess?: (communityId: string) => void
}

export function GroupCard({
  group: rawGroup,
  community: rawCommunity,
  isJoined: initialJoined,
  onJoinSuccess,
}: GroupCardProps) {
  const group = rawGroup || rawCommunity
  const [loading, setLoading] = React.useState(false)

  const [isMember, setIsMember] = React.useState(
    group?.is_member !== undefined
      ? group.is_member
      : group?.is_joined !== undefined
      ? group.is_joined
      : initialJoined || false
  )

  React.useEffect(() => {
    if (group?.is_member !== undefined) {
      setIsMember(group.is_member)
    } else if (group?.is_joined !== undefined) {
      setIsMember(group.is_joined)
    } else if (initialJoined !== undefined) {
      setIsMember(initialJoined)
    }
  }, [group?.is_member, group?.is_joined, initialJoined])

  // Pilihan Ikon & Warna Aksen Berdasarkan Jenis Komunitas
  const getCategoryStyle = (type?: string) => {
    switch (type?.toUpperCase()) {
      case "POSYANDU":
        return {
          icon: HeartPulse,
          color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        }
      case "PAUD":
      case "PAUD-PNF":
        return {
          icon: GraduationCap,
          color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        }
      case "RT":
      case "RW":
      case "RT_RW":
        return {
          icon: Building2,
          color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
        }
      default:
        return {
          icon: ShieldCheck,
          color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        }
    }
  }

  if (!group) return null

  const style = getCategoryStyle(group.type || group.category)
  const IconComponent = style.icon

  async function handleJoin(e?: React.MouseEvent) {
    if (e) e.preventDefault()
    setLoading(true)
    const res = await joinCommunity(group.id)
    setLoading(false)
    if (!res?.error) {
      setIsMember(true)
      if (onJoinSuccess) {
        onJoinSuccess(group.id)
      }
    }
  }

  return (
    <Card className="border-primary/10 shadow-xs hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between overflow-hidden">
      <div>
        {/* Header Kartu & Status */}
        <CardHeader className="p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className={`p-3 rounded-xl border ${style.color}`}>
              <IconComponent className="h-6 w-6" />
            </div>
            {isMember ? (
              <Badge
                variant="default"
                className="bg-emerald-600/10 text-emerald-600 border-emerald-600/20 text-[11px] font-semibold gap-1 px-2.5 py-1"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Sudah Bergabung</span>
              </Badge>
            ) : (
              <Badge variant="outline" className="text-[11px] text-muted-foreground font-medium">
                {group.category_label || group.type || group.category || "Komunitas"}
              </Badge>
            )}
          </div>

          <h3 className="font-bold text-base tracking-tight leading-snug text-foreground line-clamp-1">
            <Link href={`/groups/${group.id}`} className="hover:underline">
              {group.name}
            </Link>
          </h3>
        </CardHeader>

        {/* Deskripsi & Jumlah Anggota */}
        <CardContent className="px-5 pb-4 space-y-3">
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {group.description ||
              "Komunitas resmi warga untuk berkoordinasi, berbagi berita lingkungan, dan berinteraksi."}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium pt-1">
            <Users className="h-4 w-4 text-primary" />
            <span>{group.member_count || 0} Warga Terdaftar</span>
          </div>
        </CardContent>
      </div>

      {/* Tombol Aksi Utama */}
      <CardFooter className="p-5 pt-3 bg-muted/20 border-t flex items-center gap-2">
        {isMember ? (
          <Link href={`/groups/${group.id}`} className="w-full">
            <Button
              variant="outline"
              className="w-full h-9 text-xs font-semibold gap-1.5 hover:bg-background"
            >
              <span>Buka Komunitas</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        ) : (
          <Button
            onClick={handleJoin}
            disabled={loading}
            className="w-full h-9 text-xs font-semibold gap-1.5 shadow-xs"
          >
            <UserPlus className="h-3.5 w-3.5" />
            <span>{loading ? "Menyimpan Keanggotaan..." : "Gabung Komunitas Ini"}</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
