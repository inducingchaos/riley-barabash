/**
 *
 */

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { type Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import type { ReactNode } from "react"
import { ThemeProvider } from "~/components/providers"
import { Toaster } from "~/components/ui/compositions/indicators"
import { project } from "~/config"
import { TRPCReactProvider } from "~/lib/infra/rpc/react"
import "~/styles/globals.css"

const pxGrotesk = localFont({
    src: [
        {
            path: "../../public/shared/typefaces/px-grotesk-trial/thin.otf",
            weight: "100",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/px-grotesk-trial/thin-italic.otf",
            weight: "100",
            style: "italic"
        },

        {
            path: "../../public/shared/typefaces/px-grotesk-trial/light.otf",
            weight: "300",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/px-grotesk-trial/light-italic.otf",
            weight: "300",
            style: "italic"
        },

        {
            path: "../../public/shared/typefaces/px-grotesk/regular.otf",
            weight: "400",
            style: "normal"
        },
        // {
        //     path: "../../public/shared/typefaces/px-grotesk-trial/regular-italic.otf",
        //     weight: "400",
        //     style: "italic"
        // },

        {
            path: "../../public/shared/typefaces/px-grotesk/bold.otf",
            weight: "700",
            style: "normal"
        },
        // {
        //     path: "../../public/shared/typefaces/px-grotesk-trial/bold-italic.otf",
        //     weight: "700",
        //     style: "italic"
        // },

        {
            path: "../../public/shared/typefaces/px-grotesk-trial/black.otf",
            weight: "900",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/px-grotesk-trial/black-italic.otf",
            weight: "900",
            style: "italic"
        }
    ],
    variable: "--font-px-grotesk"
})

const pxGroteskMono = localFont({
    src: [
        {
            path: "../../public/shared/typefaces/px-grotesk-mono-trial/light.otf",
            weight: "300",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/px-grotesk-mono-trial/light-italic.otf",
            weight: "300",
            style: "italic"
        },

        {
            path: "../../public/shared/typefaces/px-grotesk-mono/regular.otf",
            weight: "400",
            style: "normal"
        }
        // {
        //     path: "../../public/shared/typefaces/px-grotesk-mono-trial/regular-italic.otf",
        //     weight: "400",
        //     style: "italic"
        // },

        // {
        //     path: "../../public/shared/typefaces/px-grotesk-mono-trial/bold.otf",
        //     weight: "700",
        //     style: "normal"
        // },
        // {
        //     path: "../../public/shared/typefaces/px-grotesk-mono-trial/bold-italic.otf",
        //     weight: "700",
        //     style: "italic"
        // }
    ],
    variable: "--font-px-grotesk-mono"
})

const hoeflerText = localFont({
    src: [
        {
            path: "../../public/shared/typefaces/hoefler-text/regular.ttf",
            weight: "400",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/hoefler-text/regular-italic.ttf",
            weight: "400",
            style: "italic"
        },

        {
            path: "../../public/shared/typefaces/hoefler-text/black.ttf",
            weight: "900",
            style: "normal"
        },
        {
            path: "../../public/shared/typefaces/hoefler-text/black-italic.ttf",
            weight: "900",
            style: "italic"
        }
    ],
    variable: "--font-hoefler-text"
})

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter"
})

export const metadata: Metadata = {
    title: `${project.info.name} | ${project.info.tagline}`,
    description: project.info.description,
    icons: [{ rel: "icon", url: "/riley-barabash/content/brand/pfp.jpg" }],
    keywords: ""
}

export default async function RootLayout({ children }: { children: ReactNode }): Promise<JSX.Element> {
    return (
        <>
            {/* Shell. */}

            <html
                lang="en"
                suppressHydrationWarning
                className={`${pxGrotesk.variable} ${pxGroteskMono.variable} ${hoeflerText.variable} ${inter.variable} [.font-mono]:tracking-tighter tracking-normal`}
            >
                <body>
                    {/* Theming. */}

                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {/* Auth. */}

                        {/* <AuthProvider> */}
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
                        {/* </AuthProvider> */}
                    </ThemeProvider>
                </body>
            </html>
        </>
    )
}
