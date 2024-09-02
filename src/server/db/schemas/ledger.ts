/**
 * @file A schema for ledger entries.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #server
 * #db
 * #schemas
 * #ledger
 * #schema
 * #database
 * #drizzle
 * #mysql
 */

import { index, timestamp, varchar } from "drizzle-orm/mysql-core"
import { v4 as uuid } from "uuid"
import { createMysqlTable } from "~/utils/db/schema"

export const ledger = createMysqlTable(
    "ledger",
    {
        id: varchar("id", { length: 255 }).primaryKey().$defaultFn(uuid),
        name: varchar("name", { length: 63 }).notNull(),
        message: varchar("message", { length: 255 }),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
    },

    entry => ({
        nameIndex: index("name_idx").on(entry.name)
    })
)
