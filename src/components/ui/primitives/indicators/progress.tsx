/**
 *
 */

"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, type ReactNode } from "react"
import { cn } from "~/utils/ui"

type ProgressOptionsBase = Omit<ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "value" | "children">

interface StandardProgressOptions extends ProgressOptionsBase {
    customInternals?: false
    value: number
    children?: never
}

interface CustomProgressOptions extends ProgressOptionsBase {
    customInternals: true
    value?: never
    children: ReactNode
}

type ProgressOptions = StandardProgressOptions | CustomProgressOptions

const Progress = forwardRef<ElementRef<typeof ProgressPrimitive.Root>, ProgressOptions>(
    ({ className, value, customInternals, children, ...props }, ref) => (
        <ProgressPrimitive.Root
            ref={ref}
            className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
            {...props}
        >
            {customInternals ? (
                children
            ) : (
                <ProgressPrimitive.Indicator
                    className={cn("h-full w-full flex-1 bg-primary transition-all")}
                    style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
                />
            )}
        </ProgressPrimitive.Root>
    )
)

Progress.displayName = ProgressPrimitive.Root.displayName

interface ProgressIndicatorOptions extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator> {
    value: number
}

const ProgressIndicator = forwardRef<ElementRef<typeof ProgressPrimitive.Indicator>, ProgressIndicatorOptions>(
    ({ className, value, ...props }, ref) => (
        <ProgressPrimitive.Indicator
            ref={ref}
            className={cn("h-full w-full flex-1 bg-primary transition-all", className)}
            style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
            {...props}
        />
    )
)

ProgressIndicator.displayName = ProgressPrimitive.Indicator.displayName

export { Progress, ProgressIndicator }
