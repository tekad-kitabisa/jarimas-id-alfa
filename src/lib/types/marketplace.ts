export type MarketplaceCategoryType = "UMKM" | "KULINER" | "BEKAS" | "JASA" | "SPM"

export interface MarketplaceSeller {
  id?: string
  full_name?: string
  kelurahan_name?: string
  phone_number?: string
  rw?: string
  rt?: string
  avatar_url?: string
}

export interface MarketplaceItem {
  id: string
  seller_id?: string
  title: string
  description?: string
  price: number
  category: string
  category_label?: string
  image_url?: string | null
  kelurahan_code?: string
  location?: string
  is_active?: boolean
  condition?: "BARU" | "BEKAS" | "LAYANAN"
  created_at: string
  seller?: MarketplaceSeller | null
  phone_number?: string
}
