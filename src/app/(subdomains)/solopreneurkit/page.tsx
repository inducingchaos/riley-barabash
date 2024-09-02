/**
 * @file The SolopreneurKit home page.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #component
 * #page
 * #tsx
 * #src
 * #app
 * #subdomains
 * #solopreneurkit
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

                        <p>Welcome to SolopreneurKit.</p>
                    </section>
                </div>
            </main>
        </>
    )
}
