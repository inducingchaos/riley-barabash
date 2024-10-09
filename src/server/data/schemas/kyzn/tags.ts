/**
 *
 */

import { relations } from "drizzle-orm"
import { index, int, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createKyznMysqlTable } from "./helpers"
import { users } from "../riley-barabash"
import { neuronsToTags } from "./joins"

export const tags = createKyznMysqlTable(
    "tags",
    {
        id: int("id").autoincrement().primaryKey(),
        name: varchar("name", { length: 255 }).notNull().unique(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),

        userId: varchar("user_id", { length: 255 }).notNull()
    },
    tag => ({
        nameIndex: index("name_idx").on(tag.name)
    })
)

export const tagsRelations = relations(tags, ({ one, many }) => ({
    user: one(users, {
        fields: [tags.userId],
        references: [users.id]
    }),

    neurons: many(neuronsToTags)
}))
