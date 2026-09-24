import { Navbar } from "@/components/custom/navbar"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userProfile = null
  if (user) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("id, full_name, active_role, avatar_url, kelurahan_name, rw, rt")
      .eq("id", user.id)
      .single()
    userProfile = profile
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar userProfile={userProfile} />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {children}
      </main>
    </div>
  )
}
