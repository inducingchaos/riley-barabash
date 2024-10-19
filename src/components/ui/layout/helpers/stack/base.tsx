/**
 *
 */

import type { ReactNode } from "react"
import { cn } from "~/utils/ui"

export type StackOptions = {
    label?: string
    as?: string
    size?: number
    orientation: "horizontal" | "vertical"
    expand: boolean
    children: ReactNode
    className?: string
} & HTMLDivElement

export function Stack({
    as: _elementType = "div",
    orientation = "horizontal",
    expand = false,
    children,
    className
}: StackOptions) {
    return (
        <div
            className={cn(
                "flex items-center justify-center",
                orientation === "horizontal" ? "flex-row" : "flex-col",
                expand ? (orientation === "horizontal" ? "w-full" : "h-full") : undefined,
                className
            )}
        >
            {children}
        </div>
    )
}
