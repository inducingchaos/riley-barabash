/**
 *
 */

import { cn } from "~/utils/ui"

export function Large({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }): JSX.Element {
    return (
        // was text-18px

        <div className={cn("text-16px font-semibold", className)} {...props}>
            {children}
        </div>
    )
}
