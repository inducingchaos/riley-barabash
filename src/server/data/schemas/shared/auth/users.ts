/**
 *
 */

import { relations } from "drizzle-orm"
import { int, timestamp, varchar } from "drizzle-orm/mysql-core"
import { accounts, profiles, sessions, tokens } from "."
import { createSharedMysqlTable } from "../helpers"

export const users = createSharedMysqlTable("users", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
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
