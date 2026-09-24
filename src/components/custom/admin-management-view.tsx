"use client"

import * as React from "react"
import { Shield, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateUserActiveRole } from "@/app/actions/admin"

const AVAILABLE_ROLES = [
  "PENDUDUK",
  "KETUA_RT",
  "KETUA_RW",
  "KADER_POSYANDU",
  "ADMIN_PAUD",
  "ADMIN_OPD",
  "SUPER_ADMIN",
]

function formatWilayah(user: any) {
  if (!user.is_kota_tegal) {
    return "Warga Luar Kota Tegal"
  }

  const kota = "Kota Tegal"
  const kecamatan = user.kecamatan_name ? `Kec. ${user.kecamatan_name}` : ""
  const kelurahan = user.kelurahan_name ? `Kel. ${user.kelurahan_name}` : ""
  const rw = user.rw ? `RW ${user.rw}` : ""
  const rt = user.rt ? `RT ${user.rt}` : ""

  // Gabungkan bagian alamat yang ada dengan koma
  const parts = [kota, kecamatan, kelurahan, rw, rt].filter(Boolean)
  return parts.join(", ")
}

export function AdminManagementView({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = React.useState(initialUsers)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [loadingId, setLoadingId] = React.useState<string | null>(null)

  const filteredUsers = users.filter((u) => {
    const query = searchQuery.toLowerCase()
    return (
      u.full_name?.toLowerCase().includes(query) ||
      u.kecamatan_name?.toLowerCase().includes(query) ||
      u.kelurahan_name?.toLowerCase().includes(query) ||
      u.active_role?.toLowerCase().includes(query)
    )
  })

  async function handleRoleChange(userId: string, newRole: string) {
    setLoadingId(userId)
    const res = await updateUserActiveRole(userId, newRole)
    if (res.success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, active_role: newRole } : u))
      )
    }
    setLoadingId(null)
  }

  return (
    <div className="space-y-4">
      {/* Baris Pencarian & Statistik */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama warga, kelurahan, peran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-xs bg-background"
          />
        </div>
        <Badge variant="outline" className="text-xs px-3 py-1.5 font-semibold">
          Total Terdaftar: {users.length} Warga
        </Badge>
      </div>

      {/* Tabel Pengguna & Otoritas Peran */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Daftar Warga & Pengolahan Otoritas Peran
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Warga</TableHead>
                <TableHead>Wilayah Domisili</TableHead>
                <TableHead>Peran Aktif</TableHead>
                <TableHead className="text-right">Aksi Ubah Peran</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-6 text-xs text-muted-foreground"
                  >
                    Tidak ada data warga yang sesuai.
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-xs">
                      {user.full_name || "Tanpa Nama"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-medium">
                      {formatWilayah(user)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.active_role === "SUPER_ADMIN" ? "default" : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {user.active_role || "PENDUDUK"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Select
                        disabled={loadingId === user.id}
                        value={user.active_role || "PENDUDUK"}
                        onValueChange={(val) => {
                          if (val) handleRoleChange(user.id, val)
                        }}
                      >
                        <SelectTrigger className="w-36 h-8 text-xs ml-auto">
                          <SelectValue placeholder="Pilih Peran" />
                        </SelectTrigger>
                        <SelectContent>
                          {AVAILABLE_ROLES.map((r) => (
                            <SelectItem key={r} value={r} className="text-xs">
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
