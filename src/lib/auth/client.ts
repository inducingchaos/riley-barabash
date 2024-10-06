/**
 *
 */

import { createAuthClient } from "better-auth/react"
import { application } from "~/config"

export const { signIn, signUp, useSession } = createAuthClient({
    baseURL: process.env.ENVIRONMENT === "development" ? "localhost:221" : application.routing.urls.base
})
