"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { Community, CommunityPost } from "@/lib/types/groups"

export async function getCommunities(): Promise<{ data: Community[]; error?: string }> {
  try {
    const supabase = await createClient()

    // Ambil daftar komunitas beserta jumlah anggota terdaftar
    const { data: communities, error } = await supabase
      .from("communities")
      .select(`
        *,
        user_roles (count)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.warn("[GET_COMMUNITIES_NESTED_WARN, FALLING BACK]", error.message)
      // Fallback: Ambil data secara terpisah jika relasi nested count belum terindeks
      const { data: rawComm, error: commErr } = await supabase
        .from("communities")
        .select("*")
        .order("created_at", { ascending: false })

      if (commErr || !rawComm) {
        console.error("[GET_COMMUNITIES_ERROR]", commErr)
        return { data: [] }
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("community_id")

      const formatted: Community[] = rawComm.map((comm: any) => ({
        ...comm,
        member_count:
          roles?.filter((r: any) => r.community_id === comm.id).length || 0,
      }))

      return { data: formatted }
    }

    // Format data agar memperhitungkan jumlah anggota riil
    const formatted: Community[] = (communities || []).map((comm: any) => ({
      ...comm,
      member_count: comm.user_roles?.[0]?.count || 0,
    }))

    return { data: formatted }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat komunitas"
    console.error("[GET_COMMUNITIES_EXCEPTION]", err)
    return { error: message, data: [] }
  }
}

export async function getCommunityDetail(communityId: string): Promise<{
  community: Community | null
  posts: CommunityPost[]
  memberCount: number
  error?: string
}> {
  try {
    const supabase = await createClient()

    // 1. Ambil info komunitas
    const { data: community, error: commError } = await supabase
      .from("communities")
      .select("*")
      .eq("id", communityId)
      .single()

    if (commError || !community) {
      return { community: null, posts: [], memberCount: 0, error: commError?.message }
    }

    // 2. Hitung total anggota riil
    const { count: memberCount } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("community_id", communityId)

    // 3. Ambil postingan khusus komunitas ini beserta profil pembuatnya
    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select(`
        *,
        author:user_profiles!author_id (
          full_name,
          kelurahan_name,
          rw,
          rt,
          active_role
        )
      `)
      .eq("community_id", communityId)
      .order("created_at", { ascending: false })

    if (postsError) {
      console.warn("[GET_COMMUNITY_POSTS_WARN, FALLING BACK]", postsError.message)
      const { data: rawPosts } = await supabase
        .from("posts")
        .select("*")
        .eq("community_id", communityId)
        .order("created_at", { ascending: false })

      const authorIds = [
        ...new Set(
          (rawPosts || []).map((p: any) => p.author_id || p.user_id).filter(Boolean)
        ),
      ]

      const { data: authors } = await supabase
        .from("user_profiles")
        .select("id, full_name, kelurahan_name, rw, rt, active_role")
        .in("id", authorIds)

      const mappedPosts: CommunityPost[] = (rawPosts || []).map((p: any) => ({
        ...p,
        author:
          authors?.find((a: any) => a.id === (p.author_id || p.user_id)) || {
            full_name: "Warga Komunitas",
            active_role: "PENDUDUK",
          },
      }))

      return {
        community: {
          ...community,
          member_count: memberCount || 0,
        },
        posts: mappedPosts,
        memberCount: memberCount || 0,
      }
    }

    return {
      community: {
        ...community,
        member_count: memberCount || 0,
      },
      posts: posts || [],
      memberCount: memberCount || 0,
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat detail komunitas"
    console.error("[GET_COMMUNITY_DETAIL_EXCEPTION]", err)
    return { community: null, posts: [], memberCount: 0, error: message }
  }
}

export async function joinCommunity(
  communityId: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Anda harus login terlebih dahulu" }
    }

    // Periksa apakah sudah bergabung sebelumnya
    const { data: existingRole } = await supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", user.id)
      .eq("community_id", communityId)
      .single()

    if (existingRole) {
      return { success: true }
    }

    const { error } = await supabase.from("user_roles").insert({
      user_id: user.id,
      community_id: communityId,
      role_name: "PENDUDUK",
      is_verified: true,
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

export async function createCommunityPost(
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
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

    // Coba insert dengan author_id
    const { error } = await supabase.from("posts").insert({
      community_id: communityId,
      author_id: user.id,
      content: content.trim(),
      category: category,
      verification_status: "VERIFIED",
    })

    if (error) {
      // Fallback jika menggunakan user_id
      const { error: err2 } = await supabase.from("posts").insert({
        community_id: communityId,
        user_id: user.id,
        content: content.trim(),
        category: category,
        verification_status: "VERIFIED",
      })

      if (err2) {
        return { error: err2.message }
      }
    }

    revalidatePath("/groups")
    revalidatePath(`/groups/${communityId}`)
    revalidatePath("/feed")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal membuat status."
    return { error: message }
  }
}
