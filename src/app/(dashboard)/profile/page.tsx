import { Metadata } from "next"
import { getProfile } from "@/app/actions/profile"
import { ProfileView } from "@/components/custom/profile-view"

export const metadata: Metadata = {
  title: "Profil Warga & Peran Komunitas | JARIMAS-ID",
  description:
    "Kelola identitas profil warga, nomor kontak, domisili wilayah RT/RW, dan daftar peran komunitas aktif Kota Tegal.",
}

export default async function ProfilePage() {
  const { profile, roles } = await getProfile()

  return (
    <div className="py-2">
      <ProfileView initialProfile={profile} initialRoles={roles || []} />
    </div>
  )
}
