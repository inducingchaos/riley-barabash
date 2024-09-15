/**
 *
 */

import { createTRPCRouter } from "~/server/api/init/rpc"
import { messagesRouter } from "./messages"

export const smsRouter = createTRPCRouter({
    messages: messagesRouter
})
