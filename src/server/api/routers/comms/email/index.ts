/**
 * @file A router for email communications.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #server
 * #api
 * #routers
 * #comms
 * #email
 * #index
 * #trpc
 */

import { createTRPCRouter } from "~/server/api/init/rpc"
import { messagesRouter } from "./messages"

export const emailRouter = createTRPCRouter({
    messages: messagesRouter
})
