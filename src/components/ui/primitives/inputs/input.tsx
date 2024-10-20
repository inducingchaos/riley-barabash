/**
 *
 */

import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "~/utils/ui"

export type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "rounded-md border-input file:border-0 placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full border bg-transparent px-3 py-1 text-14 shadow-sm transition-colors file:bg-transparent file:text-14 file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})

Input.displayName = "Input"

export { Input }
