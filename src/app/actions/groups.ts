"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Community, CommunityPost } from "@/lib/types/groups"
import { DEFAULT_COMMUNITIES } from "@/lib/constants/groups-data"

export async function getGroupsPageData() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        userProfile: null,
        joinedGroups: [],
        stats: { posyandu: 0, paud: 0, rtrw: 0 },
        allCommunities: DEFAULT_COMMUNITIES,
      }
    }

    // 1. Ambil Profil Pengguna
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    // 2. Otomatis Pastikan Grup RT/RW Domisili Terhubung
    if (profile?.is_kota_tegal && profile.kelurahan_name && profile.rw && profile.rt) {
      const rtName = `Grup RT ${profile.rt} / RW ${profile.rw} Kel. ${profile.kelurahan_name}`

      let { data: rtComm } = await supabase
        .from("communities")
        .select("id")
        .eq("name", rtName)
        .maybeSingle()

      if (!rtComm) {
        const { data: newRt } = await supabase
          .from("communities")
          .insert({
            name: rtName,
            description: `Forum resmi warga RT ${profile.rt} / RW ${profile.rw} Kelurahan ${profile.kelurahan_name}`,
            type: "RT",
            community_type: "RT",
            kecamatan_name: profile.kecamatan_name,
            kelurahan_name: profile.kelurahan_name,
            rw: profile.rw,
            rt: profile.rt,
          })
          .select("id")
          .single()
        rtComm = newRt
      }

      if (rtComm) {
        await supabase.from("user_roles").upsert(
          {
            user_id: user.id,
            community_id: rtComm.id,
            role_name: "PENDUDUK",
            is_verified: true,
          },
          { onConflict: "user_id, community_id" }
        )
      }
    }

    // 3. Ambil Komunitas yang SUDAH Diikuti Pengguna
    const { data: myRoles } = await supabase
      .from("user_roles")
      .select("community_id, role_name, communities(*)")
      .eq("user_id", user.id)

    const joinedGroups =
      myRoles
        ?.map((r: any) => ({
          ...(r.communities || {}),
          my_role: r.role_name,
        }))
        .filter((g: any) => g && g.id) || []

    // 4. Hitung Statistik Anggota per Kategori
    const { data: allRoles } = await supabase
      .from("user_roles")
      .select("role_name, communities(type, community_type)")

    let posyanduCount = 0
    let paudCount = 0
    let rtrwCount = 0

    allRoles?.forEach((r: any) => {
      const type = (r.communities?.type || r.communities?.community_type || "").toUpperCase()
      if (type === "POSYANDU") posyanduCount++
      else if (type === "PAUD" || type === "RA" || type === "SKB" || type === "PKBM" || type === "PNF") paudCount++
      else if (type === "RT" || type === "RW" || type === "RT_RW") rtrwCount++
    })

    // 5. Ambil Seluruh Komunitas Lembaga (Posyandu & PAUD) untuk Isi Dropdown
    const { data: dbCommunities } = await supabase
      .from("communities")
      .select("*")
      .order("name", { ascending: true })

    // Gabungkan data dari DB dengan DEFAULT_COMMUNITIES secara komprehensif
    const commMap = new Map<string, Community>()

    // Masukkan seluruh DEFAULT_COMMUNITIES terlebih dahulu
    DEFAULT_COMMUNITIES.forEach((c) => {
      const key = c.name.toLowerCase().trim()
      commMap.set(key, c)
    })

    // Timpa atau lengkapi dengan data dari DB (ID asli DB, stats, dan relasi)
    ;(dbCommunities || []).forEach((c: any) => {
      const key = c.name?.toLowerCase().trim() || c.id
      const existing = commMap.get(key)
      commMap.set(key, {
        ...(existing || {}),
        ...c,
        kecamatan_name: c.kecamatan_name || existing?.kecamatan_name,
        kelurahan_name: c.kelurahan_name || existing?.kelurahan_name,
        type: c.type || existing?.type || "KOMUNITAS",
        community_type: c.community_type || existing?.community_type || c.type || "KOMUNITAS",
      })
    })

    const allCommunities = Array.from(commMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    return {
      userProfile: profile,
      joinedGroups,
      stats: {
        posyandu: posyanduCount,
        paud: paudCount,
        rtrw: rtrwCount,
      },
      allCommunities,
    }
  } catch (err: unknown) {
    console.error("[GET_GROUPS_PAGE_DATA_ERROR]", err)
    return {
      userProfile: null,
      joinedGroups: [],
      stats: { posyandu: 0, paud: 0, rtrw: 0 },
      allCommunities: DEFAULT_COMMUNITIES,
    }
  }
}

