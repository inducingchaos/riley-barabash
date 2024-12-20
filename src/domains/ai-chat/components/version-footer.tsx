"use client"

import { isAfter } from "date-fns"
import { motion } from "framer-motion"
import { useState } from "react"
import { useSWRConfig } from "swr"
import { useWindowSize } from "usehooks-ts"

import type { Document } from "~/domains/ai-chat/lib/db/schema"
import { getDocumentTimestampByIndex } from "~/domains/ai-chat/lib/utils"

import type { UIBlock } from "./block"
import { LoaderIcon } from "./icons"
import { Button } from "~/components/ui/primitives/inputs"

type VersionFooterProps = {
    block: UIBlock
    handleVersionChangeAction: (type: "next" | "prev" | "toggle" | "latest") => void
    documents: Array<Document> | undefined
    currentVersionIndex: number
}

export const VersionFooter = ({ block, handleVersionChangeAction, documents, currentVersionIndex }: VersionFooterProps) => {
    const { width } = useWindowSize()
    const isMobile = width < 768

    const { mutate } = useSWRConfig()
    const [isMutating, setIsMutating] = useState(false)

    if (!documents) return

    return (
        <motion.div
            className="absolute bottom-0px z-50 flex w-full flex-col justify-between gap-16px border-t bg-alternate p-16px lg:flex-row"
            initial={{ y: isMobile ? 200 : 77 }}
            animate={{ y: 0 }}
            exit={{ y: isMobile ? 200 : 77 }}
            transition={{ type: "spring", stiffness: 140, damping: 20 }}
        >
            <div>
                <div>You are viewing a previous version</div>
                <div className="text-14px text-main/half">Restore this version to make edits</div>
            </div>

            <div className="flex flex-row gap-16px">
                <Button
                    disabled={isMutating}
                    onClick={async () => {
                        setIsMutating(true)

                        void mutate(
                            `/experimental/ai-chat/api/document?id=${block.documentId}`,
                            await fetch(`/experimental/ai-chat/api/document?id=${block.documentId}`, {
                                method: "PATCH",
                                body: JSON.stringify({
                                    timestamp: getDocumentTimestampByIndex(documents, currentVersionIndex)
                                })
                            }),
                            {
                                optimisticData: documents
                                    ? [
                                          ...documents.filter(document =>
                                              isAfter(
                                                  new Date(document.createdAt),
                                                  new Date(getDocumentTimestampByIndex(documents, currentVersionIndex) ?? new Date())
                                              )
                                          )
                                      ]
                                    : []
                            }
                        )
                    }}
                >
                    <div>Restore this version</div>
                    {isMutating && (
                        <div className="animate-spin">
                            <LoaderIcon />
                        </div>
                    )}
                </Button>
                <Button
                    style="outline"
                    onClick={() => {
                        handleVersionChangeAction("latest")
                    }}
                >
                    Back to latest version
                </Button>
            </div>
        </motion.div>
    )
}
