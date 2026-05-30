import Link from "next/link"
import DocsSidebar from "@/components/docs/DocsSidebar"
import DocsTopbar from "@/components/docs/DocsTopbar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <DocsTopbar />
      <div className="flex">
        <DocsSidebar />
        <main className="flex-1 lg:pl-72">
          <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
