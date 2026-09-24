"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = (formData.get("email") as string)?.trim().toLowerCase()
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email dan kata sandi wajib diisi." }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.toLowerCase().includes("invalid login credentials")) {
      return {
        error:
          "Email atau kata sandi salah. Jika baru mendaftar, pastikan email telah dikonfirmasi atau periksa kembali penulisan email dan kata sandi Anda.",
      }
    }
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = (formData.get("email") as string)?.trim().toLowerCase()
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string
  const phoneNumber = (formData.get("phoneNumber") as string)?.trim()
  const isKotaTegal = formData.get("isKotaTegal") === "true"
  const kecamatanName = formData.get("kecamatanName") as string
  const kelurahanName = formData.get("kelurahanName") as string
  const rw = formData.get("rw") as string
  const rt = formData.get("rt") as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone_number: phoneNumber,
        is_kota_tegal: isKotaTegal,
        provinsi_name: "Jawa Tengah",
        kabupaten_name: "Kota Tegal",
        kecamatan_name: isKotaTegal ? kecamatanName : null,
        kelurahan_name: isKotaTegal ? kelurahanName : null,
        rw: isKotaTegal ? rw : null,
        rt: isKotaTegal ? rt : null,
        initial_role: "PENDUDUK",
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.user) {
    // Pembaruan detail profil warga di tabel user_profiles
    await supabase
      .from("user_profiles")
      .update({
        full_name: fullName || null,
        phone_number: phoneNumber || null,
        is_kota_tegal: isKotaTegal,
        provinsi_name: isKotaTegal ? "Jawa Tengah" : null,
        kabupaten_name: isKotaTegal ? "Kota Tegal" : null,
        kecamatan_name: isKotaTegal ? kecamatanName : null,
        kelurahan_name: isKotaTegal ? kelurahanName : null,
        rw: isKotaTegal ? rw : null,
        rt: isKotaTegal ? rt : null,
      })
      .eq("id", data.user.id)
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export const register = signup

export async function switchActiveRole(newRole: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { error: "Belum login" }

    const { error } = await supabase
      .from("user_profiles")
      .update({ active_role: newRole, updated_at: new Date().toISOString() })
      .eq("id", user.id)

    if (error) return { error: error.message }

    revalidatePath("/", "layout")
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal berganti peran"
    return { error: message }
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/login")
}
