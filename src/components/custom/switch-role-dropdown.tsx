"use client"

import * as React from "react"
import { UserCheck, Shield, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { switchActiveRole } from "@/app/actions/auth"

const availableRoles = [
  { id: "0", roleName: "SUPER_ADMIN", label: "Super Admin Kota Tegal", level: "Pusat Otoritas" },
  { id: "1", roleName: "PENDUDUK", label: "Penduduk / Warga RT 02", level: "Publik" },
  { id: "2", roleName: "KETUA_RT", label: "Ketua RT 02 / RW 03", level: "Pengurus RT" },
  { id: "3", roleName: "KETUA_RW", label: "Ketua RW 03 Pekauman", level: "Pengurus RW" },
  { id: "4", roleName: "KADER_POSYANDU", label: "Kader Posyandu Melati", level: "Posyandu" },
  { id: "5", roleName: "ADMIN_PAUD", label: "Operator PAUD Tunas Bangsa", level: "PAUD-PNF" },
  { id: "6", roleName: "ADMIN_OPD", label: "Admin OPD Diskominfo", level: "OPD Kota" },
]

interface SwitchRoleDropdownProps {
  activeRole?: string
}

export function SwitchRoleDropdown({ activeRole = "SUPER_ADMIN" }: SwitchRoleDropdownProps) {
  const currentRole = availableRoles.find((r) => r.roleName === activeRole) || availableRoles[0]
  const [selectedRole, setSelectedRole] = React.useState(currentRole)
  const [, startTransition] = React.useTransition()

  React.useEffect(() => {
    const found = availableRoles.find((r) => r.roleName === activeRole)
    if (found) setSelectedRole(found)
  }, [activeRole])

  const handleSelectRole = (role: typeof availableRoles[0]) => {
    setSelectedRole(role)
    startTransition(async () => {
      await switchActiveRole(role.roleName)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2 border-primary/30 bg-primary/5 hover:bg-primary/10">
            <Shield className="h-4 w-4 text-primary" />
            <span className="hidden md:inline-block text-xs font-semibold">
              Mode: {selectedRole.label}
            </span>
            <Badge variant="secondary" className="text-[10px] px-1 py-0 hidden lg:inline-block">
              {selectedRole.level}
            </Badge>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Pilih Peran Aktif Anda (Multi-Role)
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableRoles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            onClick={() => handleSelectRole(role)}
            className="flex items-center justify-between cursor-pointer text-xs py-2"
          >
            <div className="flex flex-col">
              <span className="font-medium text-foreground">{role.label}</span>
              <span className="text-[10px] text-muted-foreground">{role.level}</span>
            </div>
            {selectedRole.id === role.id && <UserCheck className="h-4 w-4 text-primary ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
