/**
 *
 */

import { eq } from "drizzle-orm"
import { AUTH_TOKEN_TTL } from "~/constants/temp"
import { type Database } from "~/server/data"
import { tokens } from "~/server/data/schemas/shared"
import type { Token, TokenOptions } from "~/types/auth"
import { generateRandomToken } from "~/utils/auth"
import type { MakeOptional } from "~/utils/types"
import { createToken, getToken } from "."

export async function upsertToken({
    where: query,
    using: values,
    in: db
}: {
    where: Partial<Token>
    using: MakeOptional<Omit<TokenOptions, "id">, "expiresAt">
    in: Database
}): Promise<Token> {
    values.value ??= await generateRandomToken()
    values.expiresAt ??= new Date(Date.now() + AUTH_TOKEN_TTL)

    return await db.transaction(async tx => {
        let token = await getToken({ where: query, from: tx })
        if (!token) token = await createToken({ using: values, in: tx })

        console.log(token)
        return (await tx.query.tokens.findFirst({
            where: eq(tokens.id, token.id)
        }))!
    })
}
