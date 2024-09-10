/**
 * @file The sign-in verification page.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #auth
 * #sign-in
 * #verification
 * #page
 * #tsx
 *
 * @todo
 * - [P2] Display the email address in the subheading.
 * - [P2] Add a "Resend" button that allows the user to resend the OTP.
 * - [P2] Add a "Change email" button that allows the user to change the email address they want to sign in with.
 * - [P2] Add a "Change phone number" button that allows the user to change the phone number they want to sign in with.
 * - [P2] Redirect the user to the callback URL if an auth session is detected on refresh.
 */

import { RefreshOnFocus } from "~/components/headless/navigation"
import { H3, Muted } from "~/components/ui/primitives/typography"
import { OTP } from "./_components"

export default function SignInVerification({ searchParams: _ }: { searchParams: { "callback-url"?: string } }): JSX.Element {
    // const callbackUrl: string = searchParams?.["callback-url"] ?? application.routing.paths.pages.signInCallback

    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Content. */}

                        <div className="flex w-96 flex-col items-center justify-center gap-6">
                            {/* Text. */}

                            <div className="flex flex-col gap-2 text-center">
                                {/* Heading. */}

                                <H3>{"Verification"}</H3>

                                {/* Subheading. */}

                                <Muted>
                                    {"A one-time password has been sent to {{EMAIL}}. Enter the code below to sign in."}
                                </Muted>
                            </div>

                            {/* OTP input. */}

                            <OTP />

                            {/* Disclosure. */}

                            <Muted className="px-8 text-center">{"You should receive an email shortly."}</Muted>
                        </div>
                    </section>
                </div>
            </main>

            {/* Refresh on focus. */}

            <RefreshOnFocus />
        </>
    )
}
