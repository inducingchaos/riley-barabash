/**
 *
 */

"use client"

import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react"
import { cn } from "~/utils/ui"

const Separator = forwardRef<
    ElementRef<typeof SeparatorPrimitive.Root>,
    ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn("bg-main/eighth", orientation === "horizontal" ? "h-1px w-full" : "h-full w-1px", className)}
        {...props}
    />
))

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
