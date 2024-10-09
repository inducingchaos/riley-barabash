/**
 *
 */

import crypto from "crypto"

export async function hashPassword(plainTextPassword: string, salt: string) {
    return new Promise<string>((resolve, reject) => {
        crypto.pbkdf2(plainTextPassword, salt, 310_000, 32, "sha256", (err, derivedKey) => {
            if (err) reject(err)
            resolve(derivedKey.toString("hex"))
        })
    })
}
