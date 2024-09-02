/**
 * @file A list.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #components
 * #ui
 * #primitives
 * #typography
 * #list
 * #list-item
 */

import { cn } from "~/utils/ui"

export function List({ children, className, ...props }: React.HTMLAttributes<HTMLUListElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
            {children}
        </ul>
    )
}

export function ListItem({ children, className, ...props }: React.HTMLAttributes<HTMLLIElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <li className={cn("", className)} {...props}>
            {children}
        </li>
    )
}
