"use server"

import { createClient } from "@/lib/supabase/server"
import { DashboardStatsResult, UserProfile } from "@/lib/types/dashboard"

export async function getDashboardStats(): Promise<DashboardStatsResult> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        error: "Belum login",
        profile: null,
        stats: {
          verifiedPosts: 0,
          pendingPosts: 0,
          activeMarket: 0,
          totalCommunities: 0,
        },
      }
    }

    // 1. Ambil profil pengguna beserta perannya
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (!profile) {
      return {
        error: "Profil tidak ditemukan",
        profile: null,
        stats: {
          verifiedPosts: 0,
          pendingPosts: 0,
          activeMarket: 0,
          totalCommunities: 0,
        },
      }
    }

    const role = profile.active_role || "PENDUDUK"
    const kelurahan = profile.kelurahan_name
    const rw = profile.rw
    const rt = profile.rt

    // 2. Kueri Postingan Terverifikasi (Disesuaikan Peran)
    let verifiedQuery = supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("verification_status", "VERIFIED")

    // 3. Kueri Postingan Pending Verification
    let pendingQuery = supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("verification_status", "PENDING_VERIFICATION")

    // 4. Kueri Lapak Aktif
    let marketQuery = supabase
      .from("marketplace_items")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)

    // Terapkan Filter Berdasarkan Peran & Wilayah
    if (role === "PENDUDUK") {
      // Warga biasa hanya melihat statistik postingan & lapak pribadinya
      verifiedQuery = verifiedQuery.or(`author_id.eq.${user.id},user_id.eq.${user.id}`)
      pendingQuery = pendingQuery.or(`author_id.eq.${user.id},user_id.eq.${user.id}`)
      marketQuery = marketQuery.eq("seller_id", user.id)
    } else if (role === "KETUA_RT" && kelurahan && rt) {
      // Ketua RT melihat pending verifikasi di lingkupnya
      pendingQuery = pendingQuery.eq("verification_status", "PENDING_VERIFICATION")
    } else if (role === "KETUA_RW" && kelurahan && rw) {
      // Ketua RW melihat statistik di lingkup RW-nya
      pendingQuery = pendingQuery.eq("verification_status", "PENDING_VERIFICATION")
    }

    const [{ count: verifiedCount }, { count: pendingCount }, { count: marketCount }] =
      await Promise.all([verifiedQuery, pendingQuery, marketQuery])

    // 5. Hitung Komunitas Terdaftar
    const { count: communitiesCount } = await supabase
      .from("communities")
      .select("*", { count: "exact", head: true })

    const enrichedProfile: UserProfile = {
      ...profile,
      provinsi_name: profile.provinsi_name || (profile.is_kota_tegal ? "Jawa Tengah" : undefined),
      kabupaten_name: profile.kabupaten_name || (profile.is_kota_tegal ? "Kota Tegal" : undefined),
    }

    return {
      profile: enrichedProfile,
      stats: {
        verifiedPosts: verifiedCount || 0,
        pendingPosts: pendingCount || 0,
        activeMarket: marketCount || 0,
        totalCommunities: communitiesCount || 0,
      },
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat rekapitulasi dashboard"
    console.error("[GET_DASHBOARD_STATS_ERROR]", err)
    return {
      error: message,
      profile: null,
      stats: {
        verifiedPosts: 0,
        pendingPosts: 0,
        activeMarket: 0,
        totalCommunities: 0,
      },
    }
  }
}
