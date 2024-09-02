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

export default async function Landing(): Promise<JSX.Element> {
    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Placeholder content. */}

                        <h1 className="bg-gradient-to-r from-black/50 to-black bg-clip-text text-3xl font-bold tracking-tight text-transparent">{"My name is Riley Barabash."}</h1>
                    </section>
                </div>
            </main>
        </>
    )
}
