/**
 * @file A router for experimental queries and mutations.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #server
 * #api
 * #routers
 * #experimental
 * #trpc
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
