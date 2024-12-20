/**
 *
 */

"use client"

import { forwardRef, type ComponentPropsWithoutRef, type ElementRef, type ReactElement } from "react"
import { Cross2Icon } from "@radix-ui/react-icons"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/utils/ui"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = forwardRef<
    ElementRef<typeof ToastPrimitives.Viewport>,
    ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
            "fixed top-0px z-[100] flex max-h-screen w-full flex-col-reverse p-16px sm:bottom-0px sm:right-0px sm:top-auto sm:flex-col md:max-w-[420px]",
            className
        )}
        {...props}
    />
))

ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
    "group pointer-events-auto relative flex w-full items-center justify-between space-x-8px overflow-hidden rounded-6px border p-16px pr-24px shadow-lg transition-all data-[swipe=cancel]:translate-x-0px data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:-fade-out-quarter data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    {
        variants: {
            variant: {
                default: "border bg-alternate text-main",
                destructive: "group border-danger bg-danger text-alternate-constant"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }
)

const Toast = forwardRef<
    ElementRef<typeof ToastPrimitives.Root>,
    ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
    return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
})

Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = forwardRef<
    ElementRef<typeof ToastPrimitives.Action>,
    ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Action
        ref={ref}
        className={cn(
            "inline-flex h-32px shrink-0 items-center justify-center rounded-6px border bg-transparent px-12px text-14px font-medium transition-colors hover:bg-main/sixteenth focus:outline-none focus:ring-1 focus:ring-accent-constant disabled:pointer-events-none disabled:opacity-half group-[.destructive]:border-main/sixteenth group-[.destructive]:hover:border-danger/half group-[.destructive]:hover:bg-danger group-[.destructive]:hover:text-alternate-constant group-[.destructive]:focus:ring-danger",
            className
        )}
        {...props}
    />
))

ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = forwardRef<ElementRef<typeof ToastPrimitives.Close>, ComponentPropsWithoutRef<typeof ToastPrimitives.Close>>(
    ({ className, ...props }, ref) => (
        <ToastPrimitives.Close
            ref={ref}
            className={cn(
                "absolute right-4px top-4px rounded-6px p-4px text-main/half opacity-zero transition-opacity hover:text-main focus:opacity-full focus:outline-none focus:ring-1 group-hover:opacity-full group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
                className
            )}
            toast-close=""
            {...props}
        >
            <Cross2Icon className="size-16px" />
        </ToastPrimitives.Close>
    )
)

ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = forwardRef<ElementRef<typeof ToastPrimitives.Title>, ComponentPropsWithoutRef<typeof ToastPrimitives.Title>>(
    ({ className, ...props }, ref) => (
        <ToastPrimitives.Title ref={ref} className={cn("text-14px font-semibold [&+div]:text-12px", className)} {...props} />
    )
)

ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = forwardRef<
    ElementRef<typeof ToastPrimitives.Description>,
    ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
    <ToastPrimitives.Description ref={ref} className={cn("text-14px -opacity-eighth", className)} {...props} />
))

ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = ReactElement<typeof ToastAction>

export {
    type ToastProps,
    type ToastActionElement,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction
}
