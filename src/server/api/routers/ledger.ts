/**
 *
 */

import { eq } from "drizzle-orm"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/init/rpc"
import { ledger } from "~/server/data/schemas/riley-barabash"

export const ledgerRouter = createTRPCRouter({
    save: publicProcedure
        .input(
            z.object({
                name: z.string().min(1).max(63),
                message: z.string().max(255)
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(ledger).values({
                name: input.name,
                message: input.message
            })
        }),

    list: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.ledger.findMany({
            orderBy: (ledger, { desc }) => [desc(ledger.createdAt)]
        })
    }),

    delete: publicProcedure
        .input(
            z.object({
                id: z.string()
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(ledger).where(eq(ledger.id, input.id))
        }),

    clear: publicProcedure.mutation(async ({ ctx }) => {
        await ctx.db.delete(ledger)
    })
})
