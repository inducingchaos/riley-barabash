/**
 *
 */

import { cn } from "~/utils/ui"

/**
 * A modal dialog that interrupts the user with important content and expects a response.
 */
export function Lead({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <p className={cn("text-muted-foreground text-20", className)} {...props}>
            {children}
        </p>
    )
}
