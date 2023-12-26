import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
import './globals.css'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sticky',
  description: 'A Markdown Editor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={ {baseTheme: dark} }>
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="theme"
          >{children}
          </ThemeProvider></body>
    </html>
    </ClerkProvider>
  )
}
