/**
 *
 */

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { type Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import type { ReactNode } from "react"
import { ThemeProvider } from "~/components/providers/theme"
import { Toaster } from "~/components/ui/compositions/indicators/toaster"
import { project } from "~/config"
import { TRPCReactProvider } from "~/lib/infra/rpc/react"
import "~/styles/globals.css"

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
    title: `${project.info.name} | ${project.info.tagline}`,
    description: project.info.description,
    icons: [{ rel: "icon", url: "entities/riley-barabash/brand/pfp.jpg" }],
    keywords: ""
}

export default async function RootLayout({ children }: { children: ReactNode }): Promise<JSX.Element> {
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
                        {/* tRPC. */}

                        <TRPCReactProvider>
                            {/* The application. */}

                            {children}
                        </TRPCReactProvider>

                        {/* Vercel stuff. */}

                        <Analytics />
                        <SpeedInsights />

                        {/* Toast component. */}

                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </>
    )
}
