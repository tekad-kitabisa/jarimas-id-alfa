"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/feed")
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string
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
        initial_role: "PENDUDUK",
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  if (data.user) {
    // Pembaruan detail profil warga tanpa NIK
    await supabase
      .from("user_profiles")
      .update({
        is_kota_tegal: isKotaTegal,
        kecamatan_name: isKotaTegal ? kecamatanName : null,
        kelurahan_name: isKotaTegal ? kelurahanName : null,
        rw: isKotaTegal ? rw : null,
        rt: isKotaTegal ? rt : null,
      })
      .eq("id", data.user.id)
  }

  revalidatePath("/", "layout")
  redirect("/feed")
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/login")
}
