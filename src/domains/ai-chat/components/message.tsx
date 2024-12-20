"use client"

import type { ChatRequestOptions, Message } from "ai"
import cx from "classnames"
import { motion } from "framer-motion"
import { memo, useState, type Dispatch, type SetStateAction } from "react"

import type { Vote } from "~/domains/ai-chat/lib/db/schema"

import type { UIBlock } from "./block"
import { DocumentToolCall, DocumentToolResult } from "./document"
import { PencilEditIcon, SparklesIcon } from "./icons"
import { Markdown } from "./markdown"
import { MessageActions } from "./message-actions"
import { PreviewAttachment } from "./preview-attachment"
import { Weather } from "./weather"
import equal from "fast-deep-equal"
import { cn } from "~/domains/ai-chat/lib/utils"
import { Button } from "~/components/ui/primitives/inputs"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/primitives/indicators"
import { MessageEditor } from "./message-editor"

const PurePreviewMessage = ({
    chatId,
    message,
    block,
    setBlock,
    vote,
    isLoading,
    setMessages,
    reload,
    isReadonly
}: {
    chatId: string
    message: Message
    block: UIBlock
    setBlock: Dispatch<SetStateAction<UIBlock>>
    vote: Vote | undefined
    isLoading: boolean
    setMessages: (messages: Message[] | ((messages: Message[]) => Message[])) => void
    reload: (chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
    isReadonly: boolean
}) => {
    const [mode, setMode] = useState<"view" | "edit">("view")

    return (
        <motion.div
            className="group/message mx-auto w-full max-w-3xl px-16px"
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            data-role={message.role}
        >
            <div
                className={cn(
                    "flex w-full gap-16px group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl",
                    {
                        "w-full": mode === "edit",
                        "group-data-[role=user]/message:w-fit": mode !== "edit"
                    }
                )}
            >
                {message.role === "assistant" && (
                    <div className="flex size-32px shrink-0 items-center justify-center rounded-full ring-1 ring-main/eighth">
                        <SparklesIcon size={14} />
                    </div>
                )}

                <div className="flex w-full flex-col gap-8px">
                    {message.experimental_attachments && (
                        <div className="flex flex-row justify-end gap-8px">
                            {message.experimental_attachments.map(attachment => (
                                <PreviewAttachment key={attachment.url} attachment={attachment} />
                            ))}
                        </div>
                    )}

                    {message.content && mode === "view" && (
                        <div className="flex flex-row items-start gap-8px">
                            {message.role === "user" && !isReadonly && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            style="ghost"
                                            className="h-fit rounded-full px-8px text-main/half opacity-zero group-hover/message:opacity-full"
                                            onClick={() => {
                                                setMode("edit")
                                            }}
                                        >
                                            <PencilEditIcon />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Edit message</TooltipContent>
                                </Tooltip>
                            )}

                            <div
                                className={cn("flex flex-col gap-16px", {
                                    "rounded-12px bg-accent-constant px-12px py-8px text-alternate-constant":
                                        message.role === "user"
                                })}
                            >
                                <Markdown>{message.content}</Markdown>
                            </div>
                        </div>
                    )}

                    {message.content && mode === "edit" && (
                        <div className="flex flex-row items-start gap-8px">
                            <div className="size-32px" />

                            <MessageEditor
                                key={message.id}
                                message={message}
                                setModeAction={setMode}
                                setMessagesAction={setMessages}
                                reloadAction={reload}
                            />
                        </div>
                    )}

                    {message.toolInvocations && message.toolInvocations.length > 0 && (
                        <div className="flex flex-col gap-16px">
                            {message.toolInvocations.map(toolInvocation => {
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                const { toolName, toolCallId, state, args } = toolInvocation

                                if (state === "result") {
                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                    const { result } = toolInvocation

                                    return (
                                        <div key={toolCallId}>
                                            {toolName === "getWeather" ? (
                                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                                <Weather weatherAtLocation={result} />
                                            ) : toolName === "createDocument" ? (
                                                <DocumentToolResult
                                                    type="create"
                                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                                    result={result}
                                                    block={block}
                                                    setBlock={setBlock}
                                                    isReadonly={isReadonly}
                                                />
                                            ) : toolName === "updateDocument" ? (
                                                <DocumentToolResult
                                                    type="update"
                                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                                    result={result}
                                                    block={block}
                                                    setBlock={setBlock}
                                                    isReadonly={isReadonly}
                                                />
                                            ) : toolName === "requestSuggestions" ? (
                                                <DocumentToolResult
                                                    type="request-suggestions"
                                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                                    result={result}
                                                    block={block}
                                                    setBlock={setBlock}
                                                    isReadonly={isReadonly}
                                                />
                                            ) : (
                                                <pre>{JSON.stringify(result, null, 2)}</pre>
                                            )}
                                        </div>
                                    )
                                }
                                return (
                                    <div
                                        key={toolCallId}
                                        className={cx({
                                            skeleton: ["getWeather"].includes(toolName)
                                        })}
                                    >
                                        {toolName === "getWeather" ? (
                                            <Weather />
                                        ) : toolName === "createDocument" ? (
                                            <DocumentToolCall
                                                type="create"
                                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                                args={args}
                                                setBlock={setBlock}
                                                isReadonly={isReadonly}
                                            />
                                        ) : toolName === "updateDocument" ? (
                                            <DocumentToolCall
                                                type="update"
                                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                                args={args}
                                                setBlock={setBlock}
                                                isReadonly={isReadonly}
                                            />
                                        ) : toolName === "requestSuggestions" ? (
                                            <DocumentToolCall
                                                type="request-suggestions"
                                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                                args={args}
                                                setBlock={setBlock}
                                                isReadonly={isReadonly}
                                            />
                                        ) : null}
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {!isReadonly && (
                        <MessageActions
                            key={`action-${message.id}`}
                            chatId={chatId}
                            message={message}
                            vote={vote}
                            isLoading={isLoading}
                        />
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export const PreviewMessage = memo(PurePreviewMessage, (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false
    if (prevProps.isLoading && nextProps.isLoading) return false
    if (prevProps.message.content && nextProps.message.content) return false
    if (!equal(prevProps.vote, nextProps.vote)) return false
    return true
})

export const ThinkingMessage = () => {
    const role = "assistant"

    return (
        <motion.div
            className="group/message mx-auto w-full max-w-3xl px-16px"
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
            data-role={role}
        >
            <div
                className={cx(
                    "flex w-full gap-16px rounded-12px group-data-[role=user]/message:ml-auto group-data-[role=user]/message:w-fit group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:px-12px group-data-[role=user]/message:py-8px",
                    {
                        "group-data-[role=user]/message:bg-main/sixteenth": true
                    }
                )}
            >
                <div className="flex size-32px shrink-0 items-center justify-center rounded-full ring-1 ring-main/eighth">
                    <SparklesIcon size={14} />
                </div>

                <div className="flex w-full flex-col gap-8px">
                    <div className="flex flex-col gap-16px text-main/half">Thinking...</div>
                </div>
            </div>
        </motion.div>
    )
}
