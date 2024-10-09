"use client"

import { H1 } from "~/components/ui/primitives/typography"

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
    return (
        <div className="container mx-auto min-h-screen space-y-8 py-12">
            <>
                <H1 className="text-center">Oops! Something went wrong</H1>
                <p className="text-lg">{error.message}</p>
            </>
        </div>
    )
}
