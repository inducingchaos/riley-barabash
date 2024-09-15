/**
 * @file The layout for the app.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #component
 * #layout
 * #tsx
 */

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { type Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import type { ReactNode } from "react"
import { ThemeProvider } from "~/components/providers/theme"
import { brand } from "~/config"
import { TRPCReactProvider } from "~/lib/infra/rpc/react"
import "~/styles/globals.css"
import { Header } from "./_header/header"
import { Toaster } from "~/components/toaster"
import { getCurrentUser } from "~/lib/session"
import AuthProvider from "~/components/providers/auth"

const pxGrotesk = localFont({
    src: "../../public/fonts/px-grotesk-regular.otf",
    variable: "--font-px-grotesk"
})

const pxGroteskMono = localFont({
    src: "../../public/fonts/px-grotesk-mono-regular.otf",
    variable: "--font-px-grotesk-mono"
})

const pxGroteskScreen = localFont({
    src: "../../public/fonts/px-grotesk-screen.otf",
    variable: "--font-px-grotesk-screen"
})

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
})

export const metadata: Metadata = {
    title: `${brand.info.name} | ${brand.info.tagline}`,
    description: brand.info.description,
    icons: [{ rel: "icon", url: "brand/pfp.jpg" }],
    keywords: ""
}

export default async function RootLayout({ children }: { children: ReactNode }): Promise<JSX.Element> {
    const user = (await getCurrentUser()) ?? null
    return (
        <>
            {/* Shell. */}

            <html
                lang="en"
                suppressHydrationWarning
                className={`${pxGrotesk.variable} ${pxGroteskMono.variable} ${pxGroteskScreen.variable} ${inter.variable} antialiased`}
            >
                <body>
                    {/* Theming. */}

                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <AuthProvider user={user}>
                            {/* tRPC. */}

                            <TRPCReactProvider>
                                {/* Header. */}

                                <Header />

                                {/* The application. */}

                                {children}
                            </TRPCReactProvider>
                            <Analytics />
                            <SpeedInsights />

                            <Toaster />
                        </AuthProvider>
                    </ThemeProvider>
                </body>
            </html>
        </>
    )
}
