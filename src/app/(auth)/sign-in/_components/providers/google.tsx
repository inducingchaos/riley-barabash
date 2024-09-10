/**
 * @file The button for signing in with Google.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #auth
 * #sign-in
 * #components
 * #providers
 * #google
 *
 * @todo
 * - [P1] Implement Google sign in.
 */

import type { ButtonHTMLAttributes, Dispatch, SetStateAction } from "react"
import { Google, Spinner } from "~/components/svgs/icons"
import { Button } from "~/components/ui/primitives/inputs"
import { cn } from "~/utils/ui"
import { type SignInProviderID } from "../provider-group"

export function GoogleSignIn({
    loadingState: loading,
    onLoadingChange: setLoading,
    className,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    loadingState?: SignInProviderID
    onLoadingChange: Dispatch<SetStateAction<SignInProviderID | undefined>>
}): JSX.Element {
    const signIn = async (): Promise<void> => {
        setLoading("google")

        //  Placeholder.

        await new Promise(resolve => setTimeout(resolve, 3000))

        setLoading(undefined)
    }

    return (
        <>
            {/* Button. */}

            <Button
                className={cn("w-full", className)}
                type="button"
                name="Google"
                onClick={signIn}
                variant="outline"
                disabled={!!loading}
                {...props}
            >
                {loading === "google" ? (
                    <>
                        {/* Loading icon. */}

                        <Spinner className="mr-2 h-4 w-4 animate-spin" />

                        {/* Loading text. */}

                        {"Redirecting..."}
                    </>
                ) : (
                    <>
                        {/* Button icon. */}

                        <Google className="mr-2 h-4 w-4" />

                        {/* Button text. */}

                        {"Google"}
                    </>
                )}
            </Button>
        </>
    )
}
