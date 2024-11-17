import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import '@/styles/globals.css'
import { Toaster } from '@/components/ui/sonner'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { fontSans, fontUrban } from '@/config/fonts'
import { Footer } from '@/components/footer'
import { Poppins } from "next/font/google";
import { HeaderWrapper } from '@/components/header-wrapper'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ subsets: ["latin"], weight: "500" });


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Prisma",
    "PlanetScale",
    "Auth.js",
    "shadcn ui",
    "Resend",
    "React Email",
    "Stripe"
  ],
  authors: [
    {
      name: "tejas",
    },
    {
      name:"ankit",
    }
  ],
  creator: "ankit",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@tejas",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className + " bg-bg min-h-dvh flex flex-col"}>
        <SessionProvider session={session}>
          <HeaderWrapper />
          <Toaster />
          <div className="">
            {children}
          </div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
