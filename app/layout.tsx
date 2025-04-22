import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CPABee - Track What's Buzzing on the CPA Exam",
  description:
    "Get real-time intel on the topics CPA candidates are talking about most. Focus your study time on what's actually being tested.",
  applicationName: "CPABee",
  authors: [{ name: "CPABee" }],
  generator: "Next.js",
  keywords: ["CPA exam", "CPA study", "CPA trending topics", "CPA preparation", "CPABee"],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "https://cpabee.com",
  ),
  openGraph: {
    title: "CPABee - CPA Exam Trending Topics",
    description: "Get real-time intel on the topics CPA candidates are talking about most.",
    url: "https://cpabee.com",
    siteName: "CPABee",
    images: [
      {
        url: "/images/cpabee-logo.png",
        width: 1200,
        height: 630,
        alt: "CPABee Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CPABee - CPA Exam Trending Topics",
    description: "Get real-time intel on the topics CPA candidates are talking about most.",
    images: ["/images/cpabee-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#f59e0b",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://cpabee.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Force the title to be CPABee with additional meta tags */}
        <title>CPABee - Track What's Buzzing on the CPA Exam</title>
        <meta name="application-name" content="CPABee" />
        <meta property="og:site_name" content="CPABee" />
        <link rel="canonical" href="https://cpabee.com" />

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZEPSVLW53R" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZEPSVLW53R');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
