/**
 *
 */

import { z } from "zod"
import { resend } from "~/lib/providers"
import { createTRPCRouter, publicProcedure } from "~/server/api/init/rpc"

export const messagesRouter = createTRPCRouter({
    send: publicProcedure
        .input(
            z.object({
                content: z.string().min(1).max(4096),
                from: z.string(),
                to: z.string(),
                subject: z.string().min(1).max(1024)
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
