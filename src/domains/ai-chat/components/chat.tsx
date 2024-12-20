"use client"

import type { Attachment, Message } from "ai"
import { useChat } from "ai/react"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import { useWindowSize } from "usehooks-ts"

import { ChatHeader } from "~/domains/ai-chat/components/chat-header"
import type { Vote } from "~/domains/ai-chat/lib/db/schema"
import { fetcher } from "~/domains/ai-chat/lib/utils"

import { Block, type UIBlock } from "./block"
import { BlockStreamHandler } from "./block-stream-handler"
import { MultimodalInput } from "./multimodal-input"
import { Messages } from "./messages"
import { type VisibilityType } from "./visibility-selector"

export function Chat({
    id,
    initialMessages,
    selectedModelId,
    selectedVisibilityType,
    isReadonly
}: {
    id: string
    initialMessages: Array<Message>
    selectedModelId: string
    selectedVisibilityType: VisibilityType
    isReadonly: boolean
}) {
    const { mutate } = useSWRConfig()

    const {
        messages,
        setMessages,
        handleSubmit,
        input,
        setInput,
        append,
        isLoading,
        stop,
        reload,
        data: streamingData
    } = useChat({
        id,
        body: { id, modelId: selectedModelId },
        initialMessages,
        api: "/experimental/ai-chat/api/chat",
        onFinish: () => {
            void mutate("/experimental/ai-chat/api/history")
        }
    })

    const { width: windowWidth = 1920, height: windowHeight = 1080 } = useWindowSize()

    const [block, setBlock] = useState<UIBlock>({
        documentId: "init",
        content: "",
        title: "",
        status: "idle",
        isVisible: false,
        boundingBox: {
            top: windowHeight / 4,
            left: windowWidth / 4,
            width: 250,
            height: 50
        }
    })

    const { data: votes } = useSWR<Array<Vote>>(`/experimental/ai-chat/api/vote?chatId=${id}`, fetcher)

    const [attachments, setAttachments] = useState<Array<Attachment>>([])

    return (
        <>
            <div className="flex h-dvh min-w-0px flex-col bg-alternate">
                <ChatHeader
                    chatId={id}
                    selectedModelId={selectedModelId}
                    selectedVisibilityType={selectedVisibilityType}
                    isReadonly={isReadonly}
                />

                <Messages
                    chatId={id}
                    block={block}
                    setBlock={setBlock}
                    isLoading={isLoading}
                    votes={votes}
                    messages={messages}
                    setMessages={setMessages}
                    reload={reload}
                    isReadonly={isReadonly}
                />

                <form className="mx-auto flex w-full gap-8px bg-alternate px-16px pb-16px md:max-w-3xl md:pb-24px">
                    {!isReadonly && (
                        <MultimodalInput
                            chatId={id}
                            input={input}
                            setInput={setInput}
                            handleSubmit={handleSubmit}
                            isLoading={isLoading}
                            stop={stop}
                            attachments={attachments}
                            setAttachments={setAttachments}
                            messages={messages}
                            setMessages={setMessages}
                            append={append}
                        />
                    )}
                </form>
            </div>

            <AnimatePresence>
                {block?.isVisible && (
                    <Block
                        chatId={id}
                        input={input}
                        setInput={setInput}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        stop={stop}
                        attachments={attachments}
                        setAttachments={setAttachments}
                        append={append}
                        block={block}
                        setBlock={setBlock}
                        messages={messages}
                        setMessages={setMessages}
                        reload={reload}
                        votes={votes}
                        isReadonly={isReadonly}
                    />
                )}
            </AnimatePresence>

            <BlockStreamHandler streamingData={streamingData} setBlock={setBlock} />
        </>
    )
}
