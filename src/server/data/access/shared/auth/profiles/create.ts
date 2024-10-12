/**
 *
 */

import { Exception } from "~/meta"
import { type Database } from "~/server/data"
import { profiles, type CreatableProfile, type IdentifiableProfile, type Profile } from "~/server/data/schemas"
import { buildWhereClause } from "~/utils/db/schema/build-where-clause"
import { getProfile } from "."

export async function createProfile({ using: values, in: db }: { using: CreatableProfile; in: Database }): Promise<Profile> {
    return await db.transaction(async tx => {
        const profile = await getProfile({
            where: { username: values.username } satisfies IdentifiableProfile,
            from: tx
        })
        if (profile)
            throw new Exception({
                in: "data",
                of: "duplicate-identifier",
                with: {
                    internal: {
                        label: "Failed to Create Profile",
                        message: "A profile with the provided values already exists in the database."
                    }
                },
                and: {
                    existing: profile,
                    provided: values
                }
            })

        await tx.insert(profiles).values(values)

        return (await tx.query.profiles.findFirst({ where: buildWhereClause({ using: values, for: profiles }) }))!
    })
}
