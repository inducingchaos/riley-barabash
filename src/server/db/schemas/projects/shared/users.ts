/**
 *
 */

import { timestamp, varchar } from "drizzle-orm/mysql-core"
import { createSharedMysqlTable } from "./helpers"
import { relations } from "drizzle-orm"

export const users = createSharedMysqlTable("user", {
    id: varchar("id", { length: 255 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
})

export const usersRelations = relations(users, ({ many }) => ({
    sessions: many(sessions),
    accounts: many(accounts)
}))

export const sessions = createSharedMysqlTable("session", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    ipAddress: varchar("ip_address", { length: 255 }).notNull(),
    userAgent: varchar("user_agent", { length: 255 }).notNull()
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id]
    })
}))

export const accounts = createSharedMysqlTable("account", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    accountId: varchar("account_id", { length: 255 }).notNull(),
    providerId: varchar("provider_id", { length: 255 }).notNull(),
    accessToken: varchar("access_token", { length: 255 }),
    refreshToken: varchar("refresh_token", { length: 255 }),
    expiresAt: timestamp("expires_at")
})

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id]
    })
}))

export const verifications = createSharedMysqlTable("verification", {
    id: varchar("id", { length: 255 }).primaryKey(),
    identifier: varchar("identifier", { length: 255 }).notNull(),
    value: varchar("value", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at").notNull()
})
