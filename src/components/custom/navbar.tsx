"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, Users, Shield, LogOut, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SwitchRoleDropdown } from "@/components/custom/switch-role-dropdown"
import { logout } from "@/app/actions/auth"
import { useTheme } from "next-themes"

interface NavbarProps {
  userProfile?: {
    full_name?: string
    active_role?: string
    avatar_url?: string
  } | null
}

export function Navbar({ userProfile }: NavbarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const activeRole = userProfile?.active_role || "PENDUDUK"
  const isSuperAdmin = activeRole === "SUPER_ADMIN"

  const initials = userProfile?.full_name
    ? userProfile.full_name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "W"

  return (
    <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground h-9 w-9 rounded-xl flex items-center justify-center font-black text-base">
              JM
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:inline-block">
              JARIMAS-ID
            </span>
          </Link>

          {/* Navigasi Utama */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link href="/dashboard">
              <Button
                variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                size="sm"
                className="text-xs font-semibold gap-1.5 h-8"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                variant={pathname.startsWith("/marketplace") ? "secondary" : "ghost"}
                size="sm"
                className="text-xs font-semibold gap-1.5 h-8"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Marketplace</span>
              </Button>
            </Link>
            <Link href="/groups">
              <Button
                variant={pathname.startsWith("/groups") ? "secondary" : "ghost"}
                size="sm"
                className="text-xs font-semibold gap-1.5 h-8"
              >
                <Users className="h-3.5 w-3.5" />
                <span>Komunitas</span>
              </Button>
            </Link>
            {/* Tautan Admin KHUSUS Super Admin */}
            {isSuperAdmin && (
              <Link href="/admin">
                <Button
                  variant={pathname.startsWith("/admin") ? "secondary" : "ghost"}
                  size="sm"
                  className="text-xs font-semibold gap-1.5 h-8 text-primary"
                >
                  <Shield className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Pusat Otoritas</span>
                </Button>
              </Link>
            )}
          </nav>
        </div>

        {/* Area Profil & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Ganti Tema"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle Theme</span>
          </Button>

          {/* Role Switcher HANYA muncul jika Super Admin */}
          {isSuperAdmin && <SwitchRoleDropdown activeRole={activeRole} />}

          {/* Identitas Warga & Profil */}
          <Link href="/profile">
            <Button variant="outline" size="sm" className="text-xs font-medium gap-2 h-8 px-2.5">
              <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                {initials}
              </div>
              <span className="hidden sm:inline max-w-[100px] truncate">
                {userProfile?.full_name || "Warga"}
              </span>
            </Button>
          </Link>

          {/* Tombol Logout */}
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              title="Keluar"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Keluar</span>
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
