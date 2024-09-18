/**
 *
 */

import { commsRouter } from "./comms"
import { experimentalRouter } from "./experimental"
import { kyznRouter } from "./kyzn"
import { ledgerRouter } from "./ledger"
import { createCallerFactory, createTRPCRouter } from "~/server/api/init/rpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in "~/server/api/routers" should be manually added here.
 */
export const appRouter = createTRPCRouter({
    comms: commsRouter,
    experimental: experimentalRouter,
    ledger: ledgerRouter,
    kyzn: kyznRouter
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