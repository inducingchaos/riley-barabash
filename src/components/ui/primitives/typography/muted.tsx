/**
 * @file A muted typography element.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #components
 * #ui
 * #primitives
 * #typography
 * #muted
 */

import { cn } from "~/utils/ui"

export function Muted({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }): JSX.Element {
    return <p className={cn("text-sm text-muted-foreground", className)} {...props}>{children}</p>
}
