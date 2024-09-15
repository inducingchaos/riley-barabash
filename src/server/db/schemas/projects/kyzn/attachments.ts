/**
 *
 */

import { relations } from "drizzle-orm"
import { index, int, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createKyznMysqlTable } from "./helpers"
import { users } from "../riley-barabash"
import { neurons } from "./neurons"

export const attachments = createKyznMysqlTable(
    "attachments",
    {
        id: int("id").autoincrement().primaryKey(),
        url: varchar("url", { length: 768 }).notNull().unique(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),

        userId: varchar("user_id", { length: 255 }).notNull(),
        neuronId: int("neuron_id").notNull()
    },
    attachment => ({
        urlIndex: index("url_idx").on(attachment.url)
    })
)

export const attachmentsRelations = relations(attachments, ({ one }) => ({
    user: one(users, {
        fields: [attachments.userId],
        references: [users.id]
    }),

    neuron: one(neurons, {
        fields: [attachments.neuronId],
        references: [neurons.id]
    })
}))
