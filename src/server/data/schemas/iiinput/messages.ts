/**
 *
 */

import { index, text, timestamp, varchar } from "drizzle-orm/mysql-core"
import { v4 as uuid } from "uuid"
import { createIiinputMysqlTable } from "./helpers"

export const messages = createIiinputMysqlTable(
    "messages",
    {
        id: varchar("id", { length: 255 }).primaryKey().$defaultFn(uuid),
        userId: varchar("user_id", { length: 255 }).notNull(),
        content: text("content"),
        role: varchar("role", { length: 64 }).notNull().default("user"),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
    },
    message => ({
        userIdIndex: index("user_id_idx").on(message.userId)
    })
)
