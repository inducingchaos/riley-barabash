/**
 *
 */

import "server-only"

import { createHydrationHelpers } from "@trpc/react-query/rsc"
import { headers as getHeaders } from "next/headers"
import { cache } from "react"
import { createTrpcContext } from "~/server/api/init/rpc"
import { createCaller, type AppRouter } from "~/server/api/routers"
import { createQueryClient } from "./helpers/query-client"

/**
 * Provides the required context for the tRPC API when creating a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
    const headers: Headers = new Headers(getHeaders())
    headers.set("x-trpc-source", "rsc")
    return createTrpcContext({ headers })
})

const getQueryClient = cache(createQueryClient)

const caller = createCaller(createContext)

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(caller, getQueryClient)
