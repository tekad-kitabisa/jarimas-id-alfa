"use client"

import * as React from "react"
import {
  ShoppingBag,
  Tag,
  Search,
  PlusCircle,
  Sparkles,
  MapPin,
  Utensils,
  Package,
  Wrench,
  MessageCircle,
  Phone,
  ShieldCheck,
  Calendar,
  X,
  SlidersHorizontal,
  Store,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProductCard } from "@/components/custom/product-card"
import { CreateListingDialog } from "@/components/custom/create-listing-dialog"
import { MarketplaceItem } from "@/lib/types/marketplace"

interface MarketplaceViewProps {
  initialItems: MarketplaceItem[]
}

export function MarketplaceView({ initialItems }: MarketplaceViewProps) {
  const [items, setItems] = React.useState<MarketplaceItem[]>(initialItems)
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [sortBy, setSortBy] = React.useState<"NEWEST" | "PRICE_ASC" | "PRICE_DESC">("NEWEST")
  const [selectedProduct, setSelectedProduct] = React.useState<MarketplaceItem | null>(null)

  const handleItemCreated = (newItem: MarketplaceItem) => {
    setItems((prev) => [newItem, ...prev])
  }

  // Filter and sort items
  const filteredItems = React.useMemo(() => {
    let result = items.filter((item) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "ALL" ||
        item.category === selectedCategory ||
        (selectedCategory === "UMKM" && (item.category === "UMKM" || item.category_label?.includes("UMKM"))) ||
        (selectedCategory === "KULINER" && (item.category === "KULINER" || item.category_label?.includes("Kuliner"))) ||
        (selectedCategory === "BEKAS" && (item.category === "BEKAS" || item.category_label?.includes("Bekas"))) ||
        (selectedCategory === "JASA" && (item.category === "JASA" || item.category_label?.includes("Jasa"))) ||
        (selectedCategory === "SPM" && (item.category === "SPM" || item.category_label?.includes("SPM")))

      // Search filter
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.seller?.full_name && item.seller.full_name.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })

    // Sorting
    if (sortBy === "PRICE_ASC") {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === "PRICE_DESC") {
      result = [...result].sort((a, b) => b.price - a.price)
    } else {
      result = [...result].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    }

    return result
  }, [items, selectedCategory, searchQuery, sortBy])

  // Category counters
  const categoryCounts = React.useMemo(() => {
    return {
      ALL: items.length,
      UMKM: items.filter((i) => i.category === "UMKM").length,
      KULINER: items.filter((i) => i.category === "KULINER").length,
      BEKAS: items.filter((i) => i.category === "BEKAS").length,
      JASA: items.filter((i) => i.category === "JASA").length,
      SPM: items.filter((i) => i.category === "SPM").length,
    }
  }, [items])

  const formatRupiah = (amount: number) => {
    if (amount === 0) return "Gratis / Program Warga"
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getProductWhatsAppLink = (item: MarketplaceItem) => {
    const rawPhone = item.seller?.phone_number || item.phone_number || "081234567890"
    let cleanPhone = rawPhone.replace(/\D/g, "")
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "62" + cleanPhone.slice(1)
    }
    const message = encodeURIComponent(
      `Halo Bpk/Ibu ${item.seller?.full_name || "Penjual"}, saya tertarik dengan produk "${item.title}" (${formatRupiah(item.price)}) di Jarimas Market. Apakah masih ada?`
    )
    return `https://wa.me/${cleanPhone}?text=${message}`
  }

  return (
    <div className="space-y-6">
      {/* Top Banner / Marketplace Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600/10 via-primary/5 to-muted/40 border border-border/80 p-6 md:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs px-2.5 py-0.5 font-semibold">
                <Store className="h-3.5 w-3.5 mr-1" />
                Pasar Digital Warga
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Kota Tegal
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Jarimas Market & Lapak Warga
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Jual-beli aman antar tetangga. Dukung produk UMKM lokal Kota Tegal, cicipi aneka kuliner khas, temukan barang bekas berkualitas, dan gunakan jasa profesional warga di sekitar Anda.
            </p>
          </div>

          <div className="shrink-0">
            <CreateListingDialog onItemCreated={handleItemCreated} />
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-background/80 backdrop-blur rounded-xl p-3 border border-border/60 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <ShoppingBag className="h-4 w-4 text-blue-600" />
              <span>UMKM Lokal</span>
            </div>
            <p className="text-lg font-bold text-foreground mt-1">{categoryCounts.UMKM} Produk</p>
          </div>

          <div className="bg-background/80 backdrop-blur rounded-xl p-3 border border-border/60 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <Utensils className="h-4 w-4 text-amber-600" />
              <span>Kuliner Tegal</span>
            </div>
            <p className="text-lg font-bold text-foreground mt-1">{categoryCounts.KULINER} Menu</p>
          </div>

          <div className="bg-background/80 backdrop-blur rounded-xl p-3 border border-border/60 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <Package className="h-4 w-4 text-emerald-600" />
              <span>Barang Bekas</span>
            </div>
            <p className="text-lg font-bold text-foreground mt-1">{categoryCounts.BEKAS} Iklan</p>
          </div>

          <div className="bg-background/80 backdrop-blur rounded-xl p-3 border border-border/60 shadow-xs">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <Wrench className="h-4 w-4 text-purple-600" />
              <span>Jasa & SPM</span>
            </div>
            <p className="text-lg font-bold text-foreground mt-1">{categoryCounts.JASA + categoryCounts.SPM} Layanan</p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar: Category Tabs & Live Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Tabs
            value={selectedCategory}
            onValueChange={(val) => setSelectedCategory(val || "ALL")}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-muted/80 p-1 rounded-xl h-auto gap-1">
              <TabsTrigger
                value="ALL"
                className="text-xs px-3 py-1.5 rounded-lg data-active:bg-background data-active:text-foreground font-medium gap-1.5"
              >
                <span>Semua</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-muted rounded-full text-muted-foreground font-semibold">
                  {categoryCounts.ALL}
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="UMKM"
                className="text-xs px-3 py-1.5 rounded-lg data-active:bg-background data-active:text-foreground font-medium gap-1.5"
              >
                <ShoppingBag className="h-3.5 w-3.5 text-blue-600" />
                <span>UMKM</span>
              </TabsTrigger>

              <TabsTrigger
                value="KULINER"
                className="text-xs px-3 py-1.5 rounded-lg data-active:bg-background data-active:text-foreground font-medium gap-1.5"
              >
                <Utensils className="h-3.5 w-3.5 text-amber-600" />
                <span>Kuliner</span>
              </TabsTrigger>

              <TabsTrigger
                value="BEKAS"
                className="text-xs px-3 py-1.5 rounded-lg data-active:bg-background data-active:text-foreground font-medium gap-1.5"
              >
                <Package className="h-3.5 w-3.5 text-emerald-600" />
                <span>Barang Bekas</span>
              </TabsTrigger>

              <TabsTrigger
                value="JASA"
                className="text-xs px-3 py-1.5 rounded-lg data-active:bg-background data-active:text-foreground font-medium gap-1.5"
              >
                <Wrench className="h-3.5 w-3.5 text-purple-600" />
                <span>Jasa Warga</span>
              </TabsTrigger>

              <TabsTrigger
                value="SPM"
                className="text-xs px-3 py-1.5 rounded-lg data-active:bg-background data-active:text-foreground font-medium gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-rose-600" />
                <span>Layanan SPM</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Live Search & Sort */}
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari barang, makanan, jasa..."
              className="pl-9 h-9.5 text-xs bg-card border-border/80 rounded-xl"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9.5 rounded-xl border border-border/80 bg-card px-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hidden sm:block"
          >
            <option value="NEWEST">Terbaru</option>
            <option value="PRICE_ASC">Harga Terendah</option>
            <option value="PRICE_DESC">Harga Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onSelect={(selected) => setSelectedProduct(selected)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Search className="h-6 w-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-semibold text-foreground">Tidak ada produk ditemukan</h3>
            <p className="text-xs text-muted-foreground">
              Tidak ada barang atau layanan yang sesuai dengan pencarian &quot;{searchQuery}&quot; pada kategori terpilih.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("ALL")
              }}
              className="text-xs"
            >
              Reset Filter & Pencarian
            </Button>
            <CreateListingDialog onItemCreated={handleItemCreated}>
              <Button size="sm" className="text-xs gap-1.5">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Pasang Iklan Sekarang</span>
              </Button>
            </CreateListingDialog>
          </div>
        </div>
      )}

      {/* Product Detail Dialog */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Badge variant="outline" className="text-xs">
                  {selectedProduct.category_label || selectedProduct.category}
                </Badge>
                {selectedProduct.condition && (
                  <Badge variant="secondary" className="text-[10px]">
                    {selectedProduct.condition === "BARU" ? "Baru" : selectedProduct.condition === "BEKAS" ? "Seken" : "Layanan"}
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-lg font-bold text-foreground">
                {selectedProduct.title}
              </DialogTitle>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground/80" />
                <span>{selectedProduct.location || selectedProduct.kelurahan_code || "Kota Tegal"}</span>
              </div>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {/* Image Preview */}
              {selectedProduct.image_url && (
                <div className="relative h-48 w-full rounded-xl overflow-hidden border border-border">
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Price Banner */}
              <div className="p-3.5 bg-muted/40 rounded-xl flex items-center justify-between border border-border/60">
                <span className="text-xs text-muted-foreground font-medium">Harga Penawaran:</span>
                <span className="text-xl font-black text-primary font-mono">
                  {formatRupiah(selectedProduct.price)}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-foreground">Deskripsi Produk & Layanan</h4>
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line bg-muted/20 p-3 rounded-xl border border-border/40">
                  {selectedProduct.description || "Tidak ada deskripsi rinci untuk barang ini. Silakan hubungi penjual untuk info lengkap."}
                </p>
              </div>

              {/* Seller Information */}
              <div className="p-3 rounded-xl border border-border/60 bg-card space-y-2">
                <span className="text-[11px] font-semibold text-muted-foreground block">Informasi Penjual</span>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                      {(selectedProduct.seller?.full_name || "W")[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-foreground">
                      {selectedProduct.seller?.full_name || "Warga Terverifikasi"}
                    </p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-600" />
                      <span>Wilayah {selectedProduct.seller?.kelurahan_name || selectedProduct.kelurahan_code || "Kota Tegal"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProduct(null)}
                className="text-xs"
              >
                Tutup
              </Button>
              <a
                href={getProductWhatsAppLink(selectedProduct)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="sm"
                  className="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Hubungi via WhatsApp</span>
                </Button>
              </a>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
