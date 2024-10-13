/**
 *
 */

import { relations } from "drizzle-orm"
import { int, timestamp, varchar } from "drizzle-orm/mysql-core"
import { users } from "."
import { createSharedMysqlTable } from "../helpers"
import type { CreateDataTypes } from "~/utils/db/schema/types"

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
export const prohibitedSessionColumns = ["id"] as const
export const restrictedSessionColumns = ["id", "userId"] as const

export type SessionSchemaTypes = CreateDataTypes<
    typeof sessions,
    typeof uniqueSessionColumns,
    typeof prohibitedSessionColumns,
    typeof restrictedSessionColumns
>

export type Session = SessionSchemaTypes["Readable"]
export type QueryableSession = SessionSchemaTypes["Queryable"]
export type IdentifiableSession = SessionSchemaTypes["Identifiable"]

export type WritableSession = SessionSchemaTypes["Writable"]
export type CreatableSession = SessionSchemaTypes["Creatable"]
export type UpdatableSession = SessionSchemaTypes["Updatable"]
