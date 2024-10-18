/**
 *
 */

export default function Start(): JSX.Element {
    return (
        <>
            <main className="flex flex-col items-center justify-center">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center gap-8">
                        {Array.from({ length: 100 }, (_, index) => (
                            <p key={index}>{"This product is going to change the world."}</p>
                        ))}
                    </section>
                </div>
            </main>
        </>
    )
}
