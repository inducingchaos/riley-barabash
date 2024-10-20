/**
 *
 */

import { Slot } from "@radix-ui/react-slot"
import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "~/utils/ui"
import { createButtonVariant, type VariantOptions } from "./variants"

export type ButtonProps = {
    asChild?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement> &
    VariantOptions

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ style, color, intensity, shape, asChild = false, className, ...props }, ref) => {
        const Component = asChild ? Slot : "button"

        return (
            <Component
                className={cn(
                    createButtonVariant({
                        using: {
                            style,
                            color,
                            intensity,
                            shape
                        }
                    }),
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"

export * from "./variants"
export { Button }
