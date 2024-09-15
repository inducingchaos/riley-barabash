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
        <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)} {...props}>
            {children}
        </blockquote>
    )
}
