/**
 * @todo
 * - [P3] Allow multiple key/value pairs to be appended at once.
 * - [P2] Review code.
 */

"use client"

import { useSearchParams } from "next/navigation"
import { useCallback } from "react"

/**
 * Gets the current search params, appends a param, and returns the new search params as a string.
 */
export function useAppendQueryString(): (name: string, value: string) => string {
    const searchParams = useSearchParams()

    const appendQueryString = useCallback(
        (name: string, value: string) => {
            const params: URLSearchParams = new URLSearchParams(searchParams)
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    return appendQueryString
}
