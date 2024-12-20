"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useWindowSize } from "usehooks-ts"

import type { UISuggestion } from "~/domains/ai-chat/lib/editor/suggestions"

import { CrossIcon, MessageIcon } from "./icons"
import { Button } from "~/components/ui/primitives/inputs"

export const Suggestion = ({ suggestion, onApplyAction }: { suggestion: UISuggestion; onApplyAction: () => void }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const { width: windowWidth } = useWindowSize()

    return (
        <AnimatePresence>
            {!isExpanded ? (
                <motion.div
                    className="absolute -right-32px cursor-pointer p-4px text-main/half"
                    onClick={() => {
                        setIsExpanded(true)
                    }}
                    whileHover={{ scale: 1.1 }}
                >
                    <MessageIcon size={windowWidth && windowWidth < 768 ? 16 : 14} />
                </motion.div>
            ) : (
                <motion.div
                    key={suggestion.id}
                    // was w-56
                    className="absolute -right-48px z-50 flex w-256px flex-col gap-12px rounded-16px border bg-alternate p-12px text-14px shadow-xl md:-right-64px"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-8px">
                            <div className="size-16px rounded-full bg-main/eighth" />
                            <div className="font-medium">Assistant</div>
                        </div>
                        <button
                            type="button"
                            className="cursor-pointer text-12px text-gray-500"
                            onClick={() => {
                                setIsExpanded(false)
                            }}
                        >
                            <CrossIcon size={12} />
                        </button>
                    </div>
                    <div>{suggestion.description}</div>
                    <Button style="outline" className="w-fit rounded-full px-12px py-6px" onClick={onApplyAction}>
                        Apply
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
