/**
 * @todo
 * - [P4] Add support for other database types.
 * - [P1] Implement environment control for accessing test branches/tables.
 * - [P2] Add support for a dynamic project name.
 */

import { mysqlTableCreator } from "drizzle-orm/mysql-core"
import type { Project } from "~/types"

export const createTableName = ({ for: projectName, from: tableName }: { for?: Project | ""; from: string }): string => {
    const resolvedProjectName = (projectName ?? "").toLowerCase().replace(/[ -]/g, "_")

    return `${resolvedProjectName}${resolvedProjectName ? "_" : ""}${tableName}`
}

/**
 * Uses Drizzle's multi-project schema feature, which allows you to use the same database instance for multiple projects.
 *
 * @remarks
 * - Drizzle has a bug where an error will occur during schema push if we don't prefix the table name passed to the `customizeTableName` function. To disable prefixing, the 'multi-project-schema' feature should be disabled entirely. This may be fixed in future versions.
 *
 * @see [Multi-Project Schema Docs](https://orm.drizzle.team/docs/goodies#multi-project-schema)
 */
// export const createMysqlTable = mysqlTableCreator(createTableName)

export function createMysqlTable({ for: projectName }: { for?: Project }) {
    return mysqlTableCreator((tableName: string): string => createTableName({ for: projectName, from: tableName }))
}
