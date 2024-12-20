/**
 *
 */

import { cn } from "~/utils/ui"

export function H2({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }): JSX.Element {
    return (
        // was scroll-m-20
        <h2
            className={cn("scroll-m-96px border-b pb-8px text-30px font-semibold tracking-tight first:mt-0px", className)}
            {...props}
        >
            {children}
        </h2>
    )
}
