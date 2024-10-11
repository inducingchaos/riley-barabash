"use client"

import { H1 } from "~/components/ui/primitives/typography"
import { type Exception } from "~/meta"

export default function ErrorPage({ error }: { error: Exception & { digest?: string } }) {
    return (
        <div className="container mx-auto min-h-screen space-y-8 py-12">
            <>
                <H1 className="text-center">{error.info.external?.label ?? "Something went wrong."}</H1>
                <p className="text-lg">{error.info.external?.message ?? "Please try again later."}</p>
            </>
        </div>
    )
}
