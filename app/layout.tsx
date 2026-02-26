import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const applicationName = "VORAC"
const title = "VORAC — Precision Plumbing & Carpentry | London"
const description = "Precision engineering and meticulous construction services for London's most discerning properties. Qualified, insured, guaranteed."
const url = "https://vorac.co.uk"

const socialImages = [
  {
    url: `${url}/social.png`,
    width: 1200,
    height: 630,
    alt: title,
  },
]

export const metadata: Metadata = {
  title,
  description,
  keywords: "",
  robots: "index, follow",
  authors: [{ name: "VORAC" }],
  applicationName,
  alternates: {
    canonical: url,
  },
  metadataBase: new URL(url),
  openGraph: {
    title,
    description,
    url,
    siteName: applicationName,
    images: socialImages,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    // To Do: Change this to your Twitter handle
    site: "@vorac",
    title,
    description,
    images: socialImages,
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-[#fafafa] text-[#0a0a0a] antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
