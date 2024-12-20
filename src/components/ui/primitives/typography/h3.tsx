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
        // was scroll-m-20
        <h3 className={cn("scroll-m-96px text-24px font-semibold tracking-tight", className)} {...props}>
            {children}
        </h3>
    )
}
