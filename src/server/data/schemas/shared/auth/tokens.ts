/**
 *
 */

import { relations } from "drizzle-orm"
import { int, timestamp, varchar, unique } from "drizzle-orm/mysql-core"
import { users } from "."
import { createSharedMysqlTable } from "../helpers"
import type { CreateSchemaTypes } from "~/utils/db/schema/types"

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

export const uniqueTokenColumns = ["userId", "type"] as const
export const prohibitedTokenColumns = ["id"] as const
export const restrictedTokenColumns = ["id", "userId", "type"] as const

export const tokensDependencies = ["users"] as const

export type TokenSchemaTypes = CreateSchemaTypes<
    typeof tokens,
    typeof uniqueTokenColumns,
    typeof prohibitedTokenColumns,
    typeof restrictedTokenColumns
>

export type Token = TokenSchemaTypes["Readable"]
export type TokenType = Token["type"]

export type QueryableToken = TokenSchemaTypes["Queryable"]
export type IdentifiableToken = TokenSchemaTypes["Identifiable"]

export type WritableToken = TokenSchemaTypes["Writable"]
export type CreatableToken = TokenSchemaTypes["Creatable"]
export type UpdatableToken = TokenSchemaTypes["Updatable"]
