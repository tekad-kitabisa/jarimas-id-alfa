"use client"

import * as React from "react"
import {
  Heart,
  MessageSquare,
  Share2,
  CheckCircle2,
  Sparkles,
  Clock,
  MapPin,
  Send,
  Copy,
  Check,
  Shield,
  Building2,
  HeartHandshake,
  GraduationCap,
  Users,
} from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { PostItem } from "@/lib/types/posts"
import { APP_ROLES, AppRole } from "@/lib/constants/roles"

interface PostCardProps {
  post: PostItem
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = React.useState(false)
  const [likesCount, setLikesCount] = React.useState(post.likes_count || 0)
  const [showComments, setShowComments] = React.useState(false)
  const [commentInput, setCommentInput] = React.useState("")
  const [comments, setComments] = React.useState<string[]>([])
  const [copied, setCopied] = React.useState(false)

  const author = post.author
  const authorRole = (author?.active_role as AppRole) || "PENDUDUK"
  const roleConfig = APP_ROLES[authorRole] || APP_ROLES.PENDUDUK

  const getRoleIcon = (roleName?: string) => {
    switch (roleName) {
      case "SUPER_ADMIN":
        return Shield
      case "KETUA_RT":
      case "KETUA_RW":
      case "PENGURUS_RT":
        return Building2
      case "KADER_POSYANDU":
        return HeartHandshake
      case "ADMIN_PAUD":
      case "OPERATOR_PAUD":
        return GraduationCap
      default:
        return Users
    }
  }

  const RoleIcon = getRoleIcon(authorRole)

  // Format date
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Baru saja"
    try {
      const d = new Date(dateStr)
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d)
    } catch {
      return "Baru saja"
    }
  }

  // Location string
  const locationString = React.useMemo(() => {
    if (!author) return "Kota Tegal"
    const kel = author.kelurahan_name ? `Kel. ${author.kelurahan_name}` : ""
    const rw = author.rw ? `RW ${author.rw}` : ""
    const rt = author.rt ? `RT ${author.rt}` : ""
    const parts = [kel, rw, rt].filter(Boolean)
    return parts.length > 0 ? parts.join(", ") : "Kota Tegal"
  }, [author])

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikesCount((prev) => Math.max(0, prev - 1))
    } else {
      setLiked(true)
      setLikesCount((prev) => prev + 1)
    }
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentInput.trim()) return
    setComments((prev) => [...prev, commentInput.trim()])
    setCommentInput("")
  }

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/feed#post-${post.id}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderStatusBadge = () => {
    switch (post.verification_status) {
      case "SHARED_TO_ECOSYSTEM":
        return (
          <Badge
            variant="outline"
            className="text-[10px] gap-1 px-2 py-0.5 bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-800"
          >
            <Sparkles className="h-3 w-3 text-purple-600 dark:text-purple-400" />
            Pengumuman Ekosistem
          </Badge>
        )
      case "PENDING_VERIFICATION":
        return (
          <Badge
            variant="outline"
            className="text-[10px] gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
          >
            <Clock className="h-3 w-3 text-amber-600" />
            Menunggu Verifikasi
          </Badge>
        )
      case "VERIFIED":
      default:
        return (
          <Badge
            variant="outline"
            className="text-[10px] gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
          >
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            Terverifikasi Wilayah
          </Badge>
        )
    }
  }

  return (
    <Card id={`post-${post.id}`} className="shadow-xs hover:shadow-sm transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                {author?.full_name
                  ? author.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  : "W"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-foreground">
                  {author?.full_name || "Warga Komunitas"}
                </span>
                <Badge
                  variant="secondary"
                  className={`text-[10px] px-1.5 py-0 gap-1 flex items-center ${roleConfig.badgeColor}`}
                >
                  <RoleIcon className="h-2.5 w-2.5" />
                  {roleConfig.label}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary/70" />
                  {locationString}
                </span>
                <span>•</span>
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {renderStatusBadge()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-3">
        {post.category && (
          <Badge variant="outline" className="text-[10px] uppercase font-bold text-muted-foreground">
            {post.category}
          </Badge>
        )}
        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
          {post.content}
        </p>

        {post.media_url && (
          <div className="rounded-lg overflow-hidden border bg-muted/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.media_url}
              alt="Lampiran Kabar"
              className="w-full max-h-96 object-cover"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-1 flex flex-col gap-3 border-t border-border/40">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`h-8 gap-1.5 text-xs px-2.5 ${
                liked ? "text-rose-600 dark:text-rose-400 font-semibold" : ""
              }`}
            >
              <Heart
                className={`h-4 w-4 ${
                  liked ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
              <span>{likesCount > 0 ? likesCount : "Suka"}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="h-8 gap-1.5 text-xs px-2.5"
            >
              <MessageSquare className="h-4 w-4" />
              <span>
                {comments.length > 0
                  ? `${comments.length} Tanggapan`
                  : "Tanggapi"}
              </span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-8 gap-1.5 text-xs px-2.5"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-600">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>Bagikan</span>
              </>
            )}
          </Button>
        </div>

        {/* Kotak Komentar */}
        {showComments && (
          <div className="w-full space-y-2 pt-2 border-t border-border/40">
            {comments.map((c, i) => (
              <div
                key={i}
                className="text-xs p-2.5 rounded-lg bg-muted/50 border space-y-0.5"
              >
                <span className="font-semibold text-foreground">Warga Anda:</span>
                <p className="text-muted-foreground">{c}</p>
              </div>
            ))}

            <form onSubmit={handleAddComment} className="flex gap-2">
              <Input
                placeholder="Tulis tanggapan warga..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="h-8 text-xs"
              />
              <Button type="submit" size="sm" className="h-8 px-3 text-xs gap-1">
                <Send className="h-3 w-3" />
                Kirim
              </Button>
            </form>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
