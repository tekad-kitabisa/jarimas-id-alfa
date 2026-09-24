export interface Community {
  id: string
  name: string
  type: string
  community_type?: string
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
  is_joined?: boolean
  is_member?: boolean
  is_my_rt?: boolean
  category?: string
  user_role?: string
  created_at?: string
}

export interface CommunityPost {
  id: string
  community_id: string
  content: string
  created_at: string
  user_id?: string
  author_name?: string
  author_avatar?: string
  category?: "PENGUMUMAN" | "KEGIATAN" | "DISKUSI"
  author?: {
    id?: string
    full_name: string
    active_role: string
    avatar_url?: string
  }
  likes_count?: number
  comments_count?: number
  media_url?: string
  tag?: string
}
