// "use client"

// import {
//     // type ColumnDef,
//     type ColumnFiltersState,
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     type SortingState,
//     useReactTable,
//     type VisibilityState
// } from "@tanstack/react-table"
// import { useState, useMemo } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/primitives/display"
// import {
//     // Button,
//     // DropdownMenu,
//     // DropdownMenuCheckboxItem,
//     // DropdownMenuContent,
//     // DropdownMenuTrigger,
//     Input
// } from "~/components/ui/primitives/inputs"
// import { getColumns, type Neuron } from "./columns"
// import { DataTablePagination } from "./table/pagination"
// import { DataTableViewOptions } from "./table/column-toggle"

// // interface DataTableProps<TData, TValue> {
// //     columns: ColumnDef<TData, TValue>[]
// //     data: TData[]
// // }

// type DataTableProps<TData> = {
//     data: TData[]
// }
// /**
//  * Restore the original func sig
//  */
// export function DataTable<TData extends Neuron>({ data }: DataTableProps<TData>) {
//     const columns = useMemo(() => getColumns(data), [data])

//     const [sorting, setSorting] = useState<SortingState>([])
//     const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
//     const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
//     const [rowSelection, setRowSelection] = useState({})

//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         onSortingChange: setSorting,
//         getSortedRowModel: getSortedRowModel(),
//         onColumnFiltersChange: setColumnFilters,
//         getFilteredRowModel: getFilteredRowModel(),
//         onColumnVisibilityChange: setColumnVisibility,
//         onRowSelectionChange: setRowSelection,
//         state: {
//             sorting,
//             columnFilters,
//             columnVisibility,
//             rowSelection
//         }
//     })

//     return (
//         <div>
//             <div className="flex w-screen flex-col items-center justify-center p-32px">
//                 <div className="flex w-full items-center justify-between py-16px">
//                     <div className="h-4px w-8 border-2x"></div>
//                     <Input
//                         placeholder="Filter content..."
//                         value={(table.getColumn("content")?.getFilterValue() as string) ?? ""}
//                         onChange={event => table.getColumn("content")?.setFilterValue(event.target.value)}
//                         className="max-w-sm rounded-0px border-2x shadow-none"
//                     />
//                     <DataTableViewOptions table={table} />

//                     {/* <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button style="outline" className="ml-auto">
//                                 Columns
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                             {table
//                                 .getAllColumns()
//                                 .filter(column => column.getCanHide())
//                                 .map(column => {
//                                     return (
//                                         <DropdownMenuCheckboxItem
//                                             key={column.id}
//                                             className="capitalize"
//                                             checked={column.getIsVisible()}
//                                             onCheckedChange={value => column.toggleVisibility(!!value)}
//                                         >
//                                             {column.id}
//                                         </DropdownMenuCheckboxItem>
//                                     )
//                                 })}
//                         </DropdownMenuContent>
//                     </DropdownMenu> */}
//                 </div>
//                 <div className="w-full border-2x">
//                     <Table>
//                         <TableHeader className="border-b-2">
//                             {table.getHeaderGroups().map(headerGroup => (
//                                 <TableRow key={headerGroup.id}>
//                                     {headerGroup.headers.map(header => {
//                                         return (
//                                             <TableHead key={header.id}>
//                                                 {header.isPlaceholder
//                                                     ? null
//                                                     : flexRender(header.column.columnDef.header, header.getContext())}
//                                             </TableHead>
//                                         )
//                                     })}
//                                 </TableRow>
//                             ))}
//                         </TableHeader>
//                         <TableBody>
//                             {table.getRowModel().rows?.length ? (
//                                 table.getRowModel().rows.map(row => (
//                                     <TableRow
//                                         className="border-b-2"
//                                         key={row.id}
//                                         data-state={row.getIsSelected() && "selected"}
//                                     >
//                                         {row.getVisibleCells().map(cell => (
//                                             <TableCell key={cell.id}>
//                                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                             </TableCell>
//                                         ))}
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={columns.length} className="h-96px text-center">
//                                         No results.
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </div>
//                 <div className="w-full">
//                     <DataTablePagination table={table} />
//                 </div>
//             </div>
//             {/* <div className="flex items-center justify-end space-x-8px py-16px">
//                 <Button style="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
//                     Previous
//                 </Button>
//                 <Button style="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//                     Next
//                 </Button>
//             </div>
//             <div className="flex-1 text-14px text-muted-foreground">
//                 {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
//             </div> */}
//         </div>
//     )
// }
