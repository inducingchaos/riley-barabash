/**
 *
 */

"use client"

import { useEffect, useOptimistic, useRef, useState } from "react"
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

    const [messages, addMessage] = useOptimistic<Message[], string>(initialMessages, (state, newMessage) => [
        ...state,
        {
            id: crypto.randomUUID(),
            content: newMessage,
            createdAt: new Date().toISOString()
        }
    ])

    // const [messages, setMessages] = useState<Message[]>(initialMessages)

    const scrollToBottom = () => {
        requestAnimationFrame(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        })
    }

    useEffect(() => {
        // setMessages(initialMessages)
        scrollToBottom()
    }, [mostRecentMessage, initialMessages])

    return (
        <>
            {/* Hidden element that triggers revalidation */}
            {/* <div className="hidden" aria-hidden="true">
                {JSON.stringify(messages)}
            </div> */}

            <div className="pb-64px">
                <ul className="flex w-full flex-col gap-16px p-16px">
                    {messages.map(msg => (
                        <li
                            key={msg.id}
                            className={cn(
                                "flex w-fit flex-col gap-4px px-24px py-12px",
                                msg.content.toUpperCase().startsWith("I") ? "items-end self-end bg-main/sixteenth" : "border"
                            )}
                        >
                            <div className={cn("flex items-center gap-8px")}>
                                {msg.content.toUpperCase().startsWith("I") && (
                                    <p className="shrink-0 bg-accent-alternate px-8px py-2px font-mono text-12px font-bold">
                                        {"AI"}
                                    </p>
                                )}
                                <p className="break-words">{msg.content}</p>
                            </div>
                            <div className={cn("flex items-center gap-8px")}>
                                <span className="">{msg.createdAt}</span>
                                {(msg.createdAt.includes(" 8:") ||
                                    msg.createdAt.includes(" 11:") ||
                                    msg.createdAt.includes(":12")) && (
                                    <p className="shrink-0 bg-info/-quarter px-8px py-2px font-mono text-12px font-bold">
                                        {"rewrite"}
                                    </p>
                                )}
                                {(msg.createdAt.includes(":53:") ||
                                    msg.createdAt.includes(":35:") ||
                                    msg.createdAt.includes(":18:")) && (
                                    <p className="shrink-0 bg-success/-quarter px-8px py-2px font-mono text-12px font-bold">
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
            <div className="flex flex-col pb-128px">
                <p className="text-24px text-red-500" ref={messagesEndRef}>
                    {mostRecentMessage}
                </p>
                {/* Fixed input area at bottom */}
                <form
                    action={async formData => {
                        const message = formData.get("message") as string
                        // Clear input immediately before any async operations
                        setMessage("")
                        addMessage(message)
                        scrollToBottom()
                        // Then do the server action
                        await submitMessage(message)
                    }}
                    onSubmit={() => setMessage("")}
                    className="fixed inset-x-0px bottom-0px p-16px"
                >
                    <div className="flex gap-8px">
                        <EssentialTextArea
                            name="message"
                            value={message}
                            onChange={e => {
                                setMessage(e.target.value)
                            }}
                            // className="flex-1 border p-8px focus:outline-none"
                            rows={{ min: 1, max: 4 }}
                            layoutReferences={{
                                lineHeight: 24,
                                paddingTop: 8,
                                paddingBottom: 8,
                                borderWidth: 2
                            }}
                            onEnter="submit"
                            className="w-full border bg-alternate/-quarter px-16px py-8px backdrop-blur"
                            placeholder="Your next thought..."
                        />

                        <Button type="submit" className="px-16px py-8px">
                            Send
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}
