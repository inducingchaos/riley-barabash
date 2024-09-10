/**
 * @file A form for signing in with email.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #auth
 * #sign-in
 * #components
 * #providers
 * #email
 * #tsx
 *
 * @todo
 * - [P1] Implement the email sign-in functionality.
 */

"use client"

import type { Dispatch, SetStateAction } from "react"
import { Spinner } from "~/components/svgs/icons"
import { Label } from "~/components/ui/primitives/display"
import { Button, Input } from "~/components/ui/primitives/inputs"
import { cn } from "~/utils/ui"
import type { SignInProviderID } from "../provider-group"

export function EmailSignIn({
    loadingState: loading,
    onLoadingChange: setLoading,
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLFormElement> & {
    loadingState?: SignInProviderID
    onLoadingChange: Dispatch<SetStateAction<SignInProviderID | undefined>>
}): JSX.Element {
    // const searchParams = useSearchParams()
    // const callbackUrl: string = searchParams.get("callback-url") ?? application.routing.paths.pages.signInCallback

    const signIn = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        setLoading("email")
        event.preventDefault()

        // const email: string = new FormData(event.currentTarget).get("email")?.toString() ?? ""

        //  Placeholder.

        await new Promise(resolve => setTimeout(resolve, 3000))

        setLoading(undefined)
    }

    return (
        <>
            {/* Form. */}

            <form
                className={cn("flex w-full flex-col items-center justify-center gap-2", className)}
                onSubmit={signIn}
                {...props}
            >
                {/* Label. */}

                <Label className="sr-only" htmlFor="email">
                    {"Email"}
                </Label>

                {/* Input. */}

                <Input
                    className="w-full"
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="on"
                    disabled={!!loading}
                    required
                />

                {/* Submit button. */}

                <Button className="w-full" name="email" disabled={!!loading}>
                    {loading === "email" ? (
                        <>
                            {/* Loading icon. */}

                            <Spinner className="mr-2 h-4 w-4 animate-spin" />

                            {/* Loading text. */}

                            {"Submitting..."}
                        </>
                    ) : (
                        <>
                            {/* Button text. */}

                            {"Proceed with email"}
                        </>
                    )}
                </Button>
            </form>
        </>
    )
}
