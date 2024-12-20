/**
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

export function DelayedRedirect({
    title,
    description,
    buttonText,
    redirectUrl
}: {
    title: string
    description: string
    buttonText: string
    // duration?: number
    redirectUrl?: string
}): JSX.Element {
    return (
        <>
            <Card className="w-full max-w-256px">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Suspense boundary is required since `useSearchParams` uses CSR. */}

                    <Suspense fallback={<Progress value={0} />}>
                        <DelayedRedirectProgress redirectUrl={redirectUrl} />
                    </Suspense>
                </CardContent>
                <CardFooter>
                    {/* Suspense boundary is required since `useSearchParams` uses CSR. */}

                    <Suspense
                        fallback={
                            <Button asChild disabled>
                                <Link href={redirectUrl ?? "/"}>{buttonText}</Link>
                            </Button>
                        }
                    >
                        <DelayedRedirectButton redirectUrl={redirectUrl} buttonText={buttonText} />
                    </Suspense>
                </CardFooter>
            </Card>
        </>
    )
}
