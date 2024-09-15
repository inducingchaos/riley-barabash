/**
 *
 */

import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/init/rpc"

export const experimentalRouter = createTRPCRouter({
    hello: publicProcedure
        .input(
            z.object({
                name: z.string()
            })
        )
        .query(({ input }) => {
            return {
                greeting: `Hello, ${input.name}`
            }
        })
})
