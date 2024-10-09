/**
 *
 */

import { Google } from "arctic";
import { application } from "~/config";

export const google = new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    `${application.routing.urls.base!}/api/login/google/callback`
)
