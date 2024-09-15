/**
 *
 */

import { createTRPCRouter } from "~/server/api/init/rpc"
import { smsRouter } from "./sms"
import { emailRouter } from "./email"

export const commsRouter = createTRPCRouter({
    sms: smsRouter,
    email: emailRouter
})
