/**
 *
 */

export default function Page(): JSX.Element {
    return (
        <>
            <main className="flex flex-col items-center justify-center">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center">
                        <p className="font-mono font-thin">100: Px Grotesk in thin</p>
                        <p className="font-mono font-extralight">200: Px Grotesk in extralight</p>
                        <p className="font-mono font-light">300: Px Grotesk in light</p>
                        <p className="font-mono font-normal">400: Px Grotesk in normal</p>
                        <p className="font-mono font-medium">500: Px Grotesk in medium</p>
                        <p className="font-mono font-semibold">600: Px Grotesk in semibold</p>
                        <p className="font-mono font-bold">700: Px Grotesk in bold</p>
                        <p className="font-mono font-extrabold">800: Px Grotesk in extrabold</p>
                        <p className="font-mono font-black">900: Px Grotesk in black</p>
                    </section>
                </div>
            </main>
        </>
    )
}
