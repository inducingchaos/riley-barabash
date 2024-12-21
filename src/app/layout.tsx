/**
 * @todo
 * - [P1] Add a redirect protecting the 'experimental' directory & similar.
 */

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { type Metadata } from "next"
import type { ReactNode } from "react"
import { ThemeProvider } from "~/components/providers"
import { Sonner } from "~/components/ui/primitives/indicators"
import { project } from "~/config"
import { TRPCReactProvider } from "~/lib/infra/rpc/react"
import { geist, geistMono, hoeflerText, inter, pxGrotesk, pxGroteskMono, saans } from "~/styles/fonts"
import "~/styles/globals.css"

export const metadata: Metadata = {
    title: `${project.info.name} | ${project.info.tagline}`,
    description: project.info.description,
    icons: [{ rel: "icon", url: "/riley-barabash/profile-picture.jpg" }],
    keywords: ""
}

export default async function RootLayout({ children }: { children: ReactNode }): Promise<JSX.Element> {
    return (
        <>
            {/* Shell. */}

            <html
                lang="en"
                suppressHydrationWarning
                className={`${pxGrotesk.variable} ${pxGroteskMono.variable} ${hoeflerText.variable} ${saans.variable} ${inter.variable} ${geist.variable} ${geistMono.variable} [.font-mono]:tracking-tighter tracking-normal`}
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

                        <Sonner position="top-center" />

                        {/* </AuthProvider> */}
                    </ThemeProvider>
                </body>
            </html>
        </>
    )
}
