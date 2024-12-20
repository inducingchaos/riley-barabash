/**
 * @see [page size and selection count - Tasks](https://ui.shadcn.com/examples/tasks)
 */

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/primitives/inputs"

type DataTablePaginationProps<TData> = {
    table: Table<TData>
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
    return (
        <div className="flex items-center justify-between py-16px">
            <div className="flex-1 py-8px font-mono text-14px text-main/half">
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-24px lg:space-x-32px">
                <div className="flex items-center space-x-8px">
                    <p className="font-mono text-14px font-medium text-main/half">Rows per page:</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={value => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="w-64px rounded-0px border-2x text-main/half shadow-none">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <SelectItem className="text-main/half" key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-96px items-center justify-center font-mono text-14px font-medium text-main/half">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className="flex items-center justify-center border-2x">
                    <Button
                        style="outline"
                        className="hidden h-auto rounded-0px border-none p-8px shadow-none lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="size-16px" />
                    </Button>
                    <div className="relative w-16px self-stretch">
                        <div className="absolute inset-y-1/4 left-3/4 w-2px bg-main/eighth"></div>
                    </div>
                    <Button
                        style="outline"
                        className="h-auto rounded-0px border-none p-8px shadow-none"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="size-16px" />
                    </Button>
                    <Button
                        style="outline"
                        className="h-auto rounded-0px border-none p-8px shadow-none"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="size-16px" />
                    </Button>
                    <Button
                        style="outline"
                        className="hidden h-auto rounded-0px border-none p-8px shadow-none lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="size-16px" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

{
    /* <DataTablePagination table={table} /> */
}
