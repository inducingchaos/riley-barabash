/**
 *
 */

import { relations } from "drizzle-orm"
import { int, primaryKey } from "drizzle-orm/mysql-core"
import { createKyznMysqlTable } from "../helpers"
import { neurons } from "../neurons"
import { tags } from "../tags"

export const neuronsToTags = createKyznMysqlTable(
    "neurons_to_tags",
    {
        neuronId: int("neuron_id").notNull(),
        tagId: int("tag_id").notNull()
    },
    neuronToTag => ({
        primaryKey: primaryKey({ columns: [neuronToTag.neuronId, neuronToTag.tagId] })
    })
)

export const neuronsToTagsRelations = relations(neuronsToTags, ({ one }) => ({
    neuron: one(neurons, {
        fields: [neuronsToTags.neuronId],
        references: [neurons.id]
    }),
    tag: one(tags, {
        fields: [neuronsToTags.tagId],
        references: [tags.id]
    })
}))
