/**
 * @file A router for SMS communications.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #server
 * #api
 * #routers
 * #comms
 * #sms
 * #index
 * #trpc
 */

import { createTRPCRouter } from "~/server/api/init/rpc"
import { messagesRouter } from "./messages"

export const smsRouter = createTRPCRouter({
    messages: messagesRouter
})
