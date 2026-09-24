"use client"

import * as React from "react"
import {
  ShoppingBag,
  MapPin,
  MessageCircle,
  Utensils,
  Wrench,
  Package,
  Sparkles,
  ShieldCheck,
} from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MarketplaceItem } from "@/lib/types/marketplace"

interface ProductCardProps {
  item: MarketplaceItem
  onSelect?: (item: MarketplaceItem) => void
}

function formatWA(phone?: string, title?: string, sellerName?: string) {
  if (!phone) return null
  let cleaned = phone.replace(/\D/g, "")
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1)
  }
  const message = encodeURIComponent(
    `Halo Bpk/Ibu ${sellerName || "Penjual"}, saya melihat produk Anda "${title || "Produk"}" di Lapak Warga JARIMAS-ID. Apakah masih tersedia?`
  )
  return `https://wa.me/${cleaned}?text=${message}`
}

export function ProductCard({ item, onSelect }: ProductCardProps) {
  const formatRupiah = (amount: number) => {
    if (amount === 0) return "Gratis / Program Warga"
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Category Configuration
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "UMKM":
        return {
          label: "UMKM Lokal",
          icon: ShoppingBag,
          badgeColor:
            "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
          iconBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
          borderAccent: "hover:border-blue-500/40",
        }
      case "KULINER":
        return {
          label: "Kuliner Tegal",
          icon: Utensils,
          badgeColor:
            "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
          iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
          borderAccent: "hover:border-amber-500/40",
        }
      case "BEKAS":
        return {
          label: "Barang Bekas",
          icon: Package,
          badgeColor:
            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
          iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          borderAccent: "hover:border-emerald-500/40",
        }
      case "JASA":
        return {
          label: "Jasa Warga",
          icon: Wrench,
          badgeColor:
            "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
          iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
          borderAccent: "hover:border-purple-500/40",
        }
      case "SPM":
      default:
        return {
          label: "Layanan SPM",
          icon: Sparkles,
          badgeColor:
            "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
          iconBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
          borderAccent: "hover:border-rose-500/40",
        }
    }
  }

  const config = getCategoryConfig(item.category)
  const CategoryIcon = config.icon

  // Location string from seller relation
  const sellerLocation = React.useMemo(() => {
    if (item.seller?.kelurahan_name) {
      const kel = `Kel. ${item.seller.kelurahan_name}`
      const rw = item.seller.rw ? `RW ${item.seller.rw}` : ""
      const rt = item.seller.rt ? `RT ${item.seller.rt}` : ""
      const parts = [kel, rw, rt].filter(Boolean)
      return parts.join(", ")
    }
    return item.location || item.kelurahan_code || "Kota Tegal"
  }, [item])

  const waLink = formatWA(
    item.seller?.phone_number || item.phone_number,
    item.title,
    item.seller?.full_name
  )

  return (
    <Card
      className={`group flex flex-col justify-between overflow-hidden transition-all duration-200 hover:shadow-md ${config.borderAccent}`}
    >
      <div>
        {/* Product Visual Header / Image Container */}
        <div className="relative h-44 w-full bg-muted/40 overflow-hidden flex items-center justify-center border-b border-border/60">
          {item.image_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.image_url}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className={`h-full w-full flex flex-col items-center justify-center p-4 transition-transform duration-300 group-hover:scale-105 ${config.iconBg}`}
            >
              <CategoryIcon className="h-12 w-12 opacity-80 mb-1" />
              <span className="text-[11px] font-medium opacity-60">
                Foto Produk / Layanan
              </span>
            </div>
          )}

          {/* Badges on Top */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
            <Badge
              variant="outline"
              className={`text-[10px] font-medium px-2 py-0.5 backdrop-blur bg-background/90 ${config.badgeColor}`}
            >
              {item.category_label || config.label}
            </Badge>
          </div>

          {item.condition && (
            <div className="absolute top-2.5 right-2.5">
              <Badge
                variant="secondary"
                className="text-[10px] font-medium px-2 py-0.5 backdrop-blur bg-background/90 shadow-xs"
              >
                {item.condition === "BARU"
                  ? "Baru"
                  : item.condition === "BEKAS"
                  ? "Seken"
                  : "Jasa"}
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info Content */}
        <CardHeader className="pb-2 pt-3">
          {/* Price Tag */}
          <div className="flex items-baseline justify-between gap-2">
            <span
              className={`text-base sm:text-lg font-extrabold tracking-tight ${
                item.price === 0
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-primary font-mono"
              }`}
            >
              {formatRupiah(item.price)}
            </span>
          </div>

          <CardTitle className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 mt-1">
            {item.title}
          </CardTitle>

          {/* Location with MapPin */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground/80 shrink-0" />
            <span className="truncate">{sellerLocation}</span>
          </div>
        </CardHeader>

        <CardContent className="py-1 space-y-2.5">
          <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {item.description ||
              "Hubungi penjual untuk informasi spesifikasi produk, ketersediaan stok, atau pemesanan langsung."}
          </CardDescription>

          {/* Seller Pill */}
          <div className="flex items-center gap-2 pt-2 border-t border-border/40">
            <Avatar className="h-6 w-6 border">
              <AvatarImage src={item.seller?.avatar_url || ""} />
              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                {(item.seller?.full_name || "W")[0]}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-foreground truncate">
                {item.seller?.full_name || "Warga Lokal"}
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              <span>Terverifikasi</span>
            </span>
          </div>
        </CardContent>
      </div>

      {/* Product Footer Actions */}
      <CardFooter className="pt-3 pb-4 border-t border-border/40 flex items-center gap-2">
        {waLink ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              variant="default"
              size="sm"
              className="w-full text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Hubungi Penjual</span>
            </Button>
          </a>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled
            className="flex-1 text-xs gap-1.5 text-muted-foreground"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Kontak Belum Ada</span>
          </Button>
        )}

        {onSelect && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(item)}
            className="text-xs px-3 border-border/80 hover:bg-accent"
          >
            <span>Detail</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
