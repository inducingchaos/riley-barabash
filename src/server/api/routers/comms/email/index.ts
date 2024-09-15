/**
 *
 */

import { createTRPCRouter } from "~/server/api/init/rpc"
import { messagesRouter } from "./messages"

export const emailRouter = createTRPCRouter({
    messages: messagesRouter
})
