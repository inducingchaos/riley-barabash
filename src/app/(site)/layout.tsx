/**
 *
 */

import type { ReactNode } from "react"
import { Bar as NavigationBar } from "./_components/navigation"

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <>
            <NavigationBar />
            {children}
        </>
    )
}
