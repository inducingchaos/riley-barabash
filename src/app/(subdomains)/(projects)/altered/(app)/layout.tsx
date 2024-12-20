/**
 *
 */

import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Menu } from "../(site)/_components/menu"

export const metadata: Metadata = {
    // title: `${project.info.name} | ${project.info.tagline}`,
    title: "Altered | Systems for Creative Scale",
    // description: project.info.description,
    icons: [{ rel: "icon", url: "/altered/design/brand/icon/dark.png" }],
    keywords: ""
}

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center p-16px">
            <Menu />
            {children}
        </div>
    )
}
