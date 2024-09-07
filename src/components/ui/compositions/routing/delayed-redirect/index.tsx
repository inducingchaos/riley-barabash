/**
 * @file Redirects after the elapse of an artificial delay, providing a button to force redirect.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #components
 * #ui
 * #compositions
 * #routing
 * #delayed-redirect
 *
 * @todo
 * - [P4] Add support for arbitrary durations.
 * - [P4] Add a config option for the default 404 redirect URL.
 *
 * @remarks
 * - Tailwind arbitrary animation durations do not work (submit a bug report/PR?), so for now the duration is fixed to 5 seconds.
 */

import Link from "next/link"
import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/layout/cards/shadcn"
import { Progress } from "~/components/ui/primitives/indicators"
import { Button } from "~/components/ui/primitives/inputs"
import { DelayedRedirectButton, DelayedRedirectProgress } from "./client"

interface DelayedRedirectOptions {
    title: string
    description: string
    buttonText: string
    // duration?: number
    redirectUrl?: string
}

export function DelayedRedirect({ title, description, buttonText, redirectUrl }: DelayedRedirectOptions): JSX.Element {
    return (
        <>
            {/* Modal. */}

            <Card className="w-full max-w-[256px]">
                {/* Header. */}

                <CardHeader>
                    {/* Title. */}

                    <CardTitle>{title}</CardTitle>

                    {/* Description. */}

                    <CardDescription>{description}</CardDescription>
                </CardHeader>

                {/* Content. */}

                <CardContent>
                    {/* Suspense boundary for search params (uses CSR). */}

                    <Suspense fallback={<Progress value={0} />}>
                        {/* Progress bar. */}

                        <DelayedRedirectProgress redirectUrl={redirectUrl} />
                    </Suspense>
                </CardContent>

                {/* Footer. */}

                <CardFooter>
                    {/* Suspense boundary for search params (uses CSR). */}

                    <Suspense
                        fallback={
                            <Button asChild disabled>
                                <Link href={redirectUrl ?? "/"}>{buttonText}</Link>
                            </Button>
                        }
                    >
                        {/* Force redirect. */}

                        <DelayedRedirectButton redirectUrl={redirectUrl} buttonText={buttonText} />
                    </Suspense>
                </CardFooter>
            </Card>
        </>
    )
}
