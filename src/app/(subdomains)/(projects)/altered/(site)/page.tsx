/**
 *
 */

export default function Landing(): JSX.Element {
    return (
        <>
            <main className="flex flex-col items-center justify-center">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center">
                        <div className="flex w-full">
                            <div className="flex flex-col">
                                <p className="text-96 w-2/3 font-bold">
                                    {"Creative systems for the "}
                                    <span className="text-accent-neutral">{"obsessed."}</span>
                                </p>
                            </div>
                            <div className="flex w-1/3 items-center justify-center">
                                <p>Content at the speed of thought.</p>
                            </div>
                        </div>
                    </section>
                    <section className="flex min-h-screen flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                            {Array.from({ length: 50 }).map((_, index) => (
                                <p key={index}>This is a test.</p>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
