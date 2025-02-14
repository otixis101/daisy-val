import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import type React from "react" // Import React


const poppins = Poppins({ subsets: ["latin"], weight: ["100" , "200", "300", "400", "500", "600", "700", "800", "900"] })


export const metadata: Metadata = {
  title: "Be My Valentine?",
  description: "A sweet Valentine's Day proposal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} bg-pink-100 flex flex-col max-w-full min-h-screen`}>
        {children}
      </body>
    </html>
  )
}

