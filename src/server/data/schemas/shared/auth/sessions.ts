/**
 *
 */

import { relations } from "drizzle-orm"
import { int, timestamp, varchar } from "drizzle-orm/mysql-core"
import { users } from "."
import { createSharedMysqlTable } from "../helpers"
import type { SchemaDependencies } from "~/server/data"

export const sessions = createSharedMysqlTable("session", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: int("user_id").notNull(),
    expiresAt: timestamp("expires_at").notNull()
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] })
}))

export const sessionsDependencies = ["users"] as const
