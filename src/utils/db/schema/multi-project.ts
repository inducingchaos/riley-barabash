/**
 * @file Allows the use of one database for multiple projects.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #utils
 * #db
 * #schema
 * #multi-project
 * #drizzle
 * #mysql
 *
 * @todo
 * - [P4] Add support for other database types.
 * - [P1] Implement environment control for accessing test branches/tables.
 * - [P2] Add support for a dynamic project name.
 */

import { mysqlTableCreator } from "drizzle-orm/mysql-core"
import { brand } from "~/config"

export const createTableName = (name: string): string => `${brand.info.name.toLowerCase().replace(/ /g, "_")}_${name}`

/**
 * Uses Drizzle's multi-project schema feature, which allows you to use the same database instance for multiple projects.
 *
 * @remarks
 * - Drizzle has a bug where an error will occur during schema push if we don't prefix the table name passed to the `customizeTableName` function. To disable prefixing, the 'multi-project-schema' feature should be disabled entirely. This may be fixed in future versions.
 *
 * @see [Multi-Project Schema Docs](https://orm.drizzle.team/docs/goodies#multi-project-schema)
 */
export const createMysqlTable = mysqlTableCreator(createTableName)
