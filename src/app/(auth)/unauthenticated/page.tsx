/**
 *
 */

import { DelayedRedirect } from "~/components/ui/compositions/routing"

export default function Unauthenticated(): JSX.Element {
    return (
        <>
            <main className="flex flex-col items-center justify-center">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Redirect modal. */}

                        <DelayedRedirect
                            title="401: Unauthenticated"
                            description="You need to be signed in to access this page. Redirecting in 5 seconds..."
                            buttonText="Sign in"
                            redirectUrl="/sign-in"
                        />
                    </section>
                </div>
            </main>
        </>
    )
}
