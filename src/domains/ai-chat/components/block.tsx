import type { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai"
import { formatDistance } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"
import { type Dispatch, memo, type SetStateAction, useCallback, useEffect, useState } from "react"
import useSWR, { useSWRConfig } from "swr"
import { useDebounceCallback, useWindowSize } from "usehooks-ts"

import type { Document, Suggestion, Vote } from "~/domains/ai-chat/lib/db/schema"
import { fetcher } from "~/domains/ai-chat/lib/utils"

import { DiffView } from "./diffview"
import { DocumentSkeleton } from "./document-skeleton"
import { Editor } from "./editor"
import { MultimodalInput } from "./multimodal-input"
import { Toolbar } from "./toolbar"
import { VersionFooter } from "./version-footer"
import { BlockActions } from "./block-actions"
import { BlockCloseButton } from "./block-close-button"
import { BlockMessages } from "./block-messages"

export type UIBlock = {
    title: string
    documentId: string
    content: string
    isVisible: boolean
    status: "streaming" | "idle"
    boundingBox: {
        top: number
        left: number
        width: number
        height: number
    }
}

function PureBlock({
    chatId,
    input,
    setInput,
    handleSubmit,
    isLoading,
    stop,
    attachments,
    setAttachments,
    append,
    block,
    setBlock,
    messages,
    setMessages,
    reload,
    votes,
    isReadonly
}: {
    chatId: string
    input: string
    setInput: (input: string) => void
    isLoading: boolean
    stop: () => void
    attachments: Array<Attachment>
    setAttachments: Dispatch<SetStateAction<Array<Attachment>>>
    block: UIBlock
    setBlock: Dispatch<SetStateAction<UIBlock>>
    messages: Array<Message>
    setMessages: Dispatch<SetStateAction<Array<Message>>>
    votes: Array<Vote> | undefined
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
    handleSubmit: (
        event?: {
            preventDefault?: () => void
        },
        chatRequestOptions?: ChatRequestOptions
    ) => void
    reload: (chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
    isReadonly: boolean
}) {
    const {
        data: documents,
        isLoading: isDocumentsFetching,
        mutate: mutateDocuments
    } = useSWR<Array<Document>>(
        block && block.status !== "streaming" ? `/experimental/ai-chat/api/document?id=${block.documentId}` : null,
        fetcher
    )

    const { data: suggestions } = useSWR<Array<Suggestion>>(
        documents && block && block.status !== "streaming"
            ? `/experimental/ai-chat/api/suggestions?documentId=${block.documentId}`
            : null,
        fetcher,
        {
            dedupingInterval: 5000
        }
    )

    const [mode, setMode] = useState<"edit" | "diff">("edit")
    const [document, setDocument] = useState<Document | null>(null)
    const [currentVersionIndex, setCurrentVersionIndex] = useState(-1)

    useEffect(() => {
        if (documents && documents.length > 0) {
            const mostRecentDocument = documents.at(-1)

            if (mostRecentDocument) {
                setDocument(mostRecentDocument)
                setCurrentVersionIndex(documents.length - 1)
                setBlock(currentBlock => ({
                    ...currentBlock,
                    content: mostRecentDocument.content ?? ""
                }))
            }
        }
    }, [documents, setBlock])

    useEffect(() => {
        void mutateDocuments()
    }, [block.status, mutateDocuments])

    const { mutate } = useSWRConfig()
    const [isContentDirty, setIsContentDirty] = useState(false)

    const handleContentChange = useCallback(
        (updatedContent: string) => {
            if (!block) return

            void mutate<Array<Document>>(
                `/experimental/ai-chat/api/document?id=${block.documentId}`,
                async currentDocuments => {
                    if (!currentDocuments) return undefined

                    const currentDocument = currentDocuments.at(-1)

                    if (!currentDocument?.content) {
                        setIsContentDirty(false)
                        return currentDocuments
                    }

                    if (currentDocument.content !== updatedContent) {
                        await fetch(`/experimental/ai-chat/api/document?id=${block.documentId}`, {
                            method: "POST",
                            body: JSON.stringify({
                                title: block.title,
                                content: updatedContent
                            })
                        })

                        setIsContentDirty(false)

                        const newDocument = {
                            ...currentDocument,
                            content: updatedContent,
                            createdAt: new Date()
                        }

                        return [...currentDocuments, newDocument]
                    }
                    return currentDocuments
                },
                { revalidate: false }
            )
        },
        [block, mutate]
    )

    const debouncedHandleContentChange = useDebounceCallback(handleContentChange, 2000)

    const saveContent = useCallback(
        (updatedContent: string, debounce: boolean) => {
            if (document && updatedContent !== document.content) {
                setIsContentDirty(true)

                if (debounce) {
                    debouncedHandleContentChange(updatedContent)
                } else {
                    handleContentChange(updatedContent)
                }
            }
        },
        [document, debouncedHandleContentChange, handleContentChange]
    )

    function getDocumentContentById(index: number) {
        if (!documents) return ""
        if (!documents[index]) return ""
        return documents[index].content ?? ""
    }

    const handleVersionChange = (type: "next" | "prev" | "toggle" | "latest") => {
        if (!documents) return

        if (type === "latest") {
            setCurrentVersionIndex(documents.length - 1)
            setMode("edit")
        }

        if (type === "toggle") {
            setMode(mode => (mode === "edit" ? "diff" : "edit"))
        }

        if (type === "prev") {
            if (currentVersionIndex > 0) {
                setCurrentVersionIndex(index => index - 1)
            }
        } else if (type === "next") {
            if (currentVersionIndex < documents.length - 1) {
                setCurrentVersionIndex(index => index + 1)
            }
        }
    }

    const [isToolbarVisible, setIsToolbarVisible] = useState(false)

    /*
     * NOTE: if there are no documents, or if
     * the documents are being fetched, then
     * we mark it as the current version.
     */

    const isCurrentVersion = documents && documents.length > 0 ? currentVersionIndex === documents.length - 1 : true

    const { width: windowWidth, height: windowHeight } = useWindowSize()
    const isMobile = windowWidth ? windowWidth < 768 : false

    return (
        <motion.div
            className="fixed left-0px top-0px z-50 flex h-dvh w-dvw flex-row bg-main/sixteenth"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.4 } }}
        >
            {!isMobile && (
                <motion.div
                    className="relative h-dvh w-[400px] shrink-0 bg-main/sixteenth dark:bg-alternate"
                    initial={{ opacity: 0, x: 10, scale: 1 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200,
                            damping: 30
                        }
                    }}
                    exit={{
                        opacity: 0,
                        x: 0,
                        scale: 0.95,
                        transition: { delay: 0 }
                    }}
                >
                    <AnimatePresence>
                        {!isCurrentVersion && (
                            <motion.div
                                className="absolute left-0px top-0px z-50 h-dvh w-[400px] bg-main/half"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />
                        )}
                    </AnimatePresence>

                    <div className="flex h-full flex-col items-center justify-between gap-16px">
                        <BlockMessages
                            chatId={chatId}
                            block={block}
                            isLoading={isLoading}
                            setBlock={setBlock}
                            votes={votes}
                            messages={messages}
                            setMessages={setMessages}
                            reload={reload}
                            isReadonly={isReadonly}
                        />

                        <form className="relative flex w-full flex-row items-end gap-8px px-16px pb-16px">
                            <MultimodalInput
                                chatId={chatId}
                                input={input}
                                setInput={setInput}
                                handleSubmit={handleSubmit}
                                isLoading={isLoading}
                                stop={stop}
                                attachments={attachments}
                                setAttachments={setAttachments}
                                messages={messages}
                                append={append}
                                className="bg-alternate dark:bg-main/sixteenth"
                                setMessages={setMessages}
                            />
                        </form>
                    </div>
                </motion.div>
            )}

            <motion.div
                className="fixed flex h-dvh flex-col overflow-y-scroll bg-alternate shadow-xl dark:bg-main/sixteenth"
                initial={
                    isMobile
                        ? {
                              opacity: 0,
                              x: 0,
                              y: 0,
                              width: windowWidth,
                              height: windowHeight,
                              borderRadius: 50
                          }
                        : {
                              opacity: 0,
                              x: block.boundingBox.left,
                              y: block.boundingBox.top,
                              height: block.boundingBox.height,
                              width: block.boundingBox.width,
                              borderRadius: 50
                          }
                }
                animate={
                    isMobile
                        ? {
                              opacity: 1,
                              x: 0,
                              y: 0,
                              width: windowWidth,
                              height: "100dvh",
                              borderRadius: 0,
                              transition: {
                                  delay: 0,
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 30
                              }
                          }
                        : {
                              opacity: 1,
                              x: 400,
                              y: 0,
                              height: windowHeight,
                              width: windowWidth ? windowWidth - 400 : "calc(100dvw-400px)",
                              borderRadius: 0,
                              transition: {
                                  delay: 0,
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 30
                              }
                          }
                }
                exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: {
                        delay: 0.1,
                        type: "spring",
                        stiffness: 600,
                        damping: 30
                    }
                }}
            >
                <div className="flex flex-row items-start justify-between p-8px">
                    <div className="flex flex-row items-start gap-16px">
                        <BlockCloseButton setBlock={setBlock} />

                        <div className="flex flex-col">
                            <div className="font-medium">{document?.title ?? block.title}</div>

                            {isContentDirty ? (
                                <div className="text-14px text-main/half">Saving changes...</div>
                            ) : document ? (
                                <div className="text-14px text-main/half">
                                    {`Updated ${formatDistance(new Date(document.createdAt), new Date(), {
                                        addSuffix: true
                                    })}`}
                                </div>
                            ) : (
                                <div className="mt-8px h-12px w-128px animate-pulse rounded-6px bg-main/eighth" />
                            )}
                        </div>
                    </div>

                    <BlockActions
                        block={block}
                        currentVersionIndex={currentVersionIndex}
                        handleVersionChange={handleVersionChange}
                        isCurrentVersion={isCurrentVersion}
                        mode={mode}
                    />
                </div>

                {/* was pb-192px, p-20. */}
                <div className="prose h-full !max-w-full items-center overflow-y-scroll bg-alternate px-16px py-32px pb-192px dark:prose-invert dark:bg-main/sixteenth md:p-96px">
                    <div className="mx-auto flex max-w-[600px] flex-row">
                        {isDocumentsFetching && !block.content ? (
                            <DocumentSkeleton />
                        ) : mode === "edit" ? (
                            <Editor
                                content={isCurrentVersion ? block.content : getDocumentContentById(currentVersionIndex)}
                                isCurrentVersion={isCurrentVersion}
                                currentVersionIndex={currentVersionIndex}
                                status={block.status}
                                saveContent={saveContent}
                                suggestions={isCurrentVersion ? (suggestions ?? []) : []}
                            />
                        ) : (
                            <DiffView
                                oldContent={getDocumentContentById(currentVersionIndex - 1)}
                                newContent={getDocumentContentById(currentVersionIndex)}
                            />
                        )}

                        {suggestions ? <div className="h-dvh w-48px shrink-0 md:hidden" /> : null}

                        <AnimatePresence>
                            {isCurrentVersion && (
                                <Toolbar
                                    isToolbarVisible={isToolbarVisible}
                                    setIsToolbarVisible={setIsToolbarVisible}
                                    append={append}
                                    isLoading={isLoading}
                                    stop={stop}
                                    setMessages={setMessages}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <AnimatePresence>
                    {!isCurrentVersion && (
                        <VersionFooter
                            block={block}
                            currentVersionIndex={currentVersionIndex}
                            documents={documents}
                            handleVersionChangeAction={handleVersionChange}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}

export const Block = memo(PureBlock, (_prevProps, _nextProps) => {
    return false
})
