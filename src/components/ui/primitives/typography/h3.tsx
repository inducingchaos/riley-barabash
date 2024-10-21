/**
 *
 */

import { cn } from "~/utils/ui"

export function H3({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <h3 className={cn("scroll-m-20 text-24 font-semibold tracking-tight", className)} {...props}>
            {children}
        </h3>
    )
}
