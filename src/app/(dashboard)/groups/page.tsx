import { Metadata } from "next"
import { getCommunities } from "@/app/actions/groups"
import { GroupsList } from "@/components/custom/groups-list"

export const metadata: Metadata = {
  title: "Grup & Komunitas Warga | JARIMAS-ID",
  description:
    "Temukan dan bergabung dengan grup komunitas RT/RW, Posyandu balita & lansia, lembaga PAUD-PNF, dan OPD kedinasan Kota Tegal.",
}

export default async function GroupsPage() {
  const { data: communities } = await getCommunities()

  return (
    <div className="py-2">
      <GroupsList initialCommunities={communities || []} />
    </div>
  )
}
