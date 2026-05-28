import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "AgentShield",
  description:
    "AI agent protection with real-time guardrails, logs, and policy enforcement.",

  metadataBase: new URL("https://agentshield-one.vercel.app"),

  openGraph: {
    title: "AgentShield",
    description:
      "AI agent protection with real-time guardrails, logs, and policy enforcement.",
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
    title: "AgentShield",
    description:
      "AI agent protection with real-time guardrails, logs, and policy enforcement.",
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
    >
      <body className="min-h-full flex flex-col bg-white text-black dark:bg-gray-950 dark:text-white transition-colors duration-300">
        <ThemeProvider>
        {children}
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
