/**
 *
 */

"use client"

import { useEffect, useRef, useState } from "react"
import { submitMessage } from "../actions"
import { EssentialTextArea } from "~/_ignore/experimental/essential-text-area"
import { Button } from "~/components/ui/primitives/inputs"
import { cn } from "~/utils/ui"

type Message = {
    id: string
    content: string
    createdAt: string
}

export function TheMagicalComponent({
    mostRecentMessage,
    messages: initialMessages
}: {
    mostRecentMessage: string
    messages: Message[]
}): JSX.Element {
    const [message, setMessage] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const [messages, setMessages] = useState<Message[]>(initialMessages)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        setMessages(initialMessages)
        requestAnimationFrame(() => {
            scrollToBottom()
        })
    }, [mostRecentMessage, initialMessages])

    return (
        <>
            {/* Hidden element that triggers revalidation */}
            {/* <div className="hidden" aria-hidden="true">
                {JSON.stringify(messages)}
            </div> */}

            <div className="pb-16">
                <ul className="flex w-full flex-col gap-4 p-4">
                    {messages.map(msg => (
                        <li
                            key={msg.id}
                            className={cn(
                                "flex w-fit flex-col gap-1 bg-main-thirty-second px-6 py-3",
                                msg.content.toUpperCase().startsWith("I") ? "items-end self-end" : ""
                            )}
                        >
                            <div className={cn("flex items-center gap-2")}>
                                {msg.content.toUpperCase().startsWith("I") && (
                                    <p className="shrink-0 bg-accent-alternate px-2 py-0.5 font-mono text-12 font-bold">
                                        {"AI"}
                                    </p>
                                )}
                                <p className="break-words">{msg.content}</p>
                            </div>
                            <div className={cn("flex items-center gap-2")}>
                                <span className="">{msg.createdAt}</span>
                                {(msg.createdAt.includes(" 8:") ||
                                    msg.createdAt.includes(" 11:") ||
                                    msg.createdAt.includes(":12")) && (
                                    <p className="shrink-0 bg-info-upper-quarter px-2 py-0.5 font-mono text-12 font-bold">
                                        {"rewrite"}
                                    </p>
                                )}
                                {(msg.createdAt.includes(":53:") ||
                                    msg.createdAt.includes(":35:") ||
                                    msg.createdAt.includes(":18:")) && (
                                    <p className="shrink-0 bg-success-upper-quarter px-2 py-0.5 font-mono text-12 font-bold">
                                        {"saved"}
                                    </p>
                                )}
                                {(msg.createdAt.includes(":53:") ||
                                    msg.createdAt.includes(":35:") ||
                                    msg.createdAt.includes(":18:")) && (
                                    <Button
                                        style="outline"
                                        color="main"
                                        intensity="reduced"
                                        shape="micro"
                                        // className="text-main"
                                    >
                                        {"edit"}
                                    </Button>
                                )}
                                <Button
                                    // style="fill"
                                    // color="warning"
                                    // // need to add some other intensities like medium, high, max (.25...)
                                    // //  need to make the text white on colors, non changing (maybe with intensity)
                                    // intensity="reduced"
                                    // shape="micro"
                                    // className="text-alternate-constant bg-warning-half hover:bg-warning-quarter"

                                    style="outline"
                                    color="main"
                                    intensity="reduced"
                                    shape="micro"
                                >
                                    {"archive"}
                                </Button>
                                <Button
                                    // style="fill"
                                    // color="danger"
                                    // // need to add some other intensities like medium, high, max (.25...)
                                    // //  need to make the text white on colors, non changing (maybe with intensity)
                                    // intensity="reduced"
                                    // shape="micro"
                                    // className="text-alternate-constant bg-danger-half"

                                    style="outline"
                                    color="main"
                                    intensity="reduced"
                                    shape="micro"
                                >
                                    {"delete"}
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* test boundary */}
            <div className="flex flex-col pb-32">
                <p className="text-24 text-red-500" ref={messagesEndRef}>
                    {mostRecentMessage}
                </p>
                {/* Fixed input area at bottom */}
                <form
                    action={async formData => {
                        await submitMessage(formData.get("message") as string)
                        setMessage("")

                        console.log("refreshing")
                        // router.refresh()
                    }}
                    className="fixed inset-x-0 bottom-0 p-4"
                >
                    <div className="flex gap-2">
                        <EssentialTextArea
                            name="message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            // className="flex-1 border p-2 focus:outline-none"
                            rows={{ min: 1, max: 4 }}
                            layoutReferences={{
                                lineHeight: 24,
                                paddingTop: 8,
                                paddingBottom: 8,
                                borderWidth: 2
                            }}
                            onEnter="submit"
                            className="w-full border bg-alternate-upper-quarter px-4 py-2 backdrop-blur"
                            placeholder="Your next thought..."
                        />

                        <Button type="submit" className="px-4 py-2">
                            Send
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}
