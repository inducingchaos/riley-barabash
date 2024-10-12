/**
 * @todo
 * - [P0] Replace the test user object with the new auth method.
 */

import { and, eq } from "drizzle-orm"
import { z } from "zod"
import { Exception } from "~/meta"
import { createTRPCRouter, publicProcedure } from "~/server/api/init/rpc"
import { neurons, neuronsToTags, tags } from "~/server/data/schemas/kyzn"

const testUserObject = {
    id: "1",
    email: "test@test.com",
    name: "Test"
}

export const neuronsRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                content: z.string().min(1).max(768),
                tags: z.array(z.string().min(1).max(255))
            })
        )
        .mutation(async ({ ctx, input }) => {
            const user = testUserObject

            if (!user)
                throw new Exception({
                    in: "data",
                    of: "resource-not-found"
                })

            const { id: neuronId } = (
                await ctx.db
                    .insert(neurons)
                    .values({
                        content: input.content,
                        userId: user.id
                    })
                    .$returningId()
            )[0]!

            for (const tag of input.tags) {
                let tagId = (
                    await ctx.db.query.tags.findFirst({
                        columns: {
                            id: true
                        },
                        where: eq(tags.name, tag)
                    })
                )?.id

                if (!tagId) {
                    tagId = (
                        await ctx.db
                            .insert(tags)
                            .values({
                                name: tag,
                                userId: user.id
                            })
                            .$returningId()
                    )[0]!.id
                }

                await ctx.db.insert(neuronsToTags).values({
                    neuronId,
                    tagId
                })
            }
        }),

    all: publicProcedure.query(async ({ ctx }) => {
        try {
            const user = testUserObject

            if (!user)
                throw new Exception({
                    in: "data",
                    of: "resource-not-found"
                })

            return await ctx.db.query.neurons.findMany({
                columns: {
                    id: true,
                    content: true
                },
                with: {
                    tags: {
                        with: {
                            tag: {
                                columns: {
                                    name: true
                                }
                            }
                        }
                    }
                },
                where: eq(neurons.userId, user.id),
                orderBy: (neurons, { desc }) => [desc(neurons.createdAt)]
            })
        } catch (error) {
            // figure out how to get errors back to the client
            console.error(error)
            throw error
        }
    }),

    delete: publicProcedure
        .input(
            z.object({
                id: z.number()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const user = testUserObject

            if (!user)
                throw new Exception({
                    in: "auth",
                    of: "unauthorized"
                })

            await ctx.db.delete(neurons).where(and(eq(neurons.id, input.id), eq(neurons.userId, user.id)))
        })
})
