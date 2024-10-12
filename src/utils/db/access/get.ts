/**
 *
 */

import "server-only"

import type { MySqlTable } from "drizzle-orm/mysql-core"
import { type Database } from "~/server/data"
import { buildWhereClause } from "../schema/build-where-clause"

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
        const result = await db
            .select()
            .from(schema)
            .where(buildWhereClause({ using: query, for: schema }))

        return (selectMany ? result : result[0]) as SelectMany extends true ? Data[] : Data | undefined
    }
}
