/**
 * @file A quaternary heading.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #components
 * #ui
 * #primitives
 * #typography
 * #h4
 * #heading
 */

import { cn } from "~/utils/ui"

export function H4({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props}>
            {children}
        </h4>
    )
}
