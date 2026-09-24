import { getAdminUsersList } from "@/app/actions/admin"
import { AdminManagementView } from "@/components/custom/admin-management-view"

export default async function AdminPage() {
  const { users, error } = await getAdminUsersList()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pusat Otoritas & Manajemen Peran</h1>
        <p className="text-xs text-muted-foreground">
          Kelola penugasan peran (RBAC) dan otorisasi pengurus di wilayah Kota Tegal.
        </p>
      </div>

      {error ? (
        <div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-lg text-xs font-semibold">
          {error}
        </div>
      ) : (
        <AdminManagementView initialUsers={users} />
      )}
    </div>
  )
}
