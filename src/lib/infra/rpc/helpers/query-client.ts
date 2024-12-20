/**
 *
 */

import { defaultShouldDehydrateQuery, QueryClient } from "@tanstack/react-query"
import { SuperJSON } from "superjson"

export const createQueryClient = (): QueryClient =>
    new QueryClient({
        defaultOptions: {
            queries: {
                //  With SSR, we usually want to set a default `staleTime` greater than 0ms to avoid refetching immediately on the client.

                staleTime: 30 * 1000
            },

            dehydrate: {
                serializeData: SuperJSON.serialize,
                shouldDehydrateQuery: (query): boolean => {
                    return defaultShouldDehydrateQuery(query) || query.state.status === "pending"
                }
            },

            hydrate: {
                deserializeData: SuperJSON.deserialize
            }
        }
    })
