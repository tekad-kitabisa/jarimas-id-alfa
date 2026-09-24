"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, ShoppingBag, LayoutDashboard, Search, Bell, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SwitchRoleDropdown } from "@/components/custom/switch-role-dropdown"

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const navItems = [
    { href: "/feed", label: "Kabar Warga", icon: Home },
    { href: "/groups", label: "Grup Komunitas", icon: Users },
    { href: "/marketplace", label: "Jarimas Market", icon: ShoppingBag },
    { href: "/dashboard", label: "Dashboard Rekap", icon: LayoutDashboard },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
      <div className="flex h-14 items-center justify-between max-w-7xl mx-auto gap-2 lg:gap-4">
        {/* Sisi Kiri: Logo & Search Bar */}
        <div className="flex items-center gap-3">
          <Link href="/feed" className="flex items-center gap-2 font-bold text-lg text-primary tracking-tight">
            <div className="bg-primary text-primary-foreground h-8 w-8 rounded-lg flex items-center justify-center text-sm font-black">
              JM
            </div>
            <span className="hidden sm:inline-block">
              JARIMAS<span className="text-muted-foreground font-normal">.ID</span>
            </span>
          </Link>
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari warga, grup, atau produk..."
              className="pl-8 h-9 text-xs bg-muted/50 border-none rounded-full"
            />
          </div>
        </div>

        {/* Sisi Tengah: Tab Navigasi Utama (Facebook Style) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:inline-block">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Sisi Kanan: Switch Role, Dark Mode Toggle, Profile */}
        <div className="flex items-center gap-2">
          <SwitchRoleDropdown />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle Theme</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Bell className="h-4 w-4" />
          </Button>
          <Link href="/profile">
            <Avatar className="h-8 w-8 cursor-pointer border hover:ring-2 hover:ring-primary/40 transition-all">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                AM
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  )
}
