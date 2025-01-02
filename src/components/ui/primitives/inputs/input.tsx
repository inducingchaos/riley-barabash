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
                "flex w-full rounded-6x border px-16px py-8px text-main file:border-none file:bg-transparent file:text-14px file:font-medium file:text-main placeholder:text-main/half focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-2 focus-visible:ring-offset-alternate disabled:cursor-not-allowed disabled:opacity-half md:text-14px",

                className
            )}
            ref={ref}
            {...props}
        />
    )
})

Input.displayName = "Input"

export { Input }
