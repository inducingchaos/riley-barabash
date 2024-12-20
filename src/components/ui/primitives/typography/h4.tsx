/**
 *
 */

import { cn } from "~/utils/ui"

export function H4({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }): JSX.Element {
    return (
        // was scroll-m-20
        <h4 className={cn("scroll-m-96px text-20px font-semibold tracking-tight", className)} {...props}>
            {children}
        </h4>
    )
}
