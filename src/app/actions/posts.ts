"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { GetPostsResponse, PostItem } from "@/lib/types/posts"

export async function getPosts(): Promise<GetPostsResponse> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return { posts: [], userProfile: null }

    // Ambil profil pengguna yang sedang login
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("is_kota_tegal, kelurahan_name, rw, rt, active_role, full_name")
      .eq("id", user.id)
      .single()

    // Kueri postingan dinamis
    let query = supabase
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
      .order("created_at", { ascending: false })

    // Jika bukan Super Admin, filter postingan sesuai wilayah kelurahan atau milik sendiri
    if (profile?.active_role !== "SUPER_ADMIN" && profile?.is_kota_tegal) {
      query = query.or(
        `verification_status.eq.SHARED_TO_ECOSYSTEM,author_id.eq.${user.id},and(verification_status.eq.VERIFIED)`
      )
    }

    const { data: posts, error } = await query
    if (error) {
      console.warn("[GET_POSTS_NESTED_WARN, FALLING BACK]", error.message)
      // Fallback jika PostgREST relationship hint bermasalah atau kolom relasi berbeda
      const { data: rawPosts, error: rawError } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })

      if (rawError || !rawPosts) {
        console.error("[GET_POSTS_ERROR]", rawError)
        return { posts: [], userProfile: profile }
      }

      const authorIds = [
        ...new Set(
          rawPosts.map((p: any) => p.author_id || p.user_id).filter(Boolean)
        ),
      ]

      const { data: authors } = await supabase
        .from("user_profiles")
        .select("id, full_name, kelurahan_name, rw, rt, active_role")
        .in("id", authorIds)

      const mappedPosts: PostItem[] = rawPosts.map((p: any) => ({
        ...p,
        author:
          authors?.find((a: any) => a.id === (p.author_id || p.user_id)) || null,
      }))

      return { posts: mappedPosts, userProfile: profile }
    }

    return { posts: posts || [], userProfile: profile }
  } catch (err: unknown) {
    console.error("[GET_POSTS_EXCEPTION]", err)
    return {
      posts: [],
      error: err instanceof Error ? err.message : "Gagal memuat status",
    }
  }
}

export async function createPost(
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "Silakan login terlebih dahulu untuk membuat status." }
    }

    const content = formData.get("content") as string
    const category = (formData.get("category") as string) || "PENGUMUMAN"
    const communityId = (formData.get("communityId") as string) || null

    if (!content || !content.trim()) {
      return { error: "Konten kabar/status tidak boleh kosong." }
    }

    // Ambil profil pengunggah untuk default status
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("active_role")
      .eq("id", user.id)
      .single()

    const isOfficial = [
      "SUPER_ADMIN",
      "ADMIN_OPD",
      "KETUA_RW",
      "KETUA_RT",
    ].includes(profile?.active_role || "")
    const verificationStatus = isOfficial
      ? "SHARED_TO_ECOSYSTEM"
      : "VERIFIED"

    // Coba insert dengan author_id
    const { error: insertErr } = await supabase.from("posts").insert({
      author_id: user.id,
      content: content.trim(),
      category: category,
      community_id: communityId,
      verification_status: verificationStatus,
    })

    if (insertErr) {
      // Fallback jika tabel posts menggunakan kolom user_id
      const { error: insertErr2 } = await supabase.from("posts").insert({
        user_id: user.id,
        content: content.trim(),
        category: category,
        community_id: communityId,
        verification_status: verificationStatus,
      })

      if (insertErr2) {
        return { error: insertErr2.message }
      }
    }

    revalidatePath("/feed")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (err: unknown) {
    return {
      error: err instanceof Error ? err.message : "Gagal membuat status.",
    }
  }
}
