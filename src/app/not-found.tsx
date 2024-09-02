/**
 * @file The 404 / not found page.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #not-found
 * #component
 * #page
 * #tsx
 * #404
 */

export default function NotFound(): JSX.Element {
    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Content. */}

                        <p>Not found.</p>
                    </section>
                </div>
            </main>
        </>
    )
}
