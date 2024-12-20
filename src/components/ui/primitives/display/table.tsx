/**
 *
 */

import { type HTMLAttributes, forwardRef, type TdHTMLAttributes, type ThHTMLAttributes } from "react"
import { cn } from "~/utils/ui"

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
        <table ref={ref} className={cn("w-full caption-bottom text-14px", className)} {...props} />
    </div>
))

Table.displayName = "Table"

// const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
//     ({ className, ...props }, ref) => (
//         <thead ref={ref} className={cn("[&_th]:even:bg-main/sixteenth [&_tr]:border-b", className)} {...props} />
//     )
// )

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
)

TableHeader.displayName = "TableHeader"

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => <tbody ref={ref} className={cn("[&_tr:last-child]:border-none", className)} {...props} />
)

TableBody.displayName = "TableBody"

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <tfoot ref={ref} className={cn("border-t bg-main/sixteenth font-medium [&>tr]:last:border", className)} {...props} />
    )
)

TableFooter.displayName = "TableFooter"

// const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
//     <tr ref={ref} className={cn("transition-colors hover:bg-main/sixteenth data-[state=selected]:bg-main/sixteenth", className)} {...props} />
// ))

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn("border-b transition-colors hover:bg-main/sixteenth data-[state=selected]:bg-main/sixteenth", className)}
        {...props}
    />
))

TableRow.displayName = "TableRow"

const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        // was h-10
        className={cn(
            "h-48px px-8px text-left align-middle font-medium text-main/half [&:has([role=checkbox])]:pr-0px [&>[role=checkbox]]:translate-y-2px",
            className
        )}
        {...props}
    />
))

TableHead.displayName = "TableHead"

const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn("p-8px align-middle [&:has([role=checkbox])]:pr-0px [&>[role=checkbox]]:translate-y-2px", className)}
        {...props}
    />
))

// const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
//     <td
//         ref={ref}
//         className={cn(
//             "p-8px align-middle even:bg-main/sixteenth [&:has([role=checkbox])]:pr-0px [&>[role=checkbox]]:translate-y-[2px]",
//             className
//         )}
//         {...props}
//     />
// ))

TableCell.displayName = "TableCell"

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
    ({ className, ...props }, ref) => (
        <caption ref={ref} className={cn("mt-16px text-14px text-main/half", className)} {...props} />
    )
)

TableCaption.displayName = "TableCaption"

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
