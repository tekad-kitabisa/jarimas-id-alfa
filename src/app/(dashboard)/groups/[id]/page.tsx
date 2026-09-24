import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCommunityDetail } from "@/app/actions/groups"
import { CommunityDetailView } from "@/components/custom/community-detail-view"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const { community } = await getCommunityDetail(id)

  if (!community) {
    return {
      title: "Komunitas Tidak Ditemukan | JARIMAS-ID",
    }
  }

  return {
    title: `${community.name} | JARIMAS-ID`,
    description:
      community.description ||
      `Grup komunitas resmi ${community.name} di platform ekosistem warga JARIMAS-ID Kota Tegal.`,
  }
}

export default async function CommunityDetailPage({ params }: PageProps) {
  const { id } = await params
  const { community, posts, error } = await getCommunityDetail(id)

  if (!community && error) {
    notFound()
  }

  return (
    <div className="py-2">
      <CommunityDetailView community={community} initialPosts={posts || []} />
    </div>
  )
}
