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
const description =
  "Precision engineering and meticulous construction services for London's most discerning properties. Qualified, insured, guaranteed. Same-day slots · Fixed pricing · 12-month guarantee."
const url = "https://vorac.co.uk"

const keywords = [
  "plumbing London",
  "carpentry London",
  "emergency plumber",
  "boiler repair London",
  "bathroom installation",
  "qualified tradespeople",
  "insured plumber",
  "same-day plumbing",
  "VORAC",
]

const socialImages = [
  {
    url: `${url}/social.png`,
    width: 1200,
    height: 630,
    alt: title,
  },
]

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${applicationName}`,
  },
  description,
  keywords: keywords.join(", "),
  robots: "index, follow",
  authors: [{ name: "VORAC", url }],
  creator: "VORAC",
  publisher: "VORAC",
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
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    site: "@vorac",
    title,
    description,
    images: socialImages,
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: "/favicon.ico",
  },
  themeColor: "#0a0a0a",
  category: "construction",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
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
