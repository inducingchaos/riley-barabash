/**
 * @remarks
 * - Previously, the `onError` handler only logged the error message - if throwing an error causes unwanted behavior, revert to the previous implementation.
 */

import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { type NextRequest } from "next/server"
import { application } from "~/config"
import { createTrpcContext, type TRPCContext } from "~/server/api/init/rpc"
import { appRouter } from "~/server/api/routers"

/**
 * Uses the request headers to create the context for tRPC.
 */
const createContext = async (req: NextRequest): TRPCContext =>
    createTrpcContext({
        headers: req.headers
    })

/**
 * Handles incoming requests to the tRPC API.
 */
const handler = (req: NextRequest): Promise<Response> =>
    fetchRequestHandler({
        endpoint: application.routing.paths.api.trpc,
        req,
        router: appRouter,
        createContext: () => createContext(req),
        onError:
            application.environment === "development"
                ? ({ path, error }): void =>
                      console.error(`tRPC failed on '${path ?? "<unknown-path>"}': ${error.message}.`, {
                          cause: error
                      })
                : undefined
    })

export { handler as GET, handler as POST }
