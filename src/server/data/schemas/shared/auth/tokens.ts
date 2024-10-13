/**
 *
 */

import { relations } from "drizzle-orm"
import { int, timestamp, varchar, unique } from "drizzle-orm/mysql-core"
import { users } from "."
import { createSharedMysqlTable } from "../helpers"
import type { CreateDataTypes } from "~/utils/db/schema/types"

export const tokenTypes = ["password-reset", "email-verification", "magic-link"] as const

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

export const uniqueTokenColumns = ["id"] as const
export const tokenIndexes = [...uniqueTokenColumns.map(column => [column]), ["userId", "type"]] as const
export const prohibitedTokenColumns = ["id"] as const
export const restrictedTokenColumns = ["id", "userId", "type"] as const

export type TokenDataTypes = CreateDataTypes<
    typeof tokens,
    typeof uniqueTokenColumns,
    typeof prohibitedTokenColumns,
    typeof restrictedTokenColumns
>

export type Token = TokenDataTypes["Readable"]
export type TokenType = Token["type"]
export type QueryableToken = TokenDataTypes["Queryable"]
export type IdentifiableToken = TokenDataTypes["Identifiable"]

export type WritableToken = TokenDataTypes["Writable"]
export type CreatableToken = TokenDataTypes["Creatable"]
export type UpdatableToken = TokenDataTypes["Updatable"]
