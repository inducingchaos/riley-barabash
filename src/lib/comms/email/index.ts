/**
 *
 */

import { type ReactNode } from "react"
import { resend } from "~/lib/providers/comms"
import { Exception } from "~/meta"
import { createSenderIdentity } from "~/utils/comms/email"

export async function sendEmail(email: string, subject: string, body: ReactNode) {
    const { error } = await resend.emails.send({
        from: createSenderIdentity({ email: "test@kyzn.app" }),
        to: email,
        subject,
        react: body
    })

    if (error) {
        throw new Exception({
            in: "comms",
            for: "email-send-failed",
            with: {
                internal: {
                    label: "Failed to Send Email",
                    message: "Something went wrong sending the email."
                }
            },
            and: {
                error,
                values: {
                    email,
                    subject,
                    body
                }
            }
        })
    }
}
