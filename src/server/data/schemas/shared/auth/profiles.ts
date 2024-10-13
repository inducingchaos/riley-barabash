/**
 *
 */

import { relations } from "drizzle-orm"
import { int, varchar } from "drizzle-orm/mysql-core"
import { users } from "."
import { createSharedMysqlTable } from "../helpers"
import type { CreateDataTypes } from "~/utils/db/schema/types"

export const profiles = createSharedMysqlTable("profiles", {
    id: int("id").autoincrement().primaryKey(),
    userId: int("user_id").notNull(),
    username: varchar("username", { length: 255 }).unique(),
    bio: varchar("bio", { length: 255 }),
    image: varchar("image", { length: 255 })
})

export const profilesRelations = relations(profiles, ({ one }) => ({
    user: one(users, { fields: [profiles.userId], references: [users.id] })
}))

export const profilesDependencies = ["users"] as const

export const uniqueProfileColumns = ["id", "username"] as const
export const profileIndexes = [...uniqueProfileColumns.map(column => [column])] as const
export const prohibitedProfileColumns = ["id"] as const
export const restrictedProfileColumns = ["id", "userId"] as const

export type ProfileDataTypes = CreateDataTypes<
    typeof profiles,
    typeof uniqueProfileColumns,
    typeof prohibitedProfileColumns,
    typeof restrictedProfileColumns
>

export type Profile = ProfileDataTypes["Readable"]
export type QueryableProfile = ProfileDataTypes["Queryable"]
export type IdentifiableProfile = ProfileDataTypes["Identifiable"]

export type WritableProfile = ProfileDataTypes["Writable"]
export type CreatableProfile = ProfileDataTypes["Creatable"]
export type UpdatableProfile = ProfileDataTypes["Updatable"]
