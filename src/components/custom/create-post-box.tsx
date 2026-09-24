"use client"

import * as React from "react"
import { Send, Sparkles, MessageSquarePlus, Image as ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createPost } from "@/app/actions/posts"

interface CreatePostBoxProps {
  userProfile?: {
    full_name?: string
    active_role?: string
    kelurahan_name?: string
  } | null
}

export function CreatePostBox({ userProfile }: CreatePostBoxProps) {
  const [content, setContent] = React.useState("")
  const [category, setCategory] = React.useState("PENGUMUMAN")
  const [isPending, startTransition] = React.useTransition()
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setMessage(null)
    const formData = new FormData()
    formData.append("content", content)
    formData.append("category", category)

    startTransition(async () => {
      const res = await createPost(formData)
      if (res.error) {
        setMessage({ type: "error", text: res.error })
      } else {
        setContent("")
        setMessage({ type: "success", text: "Kabar warga berhasil dipublikasikan!" })
        setTimeout(() => setMessage(null), 3000)
      }
    })
  }

  return (
    <Card className="shadow-xs border-primary/20 bg-card/60 backdrop-blur">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border">
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
              {userProfile?.full_name
                ? userProfile.full_name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()
                : "W"}
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="font-semibold text-xs text-foreground block">
              {userProfile?.full_name || "Warga Komunitas"}
            </span>
            <span className="text-[11px] text-muted-foreground">
              Bagikan pengumuman atau kabar di wilayah Anda
            </span>
          </div>
        </div>

        {message && (
          <div
            className={`p-2.5 rounded-lg text-xs font-medium ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800"
                : "bg-destructive/10 text-destructive border border-destructive/20"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            placeholder="Tulis kabar, pengumuman RT/RW, agenda posyandu, atau informasi warga..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[72px] text-xs resize-none bg-background/50 focus-visible:ring-1"
          />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <Select value={category} onValueChange={(val) => val && setCategory(val)}>
                <SelectTrigger className="h-8 text-xs w-44">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENGUMUMAN" className="text-xs">
                    Pengumuman Resmi
                  </SelectItem>
                  <SelectItem value="KEGIATAN" className="text-xs">
                    Agenda & Kegiatan
                  </SelectItem>
                  <SelectItem value="DISKUSI" className="text-xs">
                    Diskusi Warga
                  </SelectItem>
                  <SelectItem value="KESEHATAN" className="text-xs">
                    Info Posyandu / Kesehatan
                  </SelectItem>
                  <SelectItem value="PAUD" className="text-xs">
                    Info PAUD / Pendidikan
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              size="sm"
              disabled={isPending || !content.trim()}
              className="h-8 text-xs font-semibold gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              {isPending ? "Mengirim..." : "Publikasikan Kabar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
