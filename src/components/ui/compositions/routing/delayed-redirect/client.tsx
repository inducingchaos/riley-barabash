/**
 * @remarks
 * - Could probably just use Framer Motion or Tailwind animations in the future. Using inline styles would mean injecting the keyframes into the DOM, and suffering hydration issues - we want to avoid that. If it can't be done easily with TW, just use Framer Motion.
 */

"use client"

import Link from "next/link"
import { type ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Progress, ProgressIndicator } from "~/components/ui/primitives/indicators"
import { Button } from "~/components/ui/primitives/inputs"

export function DelayedRedirectProgress({ redirectUrl }: { redirectUrl?: string }): JSX.Element {
    const router = useRouter()
    const searchParams: ReadonlyURLSearchParams = useSearchParams()
    const resolvedRedirectUrl: string = redirectUrl ?? searchParams.get("redirect-url") ?? "/"
    const [isComplete, setIsComplete] = useState<boolean>(false)

    useEffect(() => {
        const setState = setTimeout(() => setIsComplete(true), 0)
        return () => clearTimeout(setState)
    }, [])

    const handleTransitionEnd = () => {
        router.push(resolvedRedirectUrl)
    }

    return (
        <Progress customInternals>
            <ProgressIndicator
                className="duration-5000 ease-in-out-expo"
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
