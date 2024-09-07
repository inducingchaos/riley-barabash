/**
 * @file The unauthenticated page.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #auth
 * #unauthenticated
 * #page
 * #tsx
 */

import { DelayedRedirect } from "~/components/ui/compositions/routing"

export default function Unauthenticated(): JSX.Element {
    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Redirect modal. */}

                        <DelayedRedirect title="401: Unauthenticated" description="You need to be signed in to access this page. Redirecting in 5 seconds..." buttonText="Go back" redirectUrl="/" />
                    </section>
                </div>
            </main>
        </>
    )
}
