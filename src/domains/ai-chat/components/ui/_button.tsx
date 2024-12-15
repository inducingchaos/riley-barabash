import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/domains/ai-chat/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-14 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-constant focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: "bg-accent-constant text-alternate-constant hover:bg-accent-constant",
                destructive: "bg-danger text-alternate-constant hover:bg-danger",
                outline: "border border-main-sixteenth bg-alternate hover:bg-main-sixteenth hover:text-main",
                secondary: "bg-main-sixteenth text-main-upper-eighth hover:bg-main-sixteenth",
                ghost: "hover:bg-main-sixteenth hover:text-main",
                link: "text-accent-constant underline-offset-4 hover:underline"
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "size-10"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
)

export type ButtonProps = {
    asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
