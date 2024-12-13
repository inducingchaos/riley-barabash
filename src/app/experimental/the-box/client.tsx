/**
 * @remarks We need layout references to calculate the initial styles of the text area.
 */

"use client"

import { useLayoutEffect, useRef } from "react"
import { Stack } from "~/components/ui/layout/stacks"
import { Button } from "~/components/ui/primitives/inputs"
import { cn } from "~/utils/ui"

export default function TheBoxClient() {
    return (
        <Stack>
            <form className="flex w-screen gap-2">
                <EssentialTextArea
                    rows={{ min: 1, max: 4 }}
                    layoutReferences={{
                        lineHeight: 24,
                        paddingTop: 8,
                        paddingBottom: 8,
                        borderWidth: 2
                    }}
                    className="w-full border px-4 py-2"
                    placeholder="Your next thought..."
                />

                <Button onClick={() => console.log("clicked")} className="self-stretch">
                    {">"}
                </Button>
            </form>
        </Stack>
    )
}

export function EssentialTextArea({
    rows: rowConfig,
    layoutReferences,
    className,
    ...props
}: {
    rows?: { min?: number; max?: number }
    layoutReferences?: {
        lineHeight: number
        paddingTop: number
        paddingBottom: number
        borderWidth: number
    }
    className?: string
} & Omit<React.ComponentProps<"textarea">, "rows">): JSX.Element {
    const defaultedRowConfig = {
        min: rowConfig?.min ?? 1,
        max: rowConfig?.max ?? 3
    }

    const ref = useRef<HTMLTextAreaElement>(null)

    const getComputedStyles = (element: HTMLTextAreaElement) => {
        const computedStyle = window.getComputedStyle(element)

        return {
            lineHeight: parseInt(computedStyle.lineHeight),
            borderWidth: parseInt(computedStyle.borderWidth),
            paddingTop: parseInt(computedStyle.paddingTop),
            paddingBottom: parseInt(computedStyle.paddingBottom)
        }
    }

    const checkIfScrolledNearBottom = (element: HTMLTextAreaElement, tolerance: number) =>
        element.scrollHeight - (element.scrollTop + element.clientHeight) <= tolerance

    const scrollToBottom = (element: HTMLTextAreaElement) => (element.scrollTop = element.scrollHeight)

    const fixHeightAndScrolling = (element: HTMLTextAreaElement, styles: ReturnType<typeof getComputedStyles>) => {
        //  We need to force the text area height to zero to avoid reading the default size.

        element.style.height = "0rem"

        const necessaryRows = Math.max(
            1,
            defaultedRowConfig.min,
            Math.ceil((element.scrollHeight - (styles.paddingTop + styles.paddingBottom)) / styles.lineHeight)
        )
        const allowedRows = Math.min(defaultedRowConfig.max, necessaryRows)

        const newHeight = allowedRows * styles.lineHeight + styles.paddingTop + styles.paddingBottom + styles.borderWidth * 2
        element.style.height = `${newHeight / 16}rem`

        //  Toggle scrolling.

        if (necessaryRows > allowedRows) element.style.overflow = "visible"
        else element.style.overflow = "hidden"
    }

    const adjustLayout = () => {
        const textArea = ref.current
        if (!textArea) return

        const computedStyles = getComputedStyles(textArea)
        const styles = {
            ...computedStyles,
            ...layoutReferences
        }

        const isScrolledNearBottom = checkIfScrolledNearBottom(
            textArea,
            styles.lineHeight + styles.paddingTop + styles.paddingBottom
        )

        fixHeightAndScrolling(textArea, styles)

        if (isScrolledNearBottom) scrollToBottom(textArea)
    }

    useLayoutEffect(() => {
        adjustLayout()
    })

    const initialHeight = () => {
        if (!layoutReferences) return

        return (
            defaultedRowConfig.min * layoutReferences.lineHeight +
            layoutReferences.paddingTop +
            layoutReferences.paddingBottom +
            layoutReferences.borderWidth * 2
        )
    }

    return (
        <>
            <textarea
                ref={ref}
                onChange={adjustLayout}
                className={cn(
                    "scrollbar-hide w-full resize-none overflow-hidden bg-transparent transition-colors placeholder:text-main-half focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                style={{
                    height: initialHeight()
                }}
                {...props}
            />
        </>
    )
}
