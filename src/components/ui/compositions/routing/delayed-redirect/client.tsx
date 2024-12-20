/**
 *
 */

"use client"

import Link from "next/link"
import { type ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Progress, ProgressIndicator } from "~/components/ui/primitives/indicators"
import { Button } from "~/components/ui/primitives/inputs"

export function DelayedRedirectProgress({ redirectUrl }: { redirectUrl?: string }): JSX.Element {
    const router = useRouter()
    const searchParams = useSearchParams()
    const resolvedRedirectUrl: string = redirectUrl ?? searchParams.get("redirect-url") ?? "/"
    const [isComplete, setIsComplete] = useState<boolean>(false)

    useEffect(() => {
        /**
         * Applies a delay to the state update to avoid flickering.
         *
         * @remarks If we set the state immediately, the progress bar will inconsistently animate without a transition - this could be due to stale state being used, or a state update before the CSS transition (or the child components) are recognized. As an alternative, use Framer Motion or create a hardcoded tailwind animation to ensure consistent behavior.
         */
        const delayedStateUpdate = setTimeout(() => setIsComplete(true), 125)
        return () => clearTimeout(delayedStateUpdate)
    }, [])

    const handleTransitionEnd = () => router.push(resolvedRedirectUrl)

    return (
        <Progress customInternals>
            <ProgressIndicator
                className="duration-5s ease-in-out"
                value={isComplete ? 100 : 0}
                onTransitionEnd={handleTransitionEnd}
            />
        </Progress>
    )
}

export function DelayedRedirectButton({ redirectUrl, buttonText }: { redirectUrl?: string; buttonText: string }): JSX.Element {
    const searchParams: ReadonlyURLSearchParams = useSearchParams()
    const resolvedRedirectUrl: string = redirectUrl ?? searchParams.get("redirect-url") ?? "/"

    return (
        <Button asChild>
            <Link href={resolvedRedirectUrl}>{buttonText}</Link>
        </Button>
    )
}
