/**
 *
 */

import { generateSalt, hashPassword } from "."

export async function encodePassword({
    using: { password, separator = ":" }
}: {
    using: { password: string; separator?: string }
}): Promise<string> {
    const salt = generateSalt()
    const hash = await hashPassword(password, salt)

    return `${hash}${separator}${salt}`
}
