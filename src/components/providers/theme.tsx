/**
 * @file Exports a provider for "next-themes".
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #components
 * #providers
 * #theme
 * #next-themes
 */

"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps): JSX.Element {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
