/**
 * @file A group of providers for the sign-in page.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #auth
 * #sign-in
 * #_components
 * #provider-group
 * #tsx
 */

"use client"

import { type HTMLAttributes, useState } from "react"
import { Separator } from "~/components/ui/primitives/display"
import { Muted } from "~/components/ui/primitives/typography"
import { cn } from "~/utils/ui"
import { AppleSignIn, EmailSignIn, GoogleSignIn } from "./providers"

export type SignInProviderID = "email" | "apple" | "google"

export function SignInProviderGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>): JSX.Element {
    const [loading, setLoading] = useState<SignInProviderID>()

    return (
        <>
            {/* Container. */}

            <div className={cn("flex w-full flex-col items-center justify-center gap-6", className)} {...props}>
                {/* Email. */}

                <EmailSignIn loadingState={loading} onLoadingChange={setLoading} />

                {/* Divider. */}

                <div className="flex w-full items-center justify-center">
                    {/* Left line. */}

                    <Separator />

                    {/* Divider text. */}

                    <Muted className="whitespace-nowrap px-2 uppercase">{"Or continue with"}</Muted>

                    {/* Right line. */}

                    <Separator />
                </div>

                {/* OAuth providers. */}

                <div className="flex w-full flex-row gap-2">
                    {/* Apple. */}

                    <AppleSignIn loadingState={loading} onLoadingChange={setLoading} />

                    {/* Google */}

                    <GoogleSignIn loadingState={loading} onLoadingChange={setLoading} />
                </div>
            </div>
        </>
    )
}
