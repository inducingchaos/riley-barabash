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
                "rounded-md file:border-0 flex w-full border px-4 py-2 text-main file:bg-transparent file:text-14 file:font-medium file:text-main placeholder:text-main-half focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-2 focus-visible:ring-offset-alternate disabled:cursor-not-allowed disabled:opacity-50 md:text-14",

                className
            )}
            ref={ref}
            {...props}
        />
    )
})

Input.displayName = "Input"

export { Input }
