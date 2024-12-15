/**
 *
 */

import { type HTMLAttributes, forwardRef, type TdHTMLAttributes, type ThHTMLAttributes } from "react"
import { cn } from "~/utils/ui"

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
        <table ref={ref} className={cn("w-full caption-bottom text-14", className)} {...props} />
    </div>
))

Table.displayName = "Table"

// const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
//     ({ className, ...props }, ref) => (
//         <thead ref={ref} className={cn("[&_th]:even:bg-main-sixteenth [&_tr]:border-b", className)} {...props} />
//     )
// )

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
)

TableHeader.displayName = "TableHeader"

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
)

TableBody.displayName = "TableBody"

const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <tfoot ref={ref} className={cn("bg-main-sixteenth [&>tr]:last:border-b-0 border-t font-medium", className)} {...props} />
    )
)

TableFooter.displayName = "TableFooter"

// const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
//     <tr ref={ref} className={cn("transition-colors hover:bg-main-sixteenth data-[state=selected]:bg-main-sixteenth", className)} {...props} />
// ))

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn("hover:bg-main-sixteenth data-[state=selected]:bg-main-sixteenth border-b transition-colors", className)}
        {...props}
    />
))

TableRow.displayName = "TableRow"

const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            "text-main-half h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        {...props}
    />
))

TableHead.displayName = "TableHead"

const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className)}
        {...props}
    />
))

// const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
//     <td
//         ref={ref}
//         className={cn(
//             "p-2 align-middle even:bg-main-sixteenth [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
//             className
//         )}
//         {...props}
//     />
// ))

TableCell.displayName = "TableCell"

const TableCaption = forwardRef<HTMLTableCaptionElement, HTMLAttributes<HTMLTableCaptionElement>>(
    ({ className, ...props }, ref) => (
        <caption ref={ref} className={cn("text-main-half mt-4 text-14", className)} {...props} />
    )
)

TableCaption.displayName = "TableCaption"

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
