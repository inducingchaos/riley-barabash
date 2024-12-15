/**
 *
 */

"use client"

import { forwardRef, useEffect, useState, useRef, type TextareaHTMLAttributes } from "react"
import { cn } from "~/utils/ui"

export type TextAreaElement = HTMLTextAreaElement

type TextAreaProps = {
    height?: number | { min: number; max: number }
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea = forwardRef<TextAreaElement, TextAreaProps>(
    ({ height, value, onChange, className, ...props }, forwardedRef) => {
        const [localValue, setLocalValue] = useState(value)
        const innerRef = useRef<HTMLTextAreaElement>(null)

        useTextArea({
            ref: innerRef,
            content: localValue,
            height
        })

        useEffect(() => setLocalValue(value), [value])

        useEffect(() => {
            if (typeof forwardedRef === "function") {
                forwardedRef(innerRef.current)
            } else if (forwardedRef) {
                forwardedRef.current = innerRef.current
            }
        }, [forwardedRef])

        return (
            <textarea
                className={cn(
                    "rounded-md border-main-sixteenth placeholder:text-main-half focus-visible:ring-accent-constant flex w-full border bg-transparent px-3 py-2 text-14 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                value={localValue}
                ref={innerRef}
                onChange={e => {
                    setLocalValue(e.target.value)
                    onChange?.(e)
                }}
                {...props}
            />
        )
    }
)

TextArea.displayName = "Textarea"

export { TextArea }

//

//  Hook.

export const useTextArea = ({
    height = 256,
    content,
    borderWidth = 1,
    ref
}: {
    height?:
        | number
        | {
              min: number
              max: number
          }
    content?: TextareaHTMLAttributes<HTMLTextAreaElement>["value"]
    borderWidth?: number
    ref: React.RefObject<HTMLTextAreaElement>
}) => {
    const [isInitialized, setIsInitialized] = useState(false)

    if (typeof height === "number") height = { min: height, max: height }

    useEffect(() => {
        if (!ref.current) return
        const borderOffset = borderWidth * 2

        if (!isInitialized) {
            //  The height needs to be reset temporarily to get the correct height for the text area.

            ref.current.style.minHeight = `${height.min + borderOffset}px`
            if (height.max > height.min) ref.current.style.maxHeight = `${height.max}px`

            setIsInitialized(true)
        }

        ref.current.style.height = `${height.min + borderOffset}px`
        const scrollHeight = ref.current.scrollHeight

        //  We then set the height directly, outside of the render loop. Trying to set this with state or a ref will product an incorrect value.

        if (scrollHeight > height.max) ref.current.style.height = `${height.max}px`
        else ref.current.style.height = `${scrollHeight + borderOffset}px`
    }, [content, borderWidth, isInitialized, height.min, height.max, ref])
}
