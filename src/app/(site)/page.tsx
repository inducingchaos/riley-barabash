/**
 *
 */

import { Separator } from "@radix-ui/react-separator"
import Image from "next/image"
import Link from "next/link"
import { Button } from "~/components/ui/primitives/inputs"
import { H1, InlineCode, Muted } from "~/components/ui/primitives/typography"

export default async function Landing(): Promise<JSX.Element> {
    return (
        <>
            <main className="flex flex-col items-center justify-center">
                <div className="container">
                    <section className="flex min-h-screen flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-6">
                            <div className="relative h-24 w-24">
                                <Image
                                    src="/entities/riley-barabash/brand/pfp.jpg"
                                    alt="Profile Picture"
                                    fill
                                    className="rounded-xl object-cover"
                                />
                            </div>
                            <H1>{"My name is Riley."}</H1>
                            <InlineCode>{"X/IG: @inducingchaos"}</InlineCode>
                            <Muted>{"This won't last long. Take a look around."}</Muted>
                            <div className="flex flex-row gap-2">
                                <Button variant="destructive" asChild>
                                    <Link href="/experimental/test">{"Enter the testing grounds"}</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/kyzn">{"Kyzn"}</Link>
                                </Button>
                                <Button variant="default" asChild>
                                    <Link href="/solopreneurkit">{"SK"}</Link>
                                </Button>
                            </div>
                        </div>
                    </section>

                    <Separator className="my-8" />

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-8 text-center">
                            <H1>{"Rapid Iteration with AI"}</H1>
                            <div className="flex max-w-2xl flex-col gap-4">
                                <p className="text-xl">
                                    {"Experience the thrill of lightning-fast development with AI-assisted coding."}
                                </p>
                                <Muted>
                                    {
                                        "This entire section was crafted using Cursor, showcasing the power of AI in web development."
                                    }
                                </Muted>
                            </div>
                            <div className="flex flex-col items-center gap-6">
                                <div className="flex flex-row gap-4">
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-2xl font-bold">{"Quick Iterations"}</h3>
                                        <p>{"Prototype and refine ideas at unprecedented speeds"}</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <h3 className="text-2xl font-bold">{"Ship Faster"}</h3>
                                        <p>{"Reduce time-to-market with AI-powered development"}</p>
                                    </div>
                                </div>
                                <InlineCode>{"AI + Human Creativity = Limitless Possibilities"}</InlineCode>
                            </div>
                            <Button variant="default" size="lg">
                                {"Learn More About AI-Assisted Development"}
                            </Button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
