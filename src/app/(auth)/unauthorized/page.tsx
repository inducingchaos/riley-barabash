/**
 * @file The unauthorized page.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #auth
 * #unauthorized
 * #page
 * #tsx
 */

import { DelayedRedirect } from "~/components/ui/compositions/routing"

export default function Unauthorized(): JSX.Element {
    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Redirect modal. */}

                        <DelayedRedirect
                            title="403: Unauthorized"
                            description="You don't have permission to access this page. You will be redirected in 5 seconds..."
                            buttonText="Go back"
                            redirectUrl="/"
                        />
                    </section>
                </div>
            </main>
        </>
    )
}
