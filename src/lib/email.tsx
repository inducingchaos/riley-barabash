import { Resend } from "resend"

import { type ReactNode } from "react"
import { application } from "~/config"
import { createSenderIdentity } from "~/utils/comms/email"

const resend = new Resend(application.credentials.private.resend.secret)

export async function sendEmail(email: string, subject: string, body: ReactNode) {
    const { error } = await resend.emails.send({
        from: createSenderIdentity({ email: "test@kyzn.app" }),
        to: email,
        subject,
        react: <>{body}</>
    })

    if (error) {
        throw new Error("Something went wrong sending the email", { cause: error })
    }
}
