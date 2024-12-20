"use client"

import type { ChatRequestOptions, CreateMessage, Message } from "ai"
import cx from "classnames"
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion"
import { type Dispatch, memo, type SetStateAction, useEffect, useRef, useState } from "react"
import { useOnClickOutside } from "usehooks-ts"
import { nanoid } from "nanoid"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/primitives/indicators"
import { sanitizeUIMessages } from "~/domains/ai-chat/lib/utils"

import { ArrowUpIcon, MessageIcon, PenIcon, StopIcon, SummarizeIcon } from "./icons"
import equal from "fast-deep-equal"

type ToolProps = {
    type: "final-polish" | "request-suggestions" | "adjust-reading-level"
    description: string
    icon: JSX.Element
    selectedTool: string | null
    setSelectedTool: Dispatch<SetStateAction<string | null>>
    isToolbarVisible?: boolean
    setIsToolbarVisible?: Dispatch<SetStateAction<boolean>>
    isAnimating: boolean
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
}

const Tool = ({
    type,
    description,
    icon,
    selectedTool,
    setSelectedTool,
    isToolbarVisible,
    setIsToolbarVisible,
    isAnimating,
    append
}: ToolProps) => {
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        if (selectedTool !== type) {
            setIsHovered(false)
        }
    }, [selectedTool, type])

    const handleSelect = () => {
        if (!isToolbarVisible && setIsToolbarVisible) {
            setIsToolbarVisible(true)
            return
        }

        if (!selectedTool) {
            setIsHovered(true)
            setSelectedTool(type)
            return
        }

        if (selectedTool !== type) {
            setSelectedTool(type)
        } else {
            if (type === "final-polish") {
                void append({
                    role: "user",
                    content:
                        "Please add final polish and check for grammar, add section titles for better structure, and ensure everything reads smoothly."
                })

                setSelectedTool(null)
            } else if (type === "request-suggestions") {
                void append({
                    role: "user",
                    content: "Please add suggestions you have that could improve the writing."
                })

                setSelectedTool(null)
            }
        }
    }

    return (
        <Tooltip open={isHovered && !isAnimating}>
            <TooltipTrigger asChild>
                <motion.div
                    className={cx("rounded-full p-12px", {
                        "!text-primary-foreground bg-accent-constant": selectedTool === type
                    })}
                    onHoverStart={() => {
                        setIsHovered(true)
                    }}
                    onHoverEnd={() => {
                        if (selectedTool !== type) setIsHovered(false)
                    }}
                    onKeyDown={event => {
                        if (event.key === "Enter") {
                            handleSelect()
                        }
                    }}
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    exit={{
                        scale: 0.9,
                        opacity: 0,
                        transition: { duration: 0.1 }
                    }}
                    onClick={() => {
                        handleSelect()
                    }}
                >
                    {selectedTool === type ? <ArrowUpIcon /> : icon}
                </motion.div>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={16} className="rounded-16px bg-main p-12px px-16px text-alternate">
                {description}
            </TooltipContent>
        </Tooltip>
    )
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const randomArr = [...Array(6)].map(_x => nanoid(5))

