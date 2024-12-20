/**
 *
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
            containerClassName={cn("flex items-center gap-8px has-[:disabled]:opacity-half", containerClassName)}
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
                // was w-9 h-9
                className={cn(
                    "relative flex size-32px items-center justify-center border-y border-r border-main/sixteenth text-14px shadow-sm transition-all first:rounded-l-6px first:border-l last:rounded-r-6px",
                    isActive && "z-10 ring-1 ring-accent-constant",
                    className
                )}
                {...props}
            >
                {char}
                {hasFakeCaret && (
                    <div className="pointer-events-none absolute inset-0px flex items-center justify-center">
                        <div className="h-16px w-1px animate-otp-caret-blink bg-main duration-1s" />
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
