/**
 *
 */

"use client"

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"
import { useState } from "react"
import SuperJSON from "superjson"
import { application } from "~/config"
import { type AppRouter } from "~/server/api/routers"
import { onServer } from "~/utils/conditions"
import { createQueryClient } from "./helpers/query-client"

let queryClient: QueryClient | undefined

const getQueryClient = (): QueryClient => {
    //  Always make a new query client server-side.

    if (onServer) return createQueryClient()
    return (queryClient ??= createQueryClient())
}

/**
 * Initializes the tRPC client.
 */
export const api = createTRPCReact<AppRouter>()

/**
 * Inference helper for inputs.
 *
 * @example
 * type HelloInput = RouterInputs["example"]["hello"]
 */
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs.
 *
 * @example
 * type HelloOutput = RouterOutputs["example"]["hello"]
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>

export function TRPCReactProvider(props: { children: React.ReactNode }): JSX.Element {
    const queryClient: QueryClient = getQueryClient()

    const [trpcClient] = useState(() =>
        api.createClient({
            links: [
                loggerLink({
                    enabled: op =>
                        application.environment === "development" || (op.direction === "down" && op.result instanceof Error)
                }),

                unstable_httpBatchStreamLink({
                    transformer: SuperJSON,
                    url: application.routing.urls.base + application.routing.paths.api.trpc,

                    headers: () => {
                        const headers: Headers = new Headers()
                        headers.set("x-trpc-source", "nextjs-react")
                        return headers
                    }
                })
            ]
        })
    )

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
            </api.Provider>
        </QueryClientProvider>
    )
}
