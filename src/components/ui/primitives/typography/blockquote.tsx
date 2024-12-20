/**
 *
 */

import { cn } from "~/utils/ui"

export function Blockquote({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLQuoteElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <blockquote className={cn("mt-24px border-l-8px pl-24px italic", className)} {...props}>
            {children}
        </blockquote>
    )
}
