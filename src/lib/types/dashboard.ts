export interface UserProfile {
  id: string
  full_name?: string
  kelurahan_name?: string
  kecamatan_name?: string
  rw?: string
  rt?: string
  active_role?: string
  is_kota_tegal?: boolean
  avatar_url?: string
  phone_number?: string
}

export interface DashboardStats {
  verifiedPosts: number
  pendingPosts: number
  activeMarket: number
  totalCommunities: number
}

export interface DashboardStatsResult {
  profile: UserProfile | null
  stats: DashboardStats
  error?: string
}
