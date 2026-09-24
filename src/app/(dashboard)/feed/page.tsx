import { getPosts } from "@/app/actions/posts"
import { PostCard } from "@/components/custom/post-card"
import { CreatePostBox } from "@/components/custom/create-post-box"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, MessageSquarePlus, Newspaper, Sparkles } from "lucide-react"

export default async function FeedPage() {
  const { posts, userProfile } = await getPosts()

  let locationLabel = "Kota Tegal"

  if (userProfile) {
    if (userProfile.is_kota_tegal) {
      const kelurahan = userProfile.kelurahan_name || "Tegal"
      const rw = userProfile.rw ? `, RW ${userProfile.rw}` : ""
      const rt = userProfile.rt ? `, RT ${userProfile.rt}` : ""
      locationLabel = `Kelurahan ${kelurahan}${rw}${rt}`
    } else {
      locationLabel = "Warga Luar Kota"
    }
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Header Banner & Filter Wilayah */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kabar Warga & Komunitas</h1>
          <p className="text-xs text-muted-foreground">
            Lini masa pengumuman terverifikasi dan aktivitas di wilayah Anda.
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-xs w-fit gap-1.5 px-3 py-1 bg-primary/5 text-primary border-primary/20 font-semibold"
        >
          <MapPin className="h-3.5 w-3.5 text-primary" /> Wilayah: {locationLabel}
        </Badge>
      </div>

      {/* Kotak Buat Kabar Baru */}
      <CreatePostBox userProfile={userProfile} />

      {/* Daftar Postingan / Empty State */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card className="border-dashed border-2 p-8 text-center bg-card/40">
            <CardContent className="p-0 flex flex-col items-center justify-center space-y-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Newspaper className="h-6 w-6" />
              </div>
              <div className="space-y-1 max-w-md">
                <h3 className="font-semibold text-sm text-foreground">
                  Belum Ada Kabar Warga di Wilayah Anda
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Jadilah yang pertama membagikan pengumuman resmi RT/RW, agenda posyandu,
                  kegiatan PAUD, atau kabar terkini di sekitar Anda.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}
