/**
 *
 */

import { index, timestamp, varchar } from "drizzle-orm/mysql-core"
import { v4 as uuid } from "uuid"
import { createRileyBarabashMysqlTable } from "./helpers"

export const ledger = createRileyBarabashMysqlTable(
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
