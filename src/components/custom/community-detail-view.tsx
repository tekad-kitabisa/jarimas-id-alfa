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
  ArrowLeft,
  Share2,
  ThumbsUp,
  MessageSquare,
  Send,
  UserCheck,
  Loader2,
  Calendar,
  Sparkles,
  Info,
  CheckCircle2,
  FileText,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { joinCommunity, createCommunityPost } from "@/app/actions/groups"
import { type Community, type CommunityPost } from "@/lib/types/groups"

interface CommunityDetailViewProps {
  community: Community | null
  initialPosts: CommunityPost[]
  memberCount?: number
}

export function CommunityDetailView({
  community,
  initialPosts,
  memberCount,
}: CommunityDetailViewProps) {
  const [posts, setPosts] = React.useState<CommunityPost[]>(initialPosts)
  const [newPostContent, setNewPostContent] = React.useState("")
  const [newPostCategory, setNewPostCategory] = React.useState<"DISKUSI" | "PENGUMUMAN" | "KEGIATAN">("DISKUSI")
  const [isJoined, setIsJoined] = React.useState(false)
  const [isPendingJoin, startJoinTransition] = React.useTransition()
  const [isPendingPost, startPostTransition] = React.useTransition()
  const [joinMessage, setJoinMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)
  const [likedPosts, setLikedPosts] = React.useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = React.useState<"ALL" | "PENGUMUMAN" | "KEGIATAN" | "DISKUSI">("ALL")
  const [copiedLink, setCopiedLink] = React.useState(false)

  if (!community) {
    return (
      <div className="py-12 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Komunitas Tidak Ditemukan</h2>
          <p className="text-sm text-muted-foreground">
            Grup yang Anda cari mungkin telah dihapus atau tautan tidak valid.
          </p>
        </div>
        <Link href="/groups">
          <Button variant="outline" className="gap-2 text-xs">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Grup
          </Button>
        </Link>
      </div>
    )
  }

  // Visual styling based on group category
  const getCategoryTheme = (type: string) => {
    switch (type) {
      case "RT_RW":
      case "Wilayah RT/RW":
        return {
          label: "Wilayah RT/RW",
          icon: Building2,
          gradient: "from-emerald-600 to-teal-800",
          badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
          iconBg: "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
          accentColor: "text-emerald-600",
        }
      case "POSYANDU":
      case "Posyandu":
        return {
          label: "Posyandu",
          icon: HeartHandshake,
          gradient: "from-rose-500 to-pink-700",
          badgeColor: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
          iconBg: "bg-rose-500/20 text-rose-600 dark:text-rose-400",
          accentColor: "text-rose-600",
        }
      case "PAUD":
      case "PAUD-PNF":
        return {
          label: "PAUD-PNF",
          icon: GraduationCap,
          gradient: "from-amber-500 to-orange-700",
          badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
          iconBg: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
          accentColor: "text-amber-600",
        }
      case "OPD":
      case "OPD/Dinas":
      default:
        return {
          label: "OPD/Dinas",
          icon: Users,
          gradient: "from-blue-600 to-indigo-800",
          badgeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
          iconBg: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
          accentColor: "text-blue-600",
        }
    }
  }

  const theme = getCategoryTheme(community.type)
  const CategoryIcon = theme.icon

  const handleJoin = () => {
    setJoinMessage(null)
    startJoinTransition(async () => {
      const res = await joinCommunity(community.id)
      if (res.error) {
        setJoinMessage({ type: "error", text: res.error })
      } else {
        setIsJoined(true)
        setJoinMessage({ type: "success", text: "Selamat! Anda telah bergabung ke komunitas ini." })
      }
    })
  }

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const handleToggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const isCurrentlyLiked = !!prev[postId]
      const nextLiked = !isCurrentlyLiked

      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              likes_count: (post.likes_count || 0) + (nextLiked ? 1 : -1),
            }
          }
          return post
        })
      )

      return { ...prev, [postId]: nextLiked }
    })
  }

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostContent.trim()) return

    const content = newPostContent.trim()
    const category = newPostCategory

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      community_id: community.id,
      content,
      category,
      created_at: new Date().toISOString(),
      author: {
        full_name: "Warga Komunitas (Anda)",
        active_role: "PENDUDUK",
      },
      likes_count: 0,
      comments_count: 0,
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")

    startPostTransition(async () => {
      const formData = new FormData()
      formData.append("communityId", community.id)
      formData.append("content", content)
      formData.append("category", category)
      await createCommunityPost(formData)
    })
  }

  const filteredPosts = React.useMemo(() => {
    if (activeTab === "ALL") return posts
    return posts.filter((p) => p.category === activeTab)
  }, [posts, activeTab])

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link href="/groups">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Semua Grup</span>
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyLink}
            className="text-xs h-8 gap-1.5 border-border/80"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Tautan Disalin</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Bagikan</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Banner & Header Card */}
      <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs">
        {/* Banner Cover Pattern */}
        <div className={`h-36 sm:h-48 w-full bg-gradient-to-r ${theme.gradient} relative flex items-end p-4 sm:p-6`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_70%)]" />
          <div className="absolute top-4 right-4">
            <Badge className="bg-background/90 text-foreground backdrop-blur text-xs font-semibold px-3 py-1 border shadow-xs">
              {theme.label}
            </Badge>
          </div>
        </div>

        {/* Header Profile Row */}
        <div className="px-5 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 sm:-mt-12">
            <div className="flex items-end gap-4">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-card border-4 border-card shadow-md flex items-center justify-center p-2 text-primary shrink-0">
                <div className={`h-full w-full rounded-xl flex items-center justify-center ${theme.iconBg}`}>
                  <CategoryIcon className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
              </div>

              <div className="space-y-1 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                    {community.name}
                  </h1>
                  {community.is_verified && (
                    <Badge variant="outline" className="text-[11px] px-2 py-0.5 bg-blue-500/10 text-blue-600 border-blue-300 dark:border-blue-800 flex items-center gap-1 font-medium">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>Terverifikasi Resmi</span>
                    </Badge>
                  )}
                </div>

                {community.location && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
                    <span>{community.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0">
              <Button
                variant={isJoined ? "secondary" : "default"}
                size="default"
                onClick={handleJoin}
                disabled={isJoined || isPendingJoin}
                className="gap-2 text-xs font-semibold"
              >
                {isPendingJoin ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : isJoined ? (
                  <>
                    <UserCheck className="h-4 w-4 text-emerald-600" />
                    <span>Sudah Bergabung</span>
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4" />
                    <span>Bergabung ke Grup</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {joinMessage && (
            <div className={`mt-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              joinMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
                : "bg-destructive/10 text-destructive border border-destructive/20"
            }`}>
              {joinMessage.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0" />
              )}
              <span>{joinMessage.text}</span>
            </div>
          )}

          {/* Description */}
          {community.description && (
            <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-4xl">
              {community.description}
            </p>
          )}
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-border/60 bg-muted/20 divide-x divide-border/60">
          <div className="p-3.5 text-center">
            <p className="text-[11px] text-muted-foreground">Total Anggota</p>
            <p className="text-base font-bold text-foreground mt-0.5">
              {memberCount !== undefined ? memberCount : (community.member_count || 0)}
            </p>
          </div>
          <div className="p-3.5 text-center">
            <p className="text-[11px] text-muted-foreground">Total Postingan</p>
            <p className="text-base font-bold text-foreground mt-0.5">{posts.length}</p>
          </div>
          <div className="p-3.5 text-center">
            <p className="text-[11px] text-muted-foreground">Pengurus / Penanggung Jawab</p>
            <p className="text-xs font-bold text-foreground mt-0.5 truncate px-2">
              {community.leader_name || "Pengurus Wilayah"}
            </p>
          </div>
          <div className="p-3.5 text-center">
            <p className="text-[11px] text-muted-foreground">Level Komunitas</p>
            <p className="text-xs font-bold text-foreground mt-0.5">{theme.label}</p>
          </div>
        </div>
      </div>

      {/* Main Content: Left Feed Timeline, Right Info Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Timeline Feed */}
        <div className="lg:col-span-2 space-y-5">
          {/* Create Post Card */}
          <Card className="border-border/80 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span>Buat Kabar / Pengumuman Baru</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Kirimkan informasi, agenda kegiatan, atau diskusi untuk seluruh anggota grup {community.name}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePost} className="space-y-3">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Tuliskan kabar, pengumuman jadwal, atau info warga di sini..."
                  rows={3}
                  className="w-full rounded-xl border border-border/80 bg-muted/30 p-3 text-xs focus:bg-background focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                />

                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground font-medium mr-1">Kategori:</span>
                    {(["DISKUSI", "PENGUMUMAN", "KEGIATAN"] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewPostCategory(cat)}
                        className={`text-[10px] px-2 py-1 rounded-md font-medium border transition-colors cursor-pointer ${
                          newPostCategory === cat
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <Button
                    type="submit"
                    size="sm"
                    disabled={!newPostContent.trim() || isPendingPost}
                    className="text-xs gap-1.5 h-8 px-4"
                  >
                    {isPendingPost ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Menerbitkan...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Terbitkan Status</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Timeline Feed Section Header */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight text-foreground">
                Lini Masa Status Komunitas
              </h2>
              <Badge variant="secondary" className="text-xs font-semibold px-2">
                {filteredPosts.length}
              </Badge>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("ALL")}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                  activeTab === "ALL" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setActiveTab("PENGUMUMAN")}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                  activeTab === "PENGUMUMAN" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Pengumuman
              </button>
              <button
                onClick={() => setActiveTab("KEGIATAN")}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                  activeTab === "KEGIATAN" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Kegiatan
              </button>
              <button
                onClick={() => setActiveTab("DISKUSI")}
                className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-all ${
                  activeTab === "DISKUSI" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Diskusi
              </button>
            </div>
          </div>

          {/* Post Items */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => {
                const isLiked = !!likedPosts[post.id]

                return (
                  <Card key={post.id} className="border-border/80 shadow-xs overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border">
                            <AvatarImage src={post.author?.avatar_url || ""} />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                              {(post.author?.full_name || "W")[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-foreground">
                                {post.author?.full_name || "Warga Komunitas"}
                              </span>
                              {post.author?.active_role && (
                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-medium">
                                  {post.author.active_role}
                                </Badge>
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(post.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>

                        {post.category && (
                          <Badge
                            variant="outline"
                            className={`text-[10px] px-2 py-0.5 ${
                              post.category === "PENGUMUMAN"
                                ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300"
                                : post.category === "KEGIATAN"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300"
                                : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300"
                            }`}
                          >
                            {post.category}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="pb-3 text-xs text-foreground/90 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </CardContent>

                    <CardFooter className="pt-2 pb-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleLike(post.id)}
                          className={`h-7 px-2.5 text-xs gap-1.5 rounded-md ${
                            isLiked ? "text-primary font-semibold bg-primary/10" : "hover:text-foreground"
                          }`}
                        >
                          <ThumbsUp className={`h-3.5 w-3.5 ${isLiked ? "fill-primary" : ""}`} />
                          <span>{post.likes_count || 0} Suka</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2.5 text-xs gap-1.5 rounded-md hover:text-foreground"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>{post.comments_count || 0} Komentar</span>
                        </Button>
                      </div>

                      <span className="text-[10px] text-muted-foreground">Terverifikasi di {community.name}</span>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          ) : (
            /* Empty Feed State */
            <Card className="border-dashed border-border/80 bg-muted/20 p-8 text-center">
              <CardContent className="space-y-3 pt-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h3 className="text-sm font-semibold text-foreground">Belum ada status</h3>
                  <p className="text-xs text-muted-foreground">
                    Jadilah yang pertama membagikan pengumuman atau diskusi di komunitas ini!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Sidebar Information */}
        <div className="space-y-5">
          {/* About Group Card */}
          <Card className="border-border/80 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <span>Tentang Komunitas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] text-muted-foreground block mb-0.5">Tipe Grup:</span>
                <Badge variant="outline" className={`text-xs ${theme.badgeColor}`}>
                  {theme.label}
                </Badge>
              </div>

              <div>
                <span className="text-[11px] text-muted-foreground block mb-0.5">Wilayah Operasional:</span>
                <p className="font-medium text-foreground">{community.location || "Kota Tegal"}</p>
              </div>

              {community.kecamatan_name && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Kecamatan</span>
                    <p className="font-medium text-foreground">{community.kecamatan_name}</p>
                  </div>
                  {community.kelurahan_name && (
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Kelurahan</span>
                      <p className="font-medium text-foreground">{community.kelurahan_name}</p>
                    </div>
                  )}
                </div>
              )}

              {(community.rw || community.rt) && (
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/40">
                  {community.rw && (
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Rukun Warga (RW)</span>
                      <p className="font-medium text-foreground">RW {community.rw}</p>
                    </div>
                  )}
                  {community.rt && (
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Rukun Tetangga (RT)</span>
                      <p className="font-medium text-foreground">RT {community.rt}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pengurus & Penanggung Jawab */}
          <Card className="border-border/80 shadow-xs">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Pengurus Aktif</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {(community.leader_name || "P")[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-foreground">
                    {community.leader_name || "Pengurus Resmi"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {community.leader_role || "Penanggung Jawab Komunitas"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pedoman Komunitas */}
          <Card className="border-border/80 shadow-xs bg-muted/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-foreground">
                Pedoman Komunitas Warga
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-[11px] text-muted-foreground">
              <p>• Sampaikan pengumuman dan informasi dengan santun dan beradab.</p>
              <p>• Dilarang menyebarkan berita bohong (hoaks) atau ujaran kebencian.</p>
              <p>• Verifikasi data warga selalu dikoordinasikan bersama pengurus RT/RW terkait.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
