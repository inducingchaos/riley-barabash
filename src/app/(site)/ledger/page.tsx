/**
 *
 */

import { Entries } from "./_components"

export default function Ledger(): JSX.Element {
    return (
        <>
            <main className="flex flex-col items-center justify-center">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Title. */}

                        <h1>Ledger</h1>

                        {/* Functionality. */}

                        <Entries />
                    </section>
                </div>
            </main>
        </>
    )
}
