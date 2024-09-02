/**
 * @file A router for communications.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #server
 * #api
 * #routers
 * #comms
 * #index
 * #trpc
 */

import { createTRPCRouter } from "~/server/api/init/rpc"
import { smsRouter } from "./sms"

export const commsRouter = createTRPCRouter({
    sms: smsRouter
})
