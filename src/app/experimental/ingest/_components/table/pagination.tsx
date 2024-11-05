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
        <div className="flex items-center justify-between py-4">
            <div className="text-muted-foreground flex-1 py-2 font-mono text-14">
                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-muted-foreground font-mono text-14 font-medium">Rows per page:</p>
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={value => {
                            table.setPageSize(Number(value))
                        }}
                    >
                        <SelectTrigger className="text-muted-foreground w-[70px] rounded-none border-2 shadow-none">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <SelectItem className="text-muted-foreground" key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="text-muted-foreground flex w-[100px] items-center justify-center font-mono text-14 font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className="flex items-center justify-center border-2">
                    <Button
                        style="outline"
                        className="border-0 hidden h-auto rounded-none p-2 shadow-none lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <div className="relative w-4 self-stretch">
                        <div className="bg-border absolute inset-y-1/4 left-3/4 w-0.5"></div>
                    </div>
                    <Button
                        style="outline"
                        className="border-0 h-auto rounded-none p-2 shadow-none"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        style="outline"
                        className="border-0 h-auto rounded-none p-2 shadow-none"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        style="outline"
                        className="border-0 hidden h-auto rounded-none p-2 shadow-none lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

{
    /* <DataTablePagination table={table} /> */
}
