"use client"

import type { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai"
import cx from "classnames"
import type React from "react"
import { memo, useCallback, useEffect, useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"
import { toast } from "sonner"
import { useLocalStorage, useWindowSize } from "usehooks-ts"

import { sanitizeUIMessages } from "~/domains/ai-chat/lib/utils"

import equal from "fast-deep-equal"
import { Button, TextArea } from "~/components/ui/primitives/inputs"
import { ArrowUpIcon, PaperclipIcon, StopIcon } from "./icons"
import { PreviewAttachment } from "./preview-attachment"
import { SuggestedActions } from "./suggested-actions"

function PureMultimodalInput({
    chatId,
    input,
    setInput,
    isLoading,
    stop,
    attachments,
    setAttachments,
    messages,
    setMessages,
    append,
    handleSubmit,
    className
}: {
    chatId: string
    input: string
    setInput: (value: string) => void
    isLoading: boolean
    stop: () => void
    attachments: Array<Attachment>
    setAttachments: Dispatch<SetStateAction<Array<Attachment>>>
    messages: Array<Message>
    setMessages: Dispatch<SetStateAction<Array<Message>>>
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
    handleSubmit: (
        event?: {
            preventDefault?: () => void
        },
        chatRequestOptions?: ChatRequestOptions
    ) => void
    className?: string
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const { width } = useWindowSize()

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

    const [localStorageInput, setLocalStorageInput] = useLocalStorage("input", "")

    useEffect(() => {
        if (textareaRef.current) {
            const domValue = textareaRef.current.value
            // Prefer DOM value over localStorage to handle hydration
            const finalValue = domValue || localStorageInput || ""
            setInput(finalValue)
            adjustHeight()
        }
        // Only run once after hydration
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setLocalStorageInput(input)
    }, [input, setLocalStorageInput])

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value)
        adjustHeight()
    }

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploadQueue, setUploadQueue] = useState<Array<string>>([])

    const submitForm = useCallback(() => {
        console.log("SUBMITTING")
        window.history.replaceState({}, "", `/experimental/ai-chat/chat/${chatId}`)

        handleSubmit(undefined, {
            experimental_attachments: attachments
        })

        setAttachments([])
        setLocalStorageInput("")

        if (width && width > 768) {
            textareaRef.current?.focus()
        }
    }, [attachments, handleSubmit, setAttachments, setLocalStorageInput, width, chatId])

    const uploadFile = async (file: File) => {
        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch("/experimental/ai-chat/api/files/upload", {
                method: "POST",
                body: formData
            })

            if (response.ok) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const data = await response.json()
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const { url, pathname, contentType } = data

                return {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    url,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    name: pathname,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    contentType: contentType
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { error } = await response.json()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            toast.error(error)
        } catch (error) {
            console.error("Error uploading files!", error)

            toast.error("Failed to upload file, please try again!")
        }
    }

    const handleFileChange = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(event.target.files ?? [])

            setUploadQueue(files.map(file => file.name))

            try {
                const uploadPromises = files.map(file => uploadFile(file))
                const uploadedAttachments = await Promise.all(uploadPromises)
                const successfullyUploadedAttachments = uploadedAttachments.filter(attachment => attachment !== undefined)

                setAttachments(currentAttachments => [...currentAttachments, ...successfullyUploadedAttachments])
            } catch (error) {
                console.error("Error uploading files!", error)
            } finally {
                setUploadQueue([])
            }
        },
        [setAttachments]
    )

    return (
        <div className="relative flex w-full flex-col gap-16px">
            {messages.length === 0 && attachments.length === 0 && uploadQueue.length === 0 && (
                <SuggestedActions append={append} chatId={chatId} />
            )}

            <input
                type="file"
                className="pointer-events-none fixed -left-16px -top-16px size-2px opacity-zero"
                ref={fileInputRef}
                multiple
                onChange={handleFileChange}
                tabIndex={-1}
            />

            {(attachments.length > 0 || uploadQueue.length > 0) && (
                <div className="flex flex-row items-end gap-8px overflow-x-scroll">
                    {attachments.map(attachment => (
                        <PreviewAttachment key={attachment.url} attachment={attachment} />
                    ))}

                    {uploadQueue.map(filename => (
                        <PreviewAttachment
                            key={filename}
                            attachment={{
                                url: "",
                                name: filename,
                                contentType: ""
                            }}
                            isUploading={true}
                        />
                    ))}
                </div>
            )}

            <TextArea
                ref={textareaRef}
                placeholder="Send a message..."
                value={input}
                onChange={handleInput}
                className={cx(
                    "max-h-[calc(75dvh)] min-h-[24px] resize-none overflow-hidden rounded-12px bg-main/sixteenth !text-16px",
                    className
                )}
                rows={3}
                autoFocus
                onKeyDown={event => {
                    if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault()

                        if (isLoading) {
                            toast.error("Please wait for the model to finish its response!")
                        } else {
                            submitForm()
                        }
                    }
                }}
            />

            {isLoading ? (
                <Button
                    className="absolute bottom-8px right-8px m-2px h-fit rounded-full border p-6px dark:border-zinc-600"
                    onClick={event => {
                        event.preventDefault()
                        stop()
                        setMessages(messages => sanitizeUIMessages(messages))
                    }}
                >
                    <StopIcon size={14} />
                </Button>
            ) : (
                <Button
                    className="absolute bottom-8px right-8px m-2px h-fit rounded-full border p-6px dark:border-zinc-600"
                    onClick={event => {
                        event.preventDefault()
                        submitForm()
                    }}
                    disabled={input.length === 0 || uploadQueue.length > 0}
                >
                    <ArrowUpIcon size={14} />
                </Button>
            )}

            <Button
                // was right-11
                className="absolute bottom-8px right-48px m-2px h-fit rounded-full p-6px dark:border-zinc-700"
                onClick={event => {
                    event.preventDefault()
                    fileInputRef.current?.click()
                }}
                style="outline"
                disabled={isLoading}
            >
                <PaperclipIcon size={14} />
            </Button>
        </div>
    )
}

export const MultimodalInput = memo(PureMultimodalInput, (prevProps, nextProps) => {
    if (prevProps.input !== nextProps.input) return false
    if (prevProps.isLoading !== nextProps.isLoading) return false
    if (!equal(prevProps.attachments, nextProps.attachments)) return false

    return true
})
