/**
 *
 */

import type { Metadata } from "next"
import type { ReactNode } from "react"
import { project as projects } from "~/config"

const project = projects["value-only"]

export const metadata: Metadata = {
    title: `${project.info.name} | ${project.info.tagline}`,
    description: project.info.description,
    icons: undefined,
    keywords: ""
}

export default async function RootLayout({ children }: { children: ReactNode }): Promise<JSX.Element> {
    return <>{children}</>
}