export async function joinGroupWithRole(communityId: string, roleName: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: "Silakan login terlebih dahulu" }

  let targetCommId = communityId

  // Cek apakah komunitas sudah ada di database
  const { data: existingComm } = await supabase
    .from("communities")
    .select("id, name")
    .eq("id", communityId)
    .maybeSingle()

  if (!existingComm) {
    // Cari data komunitas dari DEFAULT_COMMUNITIES berdasarkan ID atau Nama
    const defaultData = DEFAULT_COMMUNITIES.find((c) => c.id === communityId)
    if (defaultData) {
      const { data: commByName } = await supabase
        .from("communities")
        .select("id")
        .eq("name", defaultData.name)
        .maybeSingle()

      if (commByName) {
        targetCommId = commByName.id
      } else {
        const { data: insertedComm } = await supabase
          .from("communities")
          .insert({
            name: defaultData.name,
            description: defaultData.description,
            type: defaultData.type,
            community_type: defaultData.community_type || defaultData.type,
            kecamatan_name: defaultData.kecamatan_name,
            kelurahan_name: defaultData.kelurahan_name,
            rw: defaultData.rw,
            rt: defaultData.rt,
          })
          .select("id")
          .single()

        if (insertedComm) {
          targetCommId = insertedComm.id
        }
      }
    }
  }

  const { error } = await supabase.from("user_roles").upsert(
    {
      user_id: user.id,
      community_id: targetCommId,
      role_name: roleName, // 'PENGUNJUNG' untuk Posyandu, 'WARGA_PAUD' untuk PAUD
      is_verified: true,
    },
    { onConflict: "user_id, community_id" }
  )

  if (error) {
    console.error("[JOIN_GROUP_WITH_ROLE_ERROR]", error)
    return { error: error.message }
  }

  revalidatePath("/groups")
  redirect(`/groups/${targetCommId}`)
}

// Aliases untuk backward compatibility jika ada rute lama
export const getCommunitiesWithAutoRT = getGroupsPageData
export const joinAndNavigateGroup = joinGroupWithRole

export async function getAllCommunities(): Promise<Community[]> {
  try {
    const supabase = await createClient()

    const { data: communities, error } = await supabase
      .from("communities")
      .select("id, name, type, community_type, kecamatan_name, kelurahan_name, description")
      .order("name", { ascending: true })

    if (error) {
      console.error("[ERROR_GET_ALL_COMMUNITIES]", error)
      return DEFAULT_COMMUNITIES
    }

    const commMap = new Map<string, Community>()
    DEFAULT_COMMUNITIES.forEach((c) => {
      commMap.set(c.name.toLowerCase().trim(), c)
    })
    ;(communities || []).forEach((c: any) => {
      const key = c.name?.toLowerCase().trim() || c.id
      const existing = commMap.get(key)
      commMap.set(key, {
        ...(existing || {}),
        ...c,
        kecamatan_name: c.kecamatan_name || existing?.kecamatan_name,
        kelurahan_name: c.kelurahan_name || existing?.kelurahan_name,
        type: c.type || existing?.type || "KOMUNITAS",
        community_type: c.community_type || existing?.community_type || c.type || "KOMUNITAS",
      })
    })

    return Array.from(commMap.values()).sort((a, b) => a.name.localeCompare(b.name))
  } catch (err) {
    console.error("[GET_ALL_COMMUNITIES_EXCEPTION]", err)
    return DEFAULT_COMMUNITIES
  }
}

export async function getCommunities(): Promise<{ data: Community[]; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // A. Ambil seluruh data komunitas
    const { data: communities, error: commError } = await supabase
      .from("communities")
      .select("*")
      .order("created_at", { ascending: false })

    if (commError || !communities) {
      console.error("[GET_COMMUNITIES_ERROR]", commError)
      return { data: DEFAULT_COMMUNITIES }
    }

    // B. Ambil daftar community_id yang SUDAH diikuti pengguna ini dari user_roles
    let joinedCommunityIds: string[] = []
    if (user) {
      const { data: myRoles } = await supabase
        .from("user_roles")
        .select("community_id")
        .eq("user_id", user.id)

      if (myRoles) {
        joinedCommunityIds = myRoles
          .map((r) => r.community_id)
          .filter(Boolean) as string[]
      }
    }

    // C. Ambil total jumlah anggota per komunitas
    const { data: allRoles } = await supabase
      .from("user_roles")
      .select("community_id")

    const memberCountMap: Record<string, number> = {}
    allRoles?.forEach((r) => {
      if (r.community_id) {
        memberCountMap[r.community_id] = (memberCountMap[r.community_id] || 0) + 1
      }
    })

    // D. Gabungkan data secara eksplisit
    const formattedCommunities: Community[] = communities.map((comm) => ({
      ...comm,
      member_count: memberCountMap[comm.id] || 0,
      is_member: joinedCommunityIds.includes(comm.id),
      is_joined: joinedCommunityIds.includes(comm.id),
      category: comm.category_label || comm.type,
    }))

    return { data: formattedCommunities }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat komunitas"
    console.error("[GET_COMMUNITIES_EXCEPTION]", err)
    return { error: message, data: DEFAULT_COMMUNITIES }
  }
}

