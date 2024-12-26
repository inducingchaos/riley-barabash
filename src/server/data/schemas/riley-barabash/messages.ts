/**
 *
 */

import { index, text, timestamp, varchar } from "drizzle-orm/mysql-core"
import { v4 as uuid } from "uuid"
import { createRileyBarabashMysqlTable } from "./helpers"

export const messages = createRileyBarabashMysqlTable(
    "messages",
    {
        id: varchar("id", { length: 255 }).primaryKey().$defaultFn(uuid),
        userId: varchar("user_id", { length: 255 }).notNull(),
        content: text("content"),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
    },
    message => ({
        userIdIndex: index("user_id_idx").on(message.userId)
        // contentIndex: index("content_idx").on(message.content)
    })
)
