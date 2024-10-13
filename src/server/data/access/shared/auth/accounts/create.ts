/**
 *
 */

import "server-only"

import { Exception } from "~/meta"
import { db, type Database } from "~/server/data"
import { accounts, prohibitedAccountColumns, uniqueAccountColumns } from "~/server/data/schemas"
import { buildWhereClause } from "~/utils/db/schema/build-where-clause"
import type { MySqlTable } from "drizzle-orm/mysql-core"
import type { CreatableData, ReadableData, WritableData } from "~/utils/db/schema"
import type { ArrayToUnion } from "~/utils/types"

export function initializeCreateDataFunction<
    Schema extends MySqlTable,
    Data extends ReadableData<Schema>,
    WritableData extends WritableData<Schema>,
    DataKey extends string & keyof Data,
    WritableDataKey extends string & keyof WritableData,
    UniqueColumn extends readonly DataKey[],
    ProhibitedColumn extends readonly WritableDataKey[],
    CreatableValues extends CreatableData<WritableData, ArrayToUnion<ProhibitedColumn>>,
    DefaultValues extends Partial<CreatableValues>,
    CreatableValuesWithOptionalDefaults extends Omit<CreatableValues, keyof DefaultValues> &
        Partial<Pick<CreatableValues, Extract<keyof DefaultValues, keyof CreatableValues>>>
>({
    for: schema,
    using: {
        queryForExisting: { withKeys: queryKeys },
        defaultValues
    }
}: {
    for: Schema
    with: {
        columns: {
            prohibited: ProhibitedColumn
        }
    }
    using: {
        queryForExisting: {
            withKeys: UniqueColumn
        }
        defaultValues: DefaultValues
    }
}): (params: { using: CreatableValuesWithOptionalDefaults; in: Database }) => Promise<Data> {
    return async ({ using: values, in: db }) => {
        return await db.transaction(async tx => {
            const existing = await tx
                .select()
                .from(schema)
                .where(
                    buildWhereClause({
                        using: Object.fromEntries(Object.entries(values).filter(([key]) => queryKeys.includes(key as DataKey))),
                        for: schema
                    })
                )

            if (existing.length > 0)
                throw new Exception({
                    in: "data",
                    of: "duplicate-identifier",
                    with: {
                        internal: {
                            label: `Failed to Create ${"Account"}`,
                            message: `A '${"account"}' with the provided values already exists in the database.`
                        }
                    },
                    and: {
                        existing: existing[0],
                        provided: values
                    }
                })

            values = {
                ...defaultValues,
                ...values
            }

            await tx.insert(schema).values(values)

            const created = await tx
                .select()
                .from(schema)
                .where(buildWhereClause({ using: values, for: schema }))

            return created[0] as Data
        })
    }
}

export const createAccount = initializeCreateDataFunction({
    for: accounts,
    with: {
        columns: {
            prohibited: prohibitedAccountColumns
        }
    },
    using: {
        queryForExisting: {
            withKeys: uniqueAccountColumns
        },
        defaultValues: {
            providerId: "calculated_provider_id"
        }
    }
})

export const action = createAccount({
    using: {
        userId: 1,
        type: "email"
    },
    in: db
})
