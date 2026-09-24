"use client"

import * as React from "react"
import Link from "next/link"
import {
  Users,
  Building2,
  HeartHandshake,
  GraduationCap,
  MapPin,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  Loader2,
  FileText,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { joinCommunity } from "@/app/actions/groups"
import { Community } from "@/lib/types/groups"

interface GroupCardProps {
  community: Community
  isJoined?: boolean
  onJoinSuccess?: (communityId: string) => void
}

export function GroupCard({ community, isJoined: initialJoined = false, onJoinSuccess }: GroupCardProps) {
  const [isJoined, setIsJoined] = React.useState(initialJoined)
  const [isPending, startTransition] = React.useTransition()
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  // Map category to icon, color style, and label
  const getCategoryConfig = (type: string) => {
    switch (type) {
      case "RT_RW":
      case "Wilayah RT/RW":
        return {
          label: "Wilayah RT/RW",
          icon: Building2,
          badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
          iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          borderAccent: "hover:border-emerald-500/40",
        }
      case "POSYANDU":
      case "Posyandu":
        return {
          label: "Posyandu",
          icon: HeartHandshake,
          badgeColor: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
          iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
          borderAccent: "hover:border-rose-500/40",
        }
      case "PAUD":
      case "PAUD-PNF":
        return {
          label: "PAUD-PNF",
          icon: GraduationCap,
          badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
          iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
          borderAccent: "hover:border-amber-500/40",
        }
      case "OPD":
      case "OPD/Dinas":
      default:
        return {
          label: "OPD/Dinas",
          icon: Users,
          badgeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
          iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
          borderAccent: "hover:border-blue-500/40",
        }
    }
  }

  const config = getCategoryConfig(community.type)
  const CategoryIcon = config.icon

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setErrorMessage(null)

    startTransition(async () => {
      const res = await joinCommunity(community.id)
      if (res.error) {
        setErrorMessage(res.error)
      } else {
        setIsJoined(true)
        if (onJoinSuccess) {
          onJoinSuccess(community.id)
        }
      }
    })
  }

  return (
    <Card className={`group flex flex-col justify-between overflow-hidden transition-all duration-200 hover:shadow-md ${config.borderAccent}`}>
      <div>
        {/* Card Header Top */}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${config.iconBg}`}>
                <CategoryIcon className="h-5 w-5" />
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge variant="outline" className={`text-[11px] font-medium px-2 py-0.5 ${config.badgeColor}`}>
                    {community.category_label || config.label}
                  </Badge>
                  {community.is_verified && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-blue-500/10 text-blue-600 border-blue-300 dark:border-blue-800 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Resmi</span>
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2.5">
            <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              <Link href={`/groups/${community.id}`} className="hover:underline">
                {community.name}
              </Link>
            </CardTitle>
            {community.location && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
                <span className="truncate">{community.location}</span>
              </div>
            )}
          </div>
        </CardHeader>

        {/* Card Content Description & Meta */}
        <CardContent className="py-2 space-y-3">
          <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {community.description || "Grup komunitas warga untuk koordinasi, informasi resmi, dan kegiatan lingkungan."}
          </CardDescription>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border/40">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-primary" />
              <span className="font-semibold text-foreground">{community.member_count || 0}</span>
              <span className="text-[11px]">Anggota</span>
            </div>
            {community.post_count !== undefined && (
              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-semibold text-foreground">{community.post_count}</span>
                <span className="text-[11px]">Kabar/Status</span>
              </div>
            )}
          </div>

          {errorMessage && (
            <p className="text-[11px] text-destructive bg-destructive/10 p-2 rounded-md font-medium">
              {errorMessage}
            </p>
          )}
        </CardContent>
      </div>

      {/* Card Footer Actions */}
      <CardFooter className="pt-3 pb-4 border-t border-border/40 flex items-center justify-between gap-2">
        <Button
          variant={isJoined ? "secondary" : "default"}
          size="sm"
          onClick={handleJoin}
          disabled={isJoined || isPending}
          className="text-xs flex-1 gap-1.5"
        >
          {isPending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : isJoined ? (
            <>
              <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Sudah Bergabung</span>
            </>
          ) : (
            <>
              <span>Bergabung</span>
            </>
          )}
        </Button>

        <Link href={`/groups/${community.id}`} className="flex-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs border-border/80 hover:bg-accent flex items-center justify-center gap-1"
          >
            <span>Lihat Grup</span>
            <ArrowRight className="h-3.5 w-3.5 ml-0.5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
