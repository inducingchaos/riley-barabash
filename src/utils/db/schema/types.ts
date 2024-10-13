/**
 *
 */

import type { MySqlTable } from "drizzle-orm/mysql-core"
import type { ArrayToUnion } from "~/utils/types"

export type ReadableData<Schema extends MySqlTable> = Schema["$inferSelect"]
export type WritableData<Schema extends MySqlTable> = Schema["$inferInsert"]
export type QueryableData<Data extends object> = Partial<Data>
export type CreatableData<Data extends object, ProhibitedColumn extends keyof Data> = Omit<Data, ProhibitedColumn>
export type UpdatableData<Data extends object, RestrictedColumn extends keyof Data> = Partial<Omit<Data, RestrictedColumn>>
export type IdentifiableData<QueryableData extends object, UniqueColumn extends keyof QueryableData> = Pick<
    QueryableData,
    UniqueColumn
>

export type CreateDataTypes<
    Schema extends MySqlTable,
    UniqueColumns extends readonly (string & keyof ReadableData<Schema>)[],
    ProhibitedColumns extends readonly (string & keyof ReadableData<Schema>)[],
    RestrictedColumns extends readonly (string & keyof ReadableData<Schema>)[]
> = {
    Readable: ReadableData<Schema>
    Queryable: QueryableData<ReadableData<Schema>>
    Identifiable: IdentifiableData<QueryableData<ReadableData<Schema>>, ArrayToUnion<UniqueColumns>>
    Writable: WritableData<Schema>
    Creatable: CreatableData<WritableData<Schema>, ArrayToUnion<ProhibitedColumns>>
    Updatable: UpdatableData<WritableData<Schema>, ArrayToUnion<RestrictedColumns>>
}
