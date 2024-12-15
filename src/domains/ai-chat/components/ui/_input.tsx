import * as React from "react"

import { cn } from "~/domains/ai-chat/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "rounded-md border-input bg-alternate ring-offset-background file:border-0 file:text-sm file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring md:text-sm flex h-10 w-full border px-3 py-2 text-16 file:bg-transparent file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = "Input"

export { Input }
