/**
 *
 */

import type { ReactNode } from "react"
import { Header } from "./_components"
import type { Metadata } from "next"

export const metadata: Metadata = {
    // title: `${project.info.name} | ${project.info.tagline}`,
    title: "Altered | Systems for Creative Scale",
    // description: project.info.description,
    icons: [{ rel: "icon", url: "/altered/design/brand/icon/default.png" }],
    keywords: ""
}

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <Header />
            {children}
        </div>
    )
}
