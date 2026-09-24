export interface PostAuthor {
  full_name?: string
  kelurahan_name?: string
  rw?: string
  rt?: string
  active_role?: string
  avatar_url?: string
}

export interface PostItem {
  id: string
  content: string
  created_at: string
  category?: string
  post_type?: string
  verification_status?: "PENDING_VERIFICATION" | "VERIFIED" | "SHARED_TO_ECOSYSTEM" | "REJECTED" | string
  author_id?: string
  user_id?: string
  community_id?: string
  likes_count?: number
  comments_count?: number
  media_url?: string
  image_url?: string
  author?: PostAuthor | null
}

export interface GetPostsResponse {
  posts: PostItem[]
  userProfile?: {
    is_kota_tegal?: boolean
    kelurahan_name?: string
    rw?: string
    rt?: string
    active_role?: string
    full_name?: string
  } | null
  error?: string
}
