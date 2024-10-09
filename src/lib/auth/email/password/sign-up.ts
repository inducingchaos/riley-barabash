import { application, project } from "~/config"
import { AuthError } from "~/errors"
import { resend } from "~/lib/providers/comms"
import { db } from "~/server/data"
import { createAccount, createProfile, createToken, createUser, getUser } from "~/server/data/access/shared/auth"
import type { User } from "~/types/auth"
import { encodePassword } from "~/utils/auth"
import { createSenderIdentity } from "~/utils/comms/email"
import { dependantOperations } from "~/utils/db/integrity"

export async function signUp({ using: values }: { using: { name: string; email: string; password: string } }): Promise<User> {
    return await db.transaction(async tx => {
        let user = await getUser({ where: { email: values.email }, from: db })
        if (user)
            throw new AuthError({
                name: "EMAIL_IN_USE",
                message: `The email '${values.email}' is already in use.`,
                cause: {
                    provided: values,
                    existing: user
                }
            })

        user = await createUser({ using: { name: values.name, email: values.email }, in: db })

        const { tokens: token } = dependantOperations({
            for: "users",
            using: {
                accounts: await createAccount({
                    using: {
                        userId: user.id,
                        type: "password",
                        providerId: await encodePassword({ using: { password: values.password } })
                    },
                    in: tx
                }),
                profiles: await createProfile({ using: { userId: user.id }, in: tx }),
                sessions: null,
                tokens: await createToken({ using: { userId: user.id, type: "email-verification" }, in: tx })
            }
        })

        await resend.emails.send({
            from: createSenderIdentity({ email: project.emails.support }),
            to: values.email,
            subject: "Verify Email",
            text: `Verify your email here: ${application.routing.urls.base}/api/login/verify-email?token=${token.value}`
        })

        return user
    })
}
