/**
 * @file The layout for the main site.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #site
 * #layout
 * #tsx
 */

import type { ReactNode } from "react"
import { Bar as NavigationBar } from "./nav-bar"

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <>
            {/* Header. */}

            <NavigationBar />

            {/* The application. */}

            {children}
        </>
    )
}
