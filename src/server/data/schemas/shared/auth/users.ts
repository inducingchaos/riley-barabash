/**
 *
 */

import { relations } from "drizzle-orm"
import { int, timestamp, varchar } from "drizzle-orm/mysql-core"
import { accounts, profiles, sessions, tokens } from "."
import { createSharedMysqlTable } from "../helpers"
import type { CreateDataTypes } from "~/utils/db/schema/types"

export const users = createSharedMysqlTable("users", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }),

    //  Move email to accounts.
    email: varchar("email", { length: 255 }).unique().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
})

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    tokens: many(tokens),
    sessions: many(sessions),
    profiles: many(profiles)
}))

export const usersDependencies = [] as const

export const uniqueUserColumns = ["id", "email"] as const
export const userIndexes = [...uniqueUserColumns.map(column => [column])] as const
export const prohibitedUserColumns = ["id", "createdAt", "updatedAt"] as const
export const restrictedUserColumns = ["id", "createdAt", "updatedAt"] as const

export type UserDataTypes = CreateDataTypes<
    typeof users,
    typeof uniqueUserColumns,
    typeof prohibitedUserColumns,
    typeof restrictedUserColumns
>

export type User = UserDataTypes["Readable"]
export type UserID = User["id"]
export type QueryableUser = UserDataTypes["Queryable"]
export type IdentifiableUser = UserDataTypes["Identifiable"]

export type WritableUser = UserDataTypes["Writable"]
export type CreatableUser = UserDataTypes["Creatable"]
export type UpdatableUser = UserDataTypes["Updatable"]
