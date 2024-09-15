/**
 * @file A page for testing UI.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #app
 * #internal
 * #experimental
 * #test
 * #page
 * #tsx
 */

"use client"

import Link from "next/link"
import { ThemeToggle } from "~/components/ui/compositions/design"
import { Separator } from "~/components/ui/primitives/display"
import { Button } from "~/components/ui/primitives/inputs"
import { personal } from "~/config"
import { api } from "~/lib/infra/rpc/react"
import { createSenderIdentity } from "~/utils/comms/email"

export default function Test(): JSX.Element {
    const { mutate: sendSms, isPending: smsIsSending } = api.comms.sms.messages.send.useMutation()
    const { mutate: sendEmail, isPending: emailIsSending } = api.comms.email.messages.send.useMutation()
    return (
        <>
            {/* Main tag. */}

            <main className="flex flex-col items-center justify-center">
                {/* Container. */}

                <div className="container">
                    {/* Section one. */}

                    <section className="flex min-h-screen flex-col items-center justify-center">
                        {/* Wrapper. */}

                        <div className="flex flex-col items-center justify-center gap-4">
                            {/* Change the theme. */}

                            <ThemeToggle />

                            {/* If you wanna holla at my SMS (don't spam pls). */}

                            <Button
                                disabled={smsIsSending}
                                onClick={() => sendSms({ content: "Yolo, dude!", to: personal.contact.phone })}
                            >
                                {smsIsSending ? "YAHHH BUDDY!!!" : "Yolo, dude!"}
                            </Button>

                            {/* Email test? */}

                            <Button
                                variant="destructive"
                                disabled={emailIsSending}
                                onClick={() =>
                                    sendEmail({
                                        content: "Moolah!",
                                        to: personal.contact.email,
                                        subject: "From rileybarabash.com",
                                        from: createSenderIdentity({ email: "test@kyzn.app" })
                                    })
                                }
                            >
                                {emailIsSending ? "Sending email..." : "Something more formal"}
                            </Button>

                            {/* Go back. */}

                            <Button variant="outline" asChild>
                                <Link href="/">{"Go back"}</Link>
                            </Button>

                            {/* Divider. */}

                            <Separator />

                            {/* Dataset. */}

                            <Button variant="outline" asChild>
                                <Link href="/experimental/dataset">{"Dataset"}</Link>
                            </Button>

                            {/* Do. */}

                            <Button variant="outline" asChild>
                                <Link href="/experimental/do">{"Do"}</Link>
                            </Button>

                            {/* Ingest. */}

                            <Button variant="outline" asChild>
                                <Link href="/experimental/ingest">{"Ingest"}</Link>
                            </Button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
