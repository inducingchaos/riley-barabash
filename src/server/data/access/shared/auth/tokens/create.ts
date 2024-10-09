/**
 *
 */

import { AUTH_TOKEN_TTL } from "~/constants/temp"
import { DataError } from "~/errors"
import { type Database } from "~/server/data"
import { tokens } from "~/server/data/schemas/shared/auth/tokens"
import type { Token, TokenOptions } from "~/types/auth"
import { generateRandomToken } from "~/utils/auth"
import type { MakeOptional } from "~/utils/types"
import { getToken } from "."

export async function createToken({
    using: values,
    in: db
}: {
    using: MakeOptional<TokenOptions, "expiresAt">
    in: Database
}): Promise<Token> {
    return await db.transaction(async tx => {
        const token = await getToken({ where: values, from: tx })
        if (token)
            throw new DataError({
                name: "RESOURCE_ALREADY_EXISTS",
                message: "A token with the provided values already exists.",
                cause: {
                    provided: values,
                    existing: token
                }
            })

        const { id } = (
            await tx
                .insert(tokens)
                .values({
                    value: await generateRandomToken(),
                    expiresAt: new Date(Date.now() + AUTH_TOKEN_TTL),
                    ...values
                })
                .$returningId()
        )[0]!

        return (await getToken({ where: { id }, from: tx }))!
    })
}
