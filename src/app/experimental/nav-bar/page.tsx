/**
 * @file Test.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #component
 * #page
 * #tsx
 */

export default function Page(): JSX.Element {
    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Content. */}

                        <p>Test.</p>
                    </section>
                </div>
            </main>
        </>
    )
}
