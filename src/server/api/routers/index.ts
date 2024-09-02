/**
 * @file Contains the root router for the application.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #server
 * #api
 * #routers
 * #trpc
 * #index
 * #root
 */

import { experimentalRouter } from "./experimental"
import { ledgerRouter } from "./ledger"
import { createCallerFactory, createTRPCRouter } from "~/server/api/init/rpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in "~/server/api/routers" should be manually added here.
 */
export const appRouter = createTRPCRouter({
    experimental: experimentalRouter,
    ledger: ledgerRouter
})

export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 *
 * @example
 * const trpc = createCaller(createContext)
 * const res = await trpc.post.all()
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
