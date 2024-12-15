/**
 *
 */

"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react"
import { cn } from "~/utils/ui"

const Avatar = forwardRef<ElementRef<typeof AvatarPrimitive.Root>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(
    ({ className, ...props }, ref) => (
        <AvatarPrimitive.Root
            ref={ref}
            className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
            {...props}
        />
    )
)

Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = forwardRef<
    ElementRef<typeof AvatarPrimitive.Image>,
    ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
))

AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = forwardRef<
    ElementRef<typeof AvatarPrimitive.Fallback>,
    ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
        ref={ref}
        className={cn("flex h-full w-full items-center justify-center rounded-full bg-main-sixteenth", className)}
        {...props}
    />
))

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarFallback, AvatarImage }
