"use client"

import * as React from "react"
import Link from "next/link"
import { login } from "@/app/actions/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LogIn, Lock, Mail, Loader2, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    try {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    } catch {
      // If redirect throws Next.js NEXT_REDIRECT, it will handle it automatically
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Branding */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-primary text-primary-foreground h-12 w-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-primary/20">
            JM
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            JARIMAS<span className="text-primary">.ID</span>
          </h1>
          <p className="text-xs text-muted-foreground">
            Jaringan Informasi Masyarakat Indonesia
          </p>
        </div>

        <Card className="border-border/60 shadow-lg shadow-black/5">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-bold">Masuk ke Akun Warga</CardTitle>
            <CardDescription className="text-xs">
              Masukkan email dan kata sandi yang telah terdaftar
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Alamat Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@email.com"
                    required
                    className="pl-9 h-10 text-xs"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold">
                    Kata Sandi
                  </Label>
                  <Link
                    href="#"
                    className="text-[11px] text-primary hover:underline font-medium"
                  >
                    Lupa sandi?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="pl-9 h-10 text-xs"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-2">
              <Button
                type="submit"
                className="w-full h-10 font-semibold gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memproses Masuk...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Masuk Sekarang
                  </>
                )}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                Belum memiliki akun warga?{" "}
                <Link
                  href="/register"
                  className="text-primary font-semibold hover:underline"
                >
                  Daftar di sini
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
