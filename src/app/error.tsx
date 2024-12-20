/**
 * @todo
 * - [P3] Add a reset button and handle a possible `Error` type
 *
 * @see [Next Docs](https://nextjs.org/docs/app/building-your-application/routing/error-handling#recovering-from-errors)
 */

"use client"

import { H1 } from "~/components/ui/primitives/typography"

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
    return (
        <div className="container mx-auto min-h-screen space-y-32px py-48px">
            <>
                <H1 className="text-center">{error.name}</H1>
                <p className="text-18px">{error.message}</p>
            </>
        </div>
    )
}
