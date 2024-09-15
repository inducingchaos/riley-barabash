/**
 * @file The Kyzn start page.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 */

export default function Landing(): JSX.Element {
    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Content. */}

                        <p className="text-8xl font-bold tracking-tight">{"Kyzn start."}</p>
                    </section>
                </div>
            </main>
        </>
    )
}
