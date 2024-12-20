/**
 *
 */

import { cn } from "~/utils/ui"

export function List({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLUListElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <ul className={cn("my-24px ml-24px list-disc [&>li]:mt-8px", className)} {...props}>
            {children}
        </ul>
    )
}

export function ListItem({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLLIElement> & { children: React.ReactNode }): JSX.Element {
    return (
        <li className={cn("", className)} {...props}>
            {children}
        </li>
    )
}