const ReadingLevelSelector = ({
    setSelectedTool,
    append,
    isAnimating
}: {
    setSelectedTool: Dispatch<SetStateAction<string | null>>
    isAnimating: boolean
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
}) => {
    const LEVELS = ["Elementary", "Middle School", "Keep current level", "High School", "College", "Graduate"]

    const y = useMotionValue(-40 * 2)
    const dragConstraints = 5 * 40 + 2
    const yToLevel = useTransform(y, [0, -dragConstraints], [0, 5])

    const [currentLevel, setCurrentLevel] = useState(2)
    const [hasUserSelectedLevel, setHasUserSelectedLevel] = useState<boolean>(false)

    useEffect(() => {
        const unsubscribe = yToLevel.on("change", latest => {
            const level = Math.min(5, Math.max(0, Math.round(Math.abs(latest))))
            setCurrentLevel(level)
        })

        return () => unsubscribe()
    }, [yToLevel])

    return (
        <div className="relative flex flex-col items-center justify-end">
            {randomArr.map(id => (
                <motion.div
                    key={id}
                    className="flex size-[40px] flex-row items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="size-8px rounded-full bg-main/quarter" />
                </motion.div>
            ))}

            <TooltipProvider>
                <Tooltip open={!isAnimating}>
                    <TooltipTrigger asChild>
                        <motion.div
                            className={cx("absolute flex flex-row items-center rounded-full border bg-alternate p-12px", {
                                "bg-accent-constant text-alternate-constant": currentLevel !== 2,
                                "bg-alternate text-main": currentLevel === 2
                            })}
                            style={{ y }}
                            drag="y"
                            dragElastic={0}
                            dragMomentum={false}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            dragConstraints={{ top: -dragConstraints, bottom: 0 }}
                            onDragStart={() => {
                                setHasUserSelectedLevel(false)
                            }}
                            onDragEnd={() => {
                                if (currentLevel === 2) {
                                    setSelectedTool(null)
                                } else {
                                    setHasUserSelectedLevel(true)
                                }
                            }}
                            onClick={() => {
                                if (currentLevel !== 2 && hasUserSelectedLevel) {
                                    void append({
                                        role: "user",
                                        content: `Please adjust the reading level to ${LEVELS[currentLevel]} level.`
                                    })

                                    setSelectedTool(null)
                                }
                            }}
                        >
                            {currentLevel === 2 ? <SummarizeIcon /> : <ArrowUpIcon />}
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent
                        side="left"
                        sideOffset={16}
                        className="rounded-16px bg-main p-12px px-16px text-14px text-alternate"
                    >
                        {LEVELS[currentLevel]}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export const Tools = ({
    isToolbarVisible,
    selectedTool,
    setSelectedToolAction,
    appendAction,
    isAnimating,
    setIsToolbarVisibleAction
}: {
    isToolbarVisible: boolean
    selectedTool: string | null
    setSelectedToolAction: Dispatch<SetStateAction<string | null>>
    appendAction: (
        message: Message | CreateMessage,
        chatRequestOptions?: ChatRequestOptions
    ) => Promise<string | null | undefined>
    isAnimating: boolean
    setIsToolbarVisibleAction: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
        >
            <AnimatePresence>
                {isToolbarVisible && (
                    <>
                        <Tool
                            type="adjust-reading-level"
                            description="Adjust reading level"
                            icon={<SummarizeIcon />}
                            selectedTool={selectedTool}
                            setSelectedTool={setSelectedToolAction}
                            append={appendAction}
                            isAnimating={isAnimating}
                        />

                        <Tool
                            type="request-suggestions"
                            description="Request suggestions"
                            icon={<MessageIcon />}
                            selectedTool={selectedTool}
                            setSelectedTool={setSelectedToolAction}
                            append={appendAction}
                            isAnimating={isAnimating}
                        />
                    </>
                )}
            </AnimatePresence>

            <Tool
                type="final-polish"
                description="Add final polish"
                icon={<PenIcon />}
                selectedTool={selectedTool}
                setSelectedTool={setSelectedToolAction}
                isToolbarVisible={isToolbarVisible}
                setIsToolbarVisible={setIsToolbarVisibleAction}
                append={appendAction}
                isAnimating={isAnimating}
            />
        </motion.div>
    )
}

const PureToolbar = ({
    isToolbarVisible,
    setIsToolbarVisible,
    append,
    isLoading,
    stop,
    setMessages
}: {
    isToolbarVisible: boolean
    setIsToolbarVisible: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
    stop: () => void
    setMessages: Dispatch<SetStateAction<Message[]>>
}) => {
    const toolbarRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const [selectedTool, setSelectedTool] = useState<string | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)

    useOnClickOutside(toolbarRef, () => {
        setIsToolbarVisible(false)
        setSelectedTool(null)
    })

    const startCloseTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            setSelectedTool(null)
            setIsToolbarVisible(false)
        }, 2000)
    }

    const cancelCloseTimer = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (isLoading) {
            setIsToolbarVisible(false)
        }
    }, [isLoading, setIsToolbarVisible])

    return (
        <TooltipProvider delayDuration={0}>
            <motion.div
                className="absolute bottom-24px right-24px flex cursor-pointer flex-col justify-end rounded-full border bg-alternate p-6px shadow-lg"
                initial={{ opacity: 0, y: -20, scale: 1 }}
                animate={
                    isToolbarVisible
                        ? selectedTool === "adjust-reading-level"
                            ? {
                                  opacity: 1,
                                  y: 0,
                                  height: 6 * 43,
                                  transition: { delay: 0 },
                                  scale: 0.95
                              }
                            : {
                                  opacity: 1,
                                  y: 0,
                                  height: 3 * 45,
                                  transition: { delay: 0 },
                                  scale: 1
                              }
                        : { opacity: 1, y: 0, height: 54, transition: { delay: 0 } }
                }
                exit={{ opacity: 0, y: -20, transition: { duration: 0.1 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onHoverStart={() => {
                    if (isLoading) return

                    cancelCloseTimer()
                    setIsToolbarVisible(true)
                }}
                onHoverEnd={() => {
                    if (isLoading) return

                    startCloseTimer()
                }}
                onAnimationStart={() => {
                    setIsAnimating(true)
                }}
                onAnimationComplete={() => {
                    setIsAnimating(false)
                }}
                ref={toolbarRef}
            >
                {isLoading ? (
                    <motion.div
                        key="stop-icon"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.4 }}
                        exit={{ scale: 1 }}
                        className="p-12px"
                        onClick={() => {
                            stop()
                            setMessages(messages => sanitizeUIMessages(messages))
                        }}
                    >
                        <StopIcon />
                    </motion.div>
                ) : selectedTool === "adjust-reading-level" ? (
                    <ReadingLevelSelector
                        key="reading-level-selector"
                        append={append}
                        setSelectedTool={setSelectedTool}
                        isAnimating={isAnimating}
                    />
                ) : (
                    <Tools
                        key="tools"
                        appendAction={append}
                        isAnimating={isAnimating}
                        isToolbarVisible={isToolbarVisible}
                        selectedTool={selectedTool}
                        setIsToolbarVisibleAction={setIsToolbarVisible}
                        setSelectedToolAction={setSelectedTool}
                    />
                )}
            </motion.div>
        </TooltipProvider>
    )
}

export const Toolbar = memo(PureToolbar, (prevProps, nextProps) => {
    return equal(prevProps, nextProps)
})
