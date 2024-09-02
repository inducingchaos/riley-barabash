/**
 * @file A page for testing UI.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #internal
 * #experimental
 * #test
 * #page
 * #tsx
 */

import { Button } from "~/components/ui/primitives"

export default function Test(): JSX.Element {
    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Content. */}

                        <Button>Yolo, dude!</Button>
                    </section>
                </div>
            </main>
        </>
    )
}
