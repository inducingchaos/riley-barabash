/**
 * @file The sign-in page.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #auth
 * #sign-in
 * #page
 * #tsx
 *
 * @todo
 * - [P1] Get the auth session and redirect to the callback URL if the user is authenticated.
 */

import Link from "next/link"
import { H3, Muted } from "~/components/ui/primitives/typography"
import { application } from "~/config"
import { SignInProviderGroup } from "./_components"

export default function SignIn({ searchParams: _ }: { searchParams: { "callback-url"?: string } }): JSX.Element {
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

                        <div className="flex w-96 flex-col justify-center gap-6">
                            {/* Text. */}

                            <div className="flex flex-col gap-2 text-center">
                                {/* Heading. */}

                                <H3>{"Sign In"}</H3>

                                {/* Subheading. */}

                                <Muted>
                                    {
                                        "Enter your email below to access your account. If you're new here, we'll create one for you."
                                    }
                                </Muted>
                            </div>

                            {/* Sign-in providers. */}

                            <SignInProviderGroup />

                            {/* Disclosure. */}

                            <Muted className="px-8 text-center">
                                {"By creating an account, you agree to our "}
                                <Link
                                    href={application.routing.paths.pages.legal.termsOfService}
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    {"Terms of Service"}
                                </Link>
                                {" and "}
                                <Link
                                    href={application.routing.paths.pages.legal.privacyPolicy}
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    {"Privacy Policy"}
                                </Link>
                                {"."}
                            </Muted>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
