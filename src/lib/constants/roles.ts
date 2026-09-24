export type AppRole =
  | "SUPER_ADMIN"
  | "ADMIN_OPD"
  | "KETUA_RW"
  | "KETUA_RT"
  | "PENGURUS_RT"
  | "KADER_POSYANDU"
  | "ADMIN_PAUD"
  | "OPERATOR_PAUD"
  | "PENDUDUK"

export interface RoleConfig {
  key: AppRole
  label: string
  level: string
  description: string
  badgeColor: string
  badgeTextColor: string
  canManageUsers?: boolean
}

export const APP_ROLES: Record<AppRole, RoleConfig> = {
  SUPER_ADMIN: {
    key: "SUPER_ADMIN",
    label: "Super Admin",
    level: "Tingkat Kota (Full Access)",
    description: "Akses penuh ke seluruh sistem, manajemen pengguna, verifikasi peran, dan konfigurasi master.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    badgeTextColor: "text-purple-600 dark:text-purple-400",
    canManageUsers: true,
  },
  ADMIN_OPD: {
    key: "ADMIN_OPD",
    label: "Admin OPD",
    level: "Dinas / Lembaga Teknis",
    description: "Pengelola program sektoral pemerintah kota (Diskominfo, Dinsos, Dinkes, dll).",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
    badgeTextColor: "text-blue-600 dark:text-blue-400",
    canManageUsers: true,
  },
  KETUA_RW: {
    key: "KETUA_RW",
    label: "Ketua RW",
    level: "Rukun Warga",
    description: "Koordinator administrasi dan ketertiban di tingkat Rukun Warga.",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
    badgeTextColor: "text-teal-600 dark:text-teal-400",
  },
  KETUA_RT: {
    key: "KETUA_RT",
    label: "Ketua RT",
    level: "Rukun Tetangga",
    description: "Pengurus lingkungan warga tingkat RT, penerbitan surat pengantar dan informasi warga.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    badgeTextColor: "text-emerald-600 dark:text-emerald-400",
  },
  PENGURUS_RT: {
    key: "PENGURUS_RT",
    label: "Pengurus RT",
    level: "Rukun Tetangga",
    description: "Sekretaris / Bendahara / Seksi pengurus RT.",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    badgeTextColor: "text-emerald-600 dark:text-emerald-400",
  },
  KADER_POSYANDU: {
    key: "KADER_POSYANDU",
    label: "Kader Posyandu",
    level: "Layanan Kesehatan Warga",
    description: "Pengelola pencatatan tumbuh kembang anak, imunisasi, dan kesehatan lansia.",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
    badgeTextColor: "text-rose-600 dark:text-rose-400",
  },
  ADMIN_PAUD: {
    key: "ADMIN_PAUD",
    label: "Operator PAUD",
    level: "Pendidikan Usia Dini",
    description: "Pengelola administrasi PAUD/TK, presensi siswa, dan materi edukasi anak.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    badgeTextColor: "text-amber-600 dark:text-amber-400",
  },
  OPERATOR_PAUD: {
    key: "OPERATOR_PAUD",
    label: "Guru / Operator PAUD",
    level: "Pendidikan Usia Dini",
    description: "Tenaga pendidik PAUD/KB di lingkungan setempat.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    badgeTextColor: "text-amber-600 dark:text-amber-400",
  },
  PENDUDUK: {
    key: "PENDUDUK",
    label: "Warga / Penduduk",
    level: "Publik",
    description: "Warga masyarakat terdaftar dengan akses feed publik, marketplace, dan grup komunitas.",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    badgeTextColor: "text-indigo-600 dark:text-indigo-400",
  },
}

export const ROLE_OPTIONS = Object.values(APP_ROLES)
