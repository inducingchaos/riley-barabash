/**
 * @file Initializes a Twilio client.
 * @author Riley Barabash <riley@rileybarabash.com>
 *
 * @tags
 * #src
 * #lib
 * #providers
 * #twilio
 */

import { Twilio } from "twilio"
import { application } from "~/config"

export const twilio: Twilio = new Twilio(application.credentials.public.twilio.sid, application.credentials.private.twilio.secret)
