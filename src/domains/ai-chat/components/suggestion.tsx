"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useWindowSize } from "usehooks-ts"

import type { UISuggestion } from "~/domains/ai-chat/lib/editor/suggestions"

import { CrossIcon, MessageIcon } from "./icons"
import { Button } from "~/components/ui/primitives/inputs"

export const Suggestion = ({ suggestion, onApply }: { suggestion: UISuggestion; onApply: () => void }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const { width: windowWidth } = useWindowSize()

    return (
        <AnimatePresence>
            {!isExpanded ? (
                <motion.div
                    className="text-muted-foreground absolute -right-8 cursor-pointer p-1"
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
                    className="bg-background rounded-2xl text-sm absolute -right-12 z-50 flex w-56 flex-col gap-3 border p-3 shadow-xl md:-right-16"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <div className="bg-muted-foreground/25 size-4 rounded-full" />
                            <div className="font-medium">Assistant</div>
                        </div>
                        <button
                            type="button"
                            className="text-xs cursor-pointer text-gray-500"
                            onClick={() => {
                                setIsExpanded(false)
                            }}
                        >
                            <CrossIcon size={12} />
                        </button>
                    </div>
                    <div>{suggestion.description}</div>
                    <Button style="outline" className="w-fit rounded-full px-3 py-1.5" onClick={onApply}>
                        Apply
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
