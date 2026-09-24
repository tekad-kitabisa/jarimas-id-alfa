"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { Community, CommunityPost } from "@/lib/types/groups"
import { DEFAULT_COMMUNITIES, DEFAULT_POSTS } from "@/lib/constants/groups-data"

export async function getCommunities(): Promise<{ data: Community[]; error?: string }> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("communities")
      .select("*")
      .order("created_at", { ascending: false })

    if (error || !data || data.length === 0) {
      // Jika database belum memiliki data / tabel belum ada, gunakan data representatif
      return { data: DEFAULT_COMMUNITIES }
    }

    return { data }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat komunitas"
    return { error: message, data: DEFAULT_COMMUNITIES }
  }
}

export async function getCommunityDetail(communityId: string): Promise<{
  community: Community | null
  posts: CommunityPost[]
  error?: string
}> {
  try {
    const supabase = await createClient()

    const { data: community, error: commError } = await supabase
      .from("communities")
      .select("*")
      .eq("id", communityId)
      .single()

    // Ambil postingan khusus komunitas ini
    const { data: posts } = await supabase
      .from("posts")
      .select("*, author:user_profiles(full_name, active_role)")
      .eq("community_id", communityId)
      .order("created_at", { ascending: false })

    if (commError || !community) {
      // Fallback ke data default jika belum ada di database
      const fallbackComm = DEFAULT_COMMUNITIES.find((c) => c.id === communityId) || null
      const fallbackPosts = DEFAULT_POSTS[communityId] || []
      return { community: fallbackComm, posts: fallbackPosts }
    }

    return {
      community,
      posts: posts && posts.length > 0 ? posts : (DEFAULT_POSTS[communityId] || []),
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat detail komunitas"
    const fallbackComm = DEFAULT_COMMUNITIES.find((c) => c.id === communityId) || null
    const fallbackPosts = DEFAULT_POSTS[communityId] || []
    return { error: message, community: fallbackComm, posts: fallbackPosts }
  }
}

export async function joinCommunity(communityId: string): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Anda harus login terlebih dahulu" }
    }

    const { error } = await supabase.from("user_roles").insert({
      user_id: user.id,
      community_id: communityId,
      role_name: "PENDUDUK",
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/groups")
    revalidatePath(`/groups/${communityId}`)
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal bergabung ke komunitas"
    return { error: message }
  }
}

export async function createCommunityPost(formData: FormData): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Anda harus login untuk membuat status." }
    }

    const communityId = formData.get("communityId") as string
    const content = formData.get("content") as string
    const category = (formData.get("category") as string) || "DISKUSI"

    if (!communityId || !content?.trim()) {
      return { error: "Konten status tidak boleh kosong." }
    }

    const { error } = await supabase.from("posts").insert({
      community_id: communityId,
      user_id: user.id,
      content: content.trim(),
      category: category,
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath(`/groups/${communityId}`)
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat status."
    return { error: message }
  }
}
