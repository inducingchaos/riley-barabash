/**
 *
 */

import { relations } from "drizzle-orm"
import { int, timestamp, varchar } from "drizzle-orm/mysql-core"
import type { CreateDataTypes } from "~/utils/db/schema/types"
import { users } from "."
import { createSharedMysqlTable } from "../helpers"

export const sessions = createSharedMysqlTable("session", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: int("user_id").notNull(),
    expiresAt: timestamp("expires_at").notNull()
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] })
}))

export const sessionsDependencies = ["users"] as const

export const uniqueSessionColumns = ["id"] as const
export const sessionIndexes = [...uniqueSessionColumns.map(column => [column])] as const
export const prohibitedSessionColumns = ["id"] as const
export const restrictedSessionColumns = ["id", "userId"] as const

export type SessionDataTypes = CreateDataTypes<
    typeof sessions,
    typeof uniqueSessionColumns,
    typeof prohibitedSessionColumns,
    typeof restrictedSessionColumns
>

export type Session = SessionDataTypes["Readable"]
export type QueryableSession = SessionDataTypes["Queryable"]
export type IdentifiableSession = SessionDataTypes["Identifiable"]

export type WritableSession = SessionDataTypes["Writable"]
export type CreatableSession = SessionDataTypes["Creatable"]
export type UpdatableSession = SessionDataTypes["Updatable"]
