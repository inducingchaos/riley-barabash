/**
 * @see [Sortable/Hidable Header - Tasks](https://ui.shadcn.com/examples/tasks)
 */

import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon, EyeNoneIcon } from "@radix-ui/react-icons"
import { type Column } from "@tanstack/react-table"
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "~/components/ui/primitives/inputs"
import { cn } from "~/utils/ui"

type DataTableColumnHeaderProps<TData, TValue> = {
    column: Column<TData, TValue>
    title: string
} & React.HTMLAttributes<HTMLDivElement>

export function DataTableColumnHeader<TData, TValue>({ column, title, className }: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("flex items-center space-x-8px", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button style="ghost" className="-ml-12px h-32px data-[state=open]:bg-accent">
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon className="ml-8px size-16px" />
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon className="ml-8px size-16px" />
                        ) : (
                            <CaretSortIcon className="ml-8px size-16px" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        {/* Each icon was h-3.5rem, w-12px */}
                        <ArrowUpIcon className="mr-8px size-12px text-main/quarter" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <ArrowDownIcon className="mr-8px size-12px text-main/quarter" />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeNoneIcon className="mr-8px size-12px text-main/quarter" />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

/*

export const columns = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
]

*/
