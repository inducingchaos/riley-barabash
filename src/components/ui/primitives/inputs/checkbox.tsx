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
//                 "peer h-16px w-16px shrink-0 rounded-2px border border-accent-constant shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-constant disabled:cursor-not-allowed disabled:opacity-half data-[state=checked]:bg-accent-constant data-[state=checked]:text-alternate-constant",
//                 className
//             )}
//             {...props}
//         >
//             <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
//                 <CheckIcon className="h-16px w-16px" />
//             </CheckboxPrimitive.Indicator>
//         </CheckboxPrimitive.Root>
//     )
// )

const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
    ({ className, ...props }, ref) => (
        <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
                "peer size-16px shrink-0 rounded-2px border border-accent-constant shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-constant disabled:cursor-not-allowed disabled:opacity-half data-[state=checked]:bg-main/eighth data-[state=checked]:text-alternate-constant data-[state=indeterminate]:text-main/eighth",
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
                {/* <CheckIcon className="h-16px w-16px" /> */}
                <div className="size-4px bg-current" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )
)

// const Checkbox = forwardRef<ElementRef<typeof CheckboxPrimitive.Root>, ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
//     ({ className, ...props }, ref) => (
//         <CheckboxPrimitive.Root
//             ref={ref}
//             className={cn(
//                 "peer h-16px w-16px shrink-0 rounded-2px border border-accent-constant shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-constant disabled:cursor-not-allowed disabled:opacity-half data-[state=checked]:bg-main/eighth data-[state=checked]:text-alternate-constant",
//                 className
//             )}
//             {...props}
//         >
//             <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
//                 <div className="h-8px w-8px rounded-2px data-[state=checked]:bg-main/eighth data-[state=indeterminate]:bg-main/eighth" />
//             </CheckboxPrimitive.Indicator>
//         </CheckboxPrimitive.Root>
//     )
// )

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
