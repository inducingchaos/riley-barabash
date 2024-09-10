/**
 * @file The button for signing in with Apple.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #auth
 * #sign-in
 * #components
 * #providers
 * #apple
 *
 * @todo
 * - [P1] Implement Apple sign in.
 */

import type { ButtonHTMLAttributes, Dispatch, SetStateAction } from "react"
import { Apple, Spinner } from "~/components/svgs/icons"
import { Button } from "~/components/ui/primitives/inputs"
import { cn } from "~/utils/ui"
import { type SignInProviderID } from "../provider-group"

export function AppleSignIn({
    loadingState: loading,
    onLoadingChange: setLoading,
    className,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
    loadingState?: SignInProviderID
    onLoadingChange: Dispatch<SetStateAction<SignInProviderID | undefined>>
}): JSX.Element {
    const signIn = async (): Promise<void> => {
        setLoading("apple")

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
                name="Apple"
                onClick={signIn}
                variant="outline"
                disabled={!!loading}
                {...props}
            >
                {loading === "apple" ? (
                    <>
                        {/* Loading icon. */}

                        <Spinner className="mr-2 h-4 w-4 animate-spin" />

                        {/* Loading text. */}

                        {"Redirecting..."}
                    </>
                ) : (
                    <>
                        {/* Button icon. */}

                        <Apple className="mr-2 h-4 w-4" />

                        {/* Button text. */}

                        {"Apple"}
                    </>
                )}
            </Button>
        </>
    )
}
