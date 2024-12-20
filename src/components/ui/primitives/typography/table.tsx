/**
 *
 */

import { cn } from "~/utils/ui"

type TableColumns = {
    /**
     * The title of a column.
     */
    title: string

    /**
     * The key used to assign data to a column.
     */
    key: string
}

type TableProps = {
    /**
     * The columns of the table.
     */
    columns: TableColumns[]

    /**
     * The data of the table.
     */
    data: Record<string, string>[]

    className?: string
}

/**
 * A table.
 *
 * @example
 * const columns = [
 *     { title: "King's Treasury", key: "treasury" },
 *     { title: "People's happiness", key: "happiness" },
 *     { title: "Jokester's rebellion", key: "rebellion" }
 * ]
 *
 * const data = [
 *     { treasury: "Empty", happiness: "Overflowing", rebellion: "Modest" },
 *     { treasury: "Modest", happiness: "Satisfied", rebellion: "Full" },
 *     { treasury: "Full", happiness: "Ecstatic", rebellion: "Ecstatic" }
 * ]
 *
 * <Table columns={columns} data={data} />
 */
export function Table({ columns, data, className, ...props }: TableProps): JSX.Element {
    return (
        <div className={cn("my-24px w-full overflow-y-auto", className)} {...props}>
            <table className="w-full">
                <thead>
                    <tr className="m-0px border-t p-0px even:bg-main/sixteenth">
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="border px-16px py-8px text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="m-0px border-t p-0px even:bg-main/sixteenth">
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="border px-16px py-8px text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                                >
                                    {row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
