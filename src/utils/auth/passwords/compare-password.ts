/**
 *
 */

import { hashPassword } from "."

export const comparePassword = async ({
    using: { plain: password, secure: combo }
}: {
    using: { plain: string; secure: string }
}): Promise<boolean> => {
    const [salt, existingHash] = combo.split(":")
    if (!salt || !existingHash) return false

    const hash = await hashPassword(password, salt)
    return hash === existingHash
}
