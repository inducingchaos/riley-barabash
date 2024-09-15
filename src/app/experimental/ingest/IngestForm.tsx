"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { db } from "~/server/db"
import { neurons, tags, neuronTags } from "~/server/db/schemas/neurons"
import { desc, eq, sql } from "drizzle-orm"
import { Input, Button } from "~/components/ui/primitives/inputs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/form"

const formSchema = z.object({
    content: z.string().min(1, "Content is required"),
    tags: z.string().optional()
})

interface Neuron {
    id: number
    content: string
    createdAt: Date
    tags: string
}

export default function IngestForm(): JSX.Element {
    const [recentNeurons, setRecentNeurons] = useState<Neuron[]>([])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
            tags: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const [neuronId] = await db
            .insert(neurons)
            .values({
                content: values.content,
                userId: 1 // Replace with actual user ID
            })
            .$returningId()

        if (values.tags) {
            const tagNames = values.tags.split(",").map(tag => tag.trim())
            for (const tagName of tagNames) {
                let [existingTag] = await db.select().from(tags).where(eq(tags.name, tagName)).limit(1)
                if (!existingTag) {
                    ;[existingTag] = (await db.insert(tags).values({ name: tagName }).$returningId()) as {
                        id: number
                        name: string
                    }[]
                }
                await db.insert(neuronTags).values({ neuronId: neuronId!.id, tagId: existingTag!.id })
            }
        }

        form.reset()
        await fetchRecentNeurons()
    }

    const fetchRecentNeurons = async () => {
        const result = await db
            .select({
                id: neurons.id,
                content: neurons.content,
                createdAt: neurons.createdAt,
                tags: sql`GROUP_CONCAT(${tags.name} SEPARATOR ', ')`
            })
            .from(neurons)
            .leftJoin(neuronTags, eq(neurons.id, neuronTags.neuronId))
            .leftJoin(tags, eq(neuronTags.tagId, tags.id))
            .groupBy(neurons.id)
            .orderBy(desc(neurons.createdAt))
            .limit(10)

        setRecentNeurons(result as Neuron[])
    }

    useEffect(() => {
        void fetchRecentNeurons()
    }, [])

    return (
        <>
            <h1 className="mb-4 text-2xl font-bold">Ingest Neurons</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <textarea {...field} placeholder="Enter neuron content" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter tags separated by commas" />
                                </FormControl>
                                <FormDescription>
                                    Example: ai, entity/kyzn, db:app-features, p:2, idea, software-development
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>

            <h2 className="mb-4 mt-8 text-xl font-bold">Recent Neurons</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Content</th>
                        <th className="border p-2">Tags</th>
                        <th className="border p-2">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {recentNeurons.map(neuron => (
                        <tr key={neuron.id}>
                            <td className="border p-2">{neuron.content}</td>
                            <td className="border p-2">
                                {neuron.tags?.split(", ").map(tag => (
                                    <span
                                        key={tag}
                                        className="mb-1 mr-1 inline-block rounded-full bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-700"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </td>
                            <td className="border p-2">{new Date(neuron.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
