/**
 *
 */

import { createTRPCRouter } from "~/server/api/init/rpc"
import { neuronsRouter } from "./neurons"

export const kyznRouter = createTRPCRouter({
    neurons: neuronsRouter
})
