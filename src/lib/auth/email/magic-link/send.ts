/**
 *
 */

import { application, project } from "~/config"
import { createUser, getUser, upsertToken } from "~/server/data/access/shared/auth"
import { resend } from "~/lib/providers/comms"
import { db } from "~/server/data"
import { createSenderIdentity } from "~/utils/comms/email"

export async function sendMagicLink({ to: recipient }: { to: { email: string } }) {
    await db.transaction(async tx => {
        let user = await getUser({ where: { email: recipient.email }, from: tx })
        if (!user) user = await createUser({ using: recipient, in: tx })

        const token = await upsertToken({
            where: { userId: user.id },
            using: { type: "magic-link", userId: user.id, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24) },
            in: tx
        })

        await resend.emails.send({
            from: createSenderIdentity({ email: project.emails.support }),
            to: recipient.email,
            subject: `Your magic login link for ${project.info.name}`,
            text: `Here is the link to sign in: ${application.routing.urls.base}/api/sign-in/verification?token=${token.value}`
        })
    })
}
