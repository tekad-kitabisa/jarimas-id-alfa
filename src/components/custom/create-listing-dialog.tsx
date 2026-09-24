"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  PlusCircle,
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Utensils,
  Package,
  Wrench,
  Sparkles,
  X,
} from "lucide-react"
import { createMarketplaceItem } from "@/app/actions/marketplace"
import { MarketplaceItem } from "@/lib/types/marketplace"

interface CreateListingDialogProps {
  onItemCreated?: (newItem: MarketplaceItem) => void
  children?: React.ReactElement
}

const CATEGORIES = [
  { id: "UMKM", label: "UMKM Lokal", icon: ShoppingBag, desc: "Produk kerajinan, fashion & dagangan lokal" },
  { id: "KULINER", label: "Kuliner Tegal", icon: Utensils, desc: "Makanan, minuman & jajanan khas Tegal" },
  { id: "BEKAS", label: "Barang Bekas", icon: Package, desc: "Barang seken layak pakai & terawat" },
  { id: "JASA", label: "Jasa Warga", icon: Wrench, desc: "Servis AC, listrik, laundry, reparasi, dll" },
  { id: "SPM", label: "Layanan SPM", icon: Sparkles, desc: "Program keterampilan & layanan gratis warga" },
]

export function CreateListingDialog({ onItemCreated, children }: CreateListingDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [category, setCategory] = React.useState("UMKM")
  const [price, setPrice] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [imageFile, setImageFile] = React.useState<File | null>(null)

  const [isPending, startTransition] = React.useTransition()
  const [statusMessage, setStatusMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }

  const resetForm = () => {
    setTitle("")
    setCategory("UMKM")
    setPrice("")
    setDescription("")
    setPhone("")
    setImageFile(null)
    setImagePreview(null)
    setStatusMessage(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setStatusMessage({ type: "error", text: "Mohon isi judul barang atau jasa." })
      return
    }

    setStatusMessage(null)

    const formData = new FormData()
    formData.append("title", title.trim())
    formData.append("category", category)
    formData.append("price", price ? String(price) : "0")
    formData.append("description", description.trim())
    if (imageFile) {
      formData.append("image", imageFile)
    }

    startTransition(async () => {
      const res = await createMarketplaceItem(formData)
      if (res.error) {
        setStatusMessage({ type: "error", text: res.error })
      } else {
        setStatusMessage({ type: "success", text: "Lapak berhasil diterbitkan!" })

        if (onItemCreated) {
          const newItem: MarketplaceItem = {
            id: `item-${Date.now()}`,
            title: title.trim(),
            description: description.trim(),
            price: parseFloat(price) || 0,
            category: category,
            category_label: CATEGORIES.find((c) => c.id === category)?.label,
            image_url: imagePreview,
            kelurahan_code: "Pekauman",
            location: "Kel. Pekauman, Kota Tegal",
            condition: category === "BEKAS" ? "BEKAS" : category === "JASA" || category === "SPM" ? "LAYANAN" : "BARU",
            created_at: new Date().toISOString(),
            is_active: true,
            seller: {
              full_name: "Lapak Anda (Pengguna)",
              kelurahan_name: "Pekauman",
              phone_number: phone || "081234567890",
            },
          }
          onItemCreated(newItem)
        }

        setTimeout(() => {
          setOpen(false)
          resetForm()
        }, 1200)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          children ? (
            children
          ) : (
            <Button className="gap-2 text-xs font-semibold shadow-sm">
              <PlusCircle className="h-4 w-4" />
              <span>Buka Lapak Saya</span>
            </Button>
          )
        }
      />

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span>Buka Lapak / Pasang Iklan Warga</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Promosikan produk UMKM, makanan/kuliner, barang bekas layak pakai, atau layanan jasa Anda kepada seluruh warga Kota Tegal.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Judul Produk */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Nama Barang / Jasa <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Batik Tulis Motif Tegal Asli / Kupat Glabed"
              className="text-xs h-9"
              required
            />
          </div>

          {/* Kategori Pilihan */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Pilih Kategori Lapak <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                const isSelected = category === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary"
                        : "border-border/80 bg-card hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Harga Produk */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Harga (Rupiah) <span className="text-muted-foreground font-normal">(Isi 0 jika Gratis / Program SPM)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs font-semibold text-muted-foreground">
                Rp
              </span>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="25000"
                min="0"
                className="text-xs h-9 pl-10"
              />
            </div>
          </div>

          {/* Nomor WhatsApp Kontak */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Nomor WhatsApp / Kontak Penjual
            </label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="081234567890"
              className="text-xs h-9"
            />
          </div>

          {/* Deskripsi Produk */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Deskripsi & Kondisi Barang / Jasa
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan spesifikasi, ukuran, bahan, garansi, lokasi pengambilan, atau cara pemesanan..."
              rows={3}
              className="text-xs resize-none"
            />
          </div>

          {/* Unggah Foto */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Foto Produk / Layanan
            </label>

            {imagePreview ? (
              <div className="relative h-32 w-full rounded-xl overflow-hidden border border-border">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-xs"
                  onClick={removeImage}
                  className="absolute top-2 right-2 rounded-full"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-border/80 rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer p-4 text-center">
                <UploadCloud className="h-6 w-6 text-muted-foreground mb-1" />
                <span className="text-xs font-medium text-foreground">Klik untuk mengunggah gambar</span>
                <span className="text-[10px] text-muted-foreground">Format JPG, PNG, atau WEBP (Maks 5MB)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                statusMessage.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
                  : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="text-xs"
            >
              Batal
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending || !title.trim()}
              className="text-xs gap-1.5"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Menerbitkan...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Terbitkan Lapak</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
