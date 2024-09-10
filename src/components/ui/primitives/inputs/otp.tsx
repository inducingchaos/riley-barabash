/**
 * @file An OTP input component.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #components
 * #ui
 * #primitives
 * #inputs
 * #otp
 * #tsx
 */

"use client"

import { DashIcon } from "@radix-ui/react-icons"
import { OTPInput, OTPInputContext } from "input-otp"
import { forwardRef, useContext, type ComponentPropsWithoutRef, type ElementRef } from "react"
import { cn } from "~/utils/ui"

const OTP = forwardRef<ElementRef<typeof OTPInput>, ComponentPropsWithoutRef<typeof OTPInput>>(
    ({ className, containerClassName, ...props }, ref) => (
        <OTPInput
            ref={ref}
            containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
            className={cn("disabled:cursor-not-allowed", className)}
            {...props}
        />
    )
)

OTP.displayName = "OTP"

const OTPGroup = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
))

OTPGroup.displayName = "OTPGroup"

const OTPSlot = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div"> & { index: number }>(
    ({ index, className, ...props }, ref) => {
        const inputOTPContext = useContext(OTPInputContext)
        const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]!

        return (
            <div
                ref={ref}
                className={cn(
                    "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                    isActive && "z-10 ring-1 ring-ring",
                    className
                )}
                {...props}
            >
                {char}
                {hasFakeCaret && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                    </div>
                )}
            </div>
        )
    }
)

OTPSlot.displayName = "OTPSlot"

const OTPSeparator = forwardRef<ElementRef<"div">, ComponentPropsWithoutRef<"div">>(({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
        <DashIcon />
    </div>
))

OTPSeparator.displayName = "OTPSeparator"

export { OTP, OTPGroup, OTPSeparator, OTPSlot }
