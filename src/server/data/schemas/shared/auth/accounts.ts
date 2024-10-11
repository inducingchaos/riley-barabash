/**
 *
 */

import { relations } from "drizzle-orm"
import { int, timestamp, unique, varchar } from "drizzle-orm/mysql-core"
import type { CreateSchemaTypes } from "~/utils/db/schema/types"
import { users } from "."
import { createSharedMysqlTable } from "../helpers"

export const accountTypes = ["email", "password", "google"] as const

export const accounts = createSharedMysqlTable(
    "accounts",
    {
        id: int("id").autoincrement().notNull(),
        userId: int("user_id").unique().notNull(),
        type: varchar("type", { length: 255, enum: accountTypes }).notNull(),
        providerId: varchar("provider_id", { length: 255 }).notNull(),
        verifiedAt: timestamp("verified_at")
    },
    table => ({
        userIdTypeIdx: unique("user_id_type_idx").on(table.userId, table.type)
    })
)

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] })
}))

export const uniqueAccountColumns = ["userId", "type"] as const
export const prohibitedAccountColumns = ["id"] as const
export const restrictedAccountColumns = ["id", "userId", "type"] as const

export const accountsDependencies = ["users"] as const

export type AccountSchemaTypes = CreateSchemaTypes<
    typeof accounts,
    typeof uniqueAccountColumns,
    typeof prohibitedAccountColumns,
    typeof restrictedAccountColumns
>

export type Account = AccountSchemaTypes["Readable"]
export type AccountType = Account["type"]

export type QueryableAccount = AccountSchemaTypes["Queryable"]
export type IdentifiableAccount = AccountSchemaTypes["Identifiable"]

export type WritableAccount = AccountSchemaTypes["Writable"]
export type CreatableAccount = AccountSchemaTypes["Creatable"]
export type UpdatableAccount = AccountSchemaTypes["Updatable"]
