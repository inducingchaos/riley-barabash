/**
 *
 */

import crypto from "crypto"

export const TOKEN_LENGTH = 32

export async function generateRandomToken(length: number = TOKEN_LENGTH) {
    const buf = await new Promise<Buffer>((resolve, reject) => {
        crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
            if (err !== null) {
                reject(err)
            } else {
                resolve(buf)
            }
        })
    })

    return buf.toString("hex").slice(0, length)
}
