/**
 *
 */

import { application } from "~/config"
import { Resend } from "resend"

export const resend: Resend = new Resend(application.credentials.private.resend.secret)
