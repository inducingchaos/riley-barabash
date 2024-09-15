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

    const searchParams: ReadonlyURLSearchParams = useSearchParams()
    const resolvedRedirectUrl: string = redirectUrl ?? searchParams.get("redirect-url") ?? "/"

    const [isComplete, setIsComplete] = useState<boolean>(false)

    useEffect(() => {
        //  Start the animation immediately.

        setIsComplete(true)

        const timeout = setTimeout(() => router.push(resolvedRedirectUrl), 5000)

        return (): void => clearTimeout(timeout)
    }, [resolvedRedirectUrl, router])
    return (
        <Progress customInternals>
            <ProgressIndicator className="duration-5000 ease-in-out-expo" value={isComplete ? 100 : 0} />
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
