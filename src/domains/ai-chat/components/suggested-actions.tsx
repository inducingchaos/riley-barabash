"use client"

import { motion } from "framer-motion"
import { Button } from "~/components/ui/primitives/inputs"
import { type ChatRequestOptions, type CreateMessage, type Message } from "ai"
import { memo } from "react"

type SuggestedActionsProps = {
    chatId: string
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
    const suggestedActions = [
        {
            title: "What is the weather",
            label: "in San Francisco?",
            action: "What is the weather in San Francisco?"
        },
        {
            title: "Help me draft an essay",
            label: "about Silicon Valley",
            action: "Help me draft a short essay about Silicon Valley"
        }
    ]

    return (
        <div className="grid w-full gap-8px sm:grid-cols-2">
            {suggestedActions.map((suggestedAction, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.05 * index }}
                    key={`suggested-action-${suggestedAction.title}-${index}`}
                    className={index > 1 ? "hidden sm:block" : "block"}
                >
                    <Button
                        style="ghost"
                        onClick={async () => {
                            window.history.replaceState({}, "", `/experimental/ai-chat/chat/${chatId}`)

                            void append({
                                role: "user",
                                content: suggestedAction.action
                            })
                        }}
                        // was py-3.5
                        className="h-auto w-full flex-1 items-start justify-start gap-4px rounded-12px border p-16px text-left text-14px sm:flex-col"
                    >
                        <span className="font-medium">{suggestedAction.title}</span>
                        <span className="text-main/half">{suggestedAction.label}</span>
                    </Button>
                </motion.div>
            ))}
        </div>
    )
}

export const SuggestedActions = memo(PureSuggestedActions, () => true)
