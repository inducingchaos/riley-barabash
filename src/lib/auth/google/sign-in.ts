/**
 *
 */

import { createAccount, createProfile, upsertUser } from "~/server/data/access/shared/auth"
import { db } from "~/server/data"
import type { GoogleUser } from "~/types/auth"
import type { User } from "~/server/data/schemas"

export async function signInWithGoogle({ using: googleUser }: { using: GoogleUser }): Promise<User> {
    const user = await upsertUser({
        where: { email: googleUser.email },
        using: { name: googleUser.name, email: googleUser.email },
        in: db
    })

    await createAccount({
        using: {
            userId: user.id,
            type: "google",
            providerId: googleUser.sub,
            verifiedAt: googleUser.email_verified ? new Date() : null
        },
        in: db
    })

    await createProfile({ using: { userId: user.id, image: googleUser.picture }, in: db })

    return user
}
