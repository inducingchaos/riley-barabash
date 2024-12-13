/**
 *
 */

"use client"

import { useEffect, useRef, useState } from "react"
import { submitMessage } from "../actions"

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

            <div className="flex-1 overflow-y-auto pb-20">
                <ul className="space-y-2 p-4">
                    {messages.map(msg => (
                        <li key={msg.id} className="p-3">
                            <p className="break-words">{msg.content}</p>
                            <span className="">{msg.createdAt}</span>
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
                        <input
                            type="text"
                            name="message"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 border p-2 focus:outline-none"
                        />
                        <button type="submit" className="px-4 py-2">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
