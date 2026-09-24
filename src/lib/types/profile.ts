export interface UserProfileData {
  id: string
  email?: string
  full_name?: string
  phone_number?: string
  avatar_url?: string
  is_kota_tegal?: boolean
  kecamatan_name?: string
  kelurahan_name?: string
  rw?: string
  rt?: string
  active_role?: string
  created_at?: string
  updated_at?: string
}

export interface UserRoleItem {
  id: string
  user_id: string
  community_id?: string
  role_name: string
  is_verified?: boolean
  created_at?: string
  community?: {
    id?: string
    name: string
    type?: string
  } | null
}

export interface ProfileQueryResult {
  profile: UserProfileData | null
  roles: UserRoleItem[]
  error?: string
}
