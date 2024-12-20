"use client"

import { type ChatRequestOptions, type Message } from "ai"
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { deleteTrailingMessages } from "~/app/experimental/ai-chat/(chat)/actions"
import { Button, TextArea } from "~/components/ui/primitives/inputs"
import { useUserMessageId } from "~/domains/ai-chat/hooks/use-user-message-id"

export type MessageEditorProps = {
    message: Message
    setModeAction: Dispatch<SetStateAction<"view" | "edit">>
    setMessagesAction: (messages: Message[] | ((messages: Message[]) => Message[])) => void
    reloadAction: (chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
}

export function MessageEditor({ message, setModeAction, setMessagesAction, reloadAction }: MessageEditorProps) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { userMessageIdFromServer } = useUserMessageId()
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const [draftContent, setDraftContent] = useState<string>(message.content)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if (textareaRef.current) {
            adjustHeight()
        }
    }, [])

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`
        }
    }

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDraftContent(event.target.value)
        adjustHeight()
    }

    return (
        <div className="flex w-full flex-col gap-8px">
            <TextArea
                ref={textareaRef}
                className="w-full resize-none overflow-hidden rounded-12px bg-transparent !text-16px outline-none"
                value={draftContent}
                onChange={handleInput}
            />

            <div className="flex flex-row justify-end gap-8px">
                <Button
                    style="outline"
                    className="h-fit px-12px py-8px"
                    onClick={() => {
                        setModeAction("view")
                    }}
                >
                    Cancel
                </Button>
                <Button
                    className="h-fit px-12px py-8px"
                    disabled={isSubmitting}
                    onClick={async () => {
                        setIsSubmitting(true)
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        const messageId = userMessageIdFromServer ?? message.id

                        if (!messageId) {
                            toast.error("Something went wrong, please try again!")
                            setIsSubmitting(false)
                            return
                        }

                        await deleteTrailingMessages({
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            id: messageId
                        })

                        setMessagesAction(messages => {
                            const index = messages.findIndex(m => m.id === message.id)

                            if (index !== -1) {
                                const updatedMessage = {
                                    ...message,
                                    content: draftContent
                                }

                                return [...messages.slice(0, index), updatedMessage]
                            }

                            return messages
                        })

                        setModeAction("view")
                        void reloadAction()
                    }}
                >
                    {isSubmitting ? "Sending..." : "Send"}
                </Button>
            </div>
        </div>
    )
}
