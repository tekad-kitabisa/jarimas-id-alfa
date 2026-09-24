"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { MarketplaceItem } from "@/lib/types/marketplace"

export async function getMarketplaceItems(
  category?: string,
  myItemsOnly: boolean = false
): Promise<{ data: MarketplaceItem[]; currentUserId?: string; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    let query = supabase
      .from("marketplace_items")
      .select(`
        *,
        seller:user_profiles!seller_id (
          full_name,
          phone_number,
          kelurahan_name,
          rw,
          rt
        )
      `)
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    // Filter jika memilih tab 'Lapak Saya'
    if (myItemsOnly && user) {
      query = query.eq("seller_id", user.id)
    }

    // Filter berdasarkan kategori jika dipilih
    if (category && category !== "ALL") {
      query = query.eq("category", category)
    }

    const { data, error } = await query
    if (error) {
      console.warn("[GET_MARKETPLACE_WARN, FALLING BACK]", error.message)
      let fallbackQuery = supabase
        .from("marketplace_items")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })

      if (myItemsOnly && user) {
        fallbackQuery = fallbackQuery.eq("seller_id", user.id)
      }
      if (category && category !== "ALL") {
        fallbackQuery = fallbackQuery.eq("category", category)
      }

      const { data: rawItems, error: rawError } = await fallbackQuery
      if (rawError || !rawItems) {
        console.error("[GET_MARKETPLACE_ERROR]", rawError)
        return { data: [], currentUserId: user?.id }
      }

      const sellerIds = [
        ...new Set(rawItems.map((i: any) => i.seller_id).filter(Boolean)),
      ]

      const { data: sellers } = await supabase
        .from("user_profiles")
        .select("id, full_name, phone_number, kelurahan_name, rw, rt")
        .in("id", sellerIds)

      const mapped: MarketplaceItem[] = rawItems.map((item: any) => ({
        ...item,
        seller: sellers?.find((s: any) => s.id === item.seller_id) || null,
      }))

      return { data: mapped, currentUserId: user?.id }
    }

    return { data: data || [], currentUserId: user?.id }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memuat barang"
    console.error("[GET_MARKETPLACE_EXCEPTION]", err)
    return { error: message, data: [] }
  }
}

export async function createMarketplaceItem(
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return { error: "Anda harus login terlebih dahulu" }

    const { data: profile } = await supabase
      .from("user_profiles")
      .select("kelurahan_name, rw, rt, phone_number")
      .eq("id", user.id)
      .single()

    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const price = parseFloat((formData.get("price") as string) || "0")
    const category = (formData.get("category") as string) || "UMKM"
    const phoneInput = formData.get("phone") as string | null
    const imageFile = formData.get("image") as File | null

    if (!title || !title.trim()) {
      return { error: "Nama barang / jasa tidak boleh kosong." }
    }

    // Jika pengguna memasukkan nomor telepon baru dan profil belum memiliki phone_number, perbarui profil
    if (phoneInput && phoneInput.trim() && !profile?.phone_number) {
      await supabase
        .from("user_profiles")
        .update({ phone_number: phoneInput.trim() })
        .eq("id", user.id)
    }

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
      title: title.trim(),
      description: description?.trim() || null,
      price,
      category,
      image_url: imageUrl,
      kelurahan_code: profile?.kelurahan_name || "Kota Tegal",
      phone_number: phoneInput?.trim() || profile?.phone_number || null,
      is_active: true,
    })

    if (error) return { error: error.message }
    revalidatePath("/marketplace")
    return { success: true }
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Gagal menambahkan barang ke lapak"
    return { error: message }
  }
}
