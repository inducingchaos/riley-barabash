/**
 *
 */

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "~/utils/ui"

export const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-14 font-medium ring-offset-alternate ease-out duration-250 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-upper-eighth focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
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
                className: "bg-main text-alternate hover:bg-main-upper-quarter"
            },
            {
                style: "normal",
                color: "main",
                intensity: "dimmed",
                className: "bg-main-eighth hover:bg-main-sixteenth"
            },
            {
                style: "outline",
                color: "main",
                intensity: "normal",
                className: "border-main hover:bg-main hover:text-alternate"
            },
            {
                style: "outline",
                color: "main",
                intensity: "dimmed",
                className: "hover:bg-main-eighth hover:border-main-zero"
            },
            {
                style: "ghost",
                color: "main",
                intensity: "normal",
                className: "hover:bg-main hover:text-alternate"
            },
            {
                style: "ghost",
                color: "main",
                intensity: "dimmed",
                className: "hover:bg-main-eighth"
            },
            {
                style: "link",
                color: "main",
                intensity: "normal",
                className: "hover:text-main-upper-quarter"
            },
            {
                style: "link",
                color: "main",
                intensity: "dimmed",
                className: "text-main-half hover:text-main-3/8"
            },

            {
                style: "normal",
                color: "warning",
                intensity: "normal",
                contrast: "normal",
                className: "bg-warning text-alternate hover:bg-warning-upper-quarter"
            },
            {
                style: "normal",
                color: "warning",
                intensity: "dimmed",
                contrast: "normal",
                className: "bg-warning-eighth text-warning hover:bg-warning-sixteenth"
            },
            {
                style: "outline",
                color: "warning",
                intensity: "normal",
                contrast: "normal",
                className: "border-warning text-warning hover:bg-warning hover:text-alternate"
            },
            {
                style: "outline",
                color: "warning",
                intensity: "dimmed",
                contrast: "normal",
                className: "hover:bg-warning-eighth border-warning-eighth text-warning hover:border-warning-zero"
            },
            {
                style: "ghost",
                color: "warning",
                intensity: "normal",
                contrast: "normal",
                className: "text-warning hover:bg-warning hover:text-alternate"
            },
            {
                style: "ghost",
                color: "warning",
                intensity: "dimmed",
                contrast: "normal",
                className: "hover:bg-warning-eighth text-warning"
            },
            {
                style: "link",
                color: "warning",
                intensity: "normal",
                contrast: "normal",
                className: "text-warning hover:text-warning-upper-quarter"
            },
            {
                style: "link",
                color: "warning",
                intensity: "dimmed",
                contrast: "normal",
                className: "text-warning-half hover:text-warning-3/8"
            },

            {
                style: "normal",
                color: "warning",
                intensity: "normal",
                contrast: "high",
                className: "bg-warning text-alternate hover:bg-warning-upper-quarter"
            },
            {
                style: "normal",
                color: "warning",
                intensity: "dimmed",
                contrast: "high",
                className: "bg-warning-eighth hover:bg-warning-sixteenth"
            },
            {
                style: "outline",
                color: "warning",
                intensity: "normal",
                contrast: "high",
                className: "border-warning hover:bg-warning hover:text-alternate"
            },
            {
                style: "outline",
                color: "warning",
                intensity: "dimmed",
                contrast: "high",
                className: "border-warning-eighth hover:bg-warning-eighth hover:border-warning-zero"
            },
            {
                style: "ghost",
                color: "warning",
                intensity: "normal",
                contrast: "high",
                className: "hover:bg-warning hover:text-alternate"
            },
            {
                style: "ghost",
                color: "warning",
                intensity: "dimmed",
                contrast: "high",
                className: "hover:bg-warning-eighth"
            },
            {
                style: "link",
                color: "warning",
                intensity: "normal",
                contrast: "high",
                className: "hover:text-warning-upper-quarter"
            },
            {
                style: "link",
                color: "warning",
                intensity: "dimmed",
                contrast: "high",
                className: "text-main-half hover:text-warning-3/8"
            },

            {
                style: "normal",
                color: "danger",
                intensity: "normal",
                contrast: "normal",
                className: "bg-danger text-alternate hover:bg-danger-upper-quarter"
            },
            {
                style: "normal",
                color: "danger",
                intensity: "dimmed",
                contrast: "normal",
                className: "bg-danger-eighth text-danger hover:bg-danger-sixteenth"
            },
            {
                style: "outline",
                color: "danger",
                intensity: "normal",
                contrast: "normal",
                className: "border-danger text-danger hover:bg-danger hover:text-alternate"
            },
            {
                style: "outline",
                color: "danger",
                intensity: "dimmed",
                contrast: "normal",
                className: "hover:bg-danger-eighth border-danger-eighth text-danger hover:border-danger-zero"
            },
            {
                style: "ghost",
                color: "danger",
                intensity: "normal",
                contrast: "normal",
                className: "text-danger hover:bg-danger hover:text-alternate"
            },
            {
                style: "ghost",
                color: "danger",
                intensity: "dimmed",
                contrast: "normal",
                className: "hover:bg-danger-eighth text-danger"
            },
            {
                style: "link",
                color: "danger",
                intensity: "normal",
                contrast: "normal",
                className: "text-danger hover:text-danger-upper-quarter"
            },
            {
                style: "link",
                color: "danger",
                intensity: "dimmed",
                contrast: "normal",
                className: "text-danger-half hover:text-danger-3/8"
            },

            {
                style: "normal",
                color: "danger",
                intensity: "normal",
                contrast: "high",
                className: "bg-danger text-alternate hover:bg-danger-upper-quarter"
            },
            {
                style: "normal",
                color: "danger",
                intensity: "dimmed",
                contrast: "high",
                className: "bg-danger-eighth hover:bg-danger-sixteenth"
            },
            {
                style: "outline",
                color: "danger",
                intensity: "normal",
                contrast: "high",
                className: "border-danger hover:bg-danger hover:text-alternate"
            },
            {
                style: "outline",
                color: "danger",
                intensity: "dimmed",
                contrast: "high",
                className: "border-danger-eighth hover:bg-danger-eighth hover:border-danger-zero"
            },
            {
                style: "ghost",
                color: "danger",
                intensity: "normal",
                contrast: "high",
                className: "hover:bg-danger hover:text-alternate"
            },
            {
                style: "ghost",
                color: "danger",
                intensity: "dimmed",
                contrast: "high",
                className: "hover:bg-danger-eighth"
            },
            {
                style: "link",
                color: "danger",
                intensity: "normal",
                contrast: "high",
                className: "hover:text-danger-upper-quarter"
            },
            {
                style: "link",
                color: "danger",
                intensity: "dimmed",
                contrast: "high",
                className: "text-main-half hover:text-danger-3/8"
            },

            {
                style: "normal",
                color: "success",
                intensity: "normal",
                contrast: "normal",
                className: "bg-success text-alternate hover:bg-success-upper-quarter"
            },
            {
                style: "normal",
                color: "success",
                intensity: "dimmed",
                contrast: "normal",
                className: "bg-success-eighth text-success hover:bg-success-sixteenth"
            },
            {
                style: "outline",
                color: "success",
                intensity: "normal",
                contrast: "normal",
                className: "border-success text-success hover:bg-success hover:text-alternate"
            },
            {
                style: "outline",
                color: "success",
                intensity: "dimmed",
                contrast: "normal",
                className: "hover:bg-success-eighth border-success-eighth text-success hover:border-success-zero"
            },
            {
                style: "ghost",
                color: "success",
                intensity: "normal",
                contrast: "normal",
                className: "text-success hover:bg-success hover:text-alternate"
            },
            {
                style: "ghost",
                color: "success",
                intensity: "dimmed",
                contrast: "normal",
                className: "hover:bg-success-eighth text-success"
            },
            {
                style: "link",
                color: "success",
                intensity: "normal",
                contrast: "normal",
                className: "text-success hover:text-success-upper-quarter"
            },
            {
                style: "link",
                color: "success",
                intensity: "dimmed",
                contrast: "normal",
                className: "text-success-half hover:text-success-3/8"
            },

            {
                style: "normal",
                color: "success",
                intensity: "normal",
                contrast: "high",
                className: "bg-success text-alternate hover:bg-success-upper-quarter"
            },
            {
                style: "normal",
                color: "success",
                intensity: "dimmed",
                contrast: "high",
                className: "bg-success-eighth hover:bg-success-sixteenth"
            },
            {
                style: "outline",
                color: "success",
                intensity: "normal",
                contrast: "high",
                className: "border-success hover:bg-success hover:text-alternate"
            },
            {
                style: "outline",
                color: "success",
                intensity: "dimmed",
                contrast: "high",
                className: "border-success-eighth hover:bg-success-eighth hover:border-success-zero"
            },
            {
                style: "ghost",
                color: "success",
                intensity: "normal",
                contrast: "high",
                className: "hover:bg-success hover:text-alternate"
            },
            {
                style: "ghost",
                color: "success",
                intensity: "dimmed",
                contrast: "high",
                className: "hover:bg-success-eighth"
            },
            {
                style: "link",
                color: "success",
                intensity: "normal",
                contrast: "high",
                className: "hover:text-success-upper-quarter"
            },
            {
                style: "link",
                color: "success",
                intensity: "dimmed",
                contrast: "high",
                className: "text-main-half hover:text-success-3/8"
            },

            {
                style: "normal",
                color: "info",
                intensity: "normal",
                contrast: "normal",
                className: "bg-info text-alternate hover:bg-info-upper-quarter"
            },
            {
                style: "normal",
                color: "info",
                intensity: "dimmed",
                contrast: "normal",
                className: "bg-info-eighth text-info hover:bg-info-sixteenth"
            },
            {
                style: "outline",
                color: "info",
                intensity: "normal",
                contrast: "normal",
                className: "border-info text-info hover:bg-info hover:text-alternate"
            },
            {
                style: "outline",
                color: "info",
                intensity: "dimmed",
                contrast: "normal",
                className: "hover:bg-info-eighth border-info-eighth text-info hover:border-info-zero"
            },
            {
                style: "ghost",
                color: "info",
                intensity: "normal",
                contrast: "normal",
                className: "text-info hover:bg-info hover:text-alternate"
            },
            {
                style: "ghost",
                color: "info",
                intensity: "dimmed",
                contrast: "normal",
                className: "hover:bg-info-eighth text-info"
            },
            {
                style: "link",
                color: "info",
                intensity: "normal",
                contrast: "normal",
                className: "text-info hover:text-info-upper-quarter"
            },
            {
                style: "link",
                color: "info",
                intensity: "dimmed",
                contrast: "normal",
                className: "text-info-half hover:text-info-3/8"
            },

            {
                style: "normal",
                color: "info",
                intensity: "normal",
                contrast: "high",
                className: "bg-info text-alternate hover:bg-info-upper-quarter"
            },
            {
                style: "normal",
                color: "info",
                intensity: "dimmed",
                contrast: "high",
                className: "bg-info-eighth hover:bg-info-sixteenth"
            },
            {
                style: "outline",
                color: "info",
                intensity: "normal",
                contrast: "high",
                className: "border-info hover:bg-info hover:text-alternate"
            },
            {
                style: "outline",
                color: "info",
                intensity: "dimmed",
                contrast: "high",
                className: "border-info-eighth hover:bg-info-eighth hover:border-info-zero"
            },
            {
                style: "ghost",
                color: "info",
                intensity: "normal",
                contrast: "high",
                className: "hover:bg-info hover:text-alternate"
            },
            {
                style: "ghost",
                color: "info",
                intensity: "dimmed",
                contrast: "high",
                className: "hover:bg-info-eighth"
            },
            {
                style: "link",
                color: "info",
                intensity: "normal",
                contrast: "high",
                className: "hover:text-info-upper-quarter"
            },
            {
                style: "link",
                color: "info",
                intensity: "dimmed",
                contrast: "high",
                className: "text-main-half hover:text-info-3/8"
            },

            {
                style: "normal",
                color: "accent",
                intensity: "normal",
                contrast: "normal",
                className: "bg-accent text-alternate hover:bg-accent-upper-quarter"
            },
            {
                style: "normal",
                color: "accent",
                intensity: "dimmed",
                contrast: "normal",
                className: "bg-accent-eighth text-accent hover:bg-accent-sixteenth"
            },
            {
                style: "outline",
                color: "accent",
                intensity: "normal",
                contrast: "normal",
                className: "border-accent text-accent hover:bg-accent hover:text-alternate"
            },
            {
                style: "outline",
                color: "accent",
                intensity: "dimmed",
                contrast: "normal",
                className: "hover:bg-accent-eighth border-accent-eighth text-accent hover:border-accent-zero"
            },
            {
                style: "ghost",
                color: "accent",
                intensity: "normal",
                contrast: "normal",
                className: "text-accent hover:bg-accent hover:text-alternate"
            },
            {
                style: "ghost",
                color: "accent",
                intensity: "dimmed",
                contrast: "normal",
                className: "hover:bg-accent-eighth text-accent"
            },
            {
                style: "link",
                color: "accent",
                intensity: "normal",
                contrast: "normal",
                className: "text-accent hover:text-accent-upper-quarter"
            },
            {
                style: "link",
                color: "accent",
                intensity: "dimmed",
                contrast: "normal",
                className: "text-accent-half hover:text-accent-3/8"
            },

            {
                style: "normal",
                color: "accent",
                intensity: "normal",
                contrast: "high",
                className: "bg-accent text-alternate hover:bg-accent-upper-quarter"
            },
            {
                style: "normal",
                color: "accent",
                intensity: "dimmed",
                contrast: "high",
                className: "bg-accent-eighth hover:bg-accent-sixteenth"
            },
            {
                style: "outline",
                color: "accent",
                intensity: "normal",
                contrast: "high",
                className: "border-accent hover:bg-accent hover:text-alternate"
            },
            {
                style: "outline",
                color: "accent",
                intensity: "dimmed",
                contrast: "high",
                className: "border-accent-eighth hover:bg-accent-eighth hover:border-accent-zero"
            },
            {
                style: "ghost",
                color: "accent",
                intensity: "normal",
                contrast: "high",
                className: "hover:bg-accent hover:text-alternate"
            },
            {
                style: "ghost",
                color: "accent",
                intensity: "dimmed",
                contrast: "high",
                className: "hover:bg-accent-eighth"
            },
            {
                style: "link",
                color: "accent",
                intensity: "normal",
                contrast: "high",
                className: "hover:text-accent-upper-quarter"
            },
            {
                style: "link",
                color: "accent",
                intensity: "dimmed",
                contrast: "high",
                className: "text-main-half hover:text-accent-3/8"
            }
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
