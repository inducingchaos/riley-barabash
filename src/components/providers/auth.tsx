/**
 * @file A provider for authentication.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #components
 * #providers
 * #auth
 * #tsx
 */

"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const { resolvedTheme: theme } = useTheme()

    return (
        <ClerkProvider
            appearance={{
                baseTheme: theme === "dark" ? dark : undefined
            }}
        >
            {children}
        </ClerkProvider>
    )
}
