import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Sidebar from "@/components/dashboard/Sidebar"
import Topbar from "@/components/dashboard/Topbar"
import { ThemeProvider } from "next-themes"

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
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <Sidebar />

        <div className="lg:pl-72">
          <Topbar />

          <main className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default DashboardLayout