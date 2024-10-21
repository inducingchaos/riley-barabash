/**
 *
 */

import { cn } from "~/utils/ui"

export function Muted({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <p className={cn("text-muted-foreground text-14", className)} {...props}>
            {children}
        </p>
    )
}
