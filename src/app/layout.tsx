/**
 * @file The layout for the app.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #component
 * #layout
 * #font
 * #metadata
 */

import { type Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import { ThemeProvider } from "~/components/providers/theme"
import { brand } from "~/config"
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

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
})

export const metadata: Metadata = {
    title: `${brand.info.name} | ${brand.info.tagline}`,
    description: brand.info.description,
    icons: [{ rel: "icon", url: "brand/pfp.jpg" }]
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            {/* Shell. */}

            <html lang="en" suppressHydrationWarning className={`${pxGrotesk.variable} ${pxGroteskMono.variable} ${inter.variable}`}>
                <body>
                    {/* Theme provider. */}

                    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                        {/* tRPC provider. */}

                        <TRPCReactProvider>
                            {/* The application. */}

                            {children}
                        </TRPCReactProvider>
                    </ThemeProvider>
                </body>
            </html>
        </>
    )
}
