"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { ProfileQueryResult } from "@/lib/types/profile"

export async function getProfile(): Promise<ProfileQueryResult> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        profile: null,
        roles: [],
        error: "Silakan login terlebih dahulu",
      }
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
        : {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || "Warga",
            is_kota_tegal: true,
            active_role: "PENDUDUK",
            created_at: user.created_at,
          },
      roles: roles || [],
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat profil"
    console.error("[GET_PROFILE_ERROR]", err)
    return {
      error: message,
      profile: null,
      roles: [],
    }
  }
}

export async function updateProfile(
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
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
        full_name: fullName?.trim() || null,
        phone_number: phoneNumber?.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) return { error: error.message }
    revalidatePath("/profile")
    revalidatePath("/feed")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui profil"
    return { error: message }
  }
}
