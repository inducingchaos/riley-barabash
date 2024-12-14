/**
 *
 */

"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, type ReactNode } from "react"
import { cn } from "~/utils/ui"

type ProgressOptionsBase = Omit<ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "value" | "children">

type StandardProgressOptions = {
    customInternals?: false
    value: number
    children?: never
} & ProgressOptionsBase

type CustomProgressOptions = {
    customInternals: true
    value?: never
    children: ReactNode
} & ProgressOptionsBase

type ProgressOptions = StandardProgressOptions | CustomProgressOptions

const Progress = forwardRef<ElementRef<typeof ProgressPrimitive.Root>, ProgressOptions>(
    ({ className, value, customInternals, children, ...props }, ref) => (
        <ProgressPrimitive.Root
            ref={ref}
            className={cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className)}
            {...props}
        >
            {customInternals ? (
                children
            ) : (
                <ProgressPrimitive.Indicator
                    className={cn("bg-accent-constant h-full w-full flex-1 transition-all")}
                    style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
                />
            )}
        </ProgressPrimitive.Root>
    )
)

Progress.displayName = ProgressPrimitive.Root.displayName

type ProgressIndicatorOptions = {
    value: number
} & ComponentPropsWithoutRef<typeof ProgressPrimitive.Indicator>

const ProgressIndicator = forwardRef<ElementRef<typeof ProgressPrimitive.Indicator>, ProgressIndicatorOptions>(
    ({ className, value, ...props }, ref) => (
        <ProgressPrimitive.Indicator
            ref={ref}
            className={cn("bg-accent-constant h-full w-full flex-1 transition-all", className)}
            style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
            {...props}
        />
    )
)

ProgressIndicator.displayName = ProgressPrimitive.Indicator.displayName

export { Progress, ProgressIndicator }
