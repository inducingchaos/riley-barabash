/**
 *
 */

import { relations } from "drizzle-orm"
import { int, varchar } from "drizzle-orm/mysql-core"
import { users } from "."
import { createSharedMysqlTable } from "../helpers"

export const profiles = createSharedMysqlTable("profiles", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").unique().notNull(),
    username: varchar("username", { length: 255 }).unique(),
    bio: varchar("bio", { length: 255 }),
    image: varchar("image", { length: 255 })
})

export const profilesRelations = relations(profiles, ({ one }) => ({
    user: one(users, { fields: [profiles.userId], references: [users.id] })
}))

export const profilesDependencies = ["users", "other"] as const
