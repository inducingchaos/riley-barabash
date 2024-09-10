/**
 * @file A page for the ledger.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #ledger
 * #page
 * #component
 */

import { Entries } from "./_components"

export default function Ledger(): JSX.Element {
    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Heading. */}

                        <h1>Ledger</h1>

                        {/* Entries. */}

                        <Entries />
                    </section>
                </div>
            </main>
        </>
    )
}
