"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { MarketplaceItem } from "@/lib/types/marketplace"
import { DEFAULT_MARKETPLACE_ITEMS } from "@/lib/constants/marketplace-data"

export async function getMarketplaceItems(category?: string): Promise<{ data: MarketplaceItem[]; error?: string }> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from("marketplace_items")
      .select("*, seller:user_profiles(full_name, kelurahan_name, phone_number)")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (category && category !== "ALL") {
      query = query.eq("category", category)
    }

    const { data, error } = await query
    if (error || !data || data.length === 0) {
      let fallback = DEFAULT_MARKETPLACE_ITEMS
      if (category && category !== "ALL") {
        fallback = fallback.filter((item) => item.category === category)
      }
      return { data: fallback }
    }

    return { data: data || [] }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat barang"
    let fallback = DEFAULT_MARKETPLACE_ITEMS
    if (category && category !== "ALL") {
      fallback = fallback.filter((item) => item.category === category)
    }
    return { error: message, data: fallback }
  }
}

export async function createMarketplaceItem(formData: FormData): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return { error: "Anda harus login terlebih dahulu" }

    const { data: profile } = await supabase
      .from("user_profiles")
      .select("kelurahan_name")
      .eq("id", user.id)
      .single()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const price = parseFloat((formData.get("price") as string) || "0")
    const category = (formData.get("category") as string) || "UMKM"
    const imageFile = formData.get("image") as File | null

    let imageUrl: string | null = null
    if (imageFile && imageFile.size > 0 && typeof imageFile.name === "string") {
      const fileExt = imageFile.name.split(".").pop()
      const fileName = `market-${user.id}-${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("post-images")
        .upload(fileName, imageFile)

      if (!uploadError && uploadData) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("post-images").getPublicUrl(fileName)
        imageUrl = publicUrl
      }
    }

    const { error } = await supabase.from("marketplace_items").insert({
      seller_id: user.id,
      title,
      description,
      price,
      category,
      image_url: imageUrl,
      kelurahan_code: profile?.kelurahan_name || "Kota Tegal",
    })

    if (error) return { error: error.message }
    revalidatePath("/marketplace")
    return { success: true }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menambahkan barang ke lapak"
    return { error: message }
  }
}
