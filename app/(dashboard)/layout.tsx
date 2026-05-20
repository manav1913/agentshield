import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import {
  FileText,
  KeyRound,
  LayoutDashboard,
  Shield,
  SlidersHorizontal,
} from "lucide-react"
import Sidebar from "@/components/dashboard/Sidebar"
import Topbar from "@/components/dashboard/Topbar"

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Rules",
    href: "/rules",
    icon: SlidersHorizontal,
  },
  {
    label: "Logs",
    href: "/logs",
    icon: FileText,
  },
  {
    label: "API Keys",
    href: "/api-keys",
    icon: KeyRound,
  },
]

const DashboardLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Sidebar />

      <div className="lg:pl-72">
        <Topbar />

        <main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout