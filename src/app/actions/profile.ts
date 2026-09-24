"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { ProfileQueryResult, UserProfileData, UserRoleItem } from "@/lib/types/profile"

export async function getProfile(): Promise<ProfileQueryResult> {
  const defaultProfile: UserProfileData = {
    id: "demo-user",
    full_name: "Ahmad Maulana",
    email: "ahmad.maulana@warga.tegal.id",
    phone_number: "081234567890",
    is_kota_tegal: true,
    kecamatan_name: "Tegal Barat",
    kelurahan_name: "Pekauman",
    rw: "03",
    rt: "02",
    active_role: "PENDUDUK",
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  }

  const defaultRoles: UserRoleItem[] = [
    {
      id: "role-1",
      user_id: "demo-user",
      role_name: "PENDUDUK",
      community_id: "comm-rt-02-pekauman",
      community: {
        name: "RT 02 / RW 03 Kelurahan Pekauman",
        type: "RT_RW",
      },
      is_verified: true,
      created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "role-2",
      user_id: "demo-user",
      role_name: "KADER_POSYANDU",
      community_id: "comm-posyandu-melati",
      community: {
        name: "Posyandu Melati 03 Pekauman",
        type: "POSYANDU",
      },
      is_verified: true,
      created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "role-3",
      user_id: "demo-user",
      role_name: "ADMIN_PAUD",
      community_id: "comm-paud-tunas-bangsa",
      community: {
        name: "PAUD & KB Tunas Bangsa Pekauman",
        type: "PAUD",
      },
      is_verified: true,
      created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { profile: defaultProfile, roles: defaultRoles }
    }

    const { data: profile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    const { data: roles } = await supabase
      .from("user_roles")
      .select("*, community:communities(name, type)")
      .eq("user_id", user.id)

    return {
      profile: profile
        ? { ...profile, email: user.email }
        : { ...defaultProfile, email: user.email, id: user.id },
      roles: roles && roles.length > 0 ? roles : defaultRoles,
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat profil"
    return {
      error: message,
      profile: defaultProfile,
      roles: defaultRoles,
    }
  }
}

export async function updateProfile(formData: FormData): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { error: "Akses ditolak. Anda harus login terlebih dahulu." }

    const fullName = formData.get("fullName") as string
    const phoneNumber = formData.get("phoneNumber") as string

    const { error } = await supabase
      .from("user_profiles")
      .update({
        full_name: fullName,
        phone_number: phoneNumber,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) return { error: error.message }
    revalidatePath("/profile")
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui profil"
    return { error: message }
  }
}
