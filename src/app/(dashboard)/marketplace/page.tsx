import { Metadata } from "next"
import { getMarketplaceItems } from "@/app/actions/marketplace"
import { MarketplaceView } from "@/components/custom/marketplace-view"

export const metadata: Metadata = {
  title: "Jarimas Market & Lapak Warga | JARIMAS-ID",
  description:
    "Pasar digital warga Kota Tegal: produk UMKM lokal, kuliner khas Tegal, jual-beli barang bekas layak pakai, dan jasa terpercaya.",
}

export default async function MarketplacePage() {
  const { data: items } = await getMarketplaceItems()

  return (
    <div className="py-2">
      <MarketplaceView initialItems={items || []} />
    </div>
  )
}
