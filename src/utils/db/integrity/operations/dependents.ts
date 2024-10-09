/**
 *
 */

import type { schema } from "~/server/data"
import type {
    ArrayObjectToUnionObject,
    ExpandUnionObjectValuesToProperties,
    FilterPropertiesByKeySuffix,
    FilterPropertiesByType,
    RemoveSuffixFromPropertyKeys,
    ReverseUnionObject
} from "."

type FilteredBySuffix = FilterPropertiesByKeySuffix<typeof schema, "Dependencies">
type FilteredByReadonlyStringArray = FilterPropertiesByType<FilteredBySuffix, readonly string[]>
type WithoutDependenciesSuffix = RemoveSuffixFromPropertyKeys<FilteredByReadonlyStringArray, "Dependencies">
type UnionObject = ArrayObjectToUnionObject<WithoutDependenciesSuffix>
type ReversedUnionObject = ReverseUnionObject<UnionObject>

export function dependantOperations<
    Values,
    Dependency extends keyof DependentMap,
    DependentMap extends ExpandUnionObjectValuesToProperties<ReversedUnionObject, Values>,
    Operations extends DependentMap[Dependency]
>({ for: _dependency, using: operations }: { for: Dependency; using: Operations }): Operations {
    return operations
}
