/**
 *
 */

"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
// import { CheckIcon } from "@radix-ui/react-icons"
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react"
import { cn } from "~/utils/ui"

// const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
//     ({ className, ...props }, ref) => (
//         <CheckboxPrimitive.Root
//             ref={ref}
//             className={cn(
//                 "peer h-4 w-4 shrink-0 rounded-sm border border-accent-constant shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-constant disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent-constant data-[state=checked]:text-alternate-constant",
//                 className
//             )}
//             {...props}
//         >
//             <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
//                 <CheckIcon className="h-4 w-4" />
//             </CheckboxPrimitive.Indicator>
//         </CheckboxPrimitive.Root>
//     )
// )

const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
    ({ className, ...props }, ref) => (
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                "rounded-sm border-accent-constant focus-visible:ring-accent-constant data-[state=checked]:bg-main-eighth data-[state=checked]:text-alternate-constant data-[state=indeterminate]:text-main-eighth peer h-4 w-4 shrink-0 border shadow focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
                {/* <CheckIcon className="h-4 w-4" /> */}
                <div className="h-1 w-1 bg-current" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )
)

// const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
//     ({ className, ...props }, ref) => (
//         <CheckboxPrimitive.Root
//             ref={ref}
//             className={cn(
//                 "peer h-4 w-4 shrink-0 rounded-sm border border-accent-constant shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-constant disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-main-eighth data-[state=checked]:text-alternate-constant",
//                 className
//             )}
//             {...props}
//         >
//             <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
//                 <div className="h-2 w-2 rounded-sm data-[state=checked]:bg-main-eighth data-[state=indeterminate]:bg-main-eighth" />
//             </CheckboxPrimitive.Indicator>
//         </CheckboxPrimitive.Root>
//     )
// )

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
