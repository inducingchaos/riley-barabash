/**
 *
 */

import type { schema } from "~/server/data"
import type {
    ArrayObjectToUnionObject,
    ExpandUnionObjectValuesToProperties,
    FilterPropertiesByKeySuffix,
    FilterPropertiesByType,
    RemoveSuffixFromPropertyKeys
} from "."

type FilteredBySuffix = FilterPropertiesByKeySuffix<typeof schema, "Dependencies">
type FilteredByReadonlyStringArray = FilterPropertiesByType<FilteredBySuffix, readonly string[]>
type WithoutDependenciesSuffix = RemoveSuffixFromPropertyKeys<FilteredByReadonlyStringArray, "Dependencies">
type UnionObject = ArrayObjectToUnionObject<WithoutDependenciesSuffix>
type Result = ExpandUnionObjectValuesToProperties<UnionObject, (() => unknown) | null>

export async function dependencyOperations<T extends keyof Result>({
    for: _dependant,
    using: operations
}: {
    for: T
    using: Result[T]
}): Promise<void> {
    await Promise.all(
        Object.values(operations).map(async operation => {
            if (operation && typeof operation === "function") await operation()
        })
    )
}
