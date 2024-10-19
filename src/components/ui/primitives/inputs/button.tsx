/**
 *
 */

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "~/utils/ui"

export const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-1.5 text-14 font-medium transition-colors ease-out duration-250 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-main-thirty-second disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            style: {
                normal: null,
                outline: "border",
                ghost: null,
                link: "underline-offset-4 hover:underline"
            },

            color: {
                main: null,
                warning: null,
                danger: null,
                success: null,
                info: null,
                accent: null
            },
            intensity: {
                normal: null,
                dimmed: null
            },
            contrast: {
                normal: null,
                high: null
            },

            //  Check sizes.

            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded px-3 text-xs",
                lg: "h-10 rounded px-8",
                icon: "h-9 w-9"
            }
        },
        compoundVariants: [
            {
                style: "normal",
                color: "main",
                intensity: "normal",
                class: "bg-main text-alternate text-14 hover:bg-main-upper-quarter"
            }

            // {
            //     style: "outline",
            //     color: "main",
            //     intensity: "normal",
            //     className: "text-main border-main-eighth hover:bg-main-upper-quarter"
            // }

            // {
            //     style: "normal",
            //     color: "main",
            //     theme: "dimmed",
            //     className: "bg-text/80 text-background hover:bg-text-upper-quarter/80"
            // },
            // {
            //     style: "normal",
            //     color: "warning",
            //     theme: "normal",
            //     className: "bg-warning text-warning-foreground hover:bg-warning-upper-quarter"
            // },
            // {
            //     style: "normal",
            //     color: "warning",
            //     theme: "dimmed",
            //     className: "bg-warning/80 text-warning-foreground hover:bg-warning-upper-quarter/80"
            // }
            // ... Add more combinations for other colors and styles
        ],
        defaultVariants: {
            style: "normal",
            size: "default",
            color: "main",
            intensity: "normal",
            contrast: "high"
        }
    }
)

export type ButtonProps = {
    asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, style, size, color, intensity, contrast, asChild = false, ...props }, ref) => {
        const DynamicButton = asChild ? Slot : "button"

        return (
            <DynamicButton
                className={cn(
                    buttonVariants({
                        style,
                        size,
                        color,
                        intensity,
                        contrast,
                        className
                    })
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"

export { Button }
