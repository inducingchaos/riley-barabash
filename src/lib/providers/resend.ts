/**
 * @file Initializes and exports a shared `Resend` instance.
 * @author Riley Barabash <riley@rileybarabash.com>
 */

import { application } from "~/config"
import { Resend } from "resend"

export const resend: Resend = new Resend(application.credentials.private.resend.secret)
