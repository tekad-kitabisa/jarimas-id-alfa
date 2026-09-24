"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function getAdminUsersList() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Silakan login terlebih dahulu.", users: [] }
  }

  // 1. Ambil profil user saat ini
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("active_role")
    .eq("id", user.id)
    .single()

  // 2. Ambil peran dari tabel user_roles sebagai fallback/konfirmasi
  const { data: roles } = await supabase
    .from("user_roles")
    .select("role_name")
    .eq("user_id", user.id)

  const hasSuperAdminRole =
    profile?.active_role === "SUPER_ADMIN" ||
    roles?.some((r) => r.role_name === "SUPER_ADMIN")

  console.log("[DEBUG ADMIN ACTION]", {
    userId: user.id,
    email: user.email,
    profileActiveRole: profile?.active_role,
    assignedRoles: roles,
    hasSuperAdminRole,
    profileError: profileError?.message,
  })

  if (!hasSuperAdminRole) {
    return {
      error: `Akses ditolak. Peran Anda saat ini (${profile?.active_role || "PENDUDUK"}) tidak memiliki otoritas Super Admin.`,
      users: [],
    }
  }

  // 3. Ambil seluruh data pengguna dengan penentuan relasi foreign key yang jelas (!user_id)
  const { data: users, error: usersError } = await supabase
    .from("user_profiles")
    .select(`
      *,
      user_roles!user_id (
        id,
        role_name,
        is_verified,
        community_id
      )
    `)
    .order("created_at", { ascending: false })

  if (usersError) {
    console.warn("[WARN FETCH USERS NESTED, FALLBACK TO SEPARATE QUERIES]", usersError.message)
    // Fallback: Ambil data secara terpisah jika terjadi kendala relasi PostgREST
    const { data: profiles, error: pErr } = await supabase
      .from("user_profiles")
      .select("*")
      .order("created_at", { ascending: false })

    if (pErr || !profiles) {
      console.error("[ERROR FETCH PROFILES]", pErr)
      return { error: `Gagal mengambil data warga: ${pErr?.message || "Unknown error"}`, users: [] }
    }

    const userIds = profiles.map((p) => p.id)
    const { data: allRoles } = await supabase
      .from("user_roles")
      .select("id, role_name, is_verified, community_id, user_id")
      .in("user_id", userIds)

    const mergedUsers = profiles.map((p) => ({
      ...p,
      user_roles: (allRoles || []).filter((r) => r.user_id === p.id),
    }))

    return { users: mergedUsers }
  }

  return { users: users || [] }
}

export async function updateUserActiveRole(userId: string, newRole: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("user_profiles")
    .update({ active_role: newRole, updated_at: new Date().toISOString() })
    .eq("id", userId)

  if (error) return { error: error.message }

  revalidatePath("/admin")
  revalidatePath("/feed")
  return { success: true }
}
