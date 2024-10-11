/**
 *
 */

import type { MySqlTable } from "drizzle-orm/mysql-core"
import type { ArrayToUnion } from "~/utils/types"

export type ReadableSchema<Schema extends MySqlTable> = Schema["$inferSelect"]
export type WritableSchema<Schema extends MySqlTable> = Schema["$inferInsert"]
export type QueryableSchema<Schema extends object> = Partial<Schema>
export type CreatableSchema<Schema extends object, ProhibitedColumn extends keyof Schema> = Omit<Schema, ProhibitedColumn>
export type UpdatableSchema<Schema extends object, RestrictedColumn extends keyof Schema> = Partial<
    Omit<Schema, RestrictedColumn>
>
export type IdentifiableSchema<QueryableSchema extends object, UniqueColumn extends keyof QueryableSchema> = Pick<
    QueryableSchema,
    UniqueColumn
>

export type CreateSchemaTypes<
    Schema extends MySqlTable,
    UniqueColumns extends readonly (string & keyof ReadableSchema<Schema>)[],
    ProhibitedColumns extends readonly (string & keyof ReadableSchema<Schema>)[],
    RestrictedColumns extends readonly (string & keyof ReadableSchema<Schema>)[]
> = {
    Readable: ReadableSchema<Schema>
    Queryable: QueryableSchema<ReadableSchema<Schema>>
    Identifiable: IdentifiableSchema<QueryableSchema<ReadableSchema<Schema>>, ArrayToUnion<UniqueColumns>>
    Writable: WritableSchema<Schema>
    Creatable: CreatableSchema<WritableSchema<Schema>, ArrayToUnion<ProhibitedColumns>>
    Updatable: UpdatableSchema<WritableSchema<Schema>, ArrayToUnion<RestrictedColumns>>
}
