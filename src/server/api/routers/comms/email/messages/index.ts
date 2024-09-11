/**
 * @file A router for managing email messages.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #server
 * #api
 * #routers
 * #comms
 * #email
 * #messages
 * #index
 * #trpc
 */

import { z } from "zod"
import { resend } from "~/lib/providers"
import { createTRPCRouter, publicProcedure } from "~/server/api/init/rpc"

export const messagesRouter = createTRPCRouter({
    send: publicProcedure
        .input(
            z.object({
                content: z.string().min(1).max(255),
                from: z.string(),
                to: z.string().email(),
                subject: z.string().min(1).max(255)
            })
        )
        .mutation(async ({ input }) => {
            return await resend.emails.send({
                from: input.from,
                to: input.to,
                subject: input.subject,
                text: input.content
            })
        })
})
