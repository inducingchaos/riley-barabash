/**
 * @file The landing page.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #page
 * #marketing
 * #home
 * #landing
 * #tsx
 */

import { H1, InlineCode, Muted } from "~/components/ui/primitives/typography"

export default async function Landing(): Promise<JSX.Element> {
    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Content. */}

                        <div className="flex flex-col items-center justify-center gap-4">
                            <H1>{"My name is Riley Barabash."}</H1>
                            <InlineCode>{"X: @inducingchaos"}</InlineCode>
                            <Muted>{"This won't last long. Take a look around."}</Muted>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
