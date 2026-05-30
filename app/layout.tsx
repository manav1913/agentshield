import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "AgentShield - AI Agent Protection with Real-time Guardrails",
  description:
    "Protect your AI agents with real-time guardrails, comprehensive audit logs, and flexible policy enforcement. Keep your AI safe and compliant.",

  metadataBase: new URL("https://agentshield-one.vercel.app"),

  openGraph: {
    title: "AgentShield - AI Agent Protection with Real-time Guardrails",
    description:
      "Protect your AI agents with real-time guardrails, comprehensive audit logs, and flexible policy enforcement. Keep your AI safe and compliant.",
    url: "https://agentshield-one.vercel.app",
    siteName: "AgentShield",
    type: "website",
    locale: "en_US",

    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AgentShield Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AgentShield - AI Agent Protection with Real-time Guardrails",
    description:
      "Protect your AI agents with real-time guardrails, comprehensive audit logs, and flexible policy enforcement. Keep your AI safe and compliant.",
    images: ["/opengraph-image.png"],
  },

  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      signInUrl="/login"
      signUpUrl="/signup"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
    <html
      lang="en"
      className="h-full antialiased font-sans"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-black dark:bg-gray-950 dark:text-white" suppressHydrationWarning>
        {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
