/**
 *
 */

import { relations } from "drizzle-orm"
import { int, timestamp, varchar, unique } from "drizzle-orm/mysql-core"
import { tokenTypes } from "~/types/auth"
import { users } from "."
import { createSharedMysqlTable } from "../helpers"

export const tokens = createSharedMysqlTable(
    "tokens",
    {
        id: int("id").autoincrement().primaryKey(),
        userId: int("user_id").notNull(),
        type: varchar("type", { length: 255, enum: tokenTypes }).notNull(),
        value: varchar("value", { length: 255 }),
        expiresAt: timestamp("expires_at").notNull()
    },
    token => ({
        userIdTypeIdx: unique("user_id_type_idx").on(token.userId, token.type)
    })
)

export const tokensRelations = relations(tokens, ({ one }) => ({
    user: one(users, { fields: [tokens.userId], references: [users.id] })
}))

export const tokensDependencies = ["users"] as const
