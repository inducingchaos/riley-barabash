/**
 *
 */

import { getUser } from "~/server/data/access/shared/auth"
import { db } from "~/server/data"
import { verifyPassword } from "."
import { Exception } from "~/meta"
import type { User } from "~/server/data/schemas"

export async function signInWithPassword({
    using: { email, password }
}: {
    using: {
        email: string
        password: string
    }
}): Promise<User> {
    const user = await getUser({ where: { email }, from: db })
    if (!user)
        throw new Exception({
            in: "auth",
            of: "invalid-credentials",
            with: {
                internal: {
                    label: "Cannot Sign In",
                    message: "No user associated with the provided email was found in the database."
                },
                external: {
                    label: "Cannot Sign In",
                    message: "An account for the provided email does not exist."
                }
            },
            and: {
                email
            }
        })

    const validCredentials: boolean = await verifyPassword({ using: { email, password } })

    if (!validCredentials)
        throw new Exception({
            in: "auth",
            of: "invalid-credentials",
            with: {
                internal: {
                    label: "Cannot Sign In",
                    message: "The password provided does not match the account password."
                },
                external: {
                    label: "Incorrect Password",
                    message: "The provided password is incorrect."
                }
            },
            and: {
                email,
                password
            }
        })

    return user
}
