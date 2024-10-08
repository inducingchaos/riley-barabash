/**
 *
 */

import { z } from "zod"
import { sendMessage } from "~/lib/comms/sms"
import { createTRPCRouter, publicProcedure } from "~/server/api/init/rpc"

export const messagesRouter = createTRPCRouter({
    send: publicProcedure
        .input(
            z.object({
                content: z.string().min(1).max(4096),
                from: z.string().max(16).optional(),
                to: z
                    .string()
                    .max(16)
                    .or(z.array(z.string().max(16))),
                mediaUrls: z.string().or(z.array(z.string())).optional()
            })
        )
        .mutation(async ({ input }) => {
            return await sendMessage({
                content: input.content,
                from: input.from,
                to: input.to,
                mediaUrls: input.mediaUrls
            })
        })
})
