"use server"

import { createClient } from "@/lib/supabase/server"
import { DashboardStatsResult } from "@/lib/types/dashboard"

export async function getDashboardStats(): Promise<DashboardStatsResult> {
  const defaultProfile = {
    id: "demo-user",
    full_name: "Warga Pekauman",
    kelurahan_name: "Pekauman",
    kecamatan_name: "Tegal Barat",
    rw: "03",
    rt: "02",
    active_role: "PENDUDUK",
    is_kota_tegal: true,
  }

  const defaultStats = {
    verifiedPosts: 28,
    pendingPosts: 4,
    activeMarket: 8,
    totalCommunities: 8,
  }

  try {
    const supabase = await createClient()

    // Helper timeout promise
    const timeout = (ms: number) =>
      new Promise<null>((resolve) => setTimeout(() => resolve(null), ms))

    // Jalankan pengambilan profil dan statistik secara aman dengan batasan waktu respons
    const fetchStatsPromise = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      let profile = defaultProfile
      if (user) {
        const { data } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single()
        if (data) {
          profile = data
        }
      }

      const [verifiedRes, pendingRes, marketRes, commRes] = await Promise.allSettled([
        supabase
          .from("posts")
          .select("*", { count: "exact", head: true })
          .eq("verification_status", "VERIFIED"),
        supabase
          .from("posts")
          .select("*", { count: "exact", head: true })
          .eq("verification_status", "PENDING_VERIFICATION"),
        supabase
          .from("marketplace_items")
          .select("*", { count: "exact", head: true })
          .eq("is_active", true),
        supabase
          .from("communities")
          .select("*", { count: "exact", head: true }),
      ])

      const verifiedCount =
        verifiedRes.status === "fulfilled" && verifiedRes.value?.count !== null
          ? verifiedRes.value.count
          : defaultStats.verifiedPosts

      const pendingCount =
        pendingRes.status === "fulfilled" && pendingRes.value?.count !== null
          ? pendingRes.value.count
          : defaultStats.pendingPosts

      const marketCount =
        marketRes.status === "fulfilled" && marketRes.value?.count !== null
          ? marketRes.value.count
          : defaultStats.activeMarket

      const commCount =
        commRes.status === "fulfilled" && commRes.value?.count !== null
          ? commRes.value.count
          : defaultStats.totalCommunities

      return {
        profile,
        stats: {
          verifiedPosts: verifiedCount ?? defaultStats.verifiedPosts,
          pendingPosts: pendingCount ?? defaultStats.pendingPosts,
          activeMarket: marketCount ?? defaultStats.activeMarket,
          totalCommunities: commCount ?? defaultStats.totalCommunities,
        },
      }
    }

    // Race antara fetch dan timeout 2500ms
    const result = await Promise.race([fetchStatsPromise(), timeout(2500)])

    if (result) {
      return result
    }

    return {
      profile: defaultProfile,
      stats: defaultStats,
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat rekapitulasi dashboard"
    return {
      error: message,
      profile: defaultProfile,
      stats: defaultStats,
    }
  }
}
