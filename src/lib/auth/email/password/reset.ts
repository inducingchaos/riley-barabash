/**
 *
 */

import { application, project } from "~/config"
import { getUser, upsertToken } from "~/server/data/access/shared/auth"
import { AuthError } from "~/errors"
import { resend } from "~/lib/providers/comms"
import { db } from "~/server/data"
import { createSenderIdentity } from "~/utils/comms/email"

export async function resetPassword({ using: { email } }: { using: { email: string } }) {
    const user = await getUser({ where: { email }, from: db })

    if (!user)
        throw new AuthError({
            name: "INVALID_CREDENTIALS",
            message: `User with email '${email}' not found.`
        })

    const token = await upsertToken({
        where: { userId: user.id },
        using: {
            userId: user.id,
            type: "password-reset",
            expiresAt: new Date(Date.now() + 30 * 60 * 1000)
        },
        in: db
    })

    const recoveryLink = `${application.routing.urls.base}/reset-password?token=${token.value}`

    await resend.emails.send({
        from: createSenderIdentity({ email: project.emails.support }),
        to: email,
        subject: "Reset Password",
        text: `Use the following link to reset your password: ${recoveryLink}`,
        html: `
            <p>Use the following link to reset your password:</p>
            <p><a href="${recoveryLink}">${recoveryLink}</a></p>
        `
    })
}