export async function getCommunityDetail(communityId: string): Promise<{
  community: Community | null
  posts: CommunityPost[]
  memberCount: number
  isMember: boolean
  currentUserRole: string | null
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
      // Fallback to default communities
      const fallback = DEFAULT_COMMUNITIES.find((c) => c.id === communityId)
      if (fallback) {
        return {
          community: fallback,
          posts: [],
          memberCount: fallback.member_count || 0,
          isMember: false,
          currentUserRole: null,
        }
      }
      return {
        community: null,
        posts: [],
        memberCount: 0,
        isMember: false,
        currentUserRole: null,
        error: commError?.message,
      }
    }

    // 2. Hitung total anggota riil
    const { count: memberCount } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("community_id", communityId)

    // 3. Cek status keanggotaan pengguna yang sedang login
    const {
      data: { user },
    } = await supabase.auth.getUser()

    let isMember = false
    let currentUserRole: string | null = null

    if (user) {
      const { data: userRole } = await supabase
        .from("user_roles")
        .select("role_name")
        .eq("user_id", user.id)
        .eq("community_id", communityId)
        .maybeSingle()

      if (userRole) {
        isMember = true
        currentUserRole = userRole.role_name
      }
    }

    // 4. Ambil postingan khusus komunitas ini beserta profil pembuatnya
    const { data: posts } = await supabase
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

    return {
      community: {
        ...community,
        member_count: memberCount || 0,
        is_joined: isMember,
        user_role: currentUserRole || undefined,
      },
      posts: posts || [],
      memberCount: memberCount || 0,
      isMember,
      currentUserRole,
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat detail komunitas"
    console.error("[GET_COMMUNITY_DETAIL_EXCEPTION]", err)
    return {
      community: null,
      posts: [],
      memberCount: 0,
      isMember: false,
      currentUserRole: null,
      error: message,
    }
  }
}

export async function joinCommunity(
  communityId: string,
  roleName?: string
): Promise<{ success?: string; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: "Silakan login terlebih dahulu" }
    }

    const { data: existing } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user_id", user.id)
      .eq("community_id", communityId)
      .maybeSingle()

    if (existing) {
      return { error: "Anda sudah terdaftar dalam komunitas ini" }
    }

    let finalRole = roleName
    if (!finalRole) {
      const { data: community } = await supabase
        .from("communities")
        .select("type")
        .eq("id", communityId)
        .single()

      if (community?.type === "POSYANDU") {
        finalRole = "PENGUNJUNG"
      } else if (community?.type === "PAUD" || community?.type === "RA") {
        finalRole = "WARGA_PAUD"
      } else if (community?.type === "RT" || community?.type === "RW" || community?.type === "RT_RW") {
        finalRole = "PENDUDUK"
      } else {
        finalRole = "ANGGOTA"
      }
    }

    const { error } = await supabase.from("user_roles").insert({
      user_id: user.id,
      community_id: communityId,
      role_name: finalRole,
      is_verified: true,
    })

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/groups")
    revalidatePath(`/groups/${communityId}`)
    revalidatePath("/profile")
    revalidatePath("/dashboard")
    return { success: "Berhasil bergabung dengan komunitas!" }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal bergabung ke komunitas"
    console.error("[JOIN_COMMUNITY_ERROR]", err)
    return { error: message }
  }
}

export async function leaveCommunity(
  communityId: string
): Promise<{ success?: string; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { error: "Silakan login terlebih dahulu" }
    }

    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", user.id)
      .eq("community_id", communityId)

    if (error) {
      return { error: error.message }
    }

    revalidatePath("/groups")
    revalidatePath(`/groups/${communityId}`)
    revalidatePath("/profile")
    revalidatePath("/dashboard")
    return { success: "Berhasil keluar dari komunitas" }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal keluar dari komunitas"
    console.error("[LEAVE_COMMUNITY_ERROR]", err)
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

    const { data: memberRole } = await supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", user.id)
      .eq("community_id", communityId)
      .maybeSingle()

    if (!memberRole) {
      return {
        error: "Anda harus menjadi anggota komunitas untuk dapat mempublikasikan kabar/pengumuman.",
      }
    }

    const { error } = await supabase.from("posts").insert({
      community_id: communityId,
      author_id: user.id,
      content: content.trim(),
      category: category,
      verification_status: "VERIFIED",
    })

    if (error) {
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
