/**
 *
 */

import "server-only"

import type { MySqlTable } from "drizzle-orm/mysql-core"
import { Exception } from "~/meta"
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
        try {
            const data = await db
                .select()
                .from(schema)
                .where(buildWhereClause({ using: query, for: schema }))

            if (selectMany === false && data.length > 1)
                throw new Exception({
                    in: "logic",
                    of: "incorrect-implementation",
                    with: {
                        internal: {
                            label: "Multiple Results for Single Query",
                            message: "Expected a single result, but received multiple."
                        }
                    },
                    and: {
                        query,
                        data
                    }
                })

            return (selectMany ? data : data[0]) as SelectMany extends true ? Data[] : Data | undefined
        } catch (error) {
            if (error instanceof Exception) throw error
            throw new Exception({
                in: "data",
                of: "unknown",
                with: {
                    internal: {
                        label: "Failed to Retrieve Data",
                        message: "An unknown error occurred while retrieving data."
                    }
                },
                and: {
                    error,
                    query
                }
            })
        }
    }
}
