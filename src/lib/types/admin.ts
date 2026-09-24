import { UserProfileData, UserRoleItem } from "./profile"

export interface AdminUserListItem extends UserProfileData {
  roles_list?: UserRoleItem[]
  assigned_communities_count?: number
}

export interface AdminStatsData {
  totalUsers: number
  totalSuperAdmins: number
  totalRtRwOfficials: number
  totalPosyanduKaders: number
  totalPaudOperators: number
  totalResidents: number
  totalCommunities: number
}

export interface AssignRolePayload {
  userId: string
  roleName: string
  communityId?: string | null
  isVerified?: boolean
}
