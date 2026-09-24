export interface Community {
  id: string
  name: string
  type: "RT_RW" | "POSYANDU" | "PAUD" | "OPD"
  category_label?: string
  description?: string
  location?: string
  kecamatan_name?: string
  kelurahan_name?: string
  rw?: string
  rt?: string
  member_count?: number
  post_count?: number
  banner_url?: string
  avatar_url?: string
  leader_name?: string
  leader_role?: string
  is_verified?: boolean
  created_at?: string
}

export interface CommunityPost {
  id: string
  community_id: string
  content: string
  created_at: string
  category?: "PENGUMUMAN" | "KEGIATAN" | "DISKUSI"
  author?: {
    full_name: string
    active_role: string
    avatar_url?: string
  }
  likes_count?: number
  comments_count?: number
  media_url?: string
  tag?: string
}
