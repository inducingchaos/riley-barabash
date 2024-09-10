/**
 * @file Refreshes the page on window focus.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #components
 * #headless
 * #navigation
 * #refresh-on-focus
 * #tsx
 */

"use client"

import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

export function RefreshOnFocus(): undefined {
    const router = useRouter()

    const refresh: () => void = useCallback(() => router.refresh(), [router])

    useEffect(() => {
        window.addEventListener("focus", refresh)

        return (): void => window.removeEventListener("focus", refresh)
    }, [refresh])

    return undefined
}
