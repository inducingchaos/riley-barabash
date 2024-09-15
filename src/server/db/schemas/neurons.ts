import { index, int, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createMysqlTable } from "~/utils/db/schema"
import { relations } from "drizzle-orm"

export const neurons = createMysqlTable(
    "neurons",
    {
        id: int("id").autoincrement().primaryKey(),
        userId: int("user_id").notNull(),
        content: varchar("content", { length: 1024 }).notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow()
    },
    neuron => ({
        contentIndex: index("content_idx").on(neuron.content)
    })
)

export const tags = createMysqlTable(
    "tags",
    {
        id: int("id").autoincrement().primaryKey(),
        name: varchar("name", { length: 255 }).notNull().unique()
    },
    tag => ({
        nameIndex: index("name_idx").on(tag.name)
    })
)

export const neuronTags = createMysqlTable(
    "neuron_tags",
    {
        neuronId: int("neuron_id").notNull(),
        tagId: int("tag_id").notNull()
    },
    neuronTag => ({
        neuronTagIndex: index("neuron_tag_idx").on(neuronTag.neuronId, neuronTag.tagId)
    })
)

export const neuronsRelations = relations(neurons, ({ many }) => ({
    tags: many(neuronTags)
}))

export const tagsRelations = relations(tags, ({ many }) => ({
    neurons: many(neuronTags)
}))

export const neuronTagsRelations = relations(neuronTags, ({ one }) => ({
    neuron: one(neurons, {
        fields: [neuronTags.neuronId],
        references: [neurons.id]
    }),
    tag: one(tags, {
        fields: [neuronTags.tagId],
        references: [tags.id]
    })
}))
