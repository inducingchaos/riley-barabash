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
    handleVersionChange: (type: "next" | "prev" | "toggle" | "latest") => void
    documents: Array<Document> | undefined
    currentVersionIndex: number
}

export const VersionFooter = ({ block, handleVersionChange, documents, currentVersionIndex }: VersionFooterProps) => {
    const { width } = useWindowSize()
    const isMobile = width < 768

    const { mutate } = useSWRConfig()
    const [isMutating, setIsMutating] = useState(false)

    if (!documents) return

    return (
        <motion.div
            className="bg-alternate absolute bottom-0 z-50 flex w-full flex-col justify-between gap-4 border-t p-4 lg:flex-row"
            initial={{ y: isMobile ? 200 : 77 }}
            animate={{ y: 0 }}
            exit={{ y: isMobile ? 200 : 77 }}
            transition={{ type: "spring", stiffness: 140, damping: 20 }}
        >
            <div>
                <div>You are viewing a previous version</div>
                <div className="text-muted-foreground text-14">Restore this version to make edits</div>
            </div>

            <div className="flex flex-row gap-4">
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
                                                  new Date(getDocumentTimestampByIndex(documents, currentVersionIndex))
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
                        handleVersionChange("latest")
                    }}
                >
                    Back to latest version
                </Button>
            </div>
        </motion.div>
    )
}
