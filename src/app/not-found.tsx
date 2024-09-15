/**
 *
 */

import { DelayedRedirect } from "~/components/ui/compositions/routing"

export default function NotFound(): JSX.Element {
    return (
        <>
            <main className="flex flex-col items-center justify-center">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Redirect modal. */}

                        <DelayedRedirect
                            title="404: Not Found"
                            description="The page you are looking for does not exist. Redirecting in 5 seconds..."
                            buttonText="Go back"
                            redirectUrl="/"
                        />
                    </section>
                </div>
            </main>
        </>
    )
}
