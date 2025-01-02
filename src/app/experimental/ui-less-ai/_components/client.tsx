/**
 *
 */

"use client"

import { useEffect, useOptimistic, useRef, useState } from "react"
import { submitMessage, updateMessage, deleteMessage } from "../actions"
import { EssentialTextArea } from "~/_ignore/experimental/essential-text-area"
import { Button } from "~/components/ui/primitives/inputs"
import { cn } from "~/utils/ui"

type Message = {
    id: string
    content: string
    createdAt: string
    role: string
}

type OptimisticAction =
    | { type: "add"; content: string; role: string }
    | { type: "edit"; id: string; content: string }
    | { type: "delete"; id: string }

export function TheMagicalComponent({
    messages: initialMessages
}: {
    mostRecentMessage: string
    messages: Message[]
}): JSX.Element {
    const [message, setMessage] = useState("")
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
    const [isAltPressed, setIsAltPressed] = useState(false)
    const [isCmdPressed, setIsCmdPressed] = useState(false)

    const [messages, optimisticallyUpdateMessages] = useOptimistic<Message[], OptimisticAction>(
        initialMessages,
        (state, action) => {
            switch (action.type) {
                case "add":
                    return [
                        ...state,
                        {
                            id: crypto.randomUUID(),
                            content: action.content,
                            role: action.role,
                            createdAt: new Date().toISOString()
                        }
                    ]
                case "edit":
                    return state.map(msg => (msg.id === action.id ? { ...msg, content: action.content } : msg))
                case "delete":
                    return state.filter(msg => msg.id !== action.id)
            }
        }
    )

    const [editingMessageContent, setEditingMessageContent] = useState("")

    // const [messages, setMessages] = useState<Message[]>(initialMessages)

    const scrollToBottom = () => {
        requestAnimationFrame(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        })
    }

    useEffect(() => {
        // not needed if message editor is in its own component
        if (editingMessageId) {
            setEditingMessageContent(messages.find(msg => msg.id === editingMessageId)?.content ?? "")
        }
    }, [editingMessageId, messages])

    useEffect(() => {
        // setMessages(initialMessages)
        scrollToBottom()
    }, [initialMessages])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.altKey) setIsAltPressed(true)
            if (e.metaKey) setIsCmdPressed(true)
        }
        const handleKeyUp = (e: KeyboardEvent) => {
            if (!e.altKey) setIsAltPressed(false)
            if (!e.metaKey) setIsCmdPressed(false)
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    return (
        <>
            <div className="w-full pb-32px lg:max-w-640px">
                <ul className="flex w-full flex-col gap-16px p-16px">
                    {messages.map(msg => (
                        <li
                            key={msg.id}
                            className={cn(
                                "group flex w-full flex-col gap-8px border-l-2x px-24px py-8px transition-colors duration-zero hover:border-main/3-32",
                                msg.role === "assistant" && "border-main hover:border-main/-quarter"
                            )}
                        >
                            <form
                                action={async formData => {
                                    const action = formData.get("action")
                                    if (action === "delete") {
                                        optimisticallyUpdateMessages({ type: "delete", id: msg.id })
                                        await deleteMessage(msg.id)
                                        return
                                    }

                                    const content = formData.get("message") as string
                                    optimisticallyUpdateMessages({
                                        type: "edit",
                                        id: msg.id,
                                        content
                                    })
                                    await updateMessage(msg.id, content)
                                }}
                                onSubmit={_ => {
                                    setEditingMessageContent("")
                                    setEditingMessageId(null)
                                }}
                                className="flex w-full flex-col gap-8px"
                            >
                                {editingMessageId === msg.id ? (
                                    <div className="flex w-full flex-col gap-8px">
                                        <EssentialTextArea
                                            name="message"
                                            value={editingMessageContent}
                                            onChange={e => setEditingMessageContent(e.target.value)}
                                            rows={{ min: 1, max: 9999 }}
                                            layoutReferences={{
                                                lineHeight: 24,
                                                paddingTop: 8,
                                                paddingBottom: 8,
                                                borderWidth: 2
                                            }}
                                            onEscape={() => setEditingMessageId(null)}
                                            focusOnMount
                                            className="w-full border bg-alternate/-quarter px-16px py-8px font-light"
                                        />
                                    </div>
                                ) : (
                                    <div className={cn("flex w-full items-center gap-8px")}>
                                        <p className="whitespace-pre-wrap break-words font-light tracking-wide">
                                            {msg.role === "assistant" && (
                                                <span className="inline-flex align-text-top">
                                                    <span className="bg-accent-alternate px-8px py-2px font-mono text-12px font-bold">
                                                        {"AI"}
                                                    </span>
                                                    <span className="w-8px" />
                                                </span>
                                            )}
                                            {msg.content}
                                        </p>
                                    </div>
                                )}
                                <div className={cn("flex w-full items-center justify-between gap-8px")}>
                                    <span className="text-14px font-bold tracking-wide text-main/quarter">
                                        {"2024-12-25, 8:40 PM"}
                                    </span>
                                    {/* <Separator className="w-40px shrink" /> */}
                                    <div className="pointer-events-none flex items-center gap-8px opacity-zero transition-opacity duration-zero focus-within:opacity-full group-hover:pointer-events-auto group-hover:opacity-full">
                                        {editingMessageId === msg.id ? (
                                            <>
                                                <Button
                                                    style="outline"
                                                    color="main"
                                                    intensity="reduced"
                                                    shape="micro"
                                                    onClick={() => setEditingMessageId(null)}
                                                >
                                                    {"cancel"}
                                                </Button>
                                                <Button
                                                    name="save"
                                                    type="submit"
                                                    style="outline"
                                                    color="main"
                                                    intensity="reduced"
                                                    shape="micro"
                                                >
                                                    {"save"}
                                                </Button>
                                            </>
                                        ) : (
                                            <>
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
                                                <Button
                                                    style="outline"
                                                    color="main"
                                                    intensity="reduced"
                                                    shape="micro"
                                                    onClick={() => setEditingMessageId(msg.id)}
                                                >
                                                    {"edit"}
                                                </Button>
                                                <Button
                                                    style="outline"
                                                    color="main"
                                                    intensity="reduced"
                                                    shape="micro"
                                                    name="action"
                                                    value="delete"
                                                    type="submit"
                                                >
                                                    {"delete"}
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </li>
                    ))}
                </ul>
            </div>

            {/* test boundary */}
            <div className="flex flex-col items-center pb-128px">
                <div ref={messagesEndRef} />

                {/* Fixed input area at bottom */}
                <div className="fixed bottom-0px flex w-full justify-center p-16px">
                    <form
                        action={async formData => {
                            const message = formData.get("message") as string

                            if (!message.trim()) {
                                if (isAltPressed) return // Don't do anything if empty and alt is pressed
                                if (!isCmdPressed) return // Don't do anything if empty and cmd not pressed

                                // For generate, just add a placeholder AI message
                                optimisticallyUpdateMessages({
                                    type: "add",
                                    content: "...",
                                    role: "assistant"
                                })
                                scrollToBottom()
                                await submitMessage(messages, { generateOnly: true })
                                return
                            }

                            // Add user message and maybe placeholder AI message
                            const updatedMessages = [
                                ...messages,
                                {
                                    id: crypto.randomUUID(),
                                    content: message,
                                    role: "user",
                                    createdAt: new Date().toISOString()
                                }
                            ]

                            optimisticallyUpdateMessages({ type: "add", content: message, role: "user" })

                            if (!isAltPressed) {
                                optimisticallyUpdateMessages({
                                    type: "add",
                                    content: "...",
                                    role: "assistant"
                                })
                                await submitMessage(updatedMessages)
                            } else {
                                await submitMessage(updatedMessages, { addOnly: true })
                            }

                            scrollToBottom()
                        }}
                        onSubmit={_ => setMessage("")}
                        className="w-640px"
                    >
                        <div className="flex gap-8px">
                            <EssentialTextArea
                                name="message"
                                value={message}
                                onChange={e => {
                                    setMessage(e.target.value)
                                }}
                                rows={{ min: 1, max: 4 }}
                                layoutReferences={{
                                    lineHeight: 24,
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    borderWidth: 2
                                }}
                                onEnter="submit"
                                allowEmptySubmit={isCmdPressed}
                                className="w-full border bg-alternate/-quarter px-16px py-8px font-light backdrop-blur placeholder:font-normal"
                                placeholder="Your next thought..."
                            />

                            <Button
                                type="submit"
                                className="px-16px py-8px backdrop-blur disabled:text-main/half disabled:opacity-full disabled:backdrop-blur"
                                disabled={!message.trim() && !isCmdPressed}
                                intensity={!message.trim() && !isCmdPressed ? "reduced" : undefined}
                            >
                                {message.trim() ? (isAltPressed ? "Add" : "Send") : isCmdPressed ? "Generate" : "Send"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
