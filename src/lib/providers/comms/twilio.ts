/**
 *
 */

import { Twilio } from "twilio"
import { application } from "~/config"

export const twilio: Twilio = new Twilio(
    application.credentials.public.twilio.account,
    application.credentials.private.twilio.secret
)
