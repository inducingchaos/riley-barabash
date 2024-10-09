/**
 *
 */

import { relations } from "drizzle-orm"
import { timestamp, varchar } from "drizzle-orm/mysql-core"
import { createRileyBarabashMysqlTable } from "./helpers"
import { attachments, neurons, tags } from "../kyzn"

export const users = createRileyBarabashMysqlTable("users", {
    id: varchar("id", { length: 255 }).primaryKey(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
})

export const usersRelations = relations(users, ({ many }) => ({
    neurons: many(neurons),
    attachments: many(attachments),
    tags: many(tags)
}))
