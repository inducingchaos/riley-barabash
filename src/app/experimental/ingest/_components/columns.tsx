// /**
//  *
//  */

// "use client"

// import { type ColumnDef } from "@tanstack/react-table"
// import { ArrowUpDown, MoreHorizontal } from "lucide-react"
// import {
//     Checkbox,
//     Button,
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger
// } from "~/components/ui/primitives/inputs"
// import { DataTableColumnHeader } from "./table/sortable-header"

// export interface Neuron {
//     id: number
//     content: string
//     tags: string[]
//     [key: string]: number | string | string[]
// }

// function generateDynamicColumns(data: Neuron[]): ColumnDef<Neuron>[] {
//     const dynamicColumns: ColumnDef<Neuron>[] = []
//     const uniqueKeys = new Set<string>()

//     for (const neuron of data) {
//         Object.keys(neuron).forEach(key => {
//             if (key !== "id" && key !== "content" && key !== "tags" && !uniqueKeys.has(key)) {
//                 uniqueKeys.add(key)
//                 dynamicColumns.push({
//                     accessorKey: key,
//                     header: () => <div className="font-mono tracking-tighter">{key.charAt(0) + key.slice(1) + "."}</div>,
//                     cell: ({ row }) => {
//                         const value = row.original[key]
//                         return value ? (
//                             Array.isArray(value) ? (
//                                 value.join(", ")
//                             ) : (
//                                 value
//                             )
//                         ) : (
//                             <div className="h-0.5 w-2 bg-border"></div>
//                         )
//                     }
//                 })
//             }
//         })
//     }

//     return dynamicColumns
// }

// export const getColumns = (data: Neuron[]): ColumnDef<Neuron>[] => [
//     {
//         id: "select",
//         header: ({ table }) => (
//             <div className="flex items-center justify-center px-2">
//                 <Checkbox
//                     className="rounded-none border-2 border-inherit shadow-none"
//                     checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
//                     onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
//                     aria-label="Select all"
//                 />
//             </div>
//         ),
//         cell: ({ row }) => (
//             <div className="flex items-center justify-center px-2">
//                 <Checkbox
//                     className="rounded-none border-2 border-inherit shadow-none"
//                     checked={row.getIsSelected()}
//                     onCheckedChange={value => row.toggleSelected(!!value)}
//                     aria-label="Select row"
//                 />
//             </div>
//         ),
//         enableSorting: false,
//         enableHiding: false
//     },
//     {
//         accessorKey: "id",
//         header: () => <div className="text-right font-mono tracking-tighter">id.</div>,
//         cell: ({ row }) => {
//             const id = row.getValue("id")
//             return (
//                 <div className="text-right font-bold">
//                     {!!id ? <div>{id as string}</div> : <div className="h-0.5 w-2 bg-border" />}
//                 </div>
//             )
//         }
//     },
//     {
//         accessorKey: "content",
//         header: ({ column }) => {
//             return (
//                 <Button
//                     variant="ghost"
//                     className="font-mono tracking-tighter"
//                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                 >
//                     content.
//                     <ArrowUpDown className="ml-2 h-4 w-4" />
//                 </Button>
//             )
//         },
//         cell: ({ row }) => {
//             const content = row.getValue("content")
//             return content ? content : <div className="h-0.5 w-2 bg-border"></div>
//         }
//     },
//     ...generateDynamicColumns(data),
//     {
//         accessorKey: "tags",
//         header: ({ column }) => <DataTableColumnHeader column={column} className="font-mono tracking-tighter" title="tags." />,
//         cell: ({ row }) => {
//             const tags = row.original.tags
//             return (
//                 <div className="font-mono tracking-tighter">
//                     {tags.length > 0 ? tags.join(", ") : <div className="h-0.5 w-2 bg-border"></div>}
//                 </div>
//             )
//         }
//     },
//     {
//         id: "actions",
//         cell: ({ row }) => {
//             const neuron = row.original

//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal className="h-4 w-4" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                         <DropdownMenuItem onClick={() => console.log(neuron.id)}>Log neuron ID</DropdownMenuItem>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem>View neuron</DropdownMenuItem>
//                         <DropdownMenuItem>Delete neuron</DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             )
//         }
//     }
// ]
