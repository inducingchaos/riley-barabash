/**
 * @todo
 * - [P4] Consider adding a height prop to the text area.
 *
 * @remarks We need layout references to calculate the initial styles of the text area.
 */

import { useLayoutEffect, useRef } from "react"
import { cn } from "~/utils/ui"

export function EssentialTextArea({
    rows: rowConfig,
    layoutReferences,
    onEnter: enterAction,
    onEscape,
    allowEmptySubmit: initialAllowEmptySubmit,
    focusOnMount,
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
    onEnter?: "submit" | "break" | (() => void)
    onEscape?: "blur" | (() => void)
    allowEmptySubmit?: boolean
    focusOnMount?: boolean
    className?: string
} & Omit<Omit<React.ComponentProps<"textarea">, "autoFocus">, "rows">): JSX.Element {
    const defaultedRowConfig = {
        min: rowConfig?.min ?? 1,
        max: rowConfig?.max ?? 3
    }

    const allowEmptySubmit = initialAllowEmptySubmit ?? false

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
        <textarea
            ref={ref}
            autoFocus={focusOnMount}
            onChange={e => {
                adjustLayout()
                props.onChange?.(e)
            }}
            className={cn(
                "scrollbar-hide w-full resize-none overflow-hidden bg-transparent transition-colors placeholder:text-main/half focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main/-eighth focus-visible:ring-offset-2 focus-visible:ring-offset-alternate disabled:cursor-not-allowed disabled:opacity-half",
                className
            )}
            style={{
                height: initialHeight()
            }}
            onKeyDown={event => {
                if (event.key === "Enter" && !event.shiftKey) {
                    if (enterAction === "break") return

                    event.preventDefault()

                    if (typeof enterAction === "function") return enterAction()

                    if (!allowEmptySubmit && !event.currentTarget.value.trim()) return
                    event.currentTarget.form?.requestSubmit()
                }

                if (event.key === "Escape" && onEscape) {
                    if (onEscape === "blur") return ref.current?.blur()
                    return onEscape()
                }

                props.onKeyDown?.(event)
            }}
            {...props}
        />
    )
}
