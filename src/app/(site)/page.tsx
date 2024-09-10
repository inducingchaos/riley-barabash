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

import Link from "next/link"
import { Button } from "~/components/ui/primitives/inputs"
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
                            <H1>{"My name is Riley."}</H1>
                            <InlineCode>{"X/IG: @inducingchaos"}</InlineCode>
                            <Muted>{"This won't last long. Take a look around."}</Muted>
                            <div className="flex flex-row gap-2">
                                <Button variant="destructive" asChild>
                                    <Link href="/experimental/test">{"Enter the testing grounds"}</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/kyzn">{"Kyzn"}</Link>
                                </Button>
                                <Button variant="default" asChild>
                                    <Link href="/solopreneurkit">{"SK"}</Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
