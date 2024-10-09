/**
 *
 */

import "server-only"

import { and, eq } from "drizzle-orm"
import type { MySqlColumn, MySqlTable } from "drizzle-orm/mysql-core"
import { type Database } from "~/server/data"

export function initializeGetDataFunction<
    Schema extends MySqlTable,
    Data extends Schema["_"]["inferSelect"],
    SelectMany extends boolean = true
>({
    for: schema,
    selectMany = false as SelectMany
}: {
    for: Schema
    selectMany?: SelectMany
}): ({
    where,
    from
}: {
    where: Partial<Data>
    from: Database
}) => Promise<SelectMany extends true ? Data[] : Data | undefined> {
    return async ({ where: query, from: db }) => {
        const where = Object.entries(query)
            .filter(([_, queryValue]) => queryValue !== undefined)
            .map(([queryKey, queryValue]) => eq(schema[queryKey as keyof typeof schema] as MySqlColumn, queryValue))

        const result = await db
            .select()
            .from(schema)
            .where(and(...where))

        return (selectMany ? result : result[0]) as SelectMany extends true ? Data[] : Data | undefined
    }
}
