/**
 *
 */

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "~/utils/ui"

export const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

    {
        variants: {
            variant: {
                default: "bg-text text-background hover:bg-text-upper-quarter",
                destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-accent text-main hover:bg-accent-upper-quarter",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline"
            },

            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded px-3 text-xs",
                lg: "h-10 rounded px-8",
                icon: "h-9 w-9"
            },

            color: {
                main: "bg-text text-background hover:bg-text-upper-quarter",
                accent: "bg-accent text-text hover:bg-accent-upper-quarter"
                // Add more color options as needed
            }
        },

        defaultVariants: {
            variant: "default",
            size: "default",
            color: "main"
        },

        compoundVariants: [
            {
                variant: "outline",
                color: "main",
                class: "border-primary text-primary hover:bg-primary/10"
            },
            {
                variant: "outline",
                color: "accent",
                class: "border-accent text-accent hover:bg-accent/10"
            }
            // Add more compound variants as needed
        ]
    }
)

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"]
export type ButtonColor = VariantProps<typeof buttonVariants>["color"]
export type ButtonSize = VariantProps<typeof buttonVariants>["size"]
export type ButtonVariants = VariantProps<typeof buttonVariants>

export type ButtonProps = {
    /**
     * Renders the button as a 'Slot' component from Radix UI. This applies the styles and props of the button to its children without having to wrap them in a button element (e.g., for when you want to use `Link` for server-side navigation).
     */
    asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, color, asChild = false, ...props }, ref) => {
        const DynamicButton = asChild ? Slot : "button"

        return <DynamicButton className={cn(buttonVariants({ variant, size, color, className }))} ref={ref} {...props} />
    }
)

Button.displayName = "Button"

export { Button }
