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
        <div className={cn("text-18 font-semibold", className)} {...props}>
            {children}
        </div>
    )
}
