/**
 *
 */

import { relations } from "drizzle-orm"
import { int, timestamp, varchar } from "drizzle-orm/mysql-core"
import { accountTypes } from "~/types/auth"
import { users } from "."
import { createSharedMysqlTable } from "../helpers"

export const accounts = createSharedMysqlTable("accounts", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").unique().notNull(),
    type: varchar("type", { length: 255, enum: accountTypes }).notNull(),
    providerId: varchar("provider_id", { length: 255 }).notNull(),
    verifiedAt: timestamp("verified_at")
})

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] })
}))

export const accountsDependencies = ["users", "other"] as const
