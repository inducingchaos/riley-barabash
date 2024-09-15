import { relations } from "drizzle-orm"
import { int, varchar, timestamp } from "drizzle-orm/mysql-core"
import { createMysqlTable } from "~/utils/db/schema"

export const accountTypeEnum = ["email", "google", "github"] as const

export const users = createMysqlTable("user", {
    id: int("id").autoincrement().primaryKey(),
    email: varchar("email", { length: 255 }).unique(),
    emailVerified: timestamp("email_verified")
})

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    resetTokens: many(resetTokens),
    verifyEmailTokens: many(verifyEmailTokens),
    profiles: many(profiles),
    sessions: many(sessions)
}))

export const accounts = createMysqlTable("accounts", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").unique().notNull(),
    accountType: varchar("account_type", { length: 255, enum: accountTypeEnum }).notNull(),
    githubId: varchar("github_id", { length: 255 }).unique(),
    googleId: varchar("google_id", { length: 255 }).unique(),
    password: varchar("password", { length: 255 }),
    salt: varchar("salt", { length: 255 })
})

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] })
}))

export const magicLinks = createMysqlTable("magic_links", {
    id: int("id").autoincrement().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    token: varchar("token", { length: 255 }),
    tokenExpiresAt: timestamp("token_expires_at").notNull()
})

export const resetTokens = createMysqlTable("reset_tokens", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").unique().notNull(),
    token: varchar("token", { length: 255 }),
    tokenExpiresAt: timestamp("token_expires_at").notNull()
})

export const resetTokensRelations = relations(resetTokens, ({ one }) => ({
    user: one(users, { fields: [resetTokens.userId], references: [users.id] })
}))

export const verifyEmailTokens = createMysqlTable("verify_email_tokens", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").unique().notNull(),
    token: varchar("token", { length: 255 }),
    tokenExpiresAt: timestamp("token_expires_at").notNull()
})

export const verifyEmailTokensRelations = relations(verifyEmailTokens, ({ one }) => ({
    user: one(users, { fields: [verifyEmailTokens.userId], references: [users.id] })
}))

export const profiles = createMysqlTable("profile", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").unique().notNull(),
    displayName: varchar("display_name", { length: 255 }),
    imageId: varchar("image_id", { length: 255 }),
    image: varchar("image", { length: 255 }),
    bio: varchar("bio", { length: 1000 }).notNull().default("")
})

export const profilesRelations = relations(profiles, ({ one }) => ({
    user: one(users, { fields: [profiles.userId], references: [users.id] })
}))

export const sessions = createMysqlTable("session", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: int("user_id").notNull(),
    expiresAt: timestamp("expires_at").notNull()
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] })
}))

export type User = typeof users.$inferSelect
export type Profile = typeof profiles.$inferSelect
export type Session = typeof sessions.$inferSelect
