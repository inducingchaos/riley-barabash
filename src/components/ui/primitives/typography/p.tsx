/**
 *
 */

import { cn } from "~/utils/ui"

export function P({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <p className={cn("leading-7 [&:not(:first-child)]:mt-24px", className)} {...props}>
            {children}
        </p>
    )
}
