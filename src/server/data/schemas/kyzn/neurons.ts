/**
 *
 */

import { relations } from "drizzle-orm"
import { index, int, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createKyznMysqlTable } from "./helpers"
import { users } from "../riley-barabash"
import { attachments } from "./attachments"
import { neuronsToTags } from "./joins"

export const neurons = createKyznMysqlTable(
    "neurons",
    {
        id: int("id").autoincrement().primaryKey(),
        content: varchar("content", { length: 768 }).notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),

        userId: varchar("user_id", { length: 255 }).notNull(),
        attachmentId: int("attachment_id")
    },
    neuron => ({
        contentIndex: index("content_idx").on(neuron.content)
    })
)

export const neuronsRelations = relations(neurons, ({ one, many }) => ({
    user: one(users, {
        fields: [neurons.userId],
        references: [users.id]
    }),

    tags: many(neuronsToTags),

    attachment: one(attachments, {
        fields: [neurons.attachmentId],
        references: [attachments.id]
    })
}))
